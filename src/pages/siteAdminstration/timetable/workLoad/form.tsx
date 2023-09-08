import * as Yup from "yup";
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Formik, Form, Field } from "formik";
import TimerAlertBox from "../../../../widgets/alert/timerAlert";
import FieldLabel from "../../../../widgets/formInputFields/labels";
import { postData, putData } from "../../../../adapters/microservices";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import { LoadingButton } from "../../../../widgets/formInputFields/buttons";
import FieldTypeText from "../../../../widgets/formInputFields/formTextField";
import FieldErrorMessage from "../../../../widgets/formInputFields/errorMessage";
import FieldTypeSelect from "../../../../widgets/formInputFields/formSelectField";
import { makeGetDataRequest } from "../../../../features/apiCalls/getdata";

// Formik Yup validation === >>>
const departmentSchema = Yup.object({
    workLoad: Yup.number()
    .integer("Number must be an integer")
    .positive("Number must be positive")
    .required("Number is required"),
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
}: any) => {
  const dummyData = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };
  const [showAlert, setShowAlert] = useState(false);
  const [facultyInfo, setFacultyInfo] = useState(dummyData);
  const [alertMsg, setAlertMsg] = useState({
    message: "",
    alertBoxColor: "",
  });

  // Initial values of react table === >>>
  const initialValues = {
    workLoad: workLoadObj.workLoad,
  };

  useEffect(() => {
    if (currentInstitute > 0 && workLoadObj.id > 0) {
      let endPoint = `/${currentInstitute}/timetable/userworkload?userId=${workLoadObj.id}`;
      makeGetDataRequest(
        endPoint,
        filterUpdate,
        setFacultyInfo
      );
    }
  }, [workLoadObj.id, currentInstitute]);

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
    let endPoint = `/${currentInstitute}/timetable/userworkload`;
    if (workLoadObj.id === 0) {
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
      endPoint += `/${workLoadObj.id}`;
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
              {facultyInfo.items.length > 0 && workLoadObj.id > 0 && (
                <div className="mb-3">
                  <FieldLabel htmlfor="" labelText="Faculty" />
                  {
                    facultyInfo.items.map((item: any) => (
                        <span className="mx-2">{`${item.userFirstName} ${item.userLastName} (${item.userEmail})`}</span>
                    ))
                  }
                </div>
              )}

              <div className="mb-3">
                <FieldLabel
                  htmlfor="workLoad"
                  labelText="Per Week"
                  required="required"
                  star="*"
                />
                <Field
                  type="number"
                  name="workLoad"
                  className="form-control"
                  placeholder="Hours"
                />
                <FieldErrorMessage
                  errors={errors.workLoad}
                  touched={touched.workLoad}
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
                  {formTitles.btnTitle === "Submit" && (
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
