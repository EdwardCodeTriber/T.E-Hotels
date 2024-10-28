import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/firebase";

// Async action to update user profile
export const updateUserProfile = createAsyncThunk(
  "profile/updateUserProfile",
  async ({ uid, name, avatar }, { rejectWithValue }) => {
    try {
      const userRef = doc(db, "Users", uid);
      await updateDoc(userRef, { name, avatar });
      return { name, avatar };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    name: "",
    avatar: "",
    loading: false,
    error: null,
  },
  reducers: {
    setUserProfile: (state, action) => {
      state.name = action.payload.name;
      state.avatar = action.payload.avatar;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.name = action.payload.name;
        state.avatar = action.payload.avatar;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUserProfile } = profileSlice.actions;
export default profileSlice.reducer;
