import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadStripe } from "@stripe/stripe-js";
import { db } from "../Firebase/firebase"; 
import { doc, updateDoc } from "firebase/firestore";

// Initialize Stripe
const stripePromise = loadStripe("pk_test_51Px59aJPbpXk7YOzwZFEmqEENYeYAO4o0NQRX3CJbIee2TGOTUMQTw0KlswD4swqvkHSvJSsG9lc0DrRM5yMGBaU00o9vhiAem");

// Thunk for processing payment
export const processPayment = createAsyncThunk(
  "bookings/processPayment",
  async (booking, { getState, rejectWithValue }) => {
    const stripe = await stripePromise;
    const user = getState().auth.user;

    if (!user) {
      return rejectWithValue("User not logged in");
    }

    const { roomType, checkInDate, checkOutDate, price } = booking;

    const calculateTotalPrice = (checkInDate, checkOutDate, pricePerNight) => {
      const checkIn = dayjs(checkInDate);
      const checkOut = dayjs(checkOutDate);
      const daysStayed = checkOut.diff(checkIn, "day");
      return daysStayed * pricePerNight;
    };

    const totalPrice = calculateTotalPrice(checkInDate, checkOutDate, price) * 100;

    try {
      // Create Stripe Checkout session
      const { error } = await stripe.redirectToCheckout({
        lineItems: [
          {
            price_data: {
              currency: "R", 
              product_data: {
                name: roomType,
                description: `Booking from ${checkInDate} to ${checkOutDate}`,
              },
              unit_amount: totalPrice, 
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/cancel`,
      });

      if (error) {
        return rejectWithValue(error.message);
      }

      // Update booking status to "booked" in Firebase Firestore
      const bookingRef = doc(db, "bookings", booking.id);
      await updateDoc(bookingRef, {
        status: "booked",
        userId: user.uid,
      });

      return { bookingId: booking.id, status: "booked" };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bookedSlice = createSlice({
  name: "booked", 
  initialState: {
    bookings: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(processPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(processPayment.fulfilled, (state, action) => {
        state.loading = false;
        const bookingIndex = state.bookings.findIndex(
          (booking) => booking.id === action.payload.bookingId
        );
        if (bookingIndex !== -1) {
          state.bookings[bookingIndex].status = "booked";
        }
      })
      .addCase(processPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookedSlice.reducer; 
