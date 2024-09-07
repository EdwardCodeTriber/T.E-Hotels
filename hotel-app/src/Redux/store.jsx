import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./authSlice";
import roomReducer from './roomSlice'

export const store = configureStore({
  reducer: {
    auth: userReducer,
    rooms: roomReducer,
  },
});

export default store;
