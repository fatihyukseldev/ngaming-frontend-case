import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store';

describe('App', () => {
  it('renders the application shell and loading state', () => {
    globalThis.fetch = jest.fn(() => new Promise<Response>(() => undefined));

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(
      screen.getByRole('heading', { name: 'NGAMING' })
    ).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('Bülten yükleniyor…');
  });
});
