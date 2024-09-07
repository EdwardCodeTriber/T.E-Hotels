import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase/firebase";

// Async thunk to fetch rooms from Firestore
export const fetchRooms = createAsyncThunk("rooms/fetchRooms", async () => {
  const roomCollection = collection(db, "rooms");
  const roomSnapshot = await getDocs(roomCollection);
  const rooms = roomSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return rooms;
});

const roomSlice = createSlice({
  name: "rooms",
  initialState: {
    rooms: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default roomSlice.reducer;
