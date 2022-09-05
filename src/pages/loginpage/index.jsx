import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import logo from '../../assets/images/logo.png';
import UserContext from '../../features/context/user/user';
import { getPublicData } from '../../adapters';
import config from '../../utils/config';
import Loader from '../../widgets/loader/loader';
import './login.scss';
import Signup from '../signuppage';
import ForgotPassword from '../forgotpassword';

function LoginForm() {
  const location = useLocation().search;
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);
  const [formToggle, setformtoggle] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const [pwdInput, setpwdInput] = useState('');
  const [usernameError, setUsernameError] = useState(' ');
  const [pwdError, setpwdError] = useState(' ');
  const [invalidLogin, setInvalidLogin] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Something went wrong');
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location);
    setformtoggle(urlParams.get('form'));
  }, [location]);

  function routeDashboard() {
    navigate('/dashboard');
  }

  function SubmitHandler(e) {
    e.preventDefault();
    let Error = false;
    setUsernameError(' ');
    setpwdError(' ');
    setInvalidLogin(false);

    if (usernameInput === '') {
      setUsernameError('Username is required');
      Error = true;
    }
    if (pwdInput === '') {
      setpwdError('Password is required');
      Error = true;
    }

    if (Error === false) {
      setShowLoader(true);

      const data = {
        username: usernameInput,
        password: pwdInput,
        loginrequest: true,
      };

      getPublicData(data)
        .then((res) => {
          if (res.status === 200 && res.data) {
            if (res.data.errorcode) {
              setShowLoader(false);
              setInvalidLogin(true);
              setErrorMsg(res.data.error);
            } else if (res.data.token) {
              config.WSTOKEN = res.data.token;
              userCtx.setUserToken(config.WSTOKEN)
              setTimeout(routeDashboard, 0);
            }
          }
        })
        .catch((err) => {
          console.log(err)
          setShowLoader(false);
          setInvalidLogin(true);
        })
    }
  }

  function usernameInputHandler(e) {
    setShowLoader(false);
    setUsernameInput(e.target.value);
  }

  function pwdInputHandler(e) {
    setShowLoader(false);
    setpwdInput(e.target.value);
  }

  const handleToggleSignup = () => {
    navigate('/?form=signup');
  };

  const handleToggleForgotPassword = () => {
    navigate('/?form=forgotpassword');
  }

  const handlePassShow = () => {
    const attrType = document.getElementById('pass');
    const eyeIcon = document.getElementById('eye-icon');
    if (attrType.type === 'password') {
      attrType.type = 'text';
      eyeIcon.className = 'fa fa-eye eye-icon';
    } else {
      attrType.type = 'password';
      eyeIcon.className = 'fa fa-eye-slash eye-icon';
    }
  };
  
  const setCurrentForm = (request) => {
    if (request === 'signup') {
      return <Signup />
    } else if (request === 'forgotpassword') {
      return <ForgotPassword />
    }
  }

  return (
    <div>
      <div className="bg-opacity container-fluid">
        <Row>
          <div className="col-sm-8 left-column">
            <div className="banner">
              <div className="banner-opacity">
                <div className="logo-bg">
                  <img className="bl-logo" src={logo} alt="logo.png" />
                </div>
                <div>
                  <h1>Ballistic Academy</h1>
                  <p>
                    Ballistic Academy is a hybrid learning platform that uses
                    FLIP classroom, and social learning (P2P), combined with
                    virtual sessions by Ballistic subject matter experts to
                    deliver experiential learning.
                  </p>
                </div>
                <div className="cpy-content">
                  <span className="cpy-right">
                    © Copyright Ballistic Learning Pvt Ltd. All Rights Reserved.
                  </span>
                  <span className="cpy-right privacy">Privacy Policy</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4 right-column">
            <div className="right-col col-md-8 mx-auto">
              <div className="logo-bg">
                <img className="bl-logo" src={logo} alt="logo.png" />
              </div>
              {formToggle !== null ? (
                setCurrentForm(formToggle)
              ) : (
                <div>
                  <p className="welcome-heading">Welcome back</p>
                  <div className="bar" />
                  <p className="login-info mb-5">
                    Please login to your account.
                  </p>

                  {invalidLogin === true && (
                    <p className="login-info errorAlert">{errorMsg}</p>
                  )}

                  <div className="login-loader">
                    {showLoader === true && <Loader />}
                  </div>

                  <form onSubmit={SubmitHandler}>
                    <div className="input-icons mb-4">
                      {/* <i className="fa fa-user-circle-o icon"></i> */}
                      <i className="fa fa-circle-user icon" />
                      <input
                        type="text"
                        id="user"
                        name="Username"
                        placeholder="Username"
                        className="username-input"
                        onChange={usernameInputHandler}
                      />
                      <div className="fieldInputError">{usernameError}</div>
                    </div>

                    <div className="input-icons">
                      <i className="fa fa-lock icon" />
                      <input
                        type="password"
                        id="pass"
                        name="Password"
                        placeholder="Password"
                        className="username-input"
                        onChange={pwdInputHandler}
                      />
                      <i
                        role="presentation"
                        className="fa fa-eye-slash eye-icon"
                        id="eye-icon"
                        onClick={handlePassShow}
                      />
                      <div className="fieldInputError">{pwdError}</div>
                    </div>

                    <div>
                      <p 
                        role="presentation" 
                        className="forgot-pass" 
                        onClick={handleToggleForgotPassword}
                        style={{cursor: "pointer", textDecoration: "underline"}}
                      >
                        Forgot Password?
                      </p>
                    </div>
                    <div className="form-check mt-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        Remember Username
                      </label>
                    </div>
                    <div className="mt-4">
                      <button
                        className="login-btn"
                        type="submit"
                        value="Submit"
                      >
                        Login
                      </button>
                    </div>
                  </form>
                  <div className="text-end mt-2">
                    <p
                      role="presentation"
                      className="sign-up text-white"
                      onClick={handleToggleSignup}
                      style={{ cursor: 'pointer', textDecoration: 'underline' }}
                    >
                      Signup
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Row>
      </div>
    </div>
  );
}

export default LoginForm;
