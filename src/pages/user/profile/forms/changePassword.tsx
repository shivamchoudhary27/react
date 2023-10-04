import * as Yup from "yup";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { putData } from "../../../../adapters/coreservices";
import TimerAlertBox from "../../../../widgets/alert/timerAlert";
import FieldLabel from "../../../../widgets/formInputFields/labels";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import { LoadingButton } from "../../../../widgets/formInputFields/buttons";
import FieldTypeText from "../../../../widgets/formInputFields/formTextField";
import FieldErrorMessage from "../../../../widgets/formInputFields/errorMessage";

const initialValues = {
  newPassword: "",
  confirmPassword: "",
  currentPassword: "",
};

// Formik Yup validation === >>>
const formSchema = Yup.object({
  newPassword: Yup.string().required("New password is required"),
  currentPassword: Yup.string().required("Current password is required"),
  confirmPassword: Yup.string().required("Confirm password is required"),
});

const ChangePassword = ({
  userobj,
  togglemodalshow,
  updateAddRefresh,
}: any) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });

  // handle Form CRUD operations === >>>
  const handleFormData = (values: any, { setSubmitting, resetForm }: any) => {
    let endPoint = "user/profile/changePassword";
    setSubmitting(true);
    putData(endPoint, values)
      .then((res: any) => {
        if (res.status === 200) {
          togglemodalshow(false);
          updateAddRefresh();
          setSubmitting(false);
          resetForm();
          console.log("password update successfully.....");
        } else {
          setShowAlert(true);
          setAlertMsg({
            message:
              "Error! Unable to process the reset password request. Please try again later.",
            alertBoxColor: "alert-danger",
          });
        }
      })
      .catch((err: any) => {
        setShowAlert(true);
        if (err.response.status === 400) {
          setSubmitting(false);
          setAlertMsg({
            message: err.response.data.message,
            alertBoxColor: "alert-danger",
          });
        } else {
          setSubmitting(false);
          setAlertMsg({
            message:
              "Error! Unable to process the reset password request. Please try again later.",
            alertBoxColor: "alert-danger",
          });
        }
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <TimerAlertBox
        className="mb-3"
        showAlert={showAlert}
        alertMsg={alertMsg.message}
        variant={alertMsg.alertBoxColor}
        setShowAlert={setShowAlert}
      />
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={formSchema}
        onSubmit={(values, action) => {
          handleFormData(values, action);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="row">
            <div className="col-12 mb-3 text-start">
              <FieldLabel
                htmlfor="currentPassword"
                labelText="Current Password"
                required="required"
                className="form-label"
                star="*"
              />
              <FieldTypeText
                type="password"
                name="currentPassword"
                placeholder="Current Password"
              />
              <FieldErrorMessage
                errors={errors.currentPassword}
                touched={touched.currentPassword}
                msgText="Please enter a current password"
              />
            </div>
            <div className="col-12 mb-3 text-start">
              <FieldLabel
                htmlfor="newPassword"
                labelText="New Password"
                required="required"
                className="form-label"
                star="*"
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
            <div className="col-12 mb-3 text-start">
              <FieldLabel
                htmlfor="confirmPassword"
                labelText="Confirm Password"
                required="required"
                className="form-label"
                star="*"
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

            {isSubmitting === false ? (
              <div className="modal-buttons">
                <CustomButton
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  btnText="Update"
                />{" "}
                {userobj.id === 0 && (
                  <CustomButton
                    type="reset"
                    btnText="Remove Picture"
                    variant="outline-secondary"
                    onClick={() => setShowAlert(false)}
                  />
                )}
              </div>
            ) : (
              <LoadingButton
                variant="primary"
                btnText={"Updating..."}
                className="modal-buttons"
              />
            )}
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default ChangePassword;
