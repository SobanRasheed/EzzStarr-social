import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const fetchXP = createAsyncThunk(
  "xp/fetchXP",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/xp/me`, {
        headers: getHeaders(),
      });
      const data = await res.json();
      if (!res.ok) return thunkAPI.rejectWithValue(data.error || "Failed to fetch XP");
      return data; // returns { xpProfile, currentLevelConfig, nextLevelConfig }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const xpSlice = createSlice({
  name: "xp",
  initialState: {
    xpProfile: null,
    currentLevelConfig: null,
    nextLevelConfig: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchXP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchXP.fulfilled, (state, action) => {
        state.loading = false;
        state.xpProfile = action.payload.xpProfile;
        state.currentLevelConfig = action.payload.currentLevelConfig;
        state.nextLevelConfig = action.payload.nextLevelConfig;
      })
      .addCase(fetchXP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default xpSlice.reducer;
