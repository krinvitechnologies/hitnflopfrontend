import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { axiosRequest } from '@/src/app/service/ApiCall';

// add a review
export const addReview = createAsyncThunk(
  "review/add",
  async (formData, { rejectWithValue }) => {
    try {
      const token = Cookies.get("hitnflop_token");
      const response = await axiosRequest.post("/review/add", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.review || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Get all reviews
export const getReviews = createAsyncThunk(
  "review/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("hitnflop_token");
      const response = await axiosRequest.get("/review/get/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.reviews;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);


// Initial state for reviews
const initialState = {
  reviews: [],
  loading: false,
  error: null,
  message: null,
};

// Slice
const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    clearReviewMessage: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addReview.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;
        state.message = "Review added successfully";
        state.reviews.push(action.payload); //  Update the reviews array 
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Reviews
      .addCase(getReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearReviewMessage } = reviewSlice.actions;
export default reviewSlice.reducer;





// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import Cookies from "js-cookie";
// // import { axiosRequest } from "../../../../services/ApiCall";
// import { axiosRequest } from '@/src/app/service/ApiCall';

// // Add review
// export const addReview = createAsyncThunk("/review/add", async (formData, { rejectWithValue }) => {
//     try {
//         const token = Cookies.get("hitnflop_token");
//         const response = await axiosRequest.put(`/review/add`, formData, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//         return response.data.user;
//     } catch (error) {
//         return rejectWithValue(error.response?.data || "Something Went Wrong");
//     }
// });

// const userSlice = createSlice({
//     name: "user",
//     initialState: {
//         user: null,
//         loading: false,
//         error: null,
//         isAuthenticated: false,
//     },
//     reducers: {
//         logoutUser: (state) => {
//             state.user = null;
//             state.isAuthenticated = false;
//             Cookies.remove("skpf");
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(getUser.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(getUser.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.user = action.payload;
//                 state.isAuthenticated = true;
//             })
//             .addCase(getUser.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })
//             .addCase(registerUser.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(registerUser.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.user = action.payload;
//                 state.isAuthenticated = true;
//             })
//             .addCase(registerUser.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })
//             .addCase(loginUser.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(loginUser.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.user = action.payload;
//                 state.isAuthenticated = true;
//             })
//             .addCase(loginUser.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })
//             .addCase(editUser.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(editUser.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.user = action.payload;
//             })
//             .addCase(editUser.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })
//             .addCase(forgotPassword.pending, (state) => {
//                 state.loading = true;
//                 state.message = '';
//                 state.error = null;
//             })
//             .addCase(forgotPassword.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.message = action.payload;
//             })
//             .addCase(forgotPassword.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })
//             .addCase(resetPassword.pending, (state) => {
//                 state.loading = true;
//                 state.message = '';
//                 state.error = null;
//             })
//             .addCase(resetPassword.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.message = action.payload;
//             })
//             .addCase(resetPassword.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             });
//     },
// });

// export const { logoutUser } = userSlice.actions;
// export default userSlice.reducer;