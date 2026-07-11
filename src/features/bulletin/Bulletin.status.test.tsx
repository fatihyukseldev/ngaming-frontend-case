import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { betSlipReducer } from '../bet-slip/betSlip.slice';
import Bulletin from './Bulletin';
import { bulletinReducer } from './bulletin.slice';

describe('Bulletin request states', () => {
  it('offers retry after an API failure', async () => {
    const user = userEvent.setup();
    const store = configureStore({
      reducer: {
        betSlip: betSlipReducer,
        bulletin: bulletinReducer,
      },
    });
    globalThis.fetch = jest
      .fn()
      .mockRejectedValueOnce(new Error('Network unavailable'))
      .mockImplementationOnce(() => new Promise<Response>(() => undefined));

    render(
      <Provider store={store}>
        <Bulletin />
      </Provider>
    );

    expect(
      await screen.findByRole('heading', { name: 'Bülten yüklenemedi' })
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Tekrar dene' }));

    await waitFor(() => expect(globalThis.fetch).toHaveBeenCalledTimes(2));
    expect(screen.getByRole('status')).toHaveTextContent('Bülten yükleniyor…');
  });
});
