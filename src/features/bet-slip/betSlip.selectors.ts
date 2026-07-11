import { createSelector } from '@reduxjs/toolkit';
import type { BetSlipState } from './betSlip.types';

type BetSlipStateSource = {
  betSlip: BetSlipState;
};

const selectSelectionsByEventId = (state: BetSlipStateSource) =>
  state.betSlip.selectionsByEventId;

export const selectSelections = createSelector(
  [selectSelectionsByEventId],
  (selectionsByEventId) => Object.values(selectionsByEventId)
);

export const selectCombinedOdd = createSelector(
  [selectSelections],
  (selections) =>
    selections.reduce(
      (combinedOdd, selection) => combinedOdd * selection.odd,
      1
    )
);

export const selectSelectionByEventId = (
  state: BetSlipStateSource,
  eventId: string
) => state.betSlip.selectionsByEventId[eventId];
