import React, { useState, useEffect } from "react";
import { getData } from "../../../adapters/coreservices";
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
import "sweetalert2/src/sweetalert2.scss";
import Swal from "sweetalert2";

// Formik Yup validation === >>>
const Schema = Yup.object({
  userEmail: Yup.string().email("Invalid email").required("Email is required"),
  roleNumber: Yup.string().required("Role number is required"),
  roleId: Yup.number()
  .notOneOf([0], 'Please select a role')
  .required('This field is required'),
});

const AddUsersModal = ({
  show,
  onHide,
  addusersmodalshow,
  usersdataobj,
  refreshToggle,
  currentInstitute
}: any) => {

  const InitialValues = {
    userEmail: usersdataobj.userEmail,
    roleNumber: usersdataobj.roleNumber,
    roleId: usersdataobj.roleId === null ? 0 : usersdataobj.roleId,
  };

  const { programid, userid } = useParams();
  const parsedProgramid = parseInt(programid);
  const [showAlert, setShowAlert] = useState(false);
  const [roles, setRoles] = useState([]);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    getData(`/${currentInstitute}/roles`, {
      pageNumber: 0,
      pageSize: 20,
      contextType: 'course'
    })
    .then((result: any) => {
      if (result.data !== "" && result.status === 200) {
        setRoles(result.data.items);
      }
    })
    .catch((err: any) => {
      console.log(err);
    });
  }, []);

  useEffect(() => {
    const InitialValues = {
      userEmail: usersdataobj.userEmail,
      roleNumber: usersdataobj.roleNumber,
      roleId: usersdataobj.roleId === null ? 0 : usersdataobj.roleId,
    };
    setFormValues(InitialValues);
  }, [usersdataobj])

  const resetFormData = () => {
    const InitialValues = {
      userEmail: "",
      roleNumber: "",
      roleId: "0",
    };
    setFormValues(InitialValues);    
  }
  // handle Form CRUD operations === >>>
  const handleFormData = (values: {}, {setSubmitting}: any) => {
    values.roleId = parseInt(values.roleId)
    setSubmitting(true);
    if (usersdataobj.id !== 0) {
      putData(
        `/program/${parsedProgramid}/enrol-user/${usersdataobj.id}`,
        values
      )
        .then((res: any) => {
          if (res.data !== "" && res.status === 200) {
            // navigate(gobackLink);
            addusersmodalshow(false);
            setSubmitting(false);
            refreshToggle();
             Swal.fire({
              timer: 3000,
              width: "25em",
              color: "#666",
              icon: "success",
              background: "#e7eef5",
              showConfirmButton: false,
              text: "User has been successfully updated"
            });
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
            Swal.fire({
              timer: 3000,
              width: "25em",
              color: "#666",
              icon: "success",
              background: "#e7eef5",
              showConfirmButton: false,
              text: "User has been successfully added"
            });
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
            initialValues={formValues}
            validationSchema={Schema}
            onSubmit={(values, action) => {
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
                    htmlfor="roleId"
                    labelText="Role"
                    required="required"
                    star="*"
                  />
                  <FieldTypeSelect
                    name="roleId"
                    options={roles}
                    setcurrentvalue={setValues}
                    currentformvalue={values}
                    selectDefaultLabel='Role'
                  />
                  <FieldErrorMessage
                    errors={errors.roleId}
                    touched={touched.roleId}
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
                        onClick={() => resetFormData()}
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
