import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { betSlipReducer } from '../betSlip.slice';
import BetSlip from './BetSlip';

describe('BetSlip mobile panel', () => {
  it('opens from the summary and closes from the panel header', async () => {
    const user = userEvent.setup();
    const store = configureStore({ reducer: { betSlip: betSlipReducer } });

    render(
      <Provider store={store}>
        <BetSlip />
      </Provider>
    );

    const summaryButton = screen.getByRole('button', {
      name: 'Kupon (0) Oran seçin',
    });

    expect(summaryButton).toHaveAttribute('aria-expanded', 'false');

    await user.click(summaryButton);

    expect(summaryButton).toHaveAttribute('aria-expanded', 'true');

    await user.click(
      screen.getByRole('button', { name: 'Bahis kuponunu kapat' })
    );

    expect(summaryButton).toHaveAttribute('aria-expanded', 'false');
  });
});
