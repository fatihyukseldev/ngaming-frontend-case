import { configureStore } from '@reduxjs/toolkit';
import { betSlipReducer } from '../features/bet-slip/betSlip.slice';
import { bulletinReducer } from '../features/bulletin/bulletin.slice';

export const store = configureStore({
  reducer: {
    betSlip: betSlipReducer,
    bulletin: bulletinReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
