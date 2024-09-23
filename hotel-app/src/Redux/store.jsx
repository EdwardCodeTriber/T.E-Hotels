import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./authSlice";
import roomReducer from './roomSlice'
import bookingReducer from './bookingSlice'
import payingReducer from './payingSlice';

export const store = configureStore({
  reducer: {
    auth: userReducer,
    rooms: roomReducer,
    bookings: bookingReducer,
    paying: payingReducer,
  },
});

export default store;
