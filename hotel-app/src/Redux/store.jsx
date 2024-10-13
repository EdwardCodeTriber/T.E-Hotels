import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./authSlice";
import accommodationReducer from './accommodationSlice';
import bookingReducer from './bookingSlice'
import payingReducer from './payingSlice';

export const store = configureStore({
  reducer: {
    auth: userReducer,
    accommodations: accommodationReducer,
    bookings: bookingReducer,
    paying: payingReducer,
  },
});

export default store;
