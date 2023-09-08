import * as Yup from "yup";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Formik, Form, Field } from "formik";
import TimerAlertBox from "../../../../widgets/alert/timerAlert";
import FieldLabel from "../../../../widgets/formInputFields/labels";
import { postData, putData } from "../../../../adapters/microservices";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import { LoadingButton } from "../../../../widgets/formInputFields/buttons";
import FieldErrorMessage from "../../../../widgets/formInputFields/errorMessage";

// Formik Yup validation === >>>
const departmentSchema = Yup.object({
  // workLoad: Yup.number()
  //   .integer("Number must be an integer")
  //   .positive("Number must be positive")
  //   .required("Number is required"),
});

const WorkLoadModal = ({
  show,
  onHide,
  workLoadObj,
  departmentList,
  togglemodalshow,
  currentInstitute,
  refreshClassroomData,
  filterUpdate,
  workLoadApiResponseData,
}: any) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({
    message: "",
    alertBoxColor: "",
  });

  // Initial values of react table === >>>
  const initialValues = {
    workLoad: workLoadObj.workLoad !== 0 ? workLoadObj.workLoad : workLoadApiResponseData.default_workload,
    defaultUserWorkload: workLoadApiResponseData.default_workload,
  };

  // custom Obj & handle form data === >>>
  let formTitles = {
    titleHeading: "",
    btnTitle: "",
  };
  if (workLoadObj.id === 0) {
    formTitles = {
      titleHeading: "Set Faculty Default Work Load",
      btnTitle: "Submit",
    };
  } else {
    formTitles = {
      titleHeading: "Update Work Load",
      btnTitle: "Update",
    };
  }

  // handle Form CRUD operations === >>>
  const handleFormData = (values: any, { setSubmitting, resetForm }: any) => {
    if (workLoadObj.id === 0) {
      delete values.workLoad;
      let endPoint = `/${currentInstitute}/timetable/userworkload/set/default/workload`;
      postData(endPoint, values)
        .then((res: any) => {
          if (res.data !== "") {
            togglemodalshow(false);
            setSubmitting(false);
            refreshClassroomData();
            resetForm();
          }
        })
        .catch((err: any) => {
          setSubmitting(false);
          setShowAlert(true);
          setAlertMsg({
            message: "Failed to add department! Please try again.",
            alertBoxColor: "danger",
          });
        });
    } else {
      if(workLoadObj.workLoad === 0 ){
        values = {workLoad: values.defaultUserWorkload}
      }
      delete values.defaultUserWorkload;
      console.log(values)
      let endPoint = `/${currentInstitute}/timetable/userworkload/${workLoadObj.id}`;
      setSubmitting(true);
      putData(endPoint, values)
        .then((res: any) => {
          if (res.data !== "" && res.status === 200) {
            togglemodalshow(false);
            setSubmitting(false);
            refreshClassroomData();
            resetForm();
          }
        })
        .catch((err: any) => {
          setSubmitting(false);
          setShowAlert(true);
          setAlertMsg({
            message: "Failed to update department! Please try again.",
            alertBoxColor: "danger",
          });
        });
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {formTitles.titleHeading}
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
          initialValues={initialValues}
          validationSchema={departmentSchema}
          onSubmit={(values, action) => {
            handleFormData(values, action);
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              {workLoadObj.id > 0 && (
                <div className="mb-3">
                  <FieldLabel htmlfor="" labelText="Faculty" />
                  <span className="mx-2">{`${workLoadObj.userFirstName} ${workLoadObj.userLastName} (${workLoadObj.userEmail})`}</span>
                </div>
              )}

              <div className="mb-3">
                <FieldLabel
                  htmlfor={
                    workLoadObj.id > 0 ? "workLoad" : "defaultUserWorkload"
                  }
                  labelText="Load Per Week (Hours)"
                  required="required"
                  star="*"
                />
                <Field
                  type="number"
                  name={workLoadObj.id > 0 ? "workLoad" : "defaultUserWorkload"}
                  className="form-control"
                  placeholder="Hours"
                />
                <FieldErrorMessage
                  errors={
                    workLoadObj.id > 0
                      ? errors.workLoad
                      : errors.defaultUserWorkload
                  }
                  touched={
                    workLoadObj.id > 0
                      ? touched.workLoad
                      : touched.defaultUserWorkload
                  }
                />
              </div>

              {isSubmitting === false ? (
                <div className="modal-buttons">
                  <CustomButton
                    type="submit"
                    variant="primary"
                    isSubmitting={isSubmitting}
                    btnText={formTitles.btnTitle}
                  />{" "}
                  {/* {formTitles.btnTitle === "Submit" && (
                    <CustomButton
                      type="reset"
                      btnText="Reset"
                      variant="outline-secondary"
                    />
                  )} */}
                </div>
              ) : (
                <LoadingButton
                  variant="primary"
                  btnText={
                    workLoadObj.id === 0 ? "Submitting..." : "Updating..."
                  }
                  className="modal-buttons"
                />
              )}
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default WorkLoadModal;
