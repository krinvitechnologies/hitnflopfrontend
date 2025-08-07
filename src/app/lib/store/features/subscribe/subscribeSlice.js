import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from '@/src/app/service/ApiCall';

// Submit Subscription
export const createSubscribe = createAsyncThunk(
  "subscribe/create",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosRequest.post("/subscribe/add", formData);
      return response.data || {};
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Initial State
const initialState = {
  subscribe: null,
  loading: false,
  error: null,
  message: null,
};

// Subscription Slice
const subscribeSlice = createSlice({
  name: "subscribe",
  initialState,
  reducers: {
    clearSubscribeMessage: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSubscribe.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(createSubscribe.fulfilled, (state, action) => {
        state.loading = false;
        state.subscription = action.payload;
        state.message = "Subscribed successfully.";
      })
      .addCase(createSubscribe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSubscribeMessage } = subscribeSlice.actions;
export default subscribeSlice.reducer;
