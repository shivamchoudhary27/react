import * as Yup from "yup";
import Modal from "react-bootstrap/Modal";
import { Col, Row } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import React, { useEffect, useState } from "react";
import TimerAlertBox from "../../../../../widgets/alert/timerAlert";
import FieldLabel from "../../../../../widgets/formInputFields/labels";
import CustomButton from "../../../../../widgets/formInputFields/buttons";
import { postData, putData } from "../../../../../adapters/microservices";
import WaveBottom from "../../../../../assets/images/background/bg-modal.svg";
import { LoadingButton } from "../../../../../widgets/formInputFields/buttons";
import FieldErrorMessage from "../../../../../widgets/formInputFields/errorMessage";
import FieldTypeSelect from "../../../../../widgets/formInputFields/formSelectField";
import { generateHours, saperateHours, saperateMinutes } from "../../timesSlot/utils";
import "sweetalert2/src/sweetalert2.scss";
import Swal from "sweetalert2";
// Formik Yup validation === >>>
const Schema = Yup.object({
  startHr: Yup.string().required("Required"),
  startMin: Yup.string().required("Required"),
  endHr: Yup.string().required("Required"),
  endMin: Yup.string().required("Required"),
  breakTime: Yup.string().required(),
  type: Yup.string()
  .when(['breakTime'], {
    is: "true",
    then: Yup.string().required('Type is required when Break time is selected')
  })
  .nullable()
  .typeError('Type must be a string')
});

const InstituteTimeSlotModal = ({
  show,
  onHide,
  departmentId,
  togglemodalshow,
  currentInstitute,
  instituteTimeslotObj,
  refreshClassroomData,
  resetFormData
}: any) => {
  const [showAlert, setShowAlert] = useState(false);

  const startHr =
  instituteTimeslotObj.startTime !== undefined &&
    saperateHours(
        instituteTimeslotObj.startTime !== null ? instituteTimeslotObj.startTime : "00:00"
    );
  const startMin =
    instituteTimeslotObj.startTime !== undefined &&
    saperateMinutes(
      instituteTimeslotObj.startTime !== null ? instituteTimeslotObj.startTime : "00:00"
    );
  const endHr =
    instituteTimeslotObj.endTime !== undefined &&
    saperateHours(
      instituteTimeslotObj.endTime !== null ? instituteTimeslotObj.endTime : "00:00"
    );
  const endMin =
    instituteTimeslotObj.endTime !== undefined &&
    saperateMinutes(
      instituteTimeslotObj.endTime !== null ? instituteTimeslotObj.endTime : "00:00"
    );
  const [alertMsg, setAlertMsg] = useState({
    message: "",
    alertBoxColor: "",
  });

  const [formValues, setFormValues] = useState({});
  
  useEffect(() => {    
    // Initial values of react table === >>>
    const initialValues = {
      id: instituteTimeslotObj.id,
      startHr: instituteTimeslotObj.id === 0 ? "0" : startHr,
      startMin: instituteTimeslotObj.id === 0 ? "0" : startMin,
      endHr: instituteTimeslotObj.id === 0 ? "0" :  endHr,
      endMin: instituteTimeslotObj.id === 0 ? "0" :  endMin,
      breakTime: instituteTimeslotObj.id === 0 ? "false" : instituteTimeslotObj.breakTime !== false ? "true" : "false",
      type: instituteTimeslotObj.type !== null ? instituteTimeslotObj.type : "lunch",
    };
    setFormValues(initialValues);
  }, [instituteTimeslotObj]);
  
  // custom Obj & handle form data === >>>
  let formTitles = {
    titleHeading: "",
    btnTitle: "",
  };
  if (instituteTimeslotObj.id === 0) {
    formTitles = {
      titleHeading: "Add Institute Time Slot",
      btnTitle: "Submit",
    };
  } else {
    formTitles = {
      titleHeading: "Update Institute Time Slot",
      btnTitle: "Update",
    };
  }

  const resetForm = () => {
    const resetValues = {
      id: 0,
      startHr: "0",
      startMin: "0",
      endHr: "0",
      endMin: "0",
      breakTime: "false",
      type: "lunch",
    };
    setFormValues(resetValues);
  }
  // handle Form CRUD operations === >>>
  const handleFormData = (values: any, { setSubmitting, resetForm }: any) => {
    if(values.breakTime === "false"){
      delete values.type
    }
    values = {
      id: values.id,
      startTime: `${
        values.startHr < 10 ? `${values.startHr}` : values.startHr
      }:${values.startMin}`,
      endTime: `${values.endHr < 10 ? `${values.endHr}` : values.endHr}:${
        values.endMin
      }`,
      breakTime: JSON.parse(values.breakTime),
      type: values.type,
      departmentId: departmentId
    };

    let endPoint = `/${currentInstitute}/timetable/timeslot`;
    if (instituteTimeslotObj.id === 0) {
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
              text: "Time slot has been successfully added"
            });
            resetForm();
          }
        })
        .catch((err: any) => {
          setSubmitting(false);
          setShowAlert(true);
          setAlertMsg({
            message:
              "Failed to add time slot! Time slot can be only 1 hour of length.",
            alertBoxColor: "danger",
          });
        });
    } else {
      endPoint += `/${instituteTimeslotObj.id}`;
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
              text: "Time slot has been successfully updated"
            });
            resetForm();
          }
        })
        .catch((err: any) => {
          setSubmitting(false);
          setShowAlert(true);
          setAlertMsg({
            message:
              "Failed to update time slot! Time slot can be only 1 hour of length.",
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
      className="modal-design-wrapper"
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
          validationSchema={Schema}
          onSubmit={(values, action) => {
            handleFormData(values, action);
          }}
        >
          {({ errors, touched, isSubmitting, setValues, values }) => (
            <Form>
              <div className="mb-3">
                <Row>
                  <FieldLabel
                    htmlfor="timerange"
                    labelText="Time Range"
                    required="required"
                    star="*"
                  />
                  <Col>
                    <FieldTypeSelect
                      name="startHr"
                      options={generateHours()}
                      setcurrentvalue={setValues}
                      currentformvalue={values}
                      timeUnit="Hr"
                    />
                    <FieldErrorMessage
                      errors={errors.startHr}
                      touched={touched.startHr}
                      msgText="Please select break time"
                    />
                  </Col>
                  <Col>
                    <FieldTypeSelect
                      name="startMin"
                      options={[
                        { id: "00", name: "00" },
                        { id: "15", name: "15" },
                        { id: "30", name: "30" },
                      ]}
                      setcurrentvalue={setValues}
                      currentformvalue={values}
                      timeUnit="min"
                    />
                    <FieldErrorMessage
                      errors={errors.startMin}
                      touched={touched.startMin}
                      msgText="Please select break time"
                    />
                  </Col>
                  <div className="col-auto">to</div>
                  <Col>
                    <FieldTypeSelect
                      name="endHr"
                      options={generateHours()}
                      setcurrentvalue={setValues}
                      currentformvalue={values}
                      timeUnit="Hr"
                    />
                    <FieldErrorMessage
                      errors={errors.endHr}
                      touched={touched.endHr}
                      msgText="Please select break time"
                    />
                  </Col>
                  <Col>
                    <FieldTypeSelect
                      name="endMin"
                      options={[
                        { id: "00", name: "00" },
                        { id: "15", name: "15" },
                        { id: "30", name: "30" },
                      ]}
                      setcurrentvalue={setValues}
                      currentformvalue={values}
                      timeUnit="min"
                    />
                    <FieldErrorMessage
                      errors={errors.endMin}
                      touched={touched.endMin}
                      msgText="Please select break time"
                    />
                  </Col>
                </Row>
              </div>

              <div className="mb-3">
                <FieldLabel
                  htmlfor="breakTime"
                  labelText="Break"
                  required="required"
                  star="*"
                />
                <div>
                  <span className="me-2">
                    <Field type="radio" name="breakTime" value="true" />{" "}
                    <FieldLabel htmlfor="breakTime" labelText="Yes" />
                  </span>
                  <span>
                    <Field type="radio" name="breakTime" value="false" />{" "}
                    <FieldLabel htmlfor="breakTime" labelText="No" />
                  </span>
                </div>
                {/* <FieldErrorMessage
                  errors={errors.breakTime}
                  touched={touched.breakTime}
                  msgText="Please select break time"
                /> */}
              </div>

              {values.breakTime !== "false" && (
                <div className="mb-3">
                  <FieldLabel htmlfor="type" labelText="Break Type" />
                  <div>
                    <span className="me-2">
                      <Field type="radio" name="type" value="lunch" />{" "}
                      <FieldLabel htmlfor="type" labelText="Lunch" />
                    </span>
                    <span>
                      <Field type="radio" name="type" value="tea" />{" "}
                      <FieldLabel htmlfor="type" labelText="Tea" />
                    </span>
                  </div>
                  <FieldErrorMessage
                    errors={errors.type}
                    touched={touched.type}
                    msgText="Please select break type"
                  />
                </div>
              )}

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
                      onClick={() => resetForm()}
                    />
                  )}
                </div>
              ) : (
                <LoadingButton
                  variant="primary"
                  btnText={
                    instituteTimeslotObj.id === 0 ? "Submitting..." : "Updating..."
                  }
                  className="modal-buttons"
                />
              )}
            </Form>
          )}
        </Formik>
      </Modal.Body>
      <img src={WaveBottom} alt="WaveBottom" className="wavebg"/>
    </Modal>
  );
};

export default InstituteTimeSlotModal;
