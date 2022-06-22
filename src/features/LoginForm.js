import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import "./../adapters/index";
import { getPublicData } from "./../adapters/index";

const LoginForm = (props) => {
  const navigate = useNavigate();
  const [usernameInput, setUsernameInput] = useState("");
  const [pwdInput, setpwdInput] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [pwdError, setpwdError] = useState("");

  function SubmitHandler(e) {
    e.preventDefault();
    let Error = false;
    setUsernameError("");
    setpwdError("");

    if (usernameInput == "") {
      setUsernameError("Username is required");
      Error = true;
    }
    if (pwdInput == "") {
      setpwdError("Password is required");
      Error = true;
    }

    if (Error == false) {
      console.log(
        "got inputs, username = " + usernameInput + ", pwd = " + pwdInput
      );
      const data = {
        username: usernameInput,
        password: pwdInput,
        service: "moodle_mobile_app",
      };
      getPublicData(data)
        .then((res) => {
          console.log(res);
          if (res.status == 200 && res.data && res.data.token) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("name", usernameInput);
            // props.onLogin(usernameInput);
            navigate("/dashboard");
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          console.log("Finally");
        });
    } else {
      console.log("error - not valid");
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
                Not a member? <a href="#">Register</a>
              </p>
            </div>
          </form>
        </header>
      </div>
    </div>
  );
};

export default LoginForm;
