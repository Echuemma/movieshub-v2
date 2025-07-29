import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; 
import favoritesReducer from './favoritesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    favorites: favoritesReducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types if you're storing non-serializable values
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;