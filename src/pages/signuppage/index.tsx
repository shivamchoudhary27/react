import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
// import signUpSchema from './signupValidation';
import signUpSchema from "./signupValidation";
import "../loginpage/login.scss";
import { signupData } from "../../adapters";
import SuccessModal from "../../widgets/errorhandling/successModal";
import Loader from "../../widgets/loader/loader";
const Signup = () => {
  const navigate = useNavigate();
  const [signup, setSignup] = useState(false);
  const [showPassword, setShowPassword] = useState({ status: false, type: "password", class: "fa fa-eye-slash" });
  const [showLoader, setShowLoader] = useState(false);
  const handleSignup = () => {
    const query = {
      wsfunction: "auth_email_signup_user",
      username: values.email,
      password: values.pass,
      firstname: values.fname,
      lastname: values.lname,
      email: values.email
    };
    signupData(query)
      .then(res => {
        if (res.status === 200 && res.data) {
          if (res.data.success === true) {
            setShowLoader(false);
            setSignup(true);
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const initialValues = {
    fname: "",
    lname: "",
    email: "",
    pass: ""
  };
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: () => {
      setShowLoader(true);
      handleSignup();
    }
  });
  const login = () => {
    navigate("/login");
  };
  const toggleShowPassword = () => {
    if (showPassword.type === "password") {
      setShowPassword({ status: false, type: "text", class: "fa fa-eye" });
    } else {
      setShowPassword({ status: false, type: "password", class: "fa fa-eye-slash" });
    }
  };
  return (
    <>
      <div>
        {signup === true && <SuccessModal cstate={signup} successmssg="You have successfully registered" />}
        <p className="welcome-heading">Signup</p>
        <div className="bar" />
        <p className="login-info mb-4">Please create your account.</p>
        <div className="login-loader">{showLoader === true && <Loader />}</div>
        <form onSubmit={handleSubmit}>
          <div className="input-icons input-block mb-3">
            <i className="fa fa-circle-user icon" />
            <input
              type="text"
              autoComplete="off"
              name="fname"
              id="fname"
              placeholder="First Name"
              className="username-input"
              value={values.fname}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.fname && errors.fname ? <p className="form-error text-white">{errors.fname}</p> : null}
          </div>
          <div className="input-icons input-block mb-3">
            <i className="fa fa-circle-user icon" />
            <input
              type="text"
              autoComplete="off"
              name="lname"
              id="lname"
              placeholder="Last Name"
              className="username-input"
              value={values.lname}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.lname && errors.lname ? <p className="form-error text-white">{errors.lname}</p> : null}
          </div>
          <div className="input-icons input-block mb-3">
            <i className="fa-solid fa-envelope icon" />
            <input
              type="email"
              autoComplete="off"
              name="email"
              id="email"
              placeholder="Email Id"
              className="username-input"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.email && errors.email ? <p className="form-error text-white">{errors.email}</p> : null}
          </div>
          <div className="input-icons input-block">
            <i className="fa fa-lock icon" />
            <input
              type={showPassword.type}
              autoComplete="off"
              name="pass"
              id="pass"
              placeholder="Password"
              className="username-input"
              value={values.pass}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <i className={`${showPassword.class} eye-icon`} id="eye-icon" onClick={toggleShowPassword} />
            {touched.pass && errors.pass ? <p className="form-error text-white">{errors.pass}</p> : null}
          </div>
          <div className="mt-4">
            <button className="signup-btn" type="submit" value="Submit">
              Signup
            </button>
          </div>
        </form>
        <div className="text-end mt-2">
          <p className="sign-up text-white" onClick={login} style={{ cursor: "pointer", textDecoration: "underline" }}>
            Login
          </p>
        </div>
      </div>
    </>
  );
};
export default Signup;
