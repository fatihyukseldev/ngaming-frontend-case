import { Profiler, type ProfilerOnRenderCallback } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { act, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { betSlipReducer, toggleSelection } from '../../bet-slip/betSlip.slice';
import type { BetSelection } from '../../bet-slip/betSlip.types';
import type { BetEvent } from '../bulletin.types';
import BulletinRow from './BulletinRow';

const firstEvent: BetEvent = {
  C: '2001',
  N: 'PSV - AS Roma',
  TYPE: '1',
  NID: 'event-1',
  D: '12.08.2023',
  T: '01:59',
  DAY: 'Perşembe',
  S: 'Open',
  LN: 'UEFA Şampiyonlar Ligi',
  IMF: false,
  HEC: false,
  OCG: {
    '1': {
      ID: '1',
      N: 'Maç Sonucu',
      MBS: '4',
      SO: 1,
      OC: {
        '0': {
          ID: '0',
          O: '3.60',
          N: '1',
          MBS: '4',
          G: '1',
          OD: 0,
          IMF: false,
        },
      },
    },
  },
};

const secondEvent: BetEvent = {
  ...firstEvent,
  C: '2002',
  N: 'Real Madrid - Galatasaray',
  NID: 'event-2',
};

const firstSelection: BetSelection = {
  eventId: firstEvent.NID,
  eventCode: firstEvent.C,
  eventName: firstEvent.N,
  marketId: '1',
  marketName: 'Maç Sonucu',
  outcomeId: '0',
  outcomeName: '1',
  odd: 3.6,
  mbs: 4,
  selectionKey: 'event-1:1:0',
};

describe('BulletinRow render isolation', () => {
  it('updates only the row belonging to the changed event selection', () => {
    const store = configureStore({ reducer: { betSlip: betSlipReducer } });
    const updatedProfilers: string[] = [];
    const handleRender: ProfilerOnRenderCallback = (id, phase) => {
      if (phase === 'update') {
        updatedProfilers.push(id);
      }
    };

    render(
      <Provider store={store}>
        <Profiler id="first-event" onRender={handleRender}>
          <BulletinRow event={firstEvent} rowIndex={2} />
        </Profiler>
        <Profiler id="second-event" onRender={handleRender}>
          <BulletinRow event={secondEvent} rowIndex={3} />
        </Profiler>
      </Provider>
    );

    act(() => {
      store.dispatch(toggleSelection(firstSelection));
    });

    expect(updatedProfilers).toEqual(['first-event']);
  });
});
