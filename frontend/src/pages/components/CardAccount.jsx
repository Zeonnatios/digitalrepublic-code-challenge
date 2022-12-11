import React from 'react';
import PropTypes from 'prop-types';

function CardAccount({ user }) {
  const { name, account: { accountNumber } } = user;

  return (
    <div className="card text-dark bg-light mb-2 p-2" style={{ maxWidth: '18rem' }}>
      <div className="card-header">
        <h4>{name}</h4>
      </div>
      <div className="card-body">
        <h5 className="card-title">Número da conta:</h5>
        <p className="card-title">{accountNumber}</p>

      </div>
    </div>
  );
}

CardAccount.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    account: PropTypes.shape({
      id: PropTypes.number,
      accountNumber: PropTypes.number,
      amount: PropTypes.string,
      userId: PropTypes.number,
    }),
  }).isRequired,
};

export default CardAccount;
