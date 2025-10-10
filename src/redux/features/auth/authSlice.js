import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signUp, login, verifyOtp, sendOtp ,checkMobileNumber } from './authApi';

export const signupThunk = createAsyncThunk('auth/signup', async (data) => {
  const response = await signUp(data);
  return response.data;
});

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await login(data); // calls FormData-based login
      return response.data;
    } catch (error) {
      // Gracefully handle API errors
      return rejectWithValue(
        error.response?.data || { message: "Login failed. Please try again." }
      );
    }
  }
);

export const verifyOtpThunk = createAsyncThunk(
  "auth/verifyOtp",
  async (data, { rejectWithValue }) => {
    try {
      const response = await verifyOtp(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to verify OTP" });
    }
  }
);



export const sendOtpThunk = createAsyncThunk(
  'auth/sendOtp',
  async (data, { rejectWithValue }) => {
    try {
      const response = await sendOtp(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to send OTP' });
    }
  }
);


export const checkMobileThunk = createAsyncThunk(
  'auth/checkMobile',
  async (mobileNo, { rejectWithValue }) => {
    try {
      const response = await checkMobileNumber(mobileNo);
      console.log("mobile",response.data)
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {
  logout: (state) => {
      state.user = null;
      localStorage.removeItem("token");
    },
    setUser: (state, action) => {
      state.user = action.payload;  // <-- user को set करने वाला reducer
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    // Repeat similar blocks for other thunks (signup, sendOtp, verifyOtp)
     // ✅ checkMobile thunk handling

    builder
    .addCase(checkMobileThunk.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(checkMobileThunk.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.checkMobileResponse = action.payload;
    })
    .addCase(checkMobileThunk.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export const { logout,setUser  } = authSlice.actions;
export default authSlice.reducer;
