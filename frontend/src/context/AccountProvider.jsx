/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import AccountContext from './AccountContext';

function AccountProvider({ children }) {
  // const [accountsData, setAccountsData] = useState([]);

  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    localStorage.removeItem('total');
    localStorage.removeItem('sellers');
    navigate('/login');
  };

  const states = {
    signOut,
  };

  return (
    <AccountContext.Provider value={states}>
      { children }
    </AccountContext.Provider>
  );
}

AccountProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default AccountProvider;
