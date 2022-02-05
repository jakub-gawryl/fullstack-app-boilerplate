import React from 'react';
import styled from 'styled-components';

const StyledDemoComponent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  text-align: center;
  line-height: 2em;
  max-width: 500px;
  border: 1px solid #aaa;
  border-radius: 20px;
  margin: 20px auto 0;

  .demo-component {
    &__frontend-text {
      font-weight: 700;
    }
    &__backend-text {
      font-weight: 300;
    }
  }
`;

const DemoComponent: React.FC = () => {
  const [serverStatus, setServerStatus] = React.useState('');

  React.useEffect(() => {
    fetch('/api')
      .then(res => res.json())
      .then(data => setServerStatus(data.status));
  }, [setServerStatus]);

  return (
    <StyledDemoComponent>
      <div className="demo-component">
        <p className="demo-component__frontend-text">Hello Frontend!</p>
        <p className="demo-component__backend-text">{serverStatus}</p>
      </div>
    </StyledDemoComponent>
  );
};

export default DemoComponent;
