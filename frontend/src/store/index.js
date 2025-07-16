import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import healthReducer from "../features/health/healthSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    health: healthReducer,
  },
});
