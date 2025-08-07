import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import reviewReducer from './features/review/reviewSlice';
import movieReducer from './features/movie/movieSlice';
import contactReducer from './features/contact/contactSlice';
import subscribeReducer from './features/subscribe/subscribeSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      review: reviewReducer,
      movie: movieReducer,
      contact: contactReducer,
      subscribe: subscribeReducer,
    },
  });
};

export const store = makeStore();
