import { configureStore } from "@reduxjs/toolkit";
import mangaReducer from "./slices/mangaSlice";
import storyReducer from "./slices/storySlice";

export const store = configureStore({
  reducer: {
    manga: mangaReducer,
    story:storyReducer,
  },
});