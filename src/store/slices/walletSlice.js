import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const fetchWallet = createAsyncThunk(
  "wallet/fetchWallet",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/wallet/me`, {
        headers: getHeaders(),
      });
      const data = await res.json();
      if (!res.ok) return thunkAPI.rejectWithValue(data.error || "Failed to fetch wallet");
      return data.wallet;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchTransactions = createAsyncThunk(
  "wallet/fetchTransactions",
  async ({ page = 1, limit = 20, type = "" } = {}, thunkAPI) => {
    try {
      let url = `${import.meta.env.VITE_API_URL}/api/wallet/transactions?page=${page}&limit=${limit}`;
      if (type) url += `&type=${type}`;
      const res = await fetch(url, { headers: getHeaders() });
      const data = await res.json();
      if (!res.ok) return thunkAPI.rejectWithValue(data.error || "Failed to fetch transactions");
      return data.transactions;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    wallet: null,
    transactions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWallet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWallet.fulfilled, (state, action) => {
        state.loading = false;
        state.wallet = action.payload;
      })
      .addCase(fetchWallet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default walletSlice.reducer;
