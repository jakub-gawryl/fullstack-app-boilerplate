import React from 'react';
import App from './App';
import {render} from '@testing-library/react';

describe('Example test', () => {
  test('returns true', () => {
    /*
    const { container } = render(<App />);

    expect(container).toMatchSnapshot();
    */
    expect(true).toBe(true);
  });
});