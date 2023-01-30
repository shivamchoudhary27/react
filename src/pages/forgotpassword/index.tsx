import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { signupData } from "../../adapters";
import Loader from "../../widgets/loader/loader";
import SuccessModal from "../../widgets/errorhandling/successModal";
import "../loginpage/login.scss";
import * as Yup from "yup";
import {ForgotPasswordType} from "../../type/index";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);
  const [response, setResponse] = useState<ForgotPasswordType>({ status: false, success: false, msg: '' });
  const processRequest = (email: any) => {
    const query = {
      wsfunction: "core_auth_request_password_reset",
      email: email
    };
    signupData(query)
      .then(res => {
        console.log(res.data);
        if (res.data.status !== "emailpasswordconfirmmaybesent") {
          setResponse({ status: true, success: false, msg: "Falied! Enter email address" });
        } else if (res.data.status === "emailpasswordconfirmmaybesent") {
          setResponse({ status: true, success: true, msg: res.data.notice });
        }
        setShowLoader(false);
      })
      .catch(err => {
        console.log(err);
        setShowLoader(false);
      });
  };
  const initialValues = {
    email: ""
  };
  const values = useFormik({
    initialValues,
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Please enter your email")
    }),
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: (values, action) => {
      setShowLoader(true);
      processRequest(values.email);
      setShowLoader(false);
      action.resetForm();
    }
  });
  const handleCancle = () => {
    navigate("/login");
  };
  return (
    <div>
      {response.status === true && response.success === true && <SuccessModal cstate={response.status} successmssg={response.msg.replace(/(<([^>]+)>)/gi, "")} />}
      <p className="welcome-heading">Forgot password</p>
      <div className="bar" />
      <p className="login-info mb-4">Please enter your email id.</p>

      <div className="login-loader">{showLoader === true && <Loader />}</div>
      {response.status === true && response.success === false && <p className="login-info errorAlert">{response.msg}</p>}

      <form onSubmit={values.handleSubmit}>
        <div className="input-icons input-block mb-3">
          <i className="fa-solid fa-envelope icon" />
          <input
            type="email"
            autoComplete="off"
            name="email"
            id="email"
            placeholder="Email Id"
            className="username-input"
            value={values.name}
            onChange={values.handleChange}
            onBlur={values.handleBlur}
          />
          {values.touched.email && values.errors.email ? <p className="form-error text-white">{values.errors.email}</p> : null}
        </div>
        <div className="mt-4">
          <button className="signup-btn" type="submit" value="request">
            Request Password Reset
          </button>
        </div>
      </form>
      <div className="text-end mt-2">
        <p className="sign-up text-white" onClick={handleCancle} style={{ cursor: "pointer", textDecoration: "underline" }}>
          Login
        </p>
      </div>
    </div>
  );
};
export default ForgotPassword;
