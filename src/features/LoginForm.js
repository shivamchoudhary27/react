import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getPublicData } from "./../adapters/index";
import { getUserProfile } from "./auth/login";
import ErrorBox from "../components/ErrorBox";
import "./LoginForm.css";
import config from './../utils/config';
import Loader from "../components/loader/loader";

const LoginForm = () => {
  const navigate = useNavigate();
  const [usernameInput, setUsernameInput] = useState("");
  const [pwdInput, setpwdInput] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [pwdError, setpwdError] = useState("");
  const [invalidLogin, setInvalidLogin] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Something went wrong");
  const [showLoader, setShowLoader] = useState(false);

  function SubmitHandler(e) {
    e.preventDefault();
    let Error = false;
    setUsernameError("");
    setpwdError("");
    setInvalidLogin(false);

    if (usernameInput === "") {
      
      setUsernameError("Username is required");
      Error = true;
    }
    if (pwdInput === "") {
      setpwdError("Password is required");
      Error = true;
    }

    if (Error === false) {
      setShowLoader(true);

      const data = {
        username: usernameInput,
        password: pwdInput,
        loginrequest:true
      };

      getPublicData(data)
        .then((res) => {
          if (res.status === 200 && res.data) {
            if (res.data.errorcode) {
                setShowLoader(false);
                setInvalidLogin(true);
                setErrorMsg(res.data.error);
            } else if(res.data.token) {
                config.WSTOKEN = res.data.token;
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("name", usernameInput);  
                console.log('login succeed')
            } 
          }
        })
        .catch((err) => {
          setShowLoader(false);
          setInvalidLogin(true);
        })
        .finally(() => {
          console.log("Finally, getting user profileinfo");
          if (config.WSTOKEN != null) {
            getUserProfile();
            setTimeout(routeDashboard, 3000);                   
          }
        });
    } 
  }

  function routeDashboard () {
    navigate("/dashboard");
  }
  function usernameInputHandler(e) {
    setShowLoader(false);
    setUsernameInput(e.target.value);
  }

  function pwdInputHandler(e) {
    setShowLoader(false);
    setpwdInput(e.target.value);
  }

  return (
    <div>
      <div className="App">
        <header className="App-header">
          <h1>
            <i>Login form</i>
          </h1>
          
          {showLoader === true && <Loader />}

          <form onSubmit={SubmitHandler}>

            {invalidLogin === true && <ErrorBox msg={errorMsg}/>}

            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="form2Example1">
                Username
              </label>
              <input
                type="text"
                id="form2Example1"
                className="form-control"
                onChange={usernameInputHandler}
              />
              <div className="field-input-error">{usernameError}</div>
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="form2Example2">
                Password
              </label>
              <input
                type="password"
                id="form2Example2"
                className="form-control"
                onChange={pwdInputHandler}
              />
              <div className="field-input-error">{pwdError}</div>
            </div>

            <button type="submit" className="btn btn-primary btn-block mb-4">
              Sign in
            </button>

            <div className="text-center">
              <p>
                Not a member? <Link to="#">Register</Link>
              </p>
            </div>
          </form>
        </header>
      </div>
    </div>
  );
};

export default LoginForm;
