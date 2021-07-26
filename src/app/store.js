import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "../features/imageHandler/imageSlice";
import loadedTierlist from "../features/TierlistView/TierlistSlice";

export default configureStore({
    reducer: {
        images: imageReducer,
        loadedTierlist: loadedTierlist
    }
})