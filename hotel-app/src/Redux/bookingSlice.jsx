import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../Firebase/firebase"; 
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

// Thunk to save booking to Firebase
export const saveBooking = createAsyncThunk(
  "bookings/saveBooking",
  async (bookingData, { getState }) => {
    // Get logged-in user from state
    const { auth } = getState(); 
    const user = auth.user;

    if (!user) throw new Error("User not authenticated");

    const docRef = await addDoc(collection(db, "bookings"), {
      ...bookingData,
      userId: user.uid,
      email: user.email,
      timestamp: new Date(),
    });

    return { id: docRef.id, ...bookingData };
  }
);

// Thunk to fetch bookings for the logged-in user
export const fetchUserBookings = createAsyncThunk(
  "bookings/fetchUserBookings",
  async (_, { getState }) => {
    const { auth } = getState();
    const user = auth.user;

    const q = query(collection(db, "bookings"), where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);

    const bookings = [];
    querySnapshot.forEach((doc) => {
      bookings.push({ id: doc.id, ...doc.data() });
    });

    return bookings;
  }
);

const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    bookings: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveBooking.fulfilled, (state, action) => {
        state.bookings.push(action.payload);
        state.loading = false;
      })
      .addCase(saveBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.bookings = action.payload;
      });
  },
});

export default bookingSlice.reducer;
