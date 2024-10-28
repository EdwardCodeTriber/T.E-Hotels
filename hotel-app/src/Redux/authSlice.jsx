import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../Firebase/firebase";

// Async action to handle user register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password, name }, thunkAPI) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Get the user's UID
      const { uid } = userCredential.user;

      // 'Users' collection
      await addDoc(collection(db, "Users"), {
        email,
        uid,
        name,
        createdAt: new Date(),
      });

      return userCredential.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


// Async action to handle user login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async action to handle user logout
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await signOut(auth);
});

// Thunk to monitor Firebase auth state changes
export const fetchUser = createAsyncThunk("auth/fetchUser", async (_, { dispatch }) => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { email, uid } = user;
        
        try {
          const userDoc = await addDoc(collection(db, "Users", uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            dispatch(setUser({ email, uid, ...userData }));
            resolve({ email, uid, ...userData });
          } else {
            console.error("No Firestore data found");
            dispatch(setUser({ email, uid }));
            resolve({ email, uid });
          }
        } catch (error) {
          console.error("Failed to fetch Firestore data:", error);
          reject(error);
        }
      } else {
        dispatch(clearUser());
        resolve(null);
      }
    });
  });
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: null,
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    // logout: (state) => {
    //   state.user = null;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
