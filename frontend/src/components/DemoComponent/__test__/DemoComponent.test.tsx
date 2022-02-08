import React from 'react';
import { render } from '@testing-library/react';
import DemoComponent from '../index';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: '/graphql'
});

describe('<DemoComponent />', () => {
  it('renders correctly', () => {
    React.useState = jest.fn().mockReturnValue(['Hello from backend!', {}]);
    const target = render(
      <ApolloProvider client={client}>
        <DemoComponent />
      </ApolloProvider>
    );

    expect(target.asFragment()).toMatchSnapshot();
  });
});