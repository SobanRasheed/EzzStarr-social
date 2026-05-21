import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGists = createAsyncThunk(
  "gist/fetchGists",
  async (filter, thunkAPI) => {
    const url = filter ? `${import.meta.env.VITE_API_URL}/api/gist?filter=${filter}` : `${import.meta.env.VITE_API_URL}/api/gist`;
    const res = await fetch(url);
    const data = await res.json();
    return data.data;
  }
);

export const fetchCreators = createAsyncThunk(
  "gist/fetchCreators",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    if (state.gist.creatorsLoaded) {
      return state.gist.creators;
    }
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/gist/creators`);
    const data = await res.json();
    return data.data;
  }
);

export const toggleJoinGist = createAsyncThunk(
  "gist/toggleJoinGist",
  async (id, thunkAPI) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/gist/${id}/join`, { method: "POST" });
    const data = await res.json();
    return data.data;
  }
);

export const starGist = createAsyncThunk(
  "gist/starGist",
  async (id, thunkAPI) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/gist/${id}/star`, { method: "POST" });
    const data = await res.json();
    return data.data;
  }
);

export const subscribeCreator = createAsyncThunk(
  "gist/subscribeCreator",
  async (id, thunkAPI) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/gist/creators/${id}/subscribe`, { method: "POST" });
    const data = await res.json();
    return data.data;
  }
);

const gistSlice = createSlice({
  name: "gist",
  initialState: {
    gists: [],
    creators: [],
    isLoading: false,
    error: null,
    isLoaded: false,
    creatorsLoaded: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchGists
      .addCase(fetchGists.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.gists = action.payload;
        state.isLoaded = true;
      })
      .addCase(fetchGists.rejected, (state) => {
        state.isLoading = false;
        state.error = "Failed to fetch gists";
      })
      // fetchCreators
      .addCase(fetchCreators.fulfilled, (state, action) => {
        state.creators = action.payload;
        state.creatorsLoaded = true;
      })
      // toggleJoinGist
      .addCase(toggleJoinGist.fulfilled, (state, action) => {
        const updatedGist = action.payload;
        const index = state.gists.findIndex(g => g.id === updatedGist.id);
        if (index !== -1) {
          state.gists[index] = updatedGist;
        }
      })
      // starGist
      .addCase(starGist.fulfilled, (state, action) => {
        const updatedGist = action.payload;
        const index = state.gists.findIndex(g => g.id === updatedGist.id);
        if (index !== -1) {
          state.gists[index] = updatedGist;
        }
      })
      // subscribeCreator
      .addCase(subscribeCreator.fulfilled, (state, action) => {
        const updatedCreator = action.payload;
        const index = state.creators.findIndex(c => c.id === updatedCreator.id);
        if (index !== -1) {
          state.creators[index] = updatedCreator;
        }
      });
  },
});

export default gistSlice.reducer;
