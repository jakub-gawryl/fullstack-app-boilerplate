import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import styled from 'styled-components';

const query = gql`
{
  users {
    id,
    name,
    email
  }
}
`;

const StyledDemoComponent = styled.div`
  display: flex;
  min-height: 200px;
  padding: 10px 32px;
  line-height: 2em;
  max-width: 500px;
  border: 1px solid #aaa;
  border-radius: 20px;
  margin: 20px auto 0;

  .demo-component {
    &__user-list {
      list-style-position: inside;
    }
  }
`;

const DemoComponent: React.FC = () => {
  const { loading, error, data } = useQuery(query);

  return (
    <StyledDemoComponent>
      <div className="demo-component">
        <h3 className="demo-component__frontend-text">✅ Hello Frontend!</h3>
        <h3>✅ Hello GraphQL (users):</h3>
        {loading && <strong>⌛ Loading...</strong>}
        {error && <strong style={{color: 'red'}}>😔 GraphQL request failed: {error.message}</strong>}
        {data && (
          <ul className="demo-component__user-list">
            {data.users.map((user: any) => (
              <li key={user.id}>
                🙍‍♂️ {user.name} &lt;{user.email.toLowerCase()}&gt;
              </li>
            ))}
          </ul>
        )}
      </div>
    </StyledDemoComponent>
  );
};

export default DemoComponent;
