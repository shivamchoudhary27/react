import * as Yup from "yup";
import Modal from "react-bootstrap/Modal";
import { Col, Row } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import React, { useState, useEffect } from "react";
import TimerAlertBox from "../../../../widgets/alert/timerAlert";
import FieldLabel from "../../../../widgets/formInputFields/labels";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import { postData, putData } from "../../../../adapters/microservices";
import { generateHours, saperateHours, saperateMinutes } from "./utils";
import { LoadingButton } from "../../../../widgets/formInputFields/buttons";
import FieldErrorMessage from "../../../../widgets/formInputFields/errorMessage";
import FieldTypeSelect from "../../../../widgets/formInputFields/formSelectField";

// Formik Yup validation === >>>
const Schema = Yup.object({
  startHr: Yup.string().required("Required"),
  startMin: Yup.string().required("Required"),
  endHr: Yup.string().required("Required"),
  endMin: Yup.string().required("Required"),
  breakTime: Yup.string().required(),
  type: Yup.string()
    .when('breakTime', {
      is: "true",
      then: Yup.string().required('')
    })
});

const TimeSlotModal = ({
  show,
  onHide,
  timeslotObj,
  togglemodalshow,
  currentInstitute,
  refreshClassroomData,
}: any) => {
  const [showAlert, setShowAlert] = useState(false);
  const startHr =
    timeslotObj.startTime !== undefined &&
    saperateHours(
      timeslotObj.startTime !== null ? timeslotObj.startTime : "00:00"
    );
  const startMin =
    timeslotObj.startTime !== undefined &&
    saperateMinutes(
      timeslotObj.startTime !== null ? timeslotObj.startTime : "00:00"
    );
  const endHr =
    timeslotObj.endTime !== undefined &&
    saperateHours(timeslotObj.endTime !== null ? timeslotObj.endTime : "00:00");
  const endMin =
    timeslotObj.endTime !== undefined &&
    saperateMinutes(
      timeslotObj.endTime !== null ? timeslotObj.endTime : "00:00"
    );
  const [alertMsg, setAlertMsg] = useState({
    message: "",
    alertBoxColor: "",
  });

  // Initial values of react table === >>>
  const initialValues = {
    id: timeslotObj.id,
    startHr: startHr,
    startMin: startMin,
    endHr: endHr,
    endMin: endMin,
    breakTime: timeslotObj.id === 0 ? "false" : timeslotObj.breakTime !== false ? "true" : "false",
    type: timeslotObj.type !== null ? timeslotObj.type : null,
  };

  // custom Obj & handle form data === >>>
  let formTitles = {
    titleHeading: "",
    btnTitle: "",
  };
  if (timeslotObj.id === 0) {
    formTitles = {
      titleHeading: "Add Time Slot",
      btnTitle: "Submit",
    };
  } else {
    formTitles = {
      titleHeading: "Update Time Slot",
      btnTitle: "Update",
    };
  }

  console.log(startHr)

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
    };

    let endPoint = `/${currentInstitute}/timetable/timeslot`;
    if (timeslotObj.id === 0) {
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
            message:
              "Failed to add time slot! Time slot can be only 1 hour of length.",
            alertBoxColor: "danger",
          });
        });
    } else {
      endPoint += `/${timeslotObj.id}`;
      setSubmitting(true);
      console.log("values------",values);
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
                    />
                  )}
                </div>
              ) : (
                <LoadingButton
                  variant="primary"
                  btnText={
                    timeslotObj.id === 0 ? "Submitting..." : "Updating..."
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

export default TimeSlotModal;
