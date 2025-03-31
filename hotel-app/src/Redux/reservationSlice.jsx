// src/Redux/reservationSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../Firebase/firebase';
import firebase from 'firebase/app';

// Async thunk to create a reservation in Firestore
export const createReservation = createAsyncThunk(
  'reservations/createReservation',
  async (reservationData, { rejectWithValue }) => {
    try {
      const { uid } = getState().auth.user;
      const reservationRef = db.collection('reservations').doc();
      await reservationRef.set({
        ...reservationData,
        userId: uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      
      // Return the newly created reservation data with its ID
      return { id: reservationRef.id, ...reservationData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const reservationSlice = createSlice({
  name: 'reservations',
  initialState: {
    reservations: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createReservation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations.push(action.payload);
      })
      .addCase(createReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reservationSlice.reducer;
