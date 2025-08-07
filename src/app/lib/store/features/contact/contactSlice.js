import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from '@/src/app/service/ApiCall';

// Submit Contact Form
export const createContact = createAsyncThunk(
  "contact/submit",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosRequest.post("/contact/add", formData);
      return response.data || {};
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Initial State
const initialState = {
  contact: null,       
  loading: false,
  error: null,
  message: null,
};

// Contact Slice
const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    clearContactMessage: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createContact.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contact = action.payload;
        state.message = "Your message has been submitted successfully.";
      })
      .addCase(createContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearContactMessage } = contactSlice.actions;
export default contactSlice.reducer;
