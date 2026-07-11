import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { BetSelection, BetSlipState } from './betSlip.types';

export const initialBetSlipState: BetSlipState = {
  selectionsByEventId: {},
};

const betSlipSlice = createSlice({
  name: 'betSlip',
  initialState: initialBetSlipState,
  reducers: {
    toggleSelection: (state, action: PayloadAction<BetSelection>) => {
      const selection = action.payload;
      const activeSelection = state.selectionsByEventId[selection.eventId];

      if (activeSelection?.selectionKey === selection.selectionKey) {
        delete state.selectionsByEventId[selection.eventId];
        return;
      }

      state.selectionsByEventId[selection.eventId] = selection;
    },
    removeSelection: (state, action: PayloadAction<string>) => {
      delete state.selectionsByEventId[action.payload];
    },
    clearBetSlip: (state) => {
      state.selectionsByEventId = {};
    },
  },
});

export const { clearBetSlip, removeSelection, toggleSelection } =
  betSlipSlice.actions;
export const betSlipReducer = betSlipSlice.reducer;
