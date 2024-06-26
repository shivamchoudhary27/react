import * as Yup from "yup";
import Swal from "sweetalert2";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "sweetalert2/src/sweetalert2.scss";
import TimerAlertBox from "../../../widgets/alert/timerAlert";
import FieldLabel from "../../../widgets/formInputFields/labels";
import CustomButton from "../../../widgets/formInputFields/buttons";
import { postData, putData } from "../../../adapters/microservices";
import WaveBottom from "../../../assets/images/background/bg-modal.svg";
import { LoadingButton } from "../../../widgets/formInputFields/buttons";
import FieldTypeText from "../../../widgets/formInputFields/formTextField";
import FieldErrorMessage from "../../../widgets/formInputFields/errorMessage";
import { capitalizeFirstWords } from "../../../globals/titleCapitalize/capitalizeFirstWords";

const AddUserModal = ({
  show,
  onHide,
  userobj,
  togglemodalshow,
  updateAddRefresh,
}: any) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });

  const initialValues = {
    name: userobj.name,
    userEmail: userobj.userEmail,
    shortCode: userobj.shortCode,
    instanceUrl: userobj.instanceUrl,
    webServiceToken: userobj.webServiceToken,
    locked: userobj.locked,
  };

  // Formik Yup validation === >>>
  const userFormSchema = Yup.object({
    name: Yup.string().trim().required("Name is required"),
    userEmail: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    shortCode: Yup.string().trim().required("Short code is required"),
    // lastName: Yup.string().min(1).trim().required(),
  });

  // handle Form CRUD operations === >>>
  const handleFormData = (values: {}, { setSubmitting, resetForm }: any) => {
    setSubmitting(true);
    if (userobj.id === 0) {
      postData("/institutes", values)
        .then((res: any) => {
          if ((res.data !== "", res.status === 201)) {
            togglemodalshow(false);
            setSubmitting(false);
            updateAddRefresh();
            Swal.fire({
              timer: 3000,
              width: "25em",
              color: "#666",
              icon: "success",
              background: "#e7eef5",
              showConfirmButton: false,
              text: "Institute has been successfully added"
            });
            resetForm();
          }
        })
        .catch((err: any) => {
          console.log(err)
          setSubmitting(false);
          if (err.response.status === 404 || 400) {
            setShowAlert(true);
            setAlertMsg({
              message: `${err.response.data.message}.`,
              alertBoxColor: "danger",
            });
          }
          // if (err.response.status === 400) {
          //   setShowAlert(true);
          //   setAlertMsg({
          //     message: `${err.response.data.message}.`,
          //     alertBoxColor: "danger",
          //   });
          // }
        });
    } else {
      setSubmitting(true);
      putData(`/institutes/${userobj.id}`, values)
        .then((res: any) => {
          if ((res.data !== "", res.status === 200)) {
            togglemodalshow(false);
            setSubmitting(false);
            updateAddRefresh();
            Swal.fire({
              timer: 3000,
              width: "25em",
              color: "#666",
              icon: "success",
              background: "#e7eef5",
              showConfirmButton: false,
              text: "Institute has been successfully updated"
            });
          }
        })
        .catch((err: any) => {
          setSubmitting(false);
          if (err.response.status === 500 || 400) {
            setShowAlert(true);
            setAlertMsg({
              message: `${err.response.data.message}.`,
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
        className="modal-design-wrapper"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {userobj.id === 0 ? capitalizeFirstWords("Add Institute") : capitalizeFirstWords("Update Institute")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <TimerAlertBox
            alertMsg={alertMsg.message}
            className="mt-3"
            variant={alertMsg.alertBoxColor}
            setShowAlert={setShowAlert}
            showAlert={showAlert}
          />
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
                    htmlfor="name"
                    labelText="Name"
                    required="required"
                    star="*"
                  />
                  <FieldTypeText name="name" placeholder="Name" />
                  <FieldErrorMessage
                    errors={errors.name}
                    touched={touched.name}
                    msgText="Name is Required"
                  />
                </div>
                <div className="mb-3">
                  <FieldLabel
                    htmlfor="userEmail"
                    labelText="User Email"
                    required="required"
                    star="*"
                  />
                  <FieldTypeText name="userEmail" placeholder="User Email" />
                  <FieldErrorMessage
                    errors={errors.userEmail}
                    touched={touched.userEmail}
                    msgText="User Email is Required"
                  />
                </div>
                <div className="mb-3">
                  <FieldLabel
                    htmlfor="shortCode"
                    labelText="Short Code"
                    required="required"
                    star="*"
                  />
                  <FieldTypeText name="shortCode" placeholder="Short Code" />
                  <FieldErrorMessage
                    errors={errors.shortCode}
                    touched={touched.shortCode}
                    msgText="Short Code is Required"
                  />
                </div>
                {isSubmitting === false ? (
                  <div className="modal-buttons">
                    <CustomButton
                      type="submit"
                      variant="primary"
                      // isSubmitting={isSubmitting}
                      btnText={userobj.id === 0 ? "Submit" : "Update"}
                    />{" "}
                    {userobj.id === 0 && (
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
                    btnText={userobj.id === 0 ? "Submitting..." : "Updating..."}
                    className="modal-buttons"
                  />
                )}
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <img src={WaveBottom} alt="WaveBottom" className="wavebg"/>
      </Modal>
    </React.Fragment>
  );
};

export default AddUserModal;
