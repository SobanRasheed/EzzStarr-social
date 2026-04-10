import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchStory = createAsyncThunk(
  "story/fetchStory",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();

    if (state.story.isLoaded) {
      return state.story.stories;
    }

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/stories`);
    const data = await res.json();
    return data;
  }
);

const storySlice = createSlice({
  name: "story",
  initialState: {
    stories: [],
    isLoading: false,
    error: null,
    isLoaded: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stories = action.payload;
        state.isLoaded = true;
      })
      .addCase(fetchStory.rejected, (state) => {
        state.isLoading = false;
        state.error = "Failed to fetch story";
      });
  },
});

export default storySlice.reducer;
