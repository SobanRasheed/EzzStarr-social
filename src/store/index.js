import { configureStore } from "@reduxjs/toolkit";
import mangaReducer from "./slices/mangaSlice";
import storyReducer from "./slices/storySlice";
import gistReducer from "./slices/gistSlice";

export const store = configureStore({
  reducer: {
    manga: mangaReducer,
    story: storyReducer,
    gist: gistReducer,
  },
});