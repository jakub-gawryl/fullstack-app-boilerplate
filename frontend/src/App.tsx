import React from 'react';

const App: React.FC = () => {
  const [serverStatus, setServerStatus] = React.useState('');

  React.useEffect(() => {
    fetch('/api')
      .then(res => res.json())
      .then(data => setServerStatus(data.status));
  }, [setServerStatus]);

  return (
    <>
      <p>Frontend: Hello world</p>
      <p>Backend: {serverStatus}</p>
    </>
  );
};

export default App;
