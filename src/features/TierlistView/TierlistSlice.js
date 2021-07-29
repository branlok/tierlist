import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import baseTierlistMaker from "../../app/baseTierlistMaker";
import db from "../../db";
import Row from "./Tierlist/Row";

export const loadTierlist = createAsyncThunk(
  "loadedTierlist/load",
  async (tierlistId) => {
    if (!tierlistId) {
      //if there is no tierlist avaliable, return basic tierlist
      return { updateTo: baseTierlistMaker(tierlistId) };
    }

    let tierlistData = {};
    let imageObjects = {};

    //check if record exists
    await db.tierlists
      .where("id")
      .equals(tierlistId)
      .each((item) => {
        tierlistData = item.tierlist;
      });

    //use default the tierlist does not exist with the the same Id
    if (Object.keys(tierlistData).length === 0) {
      return { updateTo: baseTierlistMaker(tierlistId) };
    }

    await db.images
      .where("tierlistId")
      .equals(tierlistId)
      .each((item) => {
        console.log(item, item.id, item.picture);
        imageObjects[item.id] = URL.createObjectURL(item.picture);
      });

    //supply new instance for fetching

    //delete last session

    await db.items
      .where("tierlistId")
      .equals(tierlistId)
      .delete()
      .then((deletecount) => console.log(deletecount));

    let items = tierlistData.items;
    console.log(items);
    let itemEntries = [];
    let itemKeys = [];

    for (let [key, value] of Object.entries(items)) {
      itemKeys.push(key);
      itemEntries.push(value);
    }

    //add bulk to items
    console.log(itemEntries, tierlistId);
    await db.items.bulkAdd(itemEntries).then((response) => {
      console.log("successfully instances");
    });

    // // await db.items;

    let response = { updateTo: tierlistData, imagePayload: imageObjects };
    return response;
  }
);

export const saveTierlist = createAsyncThunk(
  "loadedTierlist/saveAll",
  async (tierlistStructure, thunkAPI) => {
    console.log(thunkAPI.getState().loadedTierlist);
    const response = await db.tierlists.put({
      id: thunkAPI.getState().loadedTierlist.tierlist.id,
      tierlist: thunkAPI.getState().loadedTierlist,
      status: "saved",
      date: Date.now(),
    });
    let x = Object.values(thunkAPI.getState().loadedTierlist.items);
    const response2 = await db.items.bulkPut(x).then(function (lastKey) {
      console.log("updated Store");
    });

    return;
  }
);

export const updateTierlistStatus = createAsyncThunk(
  "loadedTierlist/statusUpdate",
  async (update, thunkAPI) => {
    console.log("we");
    const response = await db.tierlists.put({
      id: thunkAPI.getState().loadedTierlist.tierlist.id,
      status: update.status,
      date: update.date,
      tierlist: thunkAPI.getState().loadedTierlist,
    });
  }
);

export const updateItemsDB = createAsyncThunk(
  "loadedTierlist/updateItems",
  async (payload, thunkAPI) => {
    let x = Object.values(thunkAPI.getState().loadedTierlist.items);
    const response2 = await db.items.bulkPut(x).then(function (lastKey) {
      console.log("updated Store");
    });
  }
);

export const deleteItemFromDB = createAsyncThunk(
  "loadedTierlist/deleteItems",
  async (payload, thunkAPI) => {
    //delete from image collection
    const deleteFromImageDB = await db.images
      .where("id")
      .equals(payload)
      .delete()
      .then((deletecount) => console.log(deletecount));

    const deleteFromInstanceDB = await db.items
      .where("id")
      .equals(payload)
      .delete()
      .then((deletecount) => console.log(deletecount, "rew"));
  }
);

/* Rearrange Item between rows other than the same row  */
export const updateOrderInRow = createAsyncThunk(
  "loadedTierlist/updateOrderInRow",
  async (payload) => {
    console.log("ran");
    await db.items
      .update(payload.draggableId, {
        resides: payload.destination.droppableId,
      })
      .then((res) => console.log("updated"));
    return payload;
  }
);

export const updateItemDetails = createAsyncThunk(
  "loadedTierlist/updateItemDetails",
  async (payload, thunkAPI) => {
    //update instance
    await db.items
      .update(payload.itemId, { [payload.field]: payload.content })
      .then((res) => console.log("updated instance"));

    //saved
    let tierlistId = thunkAPI.getState().loadedTierlist.tierlist.id;
    let pathToUpdate = "tierlist.items." + payload.itemId + "." + payload.field;
    // console.log(payload.title);
    console.log({ [pathToUpdate]: payload.content });

    await db.tierlists
      .update(tierlistId, { [pathToUpdate]: payload.content })
      .then((res) => console.log(res));
    //   .update(tierlistId, )
  }
);

let tierlistSlice = createSlice({
  name: "loadedTierlist",
  initialState: {
    status: "loading",
  },
  reducers: {
    newTierlistBuild: (state, action) => {
      let defaultTierlist = baseTierlistMaker(action.payload.id);
      state.items = defaultTierlist.items;
      state.rows = defaultTierlist.rows;
      state.rowOrder = defaultTierlist.rowOrder;
      state.tierlist = defaultTierlist.tierlist;
      state.status = "ready";
    },
    //IMMER LIBRARY APPLIED WITH REACTTOOLKKIT, MUTABILITY TREATED AS IMMUTABLILITY
    addItem: (state, action) => {
      action.payload.forEach((item, idx) => {
        state.items[item[1]] = {
          id: item[1],
          name: "",
          description: "",
          imageURL: item[0],
          decoration: null,
          resides: "storage",
          tierlistId: state.tierlist.id,
        };
        state.rows.storage.itemOrder.push(item[1]);
      });
    },
    makeItemsAvaliableToRow: (state) => {
      //Item ID
      state.rows.storage.itemOrder.push(state);
    },
    modifyRowOrder: (state, action) => {
      //rearrangeItemInRow
      let { destination, source, draggableId } = action.payload;

      let itemOrder = state.rows[source.droppableId].itemOrder;
      itemOrder.splice(source.index, 1);
      itemOrder.splice(destination.index, 0, draggableId);

      state.items[draggableId].resides = destination.droppableId;
    },
    reorderItemBetweenRow: (state, action) => {
      //rearrangeItemBetweenRow
      let { destination, source, draggableId } = action.payload;

      let startOrder = state.rows[source.droppableId].itemOrder;
      startOrder.splice(source.index, 1);

      let finishOrder = state.rows[destination.droppableId].itemOrder;
      finishOrder.splice(destination.index, 0, draggableId);
      //update resides
      state.items[draggableId].resides = destination.droppableId;
    },
    returnToStorage: (state, action) => {
      let itemsInRow = action.payload.rowItems; //[itemIDs]
      let targetRow = action.payload.rowId;

      //reallocate items resided in row to storage, and update resides
      for (let item of itemsInRow) {
        state.rows.storage.itemOrder.push(item);
        state.items[item].resides = "storage";
      }
      //remove row from rowOrder
      let index = state.rowOrder.indexOf(targetRow);
      console.log(index);
      state.rowOrder.splice(index, 1);
      //remove row data
      delete state.rows[targetRow];
    },
    addNewRow: (state, action) => {
      //count current rows

      let rowCount = state.rowOrder[state.rowOrder.length - 1]; //get last id
      if (rowCount == "storage") {
        rowCount = state.rowOrder[state.rowOrder.length - 2];
        if (!rowCount) {
          //if only storage left, row count will be undefined, so set it to row-0
          rowCount = "row-0";
        }
      }
      //substr of `row-${number}` format
      let newRowName = `row-${+rowCount.substr(4) + 1}`;

      state.rowOrder.push(newRowName);
      state.rows[newRowName] = {
        id: newRowName,
        name: "new row",
        description: "something",
        itemOrder: [],
      };
    },
    deleteItem: (state, action) => {
      let resides = state.items[action.payload].resides;
      delete state.items[action.payload];

      let itemIndex = state.rows[resides].itemOrder.indexOf(action.payload);
      state.rows[resides].itemOrder.splice(itemIndex, 1);
    },
    editItemTitle: (state, action) => {
      console.log(action.payload);
      state.items[action.payload.id][action.payload.field] =
        action.payload.newValue;
    },
    editRowInfo: (state, action) => {
        state.rows[action.payload.id][action.payload.field] =
          action.payload.newValue;
      },
  },
  extraReducers: {
    [saveTierlist.fulfilled]: (state, action) => {
      //   return action.payload;
      state.tierlist.status = "saved";
    },
    [loadTierlist.pending]: (state, action) => {
      //   return action.payload;
      // console.log(action.payload.tierlistData, action.payload.imageObjects);
      state.status = "loading";
    },
    [loadTierlist.fulfilled]: (state, action) => {
      //   return action.payload;
      // console.log(action.payload.tierlistData, action.payload.imageObjects);
      state.items = action.payload.updateTo.items;
      state.rows = action.payload.updateTo.rows;
      state.rowOrder = action.payload.updateTo.rowOrder;
      state.tierlist = action.payload.updateTo.tierlist;
      state.status = "ready";
      if (action.payload.imagePayload) {
        for (const [key, value] of Object.entries(
          action.payload.imagePayload
        )) {
          state.items[key].imageURL = value;
        }
      }
    },
    [loadTierlist.rejected]: (state, action) => {},
    [updateOrderInRow.fulfilled]: (state, action) => {},
  },
});

export const {
  modifyRowOrder,
  reorderItemBetweenRow,
  addItem,
  newTierlistBuild,
  addNewRow,
  //   deleteRow,
  editItemTitle,
  deleteItem,
  returnToStorage,
  editRowInfo,
} = tierlistSlice.actions;

export default tierlistSlice.reducer;
