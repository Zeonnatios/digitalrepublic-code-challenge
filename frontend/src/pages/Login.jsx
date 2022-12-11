import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getStorage, setStorage, userStorage } from '../helpers/Storage';

function Login() {
  const [login, setLogin] = useState({ email: '', password: '' });
  const [btnDisable, setBtnDisable] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [tokenIsDefined, setTokenIsDefined] = useState(false);

  const navigate = useNavigate();

  function handleChange({ target: { name, value } }) {
    setLogin({ ...login, [name]: value });
  }

  useEffect(() => {
    const user = getStorage('user');
    if (user && user.token) {
      setTokenIsDefined(true);
    }
  }, [setTokenIsDefined]);

  useEffect(() => {
    const { email, password } = login;
    const minLength = 8;
    const emailFormat = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$/;

    if (emailFormat.test(email) && password.length >= minLength) {
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
  }, [login]);

  const signIn = async () => {
    await axios({
      method: 'post',
      url: 'http://localhost:3000/login',
      data: { email: login.email, password: login.password },
    })
      .then((response) => {
        if (response) {
          setStorage('user', userStorage(response));
          navigate('/profile');
        }
      })
      .catch(({ response }) => {
        setLoginError(response.data.message);
      });
  };

  return (

    <main id="main" className="container my-5">

      {loginError !== '' && (
      <div className="alert alert-danger" id="login-error-message" role="alert">
        {loginError}
      </div>
      )}

      <section>
        <form>
          <h1 className="h1" id="title">Login</h1>

          <div className="form-group row">
            <label id="labelUserName" htmlFor="email" className="col-lg-12col-form-label">
              Username:
              <div className="col-lg-12">
                <input
                  className="form-control"
                  data-testid="email-input"
                  placeholder="Email"
                  type="email"
                  name="email"
                  id="email"
                  onKeyUp={handleChange}
                />
              </div>
            </label>
          </div>

          <div className="form-group row">
            <label id="labelPassword" htmlFor="password" className="col-lg-12 col-form-label">
              Password:
              <div className="col-lg-12">
                <input
                  className="form-control"
                  data-testid="password-input"
                  placeholder="Password"
                  type="password"
                  name="password"
                  minLength="8"
                  id="password"
                  onKeyUp={handleChange}
                />
              </div>
            </label>
          </div>

          <button
            className="w-100 btn btn-lg btn-outline-success my-3"
            type="button"
            data-testid="login-submit-btn"
            disabled={btnDisable}
            onClick={() => signIn()}
          >
            Entrar
          </button>

          <button
            className="w-100 btn btn-lg btn-outline-dark  "
            type="button"
            data-testid="login-submit-btn"
            onClick={() => navigate('/register')}
          >
            Ainda não tenho conta
          </button>
        </form>

        {tokenIsDefined && navigate('/profile')}
      </section>

    </main>
  );
}

export default Login;
