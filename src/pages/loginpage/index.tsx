import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import Signup from "../signuppage";
// import ForgotPassword from "../forgotpassword/index";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Row } from "react-bootstrap";
import logo from "../../assets/images/logo.png";
import UserContext from "../../features/context/user/user";
import { getPublicData } from "../../adapters";
import config from "../../utils/config";
import NewLoader from "../../widgets/loader";
import "./login.scss";
const LoginForm = () => {
  const location = useLocation().search;
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);
  const [formToggle, setformtoggle] = useState<string | null>(null);
  const [invalidLogin, setInvalidLogin] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Something went wrong");
  const [showLoader, setShowLoader] = useState(false);
  const [showPassword, setShowPassword] = useState({
    status: false,
    type: "password",
    class: "fa fa-eye-slash",
  });
  useEffect(() => {
    const urlParams = new URLSearchParams(location);
    setformtoggle(urlParams.get("form"));
  }, [location]);
  
  function SubmitHandler(values: { username: any; password: any }) {
    setInvalidLogin(false);
    setShowLoader(true);
    const data = {
      username: values.username,
      password: values.password,
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
            userCtx.setUserToken(config.WSTOKEN);
            setTimeout(routeDashboard, 0);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setShowLoader(false);
        setInvalidLogin(true);
      });
  }
  function routeDashboard() {
    navigate("/dashboard");
  }
  const handleToggleSignup = () => {
    navigate("/login/?form=signup");
  };
  const handleToggleForgotPassword = () => {
    navigate("/login/?form=forgotpassword");
  };
  const toggleShowPassword = () => {
    if (showPassword.type === "password") {
      setShowPassword({ status: false, type: "text", class: "fa fa-eye" });
    } else {
      setShowPassword({
        status: false,
        type: "password",
        class: "fa fa-eye-slash",
      });
    }
  };
  const setCurrentForm = (request: string) => {
    if (request === "signup") {
      return ""; //<Signup />;
    } else if (request === "forgotpassword") {
      return ""; //<ForgotPassword />;
    }
  };
  const validation = Yup.object({
    username: Yup.string().required("Please enter your username"),
    password: Yup.string().min(6).required("Please enter your password"),
  });

  const goToHome = () => {
    navigate('/');
  }

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={validation}
      onSubmit={(values) => {
        SubmitHandler(values);
      }}
    >
      <div className="login-container">
          <div className="row g-0">
            <div className="col-md-7 col-lg-8">
              <div className="left-column d-none d-md-block">
                  <div className="logo-bg" onClick={goToHome} style={{cursor: 'pointer'}}>
                    <img className="bl-logo" src={logo} alt="logo.png" />
                  </div>
                  <h1 className="login-title">Ballistic Academy Premium</h1>
                  <p className="login-description">
                    Ballistic Academy is a hybrid learning platform that uses
                    FLIP classroom, and social learning (P2P), combined with
                    virtual sessions by Ballistic subject matter experts to
                    deliver experiential learning.
                  </p>
                  <div className="cpy-content">
                    <Row>
                      <div className="col-md-8">© Copyright Ballistic Learning Pvt Ltd. All Rights Reserved.</div>
                      <div className="col-md-4">Privacy Policy</div>
                    </Row>
                  </div>
              </div>
            </div>
            <div className="col-md-5 col-lg-4">
              <div className="right-column">
                {formToggle !== null ? (
                  setCurrentForm(formToggle)
                ) : (
                  <div>
                    <div className="logo-bg m-auto mb-5 d-md-none">
                      <img className="bl-logo" src={logo} alt="logo.png" />
                    </div>
                    <h3 className="welcome-heading">Welcome back</h3>
                    <div className="bar" />
                    <p className="login-info mb-5"> Please login to your account.</p>

                    {invalidLogin === true && (
                      <p className="login-info errorAlert">{errorMsg}</p>
                    )}

                    <div className="login-loader">
                      {showLoader === true && <NewLoader />}
                    </div>
                    <Form>
                        <div className="input-icons mb-4">
                          <i className="fa fa-circle-user icon" />
                          <Field
                            type="text"
                            name="username"
                            id="user"
                            placeholder="Username"
                            className="username-input"
                          />
                          <ErrorMessage name="username">
                            {(msg) => <div className="error">{msg}</div>}
                          </ErrorMessage>
                        </div>

                        <div className="input-icons mb-3">
                          <i className="fa fa-lock icon" />
                          <Field
                            type={showPassword.type}
                            name="password"
                            id="pass"
                            placeholder="Password"
                            className="username-input"
                          />
                          <i
                            className={`${showPassword.class} eye-icon`}
                            id="eye-icon"
                            onClick={toggleShowPassword}
                          />
                          <ErrorMessage name="password">
                            {(msg) => <div className="error">{msg}</div>}
                          </ErrorMessage>
                        </div>

                        <div
                          role="presentation"
                          className="forgot-pass mb-3"
                          onClick={handleToggleForgotPassword}
                        >
                          Forgot Password?
                        </div>

                        <div className="form-check mb-3">
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

                        <button className="login-btn" type="submit">Login</button>
                    </Form>
                    <div className="text-end mt-2">
                      <p
                        role="presentation"
                        className="sign-up text-white"
                        onClick={handleToggleSignup}
                        style={{
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                      >
                        Signup
                      </p>
                    </div>
                    <div className="text-start mt-2">
                      <a href="http://40.114.33.183:8080/oauth2-service/oauth2/authorize?response_type=code&client_id=moodle&redirect_uri=http://127.0.0.1:3000/authlogin&scope=openid">
                        Login with Auth
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
      </div>
    </Formik>
  );
};
export default LoginForm;
