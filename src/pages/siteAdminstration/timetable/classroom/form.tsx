import * as Yup from "yup";
import React, { useEffect, useState } from "react";
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
import "sweetalert2/src/sweetalert2.scss";
import Swal from "sweetalert2";
// Formik Yup validation === >>>
const departmentSchema = Yup.object({
  type: Yup.string().required(),
  name: Yup.string().min(1).required(),
  departmentId: Yup.string().required(),
  seatingCapacity: Yup.number()
    .required('Seating capacity is required')
    .integer('Must be an integer')
    .positive('Must be a positive integer')
    .min(1, 'Must be greater than or equal to 1'),
});

const ClassRoomModal = ({
  show,
  onHide,
  classroomObj,
  departmentList,
  togglemodalshow,
  currentInstitute,
  refreshClassroomData,
}: any) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({
    message: "",
    alertBoxColor: "",
  });

  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    // Initial values of react table === >>>
    const initialValues = {
      name: classroomObj.name,
      type: classroomObj.type,
      departmentId: classroomObj.departmentId,
      seatingCapacity: classroomObj.seatingCapacity,
    };
    setFormValues(initialValues);
  }, [classroomObj]);

  // custom Obj & handle form data === >>>
  let formTitles = {
    titleHeading: "",
    btnTitle: "",
  };
  if (classroomObj.id === 0) {
    formTitles = {
      titleHeading: "Add Classroom",
      btnTitle: "Submit",
    };
  } else {
    formTitles = {
      titleHeading: "Update Classroom",
      btnTitle: "Update",
    };
  }

  const resetFormData = () => {
    const resetValues = {
      name: "",
      type: "lab",
      departmentId: classroomObj.departmentId,
      seatingCapacity: 0,
    };
    setFormValues(resetValues);
  }

  // handle Form CRUD operations === >>>
  const handleFormData = (values: any, { setSubmitting, resetForm }: any) => {
    let endPoint = `/${currentInstitute}/timetable/classroom`;
    if (classroomObj.id === 0) {
      postData(endPoint, values)
        .then((res: any) => {
          if (res.data !== "") {
            togglemodalshow(false);
            setSubmitting(false);
            refreshClassroomData();
            Swal.fire({
              timer: 3000,
              width: "25em",
              color: "#666",
              icon: "success",
              background: "#e7eef5",
              showConfirmButton: false,
              text: "Classroom has been successfully added"
            });
            
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
      endPoint += `/${classroomObj.id}`;
      setSubmitting(true);
      putData(endPoint, values)
        .then((res: any) => {
          if (res.data !== "" && res.status === 200) {
            togglemodalshow(false);
            setSubmitting(false);
            refreshClassroomData();
            Swal.fire({
              timer: 3000,
              width: "25em",
              color: "#666",
              icon: "success",
              background: "#e7eef5",
              showConfirmButton: false,
              text: "Classroom has been successfully added"
            });
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
          enableReinitialize={true}
          initialValues={formValues}
          validationSchema={departmentSchema}
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
                  msgText="Name required atleast 1 character"
                />
              </div>

              <div className="mb-3">
                <FieldLabel
                  htmlfor="seatingCapacity"
                  labelText="Seating Capacity"
                  required="required"
                  star="*"
                />
                <Field
                  type="number"
                  name="seatingCapacity"
                  className="form-control"
                />
                <FieldErrorMessage
                  errors={errors.seatingCapacity}
                  touched={touched.seatingCapacity}
                  msgText="Please enter seating capacity"
                />
              </div>

              <div className="mb-3">
                <FieldLabel
                  htmlfor="type"
                  labelText="Type"
                  required="required"
                  star="*"
                />
                <div>
                  <span className="me-2">
                    <Field type="radio" name="type" value="lab" />{" "}
                    <FieldLabel htmlfor="type" labelText="Lab" />
                  </span>
                  <span>
                    <Field type="radio" name="type" value="tutorial" />{" "}
                    <FieldLabel htmlfor="type" labelText="Tutorial" />
                  </span>
                </div>
                <FieldErrorMessage
                  errors={errors.type}
                  touched={touched.type}
                  msgText="Please select type"
                />
              </div>

              <div className="mb-3">
                <FieldLabel
                  htmlfor="departmentId"
                  labelText="Department"
                  required="required"
                  star="*"
                />
                <FieldTypeSelect
                  name="departmentId"
                  options={departmentList}
                  setcurrentvalue={setValues}
                  currentformvalue={values}
                  selectDefaultLabel="Department"
                />
                <FieldErrorMessage
                  errors={errors.departmentId}
                  touched={touched.departmentId}
                  msgText="Please select department"
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
                      onClick={() => resetFormData()}
                    />
                  )}
                </div>
              ) : (
                <LoadingButton
                  variant="primary"
                  btnText={
                    classroomObj.id === 0 ? "Submitting..." : "Updating..."
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

export default ClassRoomModal;
