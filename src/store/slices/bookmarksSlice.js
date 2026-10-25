import { createSlice } from '@reduxjs/toolkit';

// Load saved project IDs from localStorage so bookmarks persist across page refreshes
const loadSavedBookmarks = () => {
  try {
    const saved = localStorage.getItem('bt_saved_bookmarks');
    return saved ? JSON.parse(saved) : [];
  } catch (err) {
    console.error('Error loading bookmarks from localStorage:', err);
    return [];
  }
};

const initialState = {
  savedProjectIds: loadSavedBookmarks(),
};

export const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    // Toggle save / unsave a project
    toggleBookmark: (state, action) => {
      const projectId = action.payload;
      const index = state.savedProjectIds.indexOf(projectId);
      if (index >= 0) {
        state.savedProjectIds.splice(index, 1);
      } else {
        state.savedProjectIds.push(projectId);
      }
      try {
        localStorage.setItem('bt_saved_bookmarks', JSON.stringify(state.savedProjectIds));
      } catch (err) {
        console.error('Error saving bookmarks to localStorage:', err);
      }
    },
    // Clear all saved bookmarks
    clearAllBookmarks: (state) => {
      state.savedProjectIds = [];
      try {
        localStorage.removeItem('bt_saved_bookmarks');
      } catch (err) {
        console.error('Error removing bookmarks from localStorage:', err);
      }
    },
  },
});

export const { toggleBookmark, clearAllBookmarks } = bookmarksSlice.actions;

// Selectors for easy retrieval in components
export const selectSavedProjectIds = (state) => state.bookmarks.savedProjectIds;
export const selectIsBookmarked = (state, projectId) =>
  state.bookmarks.savedProjectIds.includes(projectId);
export const selectSavedBookmarksCount = (state) => state.bookmarks.savedProjectIds.length;

export default bookmarksSlice.reducer;
