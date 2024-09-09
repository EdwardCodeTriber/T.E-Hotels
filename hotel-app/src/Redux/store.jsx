import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./authSlice";
import roomReducer from './roomSlice'
import bookingReducer from './bookingSlice'
import bookedReducer from './bookedSlice'

export const store = configureStore({
  reducer: {
    auth: userReducer,
    rooms: roomReducer,
    bookings: bookingReducer,
    booked: bookedReducer,
  },
});

export default store;
