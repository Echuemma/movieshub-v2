import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: []
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const item = action.payload;
      const exists = state.items.some(existingItem => existingItem.id === item.id);
      if (!exists) {
        state.items.push(item);
      }
    },
    removeFromFavorites: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
    },
    clearFavorites: (state) => {
      state.items = [];
    }
  }
});

export const { 
  addToFavorites, 
  removeFromFavorites, 
  clearFavorites 
} = favoritesSlice.actions;

export default favoritesSlice.reducer;