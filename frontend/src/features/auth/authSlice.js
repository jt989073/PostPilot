// frontend/src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk: POST /api/auth/login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        '/api/auth/login',
        credentials
      );
      // Expect { token, user } or at least { token } in response.data
      return response.data;
    } catch (err) {
      const message = err.response?.data?.error || err.message;
      return rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,       // JWT on success
    user: null,        // optional user object
    status: 'idle',    // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null        // error message
  },
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        // if your API returns a user object:
        state.user = action.payload.user || null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectAuthToken  = state => state.auth.token;
export const selectAuthUser   = state => state.auth.user;
export const selectAuthStatus = state => state.auth.status;
export const selectAuthError  = state => state.auth.error;
