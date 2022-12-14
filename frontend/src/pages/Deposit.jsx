import React, { useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import { getStorage, setStorage } from '../helpers/Storage';

function Deposit() {
  const [amountDeposit, setAmountDeposit] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const depositInAccount = async () => {
    const user = getStorage('user');
    await axios({
      method: 'patch',
      url: 'http://localhost:3000/account/deposit',
      headers: {
        authorization: user.token,
      },
      data: { amount: Number(amountDeposit) },
    })
      .then(({ data }) => {
        const storage = getStorage('user');
        storage.account = data.account;
        setStorage('user', storage);
        setSuccessMessage(data.message);
        setErrorMessage('');
        setAmountDeposit(0);
      })
      .catch(({ response }) => {
        setErrorMessage(response.data.message);
        setSuccessMessage('');
        setAmountDeposit(0);
      });
  };

  const handleChange = (event) => {
    setAmountDeposit(event.target.value);
  };

  return (

    <div>
      <Header />

      {errorMessage !== '' && (
      <div className="alert alert-danger" id="login-error-message" role="alert">
        {errorMessage}
      </div>
      )}

      {successMessage !== '' && (
      <div className="alert alert-success" id="login-success-message" role="alert">
        {successMessage}
      </div>
      )}

      <main id="main" className="container my-5">
        <section>
          <form>
            <h1 className="h1" id="title">Valor a Depositar</h1>

            <div className="form-group row">
              <label id="labelAmount" htmlFor="valor" className="col-lg-12col-form-label">
                Valor:
                <div className="col-lg-12">
                  <input
                    className="form-control"
                    data-testid="amount-input"
                    placeholder="Valor para depósito"
                    type="number"
                    name="amount"
                    id="amount"
                    onChange={handleChange}
                    value={amountDeposit}
                  />
                </div>
              </label>
            </div>

            <button
              className="w-100 btn btn-lg btn-outline-success my-3"
              type="button"
              data-testid="login-submit-btn"
              onClick={() => depositInAccount()}
            >
              Depositar
            </button>
          </form>
        </section>

      </main>

    </div>

  );
}

export default Deposit;
