import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "../features/TierlistView/imageSlice";
import loadedTierlist from "../features/TierlistView/TierlistSlice";

export default configureStore({
    reducer: {
        images: imageReducer,
        loadedTierlist: loadedTierlist
    }
})