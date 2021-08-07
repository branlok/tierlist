import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import baseTierlistMaker from "../../app/baseTierlistMaker";
import db from "../../db";
import Row from "./Tierlist/Row";

export const loadTierlist = createAsyncThunk(
  "loadedTierlist/load",
  async (tierlistId) => {
    if (!tierlistId) {
      //if provided no tierlistId, return basic tierlist
      return { updateTo: baseTierlistMaker(tierlistId) };
    }

    let tierlistData = {};
    let imageObjects = {};

    //check if record exists
    await db.tierlists
      .where("id")
      .equals(tierlistId)
      .each((item) => {
        //this only returns one item
        tierlistData = item.tierlist;
      });

    //use default the tierlist does not exist with the the same Id
    if (Object.keys(tierlistData).length === 0) {
      let newProject = baseTierlistMaker(tierlistId);
      await db.tierlists.put({
        id: tierlistId,
        tierlist: newProject,
        status: "initialized",
        date: Date.now(),
        lastEdited: Date.now(),
        title: newProject.tierlist.title.toLowerCase(),
        name: newProject.tierlist.title,
      });
      return { updateTo: newProject };
    }

    let keys = Object.keys(tierlistData.items);

    await db.images
      .where("id")
      .anyOf(keys)
      .each((item) => {
        let index = keys.indexOf(item.id);
        keys.splice(index, 1);
        imageObjects[item.id] = URL.createObjectURL(item.picture);
      });

    //if not cannot retreive from image, modify tierlist, delete item.
    if (keys.length > 0) {
      for (let item of keys) {
        let rowIndexSplice =
          tierlistData.rows[tierlistData.items[item].resides].itemOrder.indexOf(
            item
          );
        tierlistData.rows[tierlistData.items[item].resides].itemOrder.splice(
          rowIndexSplice,
          1
        );
        delete tierlistData.items[item];
        console.log(`deleted: ${item}`);
      }

      //should also update tierlist right away.
    }

    //delete last session items.
    //because there may be extra unwanted items.
    //we treat last save as the only turth (with image index);
    await db.items
      .where("tierlistId")
      .equals(tierlistId)
      .delete()
      .then((deletecount) => console.log(deletecount));

    //generate new session items.
    let items = tierlistData.items;

    let itemEntries = [];
    let itemKeys = [];

    for (let [key, value] of Object.entries(items)) {
      itemKeys.push(`${tierlistId}/${key}`);
      itemEntries.push(value);
    }

    await db.items.bulkAdd(itemEntries, itemKeys).then((response) => {
      console.log("successfully instances");
    });

    let response = { updateTo: tierlistData, imagePayload: imageObjects };
    return response;
  }
);

export const saveTierlist = createAsyncThunk(
  "loadedTierlist/saveAll",
  async (tierlistStructure, thunkAPI) => {
    let tierlistId = thunkAPI.getState().loadedTierlist.tierlist.id;

    const response = await db.tierlists.update(tierlistId, {
      // id: tierlistId,
      tierlist: thunkAPI.getState().loadedTierlist,
      status: "saved",
      // date: Date.now(),
      lastEdited: Date.now(),
      title: thunkAPI.getState().loadedTierlist.tierlist.title.toLowerCase(),
      name: thunkAPI.getState().loadedTierlist.tierlist.title,
      numberOfItems: Object.keys(thunkAPI.getState().loadedTierlist.items)
        .length,
      //TODO: add cover image
    });

    let keys = [];
    let values = [];
    for (let [key, value] of Object.entries(
      thunkAPI.getState().loadedTierlist.items
    )) {
      keys.push(`${tierlistId}/${key}`);
      values.push(value);
    }
    const response2 = await db.items
      .bulkPut(values, keys)
      .then(function (lastKey) {
        console.log("updated Store");
      });

    return;
  }
);

export const updateTierlistStatus = createAsyncThunk(
  "loadedTierlist/statusUpdate",
  async (update, thunkAPI) => {
    let tierlistId = thunkAPI.getState().loadedTierlist.tierlist.id;
    const response = await db.tierlists.update(tierlistId, {
      tierlist: thunkAPI.getState().loadedTierlist,
      lastEdited: Date.now(),
    });
  }
);

export const updateItemsDB = createAsyncThunk(
  "loadedTierlist/updateItems",
  async (payload, thunkAPI) => {
    let tierlistId = thunkAPI.getState().loadedTierlist.tierlist.id;
    let keys = [];
    let values = [];

    //take all current items from redux;
    for (let [key, value] of Object.entries(
      thunkAPI.getState().loadedTierlist.items
    )) {
      keys.push(`${tierlistId}/${key}`);
      values.push(value);
    }

    const response2 = await db.items
      .bulkPut(values, keys)
      .then(function (lastKey) {
        console.log("updated Store");
      });
    //previously used with items: "++id, name, resides, tierlistId, [tierlistId+resides], [tierlistId+name]"});
    // const response2 = await db.items.bulkPut(x).then(function (lastKey) {
    //   console.log("updated Store");
    // });
  }
);

/**
 * delete item table from database, if last item, it deletes item in image table as well.
 *  @param {string}  payload - A one string param of tierlistId.
 */
export const deleteItemFromDB = createAsyncThunk(
  "loadedTierlist/deleteItemFromDB",
  async (payload, thunkAPI) => {
    //delete instance from tierlist
    let tierlistId = thunkAPI.getState().loadedTierlist.tierlist.id;

    const deleteFromInstanceDB = await db.items
      .where(["id", "tierlistId"])
      .equals([payload, tierlistId])
      .delete()
      .then((deletecount) => console.log(deletecount, "rew"));

    //check if it is last copy. if so delete the source file.
    let isTableEmpty = await db.items
      .where("id")
      .equals(payload)
      .toArray((items) => {
        console.log(items, "Ews");
        return items.length;
      });

    console.log(isTableEmpty, "is it ?");

    // if (isTableEmpty === 0) {
    //   let deleted = await db.images
    //     .where("id")
    //     .equals(payload)
    //     .delete()
    //     .then((deletecount) => console.log(deletecount, "deleted"));
    // }

    return payload;
  }
);

/* Rearrange Item between rows other than the same row  */
export const updateOrderInRow = createAsyncThunk(
  "loadedTierlist/updateOrderInRow",
  async (payload) => {
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
    let tierlistId = thunkAPI.getState().loadedTierlist.tierlist.id;
    let itemId = tierlistId + "/" + payload.itemId;
    console.log(itemId, { [payload.field]: payload.content });
    await db.items
      .update(itemId, { [payload.field]: payload.content })
      .catch((e) => console.log(e));

    //auto-save by field
    let pathToUpdate = "tierlist.items." + payload.itemId + "." + payload.field;

    await db.tierlists
      .update(tierlistId, { [pathToUpdate]: payload.content })
      .then((res) => console.log(res));
    //   .update(tierlistId, )
    console.log(payload);
    return payload;
  }
);

/**
 * recieves item details and return;
 * used for cloning instances of file items.
 */

export const syncNewItems = createAsyncThunk(
  "loadedTierlist/syncNewItems",
  async (payload, thunkAPI) => {
    let item = payload;
    item.resides = "storage";
    item.tierlistId = thunkAPI.getState().loadedTierlist.tierlist.id;

    //format Id, this ensures, user cannot
    let concatId =
      thunkAPI.getState().loadedTierlist.tierlist.id + "/" + item.id;

    //add a new item to itemIndex
    await db.items.put(item, concatId);
    return item;
  }
);

export const deleteSingleImageItem = createAsyncThunk(
  "loadedTierlist/deleteSingleImageItem",
  async (payload, thunkAPI) => {
    //delete the images
    //delete source

    let deleted = await db.images
      .where("id")
      .equals(payload)
      .delete()
      .then((deletecount) => console.log(deletecount, "deleted"));

    //!use dedicated delete for notification index.
    //! that would prompt update tierlist redux to remove those items.
    // let flagItemIndex = await db.items
    //   .where("id")
    //   .equals(payload)
    //   .modify({ deleted: true });

    await db.items
      .where("id")
      .equals(payload)
      .delete()
      .then((deletecount) => console.log(deletecount, "deleted"));
  }
);

export const deleteTierlist = createAsyncThunk(
  "loadedTierlist/deleteTierlist",
  async (payload, thunkAPI) => {
    //settings
    let { tierlistId, option } = payload;
    console.log(payload, "humm");
    //run delete tierlist,
    let x = await db.tierlists
      .where("id")
      .equals(tierlistId)
      .delete()
      .then((res) => console.log(res, "deleted tierlists"));
    //run delete all item instances,
    let y = await db.items
      .where("tierlistId")
      .equals(tierlistId)
      .delete()
      .then((res) => console.log(res, "deleted itemindex"));
    //run delete
    if (option.deleteImageIndex) {
      await db.images
        .where("tierlistId")
        .equals(tierlistId)
        .delete()
        .then((deletecount) => console.log(deletecount, "deleted images"));
    }

    if (option.reset) {
      let newTierlist = baseTierlistMaker(tierlistId);
      await db.tierlists.put({
        id: tierlistId,
        tierlist: newTierlist,
        status: "initialized",
        date: Date.now(),
        lastEdited: Date.now(),
        title: newTierlist.tierlist.title.toLowerCase(),
        name: newTierlist.tierlist.title,
      });

      return { newTierlist: newTierlist, reset: true };
    } else {
      return { reset: false };
    }
  }
);

export const deleteOutDatedTierlists = createAsyncThunk(
  "loadedTierlist/deleteOutDatedTierlists",
  async (payload, thunkAPI) => {
    //initailized/drafts that are 1 week old will be deleted automatically - ms 604800000
    await db.tierlists
      .where("date")
      .below(Date.now() - 604800000)
      .modify((value, ref) => {
        console.log(value, "the value");
        if (value.status === "initialized" || value.status === "draft") {
          delete ref.value;
        }
      })
      .then(() => {
        console.log("deleted");
      });
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
      if (itemIndex !== -1) {
        state.rows[resides].itemOrder.splice(itemIndex, 1);
      }
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
    editTierlistInfo: (state, action) => {
      let field = action.payload.field;
      console.log(action.payload.newValues);
      if (action.payload.multiple) {
        console.log(action.payload.newValues);
        for (let [key, value] of Object.entries(action.payload.newValues)) {
          state.tierlist[key] = value;
        }
        state.tierlist.lastModified = Date.now();
      } else {
        state.tierlist[field] = action.payload.newValue;
      }
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
    [syncNewItems.fulfilled]: (state, action) => {
      state.items[action.payload.id] = {
        id: action.payload.id,
        name: "",
        description: "",
        imageURL: action.payload.imageURL,
        decoration: null,
        resides: "storage",
        tierlistId: state.tierlist.id,
        source: action.payload.tierlistId,
      };
      state.rows.storage.itemOrder.push(action.payload.id);
    },
    [updateItemDetails.fulfilled]: (state, action) => {
      console.log(
        action.payload.itemId,
        action.payload.field,
        action.payload.content
      );
      state.items[action.payload.itemId][action.payload.field] =
        action.payload.content;
    },
    [deleteItemFromDB.fulfilled]: (state, action) => {
      //remove specificied item from items and row itemOrder
      if (action.payload) {
        console.log(action.payload, "what", state.items[action.payload]);
        let resides = state.items[action.payload]?.resides;
        if (resides) {
          delete state.items[action.payload];
          let itemIndex = state.rows[resides].itemOrder.indexOf(action.payload);
          if (itemIndex !== -1) {
            state.rows[resides].itemOrder.splice(itemIndex, 1);
          }
        }
      }
    },
    [deleteTierlist.fulfilled]: (state, action) => {
      console.log(action.payload);
      if (action.payload.reset) {
        // let action.payload.newTierlist = baseTierlistMaker(state.tierlist.id);
        state.items = action.payload.newTierlist.items;
        state.rows = action.payload.newTierlist.rows;
        state.rowOrder = action.payload.newTierlist.rowOrder;
        state.tierlist = action.payload.newTierlist.tierlist;
        state.status = "initialized";
      }
    },
    [deleteTierlist.rejected]: (state, action) => {
      console.log(action.payload);
    },
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
  editTierlistInfo,
} = tierlistSlice.actions;

export default tierlistSlice.reducer;
