import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import firebase from "../Firebase/firebase"; 
import { db } from "../Firebase/firebase"; 

// Async Thunk for fetching user bookings
export const fetchUserBookings = createAsyncThunk(
  "paying/fetchUserBookings",
  async (_, { getState }) => {
    const { auth } = getState();
    // Fetch from Firestore
    const bookings = []; 
    const querySnapshot = await db.collection('bookings').where('userId', '==', auth.user.uid).get();
    querySnapshot.forEach((doc) => {
      bookings.push({ id: doc.id, ...doc.data() });
    });
    return bookings;
  }
);

// Async Thunk to initiate payment
export const initiatePayment = createAsyncThunk(
  "paying/initiatePayment",
  async ({ bookingId, paymentMethodId, amount }, { getState }) => {
    const { auth } = getState();

    // Backend call to create payment intent and confirm payment
    const response = await fetch("/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentMethodId,
        amount: amount * 100, // Stripe uses cents
      }),
    });

    const { clientSecret } = await response.json();

    // Confirm the payment intent using Stripe on the frontend
    const stripe = useStripe();
    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret);

    if (error) {
      throw new Error("Payment failed");
    } else if (paymentIntent.status === "succeeded") {
      // Update Firestore with the payment status
      await db.collection("bookings").doc(bookingId).update({
        status: "paid",
      });
      return { bookingId, status: "paid" };
    }
  }
);

const payingSlice = createSlice({
  name: "paying",
  initialState: {
    bookings: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.bookings = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(initiatePayment.fulfilled, (state, action) => {
        const { bookingId, status } = action.payload;
        const booking = state.bookings.find((b) => b.id === bookingId);
        if (booking) {
          booking.status = status;
        }
      })
      .addCase(initiatePayment.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default payingSlice.reducer;
