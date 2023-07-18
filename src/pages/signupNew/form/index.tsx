import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Formik, Form } from "formik";
import FieldLabel from "../../../widgets/formInputFields/labels";
import FieldTypeText from "../../../widgets/formInputFields/formTextField";
import FieldErrorMessage from "../../../widgets/formInputFields/errorMessage";
import FieldTypeSelect from "../../../widgets/formInputFields/formSelectField";
import CountryList from "../../../globals/country";
import { postData } from "../../../adapters/coreservices";
import * as Yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import googleReCaptcha from "../../../utils/recaptcha";
import Errordiv from "../../../widgets/alert/errordiv";

const SignupForm = () => {
  const [alertStatus, setAlertStatus] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });

  const initialValues = {
    lastName: "",
    firstName: "",
    email: "",
    country: "",
    recaptcha: "",
  };
  // Formik Yup validation === >>>
  const userFormSchema = Yup.object({
    email: Yup.string().email().required("Email is required"),
    firstName: Yup.string()
      .min(1)
      .test(
        "character-allowed",
        "Only specific characters are allowed",
        function (value) {
          return /^[A-Za-z]+$/.test(value);
        }
      )
      .trim()
      .required("First name is required"),
    lastName: Yup.string()
      .min(1)
      .test(
        "character-allowed",
        "Only specific characters are allowed",
        function (value) {
          return /^[A-Za-z]+$/.test(value);
        }
      )
      .trim()
      .required("Last name is required"),
    country: Yup.string().required("Country is required"),
    recaptcha: Yup.string().required("Recaptcha is required"),
  });

  // handle Form CRUD operations === >>>
  const handleFormData = (
    values: any,
    { setSubmitting, resetForm, setFieldError }: any
  ) => {
    values.idnumber = 98789871;
    values.city = "Delhi";
    if (values.recaptcha !== "") {
      postData("/user/signup", values)
        .then((res: any) => {
          if (res.status === 201 || res.status === 200) {
            setAlertStatus(true);
            setAlertMsg({
              message:
                "Signup Successful! Please check your email to confirm your signup.",
              alertBoxColor: "",
            });
          } else {
            setAlertStatus(true);
            setAlertMsg({
              message: "Some error occurred, Please try again",
              alertBoxColor: "alert-warning",
            });
          }
        })
        .catch((err: any) => {
          if (err.response.status === 404) {
            setAlertStatus(true);
            setAlertMsg({
              message:
                "This user already exists. Please Sign up with a new email",
              alertBoxColor: "alert-warning",
            });
          } else {
            setAlertStatus(true);
            setAlertMsg({
              message: "Some error occurred, Please try again!",
              alertBoxColor: "alert-danger",
            });
          }
        });
    }
  };

  return (
    <React.Fragment>
      {alertStatus === true && (
        <Errordiv
          msg={alertMsg.message}
          cstate
          className="mt-3"
          alertColor={alertMsg.alertBoxColor}
        />
      )}
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={userFormSchema}
        onSubmit={(values, action) => {
          handleFormData(values, action);
        }}
      >
        {({
          errors,
          touched,
          isSubmitting,
          setValues,
          values,
          setFieldValue,
        }) => (
          <Form className="row">
            <div className="col-lg-6 mb-3 text-start">
              <FieldLabel
                htmlfor="firstName"
                labelText="First name"
                required="required"
                className="form-label"
                star="*"
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
                star="*"
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
                star="*"
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
                star="*"
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
                sitekey={googleReCaptcha.SITE_KEY}
                onChange={(value: any) => setFieldValue("recaptcha", value)}
              />
              <FieldErrorMessage
                errors={errors.recaptcha}
                touched={touched.recaptcha}
                msgText="Captcha Required."
              />
            </div>
            <div className="col-12 mb-4 d-grid">
              <Button type="submit" variant="primary">
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
