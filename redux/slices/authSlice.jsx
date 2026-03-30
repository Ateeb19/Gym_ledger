import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  logoutUser,
  profileInfo,
  registerUser,
} from "../api/authApi";

//Register
export const register = createAsyncThunk(
  "auth/register",
  async (payload, thunkAPI) => {
    try {
      return await registerUser(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

//Login
export const login = createAsyncThunk(
  "auth/login",
  async (payload, thunkAPI) => {
    try {
      return await loginUser(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

//Logout
export const loggedout = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      return await logoutUser();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

//Logout
export const userProfile = createAsyncThunk(
  "auth/userProfile",
  async (_, thunkAPI) => {
    try {
      return await profileInfo();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.user;
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //For Register
      .addCase(register.pending, (state) => {
        state.loading = true;
      })

      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.user;
      })

      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //For logout
      .addCase(loggedout.pending, (state) => {
        state.loading = true;
      })

      .addCase(loggedout.fulfilled, (state) => {
        state.loading = false;
        state.data = null;
      })

      .addCase(loggedout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //For Profile Information
      .addCase(userProfile.pending, (state) => {
        state.loading = true;
      })

      .addCase(userProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.user;
      })

      .addCase(userProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default AuthSlice.reducer;
