import { configureStore } from "@reduxjs/toolkit";
import roomReducer from "./roomSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    rooms: roomReducer,
  },
});
