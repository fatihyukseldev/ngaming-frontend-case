import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchBulletin } from './api/fetchBulletin';
import type { BetEvent } from './bulletin.types';

export type BulletinState = {
  events: BetEvent[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

export const initialBulletinState: BulletinState = {
  events: [],
  status: 'idle',
  error: null,
};

export const loadBulletin = createAsyncThunk(
  'bulletin/loadBulletin',
  async (_, { signal }) => fetchBulletin(signal)
);

const bulletinSlice = createSlice({
  name: 'bulletin',
  initialState: initialBulletinState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadBulletin.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadBulletin.fulfilled, (state, action) => {
        state.events = action.payload;
        state.status = 'succeeded';
      })
      .addCase(loadBulletin.rejected, (state, action) => {
        if (action.meta.aborted) {
          return;
        }

        state.status = 'failed';
        state.error = action.error.message ?? 'Bülten yüklenemedi.';
      });
  },
});

export const bulletinReducer = bulletinSlice.reducer;
