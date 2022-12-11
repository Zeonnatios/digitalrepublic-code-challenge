import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AccountContext from '../../context/AccountContext';
import { getStorage } from '../../helpers/Storage';

function Header() {
  const { signOut } = useContext(AccountContext);
  const user = getStorage('user');

  return (
    <header>
      <nav className="nav navbar-dark bg-dark justify-content-center p-3">
        <div className="container d-flex flex-wrap">
          <ul className="nav">
            <li className="nav-item ">
              <h2 className="text-light">{user.name}</h2>
            </li>
            <li className="nav-item">
              <Link className="nav-link link-warning" to="/account/profile">Profile</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link link-warning" to="/account/deposit">Depósito</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link link-warning" to="/account/withdraw">Saque</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link link-warning" to="/account/transfer">Transferência</Link>
            </li>
            <li className="nav-item">
              <button type="button" className="btn btn-outline-light" onClick={signOut}>Sair</button>
            </li>
          </ul>
        </div>
      </nav>

      <nav className="nav navbar-dark bg-dark justify-content-left">
        <div className="container d-flex flex-wrap">
          <ul className="nav">
            <li className="nav-item">
              <p className="text-light">
                Saldo em conta:
                {' '}
                <span className="text-warning">
                  {user.account.amount}
                  {' '}
                  R$
                </span>
              </p>
            </li>
            <li className="nav-item px-5">
              <p className="text-light">
                Número de conta:
                {' '}
                <span className="text-warning">{user.account.accountNumber}</span>
              </p>
            </li>
          </ul>
        </div>
      </nav>

    </header>
  );
}

export default Header;
