import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { axiosRequest } from '@/src/app/service/ApiCall';

// Add a movie
export const addMovie = createAsyncThunk(
  "movie/add",
  async (formData, { rejectWithValue }) => {
    try {
      const token = Cookies.get("hitnflop_token");
      const response = await axiosRequest.post("/movie/add", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.movie || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Get all movies
export const getMovies = createAsyncThunk(
  "movie/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("hitnflop_token");
      const response = await axiosRequest.get("/movie/get/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.movies || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// 🔹 Initial state
const initialState = {
  movies: [],
  loading: false,
  error: null,
  message: null,
};

// 🔹 Slice
const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    clearMovieMessage: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add Movie
      .addCase(addMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.message = "Movie added successfully";
        state.movies.push(action.payload);
      })
      .addCase(addMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All Movies
      .addCase(getMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMovieMessage } = movieSlice.actions;
export default movieSlice.reducer;
