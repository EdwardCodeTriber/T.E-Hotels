import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./authSlice";
import roomReducer from './roomSlice'
import bookingReducer from './bookingSlice'

export const store = configureStore({
  reducer: {
    auth: userReducer,
    rooms: roomReducer,
    bookings: bookingReducer,
  },
});

export default store;
