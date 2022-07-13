import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getPublicData } from "./../adapters/index";
import { getUserProfile } from "./auth/login";
import ErrorBox from "../components/ErrorBox";
import config from "./../utils/config";
import "./css/LoginForm.css";
import Loader from "../components/loader/loader";
import Img from "../assets/images/loginImg.jpg";

const LoginForm = () => {

  const myStyle = {
    backgroundImage: `url(${Img})`,
    height: "100vh",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    opacity: "0.7",
  };
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
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("name", usernameInput);
              localStorage.setItem("loggedIn", true);

              console.log("login succeed");
            }
          }
        })
        .catch((err) => {
          setShowLoader(false);
          setInvalidLogin(true);
        })
        .finally(() => {
          if (config.WSTOKEN != null) {
            console.log('called to hit context' + config.WSTOKEN);
            getUserProfile();
            setTimeout(routeDashboard, 3000);
          } else {
            setShowLoader(false);
            setInvalidLogin(true);
          }
        });
    }
  }

  function routeDashboard() {
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
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-8 col-md-8 col-sm-12 col-12" style={myStyle}>
            <div className="login-img">
              {/* <div className="logo">
                <img src={Logo} alt="Logo ..." style={{ width: "150px" }} />
                <p>
                  <span>We are Invite Only right now</span>
                  <br />
                  5 Millions people+ have joined our network.
                  <br />
                  We invite to join Ballistic Learning.
                </p>
              </div>   */}
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 col-12">
            <div className="App">
              <header className="app-header">
                <h3>Welcome Back!</h3>
                {showLoader === true && <Loader />}
                <form onSubmit={SubmitHandler}>
                  <h4 style={{ textAlign: "left" }}>Sign In</h4>
                  <p style={{ fontSize: "12px", textAlign: "left" }}>
                    We invite to join Ballistic Learning..
                  </p>
                  {invalidLogin === true && <ErrorBox msg={errorMsg} />}
                  <hr />
                  <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="form2Example1">
                      Username<sup>*</sup>
                    </label>
                    <input
                      type="text"
                      id="form2Example1"
                      className="form-control"
                      onChange={usernameInputHandler}
                    />
                    <div className="field-input-error">{usernameError}</div>
                  </div>

                  <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="form2Example2">
                      Password<sup>*</sup>
                    </label>
                    <input
                      type="password"
                      id="form2Example2"
                      className="form-control"
                      onChange={pwdInputHandler}
                    />
                    <div className="field-input-error">{pwdError}</div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-warning btn-block mt-3"
                  >
                    Sign in
                  </button>
                </form>
                <div className="link">
                  <p>
                    Don't have an Account? <Link to="#">Sign Up</Link>
                  </p>
                </div>
              </header>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
