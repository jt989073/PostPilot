import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login as apiLogin } from '../../api/auth';
import { saveAuth, loadAuth, clearAuth } from '../../utils/authStorage';


// ---------------------------------------------
// Thunk: loginUser(credentials)
// credentials: { email, password }
// ---------------------------------------------
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await apiLogin(email, password); // { token, user }
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Login failed');
    }
  }
);

const stored = loadAuth(); // {token, user} | null

const initialState = {
  user: stored?.user ?? null,
  token: stored?.token ?? null,
  status: 'idle',   // request state: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // manual set (e.g., hydrate from localStorage)
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.status = 'succeeded';
      state.error = null;
      saveAuth({ token: state.token, user: state.user });
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.status = 'idle';
      state.error = null;
      clearAuth();
    },
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
        state.user = action.payload.user;
        saveAuth({ token: state.token, user: state.user });
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectAuthToken  = state => state.auth.token;
export const selectAuthUser   = state => state.auth.user;
export const selectAuthStatus = state => state.auth.status;
export const selectAuthError  = state => state.auth.error;
