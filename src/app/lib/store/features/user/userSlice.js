import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
// import { axiosRequest } from "../../../../services/ApiCall";
import { axiosRequest } from '@/src/app/service/ApiCall';

// Fetch User Profile
export const getUser = createAsyncThunk("user/fetch", async (_, { rejectWithValue }) => {
  try {
    const token = Cookies.get("hitnflop_token");
    const response = await axiosRequest.get("/user/get", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.user;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to fetch user profile");
  }
});

// Register User
export const registerUser = createAsyncThunk("user/register", async (formData, { rejectWithValue }) => {
  try {
    const response = await axiosRequest.post("/user/register", formData);
    const token = response.data.token;

    // Store token in cookies
    Cookies.set("hitnflop_token", token, { expires: 30 });
    return response.data.user;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Registration failed");
  }
});

// Login User
export const loginUser = createAsyncThunk("user/login", async (formData, { rejectWithValue }) => {
  try {
    const response = await axiosRequest.post("/user/login", formData);
    const token = response.data.token;

    // Store token in cookies
    Cookies.set("hitnflop_token", token, { expires: 30 });
    return response.data.user;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Login failed");
  }
});

// Edit User Profile
export const editUser = createAsyncThunk("user/edit", async (formData, { rejectWithValue }) => {
  try {
    const token = Cookies.get("hitnflop_token");
    const response = await axiosRequest.put(`/user/edit`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.user;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to update profile");
  }
});

// Forgot Password
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axiosRequest.post('/user/forgot-password', { email });
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to send reset link');
    }
  }
);

// Reset Password
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const response = await axiosRequest.post(`/user/reset-password/${token}`, { password });
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to reset password');
    }
  }
);


const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      Cookies.remove("skpf");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.message = '';
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.message = '';
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;





// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import Api from '@/src/app/service/api';

// // ----------------------------------------------
// // INITIAL STATE
// const initialState = {
//   isLoading: false,
//   error: null,
//   user: {},
//   isAuthenticated: false,
// };

// // ----------------------------------------------
// // ASYNC THUNKS

// export const getUserProfile = createAsyncThunk('user/getProfile', async (_, thunkAPI) => {
//   try {
//     const response = await Api.profile();
//     return response;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(handleError(error));
//   }
// });

// export const loginUser = createAsyncThunk('user/login', async (credentials, thunkAPI) => {
//   try {
//     const response = await Api.login(credentials);
//     if (response?.token) {
//       Cookies.set('hitnflop_token', response.token);
//     }
//     return response;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(handleError(error));
//   }
// });

// export const signupUser = createAsyncThunk('user/signup', async (data, thunkAPI) => {
//   try {
//     const response = await Api.signup(data);
//     if (response?.token) {
//       Cookies.set('hitnflop_token', response.token);
//     }
//     return response;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(handleError(error));
//   }
// });

// export const resetPassword = createAsyncThunk('user/resetPassword', async (emailOrPhone, thunkAPI) => {
//   try {
//     const response = await Api.resetPassword(emailOrPhone);
//     return { ...response, resetInitiated: true };
//   } catch (error) {
//     return thunkAPI.rejectWithValue(handleError(error));
//   }
// });

// export const updatePassword = createAsyncThunk('user/updatePassword', async (passwordData, thunkAPI) => {
//   try {
//     const response = await Api.updatePassword(passwordData);
//     return response;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(handleError(error));
//   }
// });

// // ----------------------------------------------
// // SLICE

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     clearUser(state) {
//       state.user = {};
//       state.isAuthenticated = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // All pending
//       .addMatcher(
//         (action) => action.type.startsWith('user/') && action.type.endsWith('/pending'),
//         (state) => {
//           state.isLoading = true;
//           state.error = null;
//         }
//       )
//       // All fulfilled
//       .addMatcher(
//         (action) => action.type.startsWith('user/') && action.type.endsWith('/fulfilled'),
//         (state, action) => {
//           state.isLoading = false;
//           state.user = action.payload;
//           state.isAuthenticated = true;
//           state.error = null;
//         }
//       )
//       // All rejected
//       .addMatcher(
//         (action) => action.type.startsWith('user/') && action.type.endsWith('/rejected'),
//         (state, action) => {
//           state.isLoading = false;
//           state.error = action.payload;
//         }
//       );
//   },
// });

// export const { clearUser } = userSlice.actions;
// export default userSlice.reducer;

// // ----------------------------------------------
// // HELPER FUNCTION

// const handleError = (error) => {
//   let message = 'Something went wrong. Please try again.';
//   if (error?.message === 'timeout') {
//     message = 'The request timed out. Please try again.';
//   } else if (error?.message?.includes('net::ERR_NAME_NOT_RESOLVED')) {
//     message = 'Network error. Please check your internet connection.';
//   } else if (error?.message?.includes('net::ERR_NETWORK_CHANGED')) {
//     message = 'Network changed. Please check your connection.';
//   } else if (error?.response?.data?.message) {
//     message = error.response.data.message;
//   } else if (error?.message) {
//     message = error.message;
//   }
//   return message;
// };
