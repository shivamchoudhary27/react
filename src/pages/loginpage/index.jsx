import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Signup from "../signuppage";
import ForgotPassword from "../forgotpassword/index";
import { Formik, useField, Form } from "formik";
import * as Yup from "yup";
import { Row } from "react-bootstrap";
import logo from "../../assets/images/logo.png";
import UserContext from "../../features/context/user/user";
import { getPublicData } from "../../adapters";
import config from "../../utils/config";
import Loader from "../../widgets/loader/loader";
import "./login.scss";

const LoginForm = () => {
  const location = useLocation().search;
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);

  const [formToggle, setformtoggle] = useState("");
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

  function SubmitHandler(values) {
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

  const TextFieldInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <input className="text-input" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
  };

  const handleToggleSignup = () => {
    navigate("/?form=signup");
  };

  const handleToggleForgotPassword = () => {
    navigate("/?form=forgotpassword");
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

  const setCurrentForm = (request) => {
    if (request === "signup") {
      return <Signup />;
    } else if (request === "forgotpassword") {
      return <ForgotPassword />;
    }
  };

  const validation = Yup.object({
    username: Yup.string().required("Please enter your username"),
    password: Yup.string().min(6).required("Please enter your password"),
  });

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
                      © Copyright Ballistic Learning Pvt Ltd. All Rights
                      Reserved.
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
                    <Form>
                      <div className="input-icons mb-4">
                        <div className="input-icons mb-4">
                          {/* <i className="fa fa-user-circle-o icon"></i> */}
                          <i className="fa fa-circle-user icon" />
                          <TextFieldInput
                            type="text"
                            id="user"
                            name="username"
                            placeholder="Username"
                            className="username-input"
                          />
                        </div>
                        <div className="input-icons">
                          <i className="fa fa-lock icon" />
                          <TextFieldInput
                            type={showPassword.type}
                            id="pass"
                            name="password"
                            placeholder="Password"
                            className="username-input"
                          />
                          <i
                            className={`${showPassword.class} eye-icon`}
                            id="eye-icon"
                            onClick={toggleShowPassword}
                          ></i>
                        </div>
                        <div>
                          <p
                            role="presentation"
                            className="forgot-pass"
                            onClick={handleToggleForgotPassword}
                            style={{
                              cursor: "pointer",
                              textDecoration: "underline",
                            }}
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
                          <button className="login-btn" type="submit">
                            Login
                          </button>
                        </div>
                      </div>
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
                  </div>
                )}
              </div>
            </div>
          </Row>
        </div>
      </div>
    </Formik>
  );
};

export default LoginForm;
