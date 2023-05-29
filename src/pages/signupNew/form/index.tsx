import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import { Formik, Form } from "formik";
import FieldLabel from "../../../widgets/formInputFields/labels";
import FieldTypeText from "../../../widgets/formInputFields/formTextField";
import FieldErrorMessage from "../../../widgets/formInputFields/errorMessage";
import FieldTypeSelect from "../../../widgets/formInputFields/formSelectField";
import { CountryList } from "../data";
import { useNavigate } from "react-router-dom";
import { postData } from "../../../adapters/coreservices";
import * as Yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

const END_POINT = "https://www.google.comrecaptcha/api/siteverify";
const SITE_KEY = "6LejSUAmAAAAAFmngSNYvY8SzmyGbwlvEGCAG08l";
const SECRET_KEY = "6LejSUAmAAAAANhFWyJKv7Bn-OrZDNY01iYG7wkg";

const SignupForm = () => {
  const navigate = useNavigate();
  const [verified, setVerified] = useState(true);
  const [captchaValue, setCaptchaValue] = useState("");
  const captchaRef = useRef();

  const initialValues = {
    username: "",
    lastName: "",
    firstName: "",
    email: "",
    password: "",
    country: "",
    recaptcha:""
  };
  // Formik Yup validation === >>>
  const userFormSchema = Yup.object({
    username: Yup.string().trim().min(4).required(),
    password: Yup.string().min(5).trim().required(),
    email: Yup.string().email().required(),
    firstName: Yup.string().min(1).trim().required(),
    lastName: Yup.string().min(1).trim().required(),
    country: Yup.string().required(),
    recaptcha: Yup.string().required()
  });

  // handle Form CRUD operations === >>>
  const handleFormData = (values: any, { setSubmitting, resetForm, setFieldError }: any) => {
    console.log(values)
    values.idnumber = 98789871;
    values.city = "Delhi";
    postData("/user/signup", values)
      .then((res: any) => {
        console.log("res", res);
        if(values.recaptcha !== ""){
          if (res.status === 201 || res.status === 200) {
            window.alert("Registration successful");
          } else {
            window.alert("Some error occurred");
          }
        }else{
          alert("Captcha Required!")
          // setFieldError('recaptcha', 'reCAPTCHA verification is required');
          // setSubmitting(false);
        }
        navigate("/");
      })
      .catch((err: any) => {
        if (err.response.status === 404) {
          window.alert(err.response.data.message);
        } else {
          window.alert("Some error occurred");
        }
      });
  };

  return (
    <React.Fragment>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={userFormSchema}
        onSubmit={(values, action) => {
          console.log(values)
          handleFormData(values, action);
        }}
      >
        {({ errors, touched, isSubmitting, setValues, values, setFieldValue }) => (
          <Form className="row">                
            <div className="col-lg-6 mb-3 text-start">
              <FieldLabel
                htmlfor="username"
                labelText="Username"
                required="required"
                className="form-label"
              />
              <FieldTypeText name="username" placeholder="Username" />
              <FieldErrorMessage
                errors={errors.username}
                touched={touched.username}
                msgText="Required with minimum 4-20 characters."
              />
            </div>

            <div className="col-lg-6 mb-3 text-start">
              <FieldLabel
                htmlfor="password"
                labelText="Password"
                required="required"
                className="form-label"
              />
              <FieldTypeText
                type="password"
                name="password"
                placeholder="Password"
              />
              <FieldErrorMessage
                errors={errors.password}
                touched={touched.password}
                msgText="Required with minimum 5 characters."
              />
            </div>

            <div className="col-lg-6 mb-3 text-start">
              <FieldLabel
                htmlfor="firstName"
                labelText="First name"
                required="required"
                className="form-label"
              />
              <FieldTypeText name="firstName" placeholder="First Name" />
              <FieldErrorMessage
                errors={errors.firstName}
                touched={touched.firstName}
                msgText="Required."
              />
            </div>

            <div className="col-lg-6 mb-3 text-start">
              <FieldLabel
                htmlfor="lastName"
                labelText="Last name"
                required="required"
                className="form-label"
              />
              <FieldTypeText name="lastName" placeholder="Last Name" />
              <FieldErrorMessage
                errors={errors.lastName}
                touched={touched.lastName}
                msgText="Required."
              />
            </div>

            <div className="col-lg-6 mb-4 text-start">
              <FieldLabel
                htmlfor="email"
                labelText="Email"
                required="required"
                className="form-label"
              />
              <FieldTypeText name="email" placeholder="Email" />
              <FieldErrorMessage
                errors={errors.email}
                touched={touched.email}
                msgText="Required."
              />
            </div>

            <div className="col-lg-6 mb-4 text-start">
              <FieldLabel
                htmlfor="country"
                labelText="Country"
                required="required"
                className="form-label"
              />
              <FieldTypeSelect
                name="country"
                options={CountryList}
                setcurrentvalue={setValues}
                currentformvalue={values}
              />
              <FieldErrorMessage
                errors={errors.country}
                touched={touched.country}
                msgText="Required please select country."
              />
            </div>
            <div className="mb-4">
              <ReCAPTCHA
                sitekey={SITE_KEY}
                onChange={(value: any) => setFieldValue('recaptcha', value)}
              />
              <FieldErrorMessage
                errors={errors.recaptcha}
                touched={touched.recaptcha}
                msgText="Captcha Required."
              />
              <p></p>
            </div>
            <div className="col-12 mb-4 d-grid">
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                Sign up
              </Button>{" "}
            </div>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default SignupForm;
