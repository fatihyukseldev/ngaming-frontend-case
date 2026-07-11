import {
  betSlipReducer,
  clearBetSlip,
  initialBetSlipState,
  removeSelection,
  toggleSelection,
} from './betSlip.slice';
import type { BetSelection } from './betSlip.types';

const homeSelection: BetSelection = {
  eventId: '2146483649',
  eventCode: '2002',
  eventName: 'Real Madrid - Galatasaray',
  marketId: '1',
  marketName: 'Maç Sonucu',
  outcomeId: '0',
  outcomeName: '1',
  odd: 6.71,
  mbs: 4,
  selectionKey: '2146483649:1:0',
};

const drawSelection: BetSelection = {
  ...homeSelection,
  outcomeId: '1',
  outcomeName: 'X',
  odd: 4.63,
  selectionKey: '2146483649:1:1',
};

const anotherEventSelection: BetSelection = {
  ...homeSelection,
  eventId: '2146483650',
  eventCode: '2003',
  eventName: 'AC Milan - Osasuna',
  odd: 6.17,
  selectionKey: '2146483650:1:0',
};

describe('betSlipReducer', () => {
  it('adds the first selection', () => {
    const state = betSlipReducer(
      initialBetSlipState,
      toggleSelection(homeSelection)
    );

    expect(state.selectionsByEventId[homeSelection.eventId]).toEqual(
      homeSelection
    );
  });

  it('removes the active selection when it is toggled again', () => {
    const selectedState = betSlipReducer(
      initialBetSlipState,
      toggleSelection(homeSelection)
    );

    const state = betSlipReducer(selectedState, toggleSelection(homeSelection));

    expect(state.selectionsByEventId).toEqual({});
  });

  it('replaces a selection from the same event', () => {
    const selectedState = betSlipReducer(
      initialBetSlipState,
      toggleSelection(homeSelection)
    );

    const state = betSlipReducer(selectedState, toggleSelection(drawSelection));

    expect(state.selectionsByEventId[homeSelection.eventId]).toEqual(
      drawSelection
    );
    expect(Object.keys(state.selectionsByEventId)).toHaveLength(1);
  });

  it('keeps selections from different events', () => {
    const firstEventState = betSlipReducer(
      initialBetSlipState,
      toggleSelection(homeSelection)
    );

    const state = betSlipReducer(
      firstEventState,
      toggleSelection(anotherEventSelection)
    );

    expect(Object.values(state.selectionsByEventId)).toEqual([
      homeSelection,
      anotherEventSelection,
    ]);
  });

  it('removes one selection by event id', () => {
    const selectedState = {
      selectionsByEventId: {
        [homeSelection.eventId]: homeSelection,
        [anotherEventSelection.eventId]: anotherEventSelection,
      },
    };

    const state = betSlipReducer(
      selectedState,
      removeSelection(homeSelection.eventId)
    );

    expect(state.selectionsByEventId).toEqual({
      [anotherEventSelection.eventId]: anotherEventSelection,
    });
  });

  it('clears every selection', () => {
    const selectedState = {
      selectionsByEventId: {
        [homeSelection.eventId]: homeSelection,
        [anotherEventSelection.eventId]: anotherEventSelection,
      },
    };

    const state = betSlipReducer(selectedState, clearBetSlip());

    expect(state.selectionsByEventId).toEqual({});
  });
});
