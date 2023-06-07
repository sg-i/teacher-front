import React, { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import './Login.scss';
import AuthService from '../../services/auth.service';

const required = (value) => {
  if (!value) {
    return <div className="invalid-feedback d-block">Введите данные!</div>;
  }
};

const Login = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // const navigate = useNavigate();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage('');
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          console.log('asd');
          // navigate('/profile');
          // window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        },
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrap">
      <div className="login-window">
        <img src="logo.png" height={85} alt="profile-img" />

        <Form className="login-form" onSubmit={handleLogin} ref={form}>
          <div className="">
            <Input
              placeholder="Логин"
              type="text"
              className="login-input"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>

          <div className="">
            <Input
              placeholder="Пароль"
              type="password"
              className="login-input"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          {/* <div className=""> */}
          <button className="login-button" disabled={loading}>
            {loading && <span className=""></span>}
            <span>Войти</span>
          </button>
          {/* </div> */}

          {message && (
            <div className="">
              <div className="login-message" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: 'none' }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Login;
