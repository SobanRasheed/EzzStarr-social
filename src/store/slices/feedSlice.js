import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const fetchFeed = createAsyncThunk(
  "feed/fetchFeed",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/feed/home`, {
        headers: getHeaders(),
      });
      const data = await res.json();
      if (!res.ok) return thunkAPI.rejectWithValue(data.error || "Failed to fetch feed");
      return data; // returns { wallet, xp, trendingGists, trendingTopics, activeEvents, boostedContent, recentNotifications }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    feed: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.feed = action.payload;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default feedSlice.reducer;
