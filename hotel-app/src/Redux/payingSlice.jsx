import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFunctions, httpsCallable } from "firebase/functions"; 

// Async Thunk to initiate payment using Firebase Function
export const initiatePayment = createAsyncThunk(
  "paying/initiatePayment",
  async ({ bookingId, paymentMethodId, amount }, { rejectWithValue }) => {
    const functions = getFunctions();
    const createPaymentIntent = httpsCallable(functions, "createPaymentIntent");

    try {
      const response = await createPaymentIntent({ paymentMethodId, amount });
      const { success, error } = response.data;

      if (!success) throw new Error(error);

      // Update Firebase booking as paid
      await db.collection("bookings").doc(bookingId).update({
        status: "paid",
      });

      return { bookingId, status: "paid" };
    } catch (error) {
      return rejectWithValue(error.message);
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
      .addCase(initiatePayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(initiatePayment.fulfilled, (state, action) => {
        const { bookingId, status } = action.payload;
        const booking = state.bookings.find((b) => b.id === bookingId);
        if (booking) {
          booking.status = status;
        }
        state.loading = false;
      })
      .addCase(initiatePayment.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default payingSlice.reducer;
