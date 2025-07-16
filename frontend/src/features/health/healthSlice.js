import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getHealth } from '../../api/health';

// Async thunk action to fetch health
export const fetchHealth = createAsyncThunk(
  'health/fetchHealth',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getHealth();
      return data; // { status, service }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const healthSlice = createSlice({
  name: 'health',
  initialState: {
    loading: false,
    status: null,
    service: null,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchHealth.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHealth.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status;
        state.service = action.payload.service;
      })
      .addCase(fetchHealth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default healthSlice.reducer;

// Selectors
export const selectHealthLoading = state => state.health.loading;
export const selectHealthStatus  = state => state.health.status;
export const selectHealthError   = state => state.health.error;