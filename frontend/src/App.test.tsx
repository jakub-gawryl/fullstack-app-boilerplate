import App from './App';
import {render} from '@testing-library/react';

describe('App', () => {
  test('renders correctly', () => {
    const { container } = render(<App />);

    expect(container).toMatchSnapshot();
  });
});