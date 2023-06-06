import { render, screen } from '@testing-library/react';
import App from './App';

test('Cognite', () => {
  render(<App />);
  const linkElement = screen.getByText(/Ilya Petin dev test for Cognite/i);
  expect(linkElement).toBeInTheDocument();
});
