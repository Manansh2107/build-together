import { configureStore } from '@reduxjs/toolkit';
import bookmarksReducer from './slices/bookmarksSlice';

export const store = configureStore({
  reducer: {
    bookmarks: bookmarksReducer,
  },
});

export default store;
