import { configureStore } from "@reduxjs/toolkit";
import mangaReducer from "./slices/mangaSlice";
import storyReducer from "./slices/storySlice";
import walletReducer from "./slices/walletSlice";
import xpReducer from "./slices/xpSlice";
import notificationReducer from "./slices/notificationSlice";
import gistReducer from "./slices/gistSlice";
import feedReducer from "./slices/feedSlice";

export const store = configureStore({
  reducer: {
    manga: mangaReducer,
    story: storyReducer,
    wallet: walletReducer,
    xp: xpReducer,
    notifications: notificationReducer,
    gist: gistReducer,
    feed: feedReducer,
  },
});