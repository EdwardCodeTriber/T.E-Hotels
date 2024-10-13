import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase/firebase";

// Async thunk to fetch accommodations from Firestore
export const fetchAccommodations = createAsyncThunk("accommodations/fetchAccommodations", async () => {
  const accommodationCollection = collection(db, "accommodations");
  const accommodationSnapshot = await getDocs(accommodationCollection);
  const accommodations = accommodationSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
  // Filter accommodations according to their availability
  .filter((accommodation) => accommodation.available === true); 
  return accommodations;
});

const accommodationSlice = createSlice({
  name: "accommodations",
  initialState: {
    accommodations: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccommodations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAccommodations.fulfilled, (state, action) => {
        state.loading = false;
        state.accommodations = action.payload;
      })
      .addCase(fetchAccommodations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default accommodationSlice.reducer;
