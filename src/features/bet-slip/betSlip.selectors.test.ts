import {
  selectCombinedOdd,
  selectSelectionByEventId,
  selectSelections,
} from './betSlip.selectors';
import type { BetSelection, BetSlipState } from './betSlip.types';

const firstSelection: BetSelection = {
  eventId: 'event-1',
  eventCode: '2001',
  eventName: 'PSV - AS Roma',
  marketId: '1',
  marketName: 'Maç Sonucu',
  outcomeId: '0',
  outcomeName: '1',
  odd: 2,
  mbs: 4,
  selectionKey: 'event-1:1:0',
};

const secondSelection: BetSelection = {
  ...firstSelection,
  eventId: 'event-2',
  eventCode: '2002',
  eventName: 'Real Madrid - Galatasaray',
  odd: 3,
  selectionKey: 'event-2:1:0',
};

const createState = (betSlip: BetSlipState) => ({ betSlip });

describe('bet slip selectors', () => {
  it('derives selections from the event lookup', () => {
    const state = createState({
      selectionsByEventId: {
        [firstSelection.eventId]: firstSelection,
        [secondSelection.eventId]: secondSelection,
      },
    });

    expect(selectSelections(state)).toEqual([firstSelection, secondSelection]);
  });

  it('calculates the combined odd', () => {
    const state = createState({
      selectionsByEventId: {
        [firstSelection.eventId]: firstSelection,
        [secondSelection.eventId]: secondSelection,
      },
    });

    expect(selectCombinedOdd(state)).toBe(6);
  });

  it('returns one as the neutral combined odd for an empty bet slip', () => {
    const state = createState({ selectionsByEventId: {} });

    expect(selectSelections(state)).toEqual([]);
    expect(selectCombinedOdd(state)).toBe(1);
  });

  it('finds the selected outcome for one event', () => {
    const state = createState({
      selectionsByEventId: {
        [firstSelection.eventId]: firstSelection,
      },
    });

    expect(selectSelectionByEventId(state, firstSelection.eventId)).toEqual(
      firstSelection
    );
    expect(selectSelectionByEventId(state, 'missing-event')).toBeUndefined();
  });
});
