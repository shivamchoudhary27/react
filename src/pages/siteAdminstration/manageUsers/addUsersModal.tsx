import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form } from "formik";
import FieldLabel from "../../../widgets/formInputFields/labels";
import FieldErrorMessage from "../../../widgets/formInputFields/errorMessage";
import FieldTypeText from "../../../widgets/formInputFields/formTextField";
import FieldTypeSelect from "../../../widgets/formInputFields/formSelectField";
import CustomButton from "../../../widgets/formInputFields/buttons";
import { useParams } from "react-router-dom";
import { putData, postData } from "../../../adapters/microservices";
import * as Yup from "yup";
import { LoadingButton } from "../../../widgets/formInputFields/buttons";
import TimerAlertBox from "../../../widgets/alert/timerAlert";

// Formik Yup validation === >>>
const Schema = Yup.object({
  userEmail: Yup.string().required(),
  roleNumber: Yup.string().required(),
  role: Yup.string().required(),
});

const roleData = [
  { id: "manager", name: "Manager" },
  { id: "student", name: "Student" },
  { id: "editingteacher", name: "Teacher" },
  { id: "teacher", name: "Non-editing teacher" },
];

const AddUsersModal = ({
  show,
  onHide,
  addusersmodalshow,
  usersdataobj,
  refreshToggle,
}: any) => {
  const InitialValues = {
    userEmail: usersdataobj.email,
    roleNumber: usersdataobj.roleNo,
    role: usersdataobj.role,
  };
  const { programid, userid } = useParams();
  const parsedProgramid = parseInt(programid);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });

  // handle Form CRUD operations === >>>
  const handleFormData = (values: {}, {setSubmitting}: any) => {
    setSubmitting(true);
    if (usersdataobj.id !== 0) {
      console.log(JSON.stringify(values));
      putData(
        `/program/${parsedProgramid}/enrol-user/${usersdataobj.id}`,
        values
      )
        .then((res: any) => {
          console.log(res);
          if (res.data !== "" && res.status === 200) {
            // navigate(gobackLink);
            addusersmodalshow(false);
            setSubmitting(false);
            refreshToggle();
          }
        })
        .catch((err: any) => {
          console.log(err);
          setSubmitting(false);
          if (err.response.status === 400) {
            setShowAlert(true);
            setAlertMsg({
              message: err.response.data.message,
              alertBoxColor: "danger",
            });
          }
        });
    } else {
      setSubmitting(true);
      postData(`program/${parsedProgramid}/enrol-user`, values)
        .then((res: any) => {
          if (res.data !== "" && res.status === 201) {
            // navigate(gobackLink);
            addusersmodalshow(false);
            setSubmitting(false);
            refreshToggle();
          }
        })
        .catch((err: any) => {
          setSubmitting(false);
          if (err.response.status === 400) {
            setShowAlert(true);
            setAlertMsg({
              message: err.response.data.message,
              alertBoxColor: "danger",
            });
          }
          if (err.response.status === 404) {
            setShowAlert(true);
            setAlertMsg({
              message: err.response.data.message,
              alertBoxColor: "danger",
            });
          }
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
            {usersdataobj.id === 0 ? "Add Users" : "Update Users"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            enableReinitialize={true}
            initialValues={InitialValues}
            validationSchema={Schema}
            onSubmit={(values, action) => {
              console.log(values);
              handleFormData(values, action);
            }}
          >
            {({ errors, touched, isSubmitting, setValues, values }) => (
              <Form>
                <div className="mb-3">
                  {usersdataobj.id !== 0 ? (
                    <>
                      <label>Email</label>
                      <br />
                      <input
                        className="form-control"
                        type="email"
                        value={InitialValues.userEmail}
                        disabled
                      />
                    </>
                  ) : (
                    <>
                      <FieldLabel
                        htmlfor="userEmail"
                        labelText="Email"
                        required="required"
                        star="*"
                      />
                      <FieldTypeText
                        name="userEmail"
                        placeholder="Email"
                        type="email"
                      />
                      <FieldErrorMessage
                        errors={errors.userEmail}
                        touched={touched.userEmail}
                        msgText="Email Required"
                      />
                    </>
                  )}
                </div>

                <div className="mb-3">
                  <FieldLabel
                    htmlfor="roleNumber"
                    labelText="Role No"
                    required="required"
                    star="*"
                  />
                  <FieldTypeText name="roleNumber" placeholder="Role No" />
                  <FieldErrorMessage
                    errors={errors.roleNumber}
                    touched={touched.roleNumber}
                    msgText="Role Number Required"
                  />
                </div>

                <div className="mb-3">
                  <FieldLabel
                    htmlfor="role"
                    labelText="Role"
                    required="required"
                    star="*"
                  />
                  <FieldTypeSelect
                    name="role"
                    options={roleData}
                    setcurrentvalue={setValues}
                    currentformvalue={values}
                  />
                  <FieldErrorMessage
                    errors={errors.role}
                    touched={touched.role}
                    msgText="Please Select Role"
                  />
                </div>

                {isSubmitting === false ? (
                  <div className="modal-buttons">
                    <CustomButton
                      type="submit"
                      variant="primary"
                      isSubmitting={isSubmitting}
                      btnText={usersdataobj.id === 0 ? "Submit" : "Update"}
                    />{" "}
                    {usersdataobj.id === 0 && (
                      <CustomButton
                        type="reset"
                        btnText="Reset"
                        variant="outline-secondary"
                      />
                    )}
                  </div>
                ) : (
                  <LoadingButton
                    variant="primary"
                    btnText={
                      usersdataobj.id === 0 ? "Submitting..." : "Updating..."
                    }
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

export default AddUsersModal;
