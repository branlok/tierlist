import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import db from "../../db";

const initialState = [];

export const fetchimages = createAsyncThunk("posts/getImages", async () => {
  const response = await db
    .table("images")
    .toArray()
    .then((item) => {
      return item.map((item) => {
        return URL.createObjectURL(item.picture);
      });
    });

  return response;
});


export const addImage = createAsyncThunk("posts/pushImages", 
async (image) => {
  const response = await db.images.put({
    picture: image.source,
    id: image.id,
    tierlistId: image.tierlistId,
    dateAdded: Date.now(),
    fileName: image.source.name,
  });

  return image.imageURL;
});

const imageSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchimages.fulfilled]: (state, action) => {
      return action.payload;
    },
    [addImage.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
  },
});

export default imageSlice.reducer;
