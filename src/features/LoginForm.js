import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getPublicData } from "./../adapters/index";
import "./LoginForm.css";
import config from './../utils/config';

const LoginForm = () => {
  const navigate = useNavigate();
  const [usernameInput, setUsernameInput] = useState("");
  const [pwdInput, setpwdInput] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [pwdError, setpwdError] = useState("");
  const [invalidLogin, setInvalidLogin] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Something went wrong");

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
      console.log(
        "got inputs, username = " + usernameInput + ", pwd = " + pwdInput
      );

      const data = {
        username: usernameInput,
        password: pwdInput,
        loginrequest:true
       // service: "moodle_mobile_app",

        
      };

      getPublicData(data)
        .then((res) => {
        
          console.log(res);
          if (res.status === 200 && res.data) {
            if (res.data.errorcode) {
                setInvalidLogin(true);
                setErrorMsg(res.data.error);
            } else if(res.data.token) {
                config.WSTOKEN = res.data.token;  
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("name", usernameInput);            
                navigate("/dashboard");
            }
          }
        })
        .catch((err) => {
          setInvalidLogin(true);
        })
        .finally(() => {
          console.log("Finally");
        });
    } else {
      alert('Some error occurred, please try again');
    }
  }

  function usernameInputHandler(e) {
    setUsernameInput(e.target.value);
  }

  function pwdInputHandler(e) {
    setpwdInput(e.target.value);
  }

  return (
    <div>
      <div className="App">
        <header className="App-header">
          <h1>
            <i>Login form</i>
          </h1>
          <form onSubmit={SubmitHandler}>
            {invalidLogin === true && 
              <div className="error-alert" role="alert">
                Invalid login, please try again!
              </div>            
            }

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
