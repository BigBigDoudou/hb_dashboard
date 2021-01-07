import React from 'react';
import Dashboard from 'pages/Dashboard';
import Help from 'components/Help';

const App = () => {
  const style = {
    root: {},
    wrapper: {
      margin: 'auto',
    },
  };

  return (
    <div id="App">
      <div id="Wrapper" style={style.wrapper}>
        <Help />
        <Dashboard />
      </div>
    </div>
  );
};

export default App;
