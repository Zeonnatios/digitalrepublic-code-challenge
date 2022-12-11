/* eslint-disable import/no-unresolved */
import React from 'react';
import AccountProvider from './context/AccountProvider';
import Routes from './Routes';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <AccountProvider>
        <Routes />
      </AccountProvider>
    </div>

  );
}

export default App;
