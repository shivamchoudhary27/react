import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Formik, Form } from "formik";
import FieldLabel from "../../../widgets/formInputFields/labels";
import FieldTypeText from "../../../widgets/formInputFields/formTextField";
import FieldErrorMessage from "../../../widgets/formInputFields/errorMessage";
import { putData } from "../../../adapters/coreservices";
import config from "../../../utils/config";
import * as Yup from "yup";
import Errordiv from "../../../widgets/alert/errordiv";

const initialValues = {
  newPassword: "",
  confirmPassword: "",
};

const ResetPasswordForm = () => {
  const location = useLocation().search;
  const [requestToken, setRequestToken] = useState<string | null>(null);
  const redirectUri = config.REDIRECT_URI;
  const oAuthUrl = `${config.OAUTH2_URL}/authorize?response_type=code&client_id=moodle&redirect_uri=${redirectUri}&scope=openid`;
  const [alertStatus, setAlertStatus] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });

  // Formik Yup validation === >>>
  const userFormSchema = Yup.object({
    newPassword: Yup.string().required(),
    confirmPassword: Yup.string()
      .required()
      .test("passwords-match", "Passwords must match", function (value) {
        return value === this.parent.newPassword;
      }),
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(location);
    setRequestToken(urlParams.get("token"));
  }, [location]);

  // handle Form CRUD operations === >>>
  const handleFormData = (values: any, { setSubmitting, resetForm }: any) => {
    let endPoint = `/public/resetPassword?token=${requestToken}`;
    putData(endPoint, values)
      .then((res: any) => {
        if (res.status === 200) {
          setAlertStatus(true);
          setAlertMsg({
            message: "Password successfully updated. You can now sign in using your new password.",
            alertBoxColor: "",
          });
        } else {
          setAlertStatus(true);
          setAlertMsg({
            message: "Error! Unable to process the reset password request. Please try again later.",
            alertBoxColor: "alert-danger",
          });
        }
      })
      .catch((err: any) => {
        setAlertStatus(true);
          setAlertMsg({
            message: "Error! Unable to process the reset password request. Please try again later.",
            alertBoxColor: "alert-danger",
          });
      });
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
        {({ errors, touched, isSubmitting, setValues, values }) => (
          <Form className="row">
            <div className="col-12 mb-4 text-start">
              <FieldLabel
                htmlfor="newPassword"
                labelText="New Password"
                required="required"
                className="form-label"
              />
              <FieldTypeText
                type="password"
                name="newPassword"
                placeholder="New Password"
              />
              <FieldErrorMessage
                errors={errors.newPassword}
                touched={touched.newPassword}
                msgText="Please enter a new password"
              />
            </div>
            <div className="col-12 mb-4 text-start">
              <FieldLabel
                htmlfor="confirmPassword"
                labelText="Confirm Password"
                required="required"
                className="form-label"
              />
              <FieldTypeText
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
              />
              <FieldErrorMessage
                errors={errors.confirmPassword}
                touched={touched.confirmPassword}
                msgText="Please re-enter password that must match new password"
              />
            </div>
            <div className="col-12 mb-4 d-grid">
              <Button type="submit" variant="primary">
                Submit
              </Button>{" "}
            </div>
          </Form>
        )}
      </Formik>
      <p>
        Go to{" "}
        <a href={oAuthUrl} className="ms-1">
          Sign in
        </a>
      </p>
    </React.Fragment>
  );
};

export default ResetPasswordForm;
