import React, { useState } from "react";
import "./LoginForm.css";

const LoginForm = (props) => {

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
    } else if (usernameInput != 'admin') {
      setUsernameError("Invalid username");
      Error = true;
    }
    if (pwdInput == "") {
      setpwdError("Password is required");
      Error = true;
    } else if (pwdInput != "Admin@123") {
      setpwdError("Invalid password");
      Error = true;
    }

    if (Error == false) {
      console.log("got inputs, username = " + usernameInput + ", pwd = " + pwdInput);
      props.onLogin(usernameInput);
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
    </div>
  );
};

export default LoginForm;
