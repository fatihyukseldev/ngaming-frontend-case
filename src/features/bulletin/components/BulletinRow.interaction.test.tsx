import { configureStore } from '@reduxjs/toolkit';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import BetSlip from '../../bet-slip/components/BetSlip';
import { betSlipReducer } from '../../bet-slip/betSlip.slice';
import type { BetEvent } from '../bulletin.types';
import BulletinRow from './BulletinRow';

const event: BetEvent = {
  C: '2002',
  N: 'Real Madrid - Galatasaray',
  TYPE: '1',
  NID: '2146483649',
  D: '17.08.2023',
  T: '10:35',
  DAY: 'Salı',
  S: 'Open',
  LN: 'Türkiye Süper Ligi',
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
          O: '6.71',
          N: '1',
          MBS: '4',
          G: '1',
          OD: 0,
          IMF: false,
        },
        '1': {
          ID: '1',
          O: '4.63',
          N: 'X',
          MBS: '4',
          G: '1',
          OD: 0,
          IMF: false,
        },
      },
    },
  },
};

const renderSelectionFlow = () => {
  const store = configureStore({ reducer: { betSlip: betSlipReducer } });

  render(
    <Provider store={store}>
      <div role="table">
        <BulletinRow event={event} rowIndex={2} />
      </div>
      <BetSlip />
    </Provider>
  );

  return userEvent.setup();
};

describe('BulletinRow selection flow', () => {
  it('adds and removes an odd with the keyboard', async () => {
    const user = renderSelectionFlow();
    const homeOdd = screen.getByRole('button', {
      name: 'Real Madrid - Galatasaray, 1, oran 6.71',
    });
    const betSlip = screen.getByRole('complementary', {
      name: 'Bahis Kuponu',
    });

    homeOdd.focus();
    await user.keyboard('{Enter}');

    expect(homeOdd).toHaveAttribute('aria-pressed', 'true');
    expect(within(betSlip).getByText(event.N)).toBeInTheDocument();

    await user.keyboard('{Enter}');

    expect(homeOdd).toHaveAttribute('aria-pressed', 'false');
    expect(within(betSlip).getByText(/Kuponunuza eklemek/)).toBeInTheDocument();
  });

  it('replaces the event selection and removes it from the coupon', async () => {
    const user = renderSelectionFlow();
    const homeOdd = screen.getByRole('button', {
      name: 'Real Madrid - Galatasaray, 1, oran 6.71',
    });
    const drawOdd = screen.getByRole('button', {
      name: 'Real Madrid - Galatasaray, X, oran 4.63',
    });
    const betSlip = screen.getByRole('complementary', {
      name: 'Bahis Kuponu',
    });

    await user.click(homeOdd);
    await user.click(drawOdd);

    expect(homeOdd).toHaveAttribute('aria-pressed', 'false');
    expect(drawOdd).toHaveAttribute('aria-pressed', 'true');
    expect(within(betSlip).queryByText('6.71')).not.toBeInTheDocument();
    expect(within(betSlip).getAllByText('4.63')).toHaveLength(2);

    await user.click(
      within(betSlip).getByRole('button', {
        name: 'Real Madrid - Galatasaray seçimini kaldır',
      })
    );

    expect(drawOdd).toHaveAttribute('aria-pressed', 'false');
    expect(within(betSlip).getByText(/Kuponunuza eklemek/)).toBeInTheDocument();
  });

  it('keeps an unavailable outcome non-interactive', () => {
    renderSelectionFlow();

    const unavailableCell = screen.getByRole('cell', {
      name: 'Real Madrid - Galatasaray, 2 oranı mevcut değil',
    });

    expect(
      within(unavailableCell).queryByRole('button')
    ).not.toBeInTheDocument();
  });
});
