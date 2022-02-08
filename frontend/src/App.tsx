import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import DemoComponent from 'components/DemoComponent/DemoComponent';

const client = new ApolloClient({
  uri: '/graphql'
});

const App: React.FC = () => {

  return (
    <ApolloProvider client={client}>
      <DemoComponent />
    </ApolloProvider>
  );
};

export default App;
