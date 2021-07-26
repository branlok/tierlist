import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import baseTierlistMaker from "../../app/baseTierlistMaker";
import db from "../../db";
import Row from "./Tierlist/Row";

export const loadTierlist = createAsyncThunk(
  "loadedTierlist/load",
  async (tierlistId) => {
    if (!tierlistId) {
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

    let response = { updateTo: tierlistData, imagePayload: imageObjects };
    return response;
  }
);

export const saveTierlist = createAsyncThunk(
  "loadedTierlist/saveAll",
  async (tierlistStructure, thunkAPI) => {
    console.log(thunkAPI.getState().loadedTierlist);
    const response = await db.tierlists.put({
      id: tierlistStructure.tierlist.id,
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

export const updateOrderInRow = createAsyncThunk(
  "loadedTierlist/updateOrderInRow",
  async (payload) => {
    console.log(payload.draggableId, payload, "readme");
    await db.items
      .update(payload.draggableId, {
        resides: payload.destination.droppableId,
      })
      .then((res) => console.log("updated"));
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
      state.items[draggableId].resides = destination.droppableId;
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
    [updateOrderInRow.fulfilled]: (state, action) => {}
  },
});

export const {
  modifyRowOrder,
  reorderItemBetweenRow,
  addItem,
  newTierlistBuild,
} = tierlistSlice.actions;

export default tierlistSlice.reducer;
