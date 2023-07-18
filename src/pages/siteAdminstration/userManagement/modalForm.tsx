import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, ErrorMessage } from "formik";
import FieldLabel from "../../../widgets/formInputFields/labels";
import FieldTypeText from "../../../widgets/formInputFields/formTextField";
import FieldErrorMessage from "../../../widgets/formInputFields/errorMessage";
import FieldTypeSelect from "../../../widgets/formInputFields/formSelectField";
import CustomButton from "../../../widgets/formInputFields/buttons";
import CountryList from "../../../globals/country";
import * as Yup from "yup";
import { postData, putData } from "../../../adapters/coreservices";
// import FieldTypeCheckbox from "../../../widgets/formInputFields/formCheckboxField";
import TimerAlertBox from "../../../widgets/alert/timerAlert";
import { LoadingButton } from "../../../widgets/formInputFields/buttons";
import FieldTypeCheckbox from "../../../widgets/formInputFields/formCheckboxField";

const AddUserModal = ({
  show,
  onHide,
  userobj,
  togglemodalshow,
  updateAddRefresh,
  currentInstitute,
}: any) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });

  const initialValues = {
    userFirstName: userobj.userFirstName,
    userLastName: userobj.userLastName,
    userEmail: userobj.userEmail,
    userCountry: userobj.userCountry,
    enabled: userobj.enabled,
    // shouldValidatePassword: userobj.id > 0 ? false : true,
  };

  // Formik Yup validation === >>>
  const userFormSchema = Yup.object({
    userEmail: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    userFirstName: Yup.string()
      .min(3, "First name must be at least 1 characters")
      .test('character-allowed', 'Only specific characters are allowed', function (value) {
        return /^[A-Za-z]+$/.test(value);
      })
      .trim()
      .required("First name is required"),
    userLastName: Yup.string()
      .min(1, "Last name must be at least 1 characters")
      .test('character-allowed', 'Only specific characters are allowed', function (value) {
        return /^[A-Za-z]+$/.test(value);
      })
      .trim()
      .required("Last name is required"),
    userCountry: Yup.string().required("Country is required"),
  });

  // handle Form CRUD operations === >>>
  const handleFormData = (values: {}, { setSubmitting, resetForm }: any) => {
    setSubmitting(true);
    if (userobj.id === 0) {
      postData(`/${currentInstitute}/users`, values)
        .then((res: any) => {
          if ((res.data !== "", res.status === 201)) {
            togglemodalshow(false);
            updateAddRefresh();
            setSubmitting(false);
            resetForm();
          }
        })
        .catch((err: any) => {
          console.log(err);
          if (err.response.status === 404) {
            setSubmitting(false);
            setShowAlert(true);
            setAlertMsg({
              message: `${err.response.data.message}. Please Sign up with a new email`,
              alertBoxColor: "danger",
            });
          }
        });
    } else {
      setSubmitting(true);
      putData(`/${currentInstitute}/users/${userobj.id}`, values)
        .then((res: any) => {
          if ((res.data !== "", res.status === 200)) {
            togglemodalshow(false);
            updateAddRefresh();
            setSubmitting(false);
          }
        })
        .catch((err: any) => {
          console.log(err);
          setSubmitting(true);
        });
    }
  };

  return (
    <React.Fragment>
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {userobj.id === 0 ? "Add User" : "Update User"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={userFormSchema}
            onSubmit={(values, action) => {
              handleFormData(values, action);
            }}
          >
            {({ errors, touched, isSubmitting, setValues, values }) => (
              <Form>
                <div className="mb-3">
                  <FieldLabel
                    htmlfor="userFirstName"
                    labelText="First Name"
                    required="required"
                    star="*"
                  />
                  <FieldTypeText
                    name="userFirstName"
                    placeholder="First Name"
                  />
                  <FieldErrorMessage
                    errors={errors.userFirstName}
                    touched={touched.userFirstName}
                    msgText="First Name is required"
                  />
                </div>

                <div className="mb-3">
                  <FieldLabel
                    htmlfor="userLastName"
                    labelText="Last Name"
                    required="required"
                    star="*"
                  />
                  <FieldTypeText name="userLastName" placeholder="Last Name" />
                  <FieldErrorMessage
                    errors={errors.userLastName}
                    touched={touched.userLastName}
                    msgText="Last Name is required"
                  />
                </div>

                <div className="mb-3">
                  <FieldLabel
                    htmlfor="userEmail"
                    labelText="Email"
                    required="required"
                    star="*"
                  />
                  <FieldTypeText name="userEmail" placeholder="Email" />
                  <FieldErrorMessage
                    errors={errors.userEmail}
                    touched={touched.userEmail}
                    msgText="Email is required"
                  />
                </div>
                <div className="mb-3">
                  <FieldLabel
                    htmlfor="userCountry"
                    labelText="Country"
                    required="required"
                  />
                  <FieldTypeSelect
                    name="userCountry"
                    options={CountryList}
                    setcurrentvalue={setValues}
                    currentformvalue={values}
                    selectDefaultLabel={"Country"}
                  />
                  <FieldErrorMessage
                    errors={errors.userCountry}
                    touched={touched.userCountry}
                    msgText="Please select country"
                  />
                </div>

                <div className="mb-3">
                  <FieldTypeCheckbox name="enabled" checkboxLabel="Enable" />{" "}
                  <FieldErrorMessage
                    errors=""
                    touched=""
                    msgText="Please Check required field"
                  />
                </div>

                {isSubmitting === false ? (
                  <div className="modal-buttons">
                    <CustomButton
                      type="submit"
                      variant="primary"
                      disabled={isSubmitting}
                      btnText={userobj.id === 0 ? "Submit" : "Update"}
                    />{" "}
                    {userobj.id === 0 && (
                      <CustomButton
                        type="reset"
                        btnText="Reset"
                        variant="outline-secondary"
                        onClick={() => setShowAlert(false)}
                      />
                    )}
                  </div>
                ) : (
                  <LoadingButton
                    variant="primary"
                    btnText={userobj.id === 0 ? "Submitting..." : "Updating"}
                    className="modal-buttons"
                  />
                )}
              </Form>
            )}
          </Formik>
          <TimerAlertBox
            alertMsg={alertMsg.message}
            className="mt-3"
            variant={alertMsg.alertBoxColor}
            setShowAlert={setShowAlert}
            showAlert={showAlert}
          />
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default AddUserModal;
