import React from 'react';
import { render } from '@testing-library/react';
import DemoComponent from '../index';

describe('<DemoComponent />', () => {
  it('renders correctly', () => {
    React.useState = jest.fn().mockReturnValue(['Hello from backend!', {}]);
    const target = render(<DemoComponent />);

    expect(target).toMatchSnapshot();
  });
});