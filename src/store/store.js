import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
// ... other reducers

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // ... other reducers
  },
});