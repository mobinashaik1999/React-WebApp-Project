import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app heading', () => {
  render(<App />);
  const heading = screen.getByText(/form in react/i);
  expect(heading).toBeInTheDocument();
});
