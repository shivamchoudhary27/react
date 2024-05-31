import * as Yup from "yup";
import Swal from "sweetalert2";
import { Modal,OverlayTrigger,Tooltip as BsTooltip  } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import React, { useEffect, useState } from "react";
import TimerAlertBox from "../../../../widgets/alert/timerAlert";
import FieldLabel from "../../../../widgets/formInputFields/labels";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import editIcon from "../../../../assets/images/icons/edit-action.svg";
import WaveBottom from "../../../../assets/images/background/bg-modal.svg";
import deleteIcon from "../../../../assets/images/icons/delete-action.svg";
import FieldErrorMessage from "../../../../widgets/formInputFields/errorMessage";
import { deleteData, postData, putData } from "../../../../adapters/microservices";

type Props = {
  urlArg: any;
  filteredTime: any;
  modalFormData: any;
  onHide: () => void;
  modalShow: boolean;
  availableRooms: any;
  toggleModalShow: any;
  updateAddRefresh: any;
  availableSlotdata: any;
  changeRequestData: any;
  toggleModalConfirmation: any;
};

const validationSchema = Yup.object ({
  reason: Yup.string()
    .required("Reason is required")
    .min(1, "Reason cannot be empty"),
  classRoomId: Yup.number()
    .required("Classroom is required")
    .notOneOf([0], "Classroom is required"),
  timeSlotId: Yup.number()
    .required("Time slot is required")
    .notOneOf([0], "Time slot is required"),
});

const ModalForm = (props: Props) => {
  const [showAlert, setShowAlert] = useState(false);
  const [disableFeald, setDisableFeald] = useState(true);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });
  const [initialValues, setInitialValues] = useState({
    id: 0,
    sessionDate: "",
    timeSlotId: 0,
    classRoomId: 0,
    reason: "",
  });
  
  useEffect(() => {
    if (props.modalFormData?.status === "changeRequest") {
      setInitialValues({
        id: props.changeRequestData?.id || 0,
        sessionDate: props.modalFormData?.sessionDate || "",
        timeSlotId: props.changeRequestData?.timeSlotId || 0,
        classRoomId: props.changeRequestData?.classRoomId || 0,
        reason: props.changeRequestData?.reason || "",
      });
    } else {
      setInitialValues(prev => ({
        ...prev,
        sessionDate: props.modalFormData?.sessionDate || ""
      }));
    }
  }, [props.modalFormData, props.changeRequestData]);
  
  

  async function handleFormSubmit(values: any, action: any) {
    if (props.urlArg.prgId > 0) {
      let endPoint = "";
      let method = "post";

      if (props.modalFormData?.status !== "changeRequest") {
        endPoint = `/${props.urlArg.prgId}/timetable/${props.modalFormData.slotDetailId}/change-request`;
      } else {
        endPoint = `/${props.urlArg.prgId}/timetable/${props.changeRequestData.id}/change-request`;
        method = "put";
      }
      try {
        const res =
          method === "post"
            ? await postData(endPoint, values)
            : await putData(endPoint, values);

        if ((res.data && res.status === 201) || 200) {
          props.toggleModalShow(false);
          props.updateAddRefresh();
          Swal.fire({
            timer: 3000,
            width: "25em",
            color: "#666",
            icon: "success",
            background: "#e7eef5",
            showConfirmButton: false,
            text: "Faculty request successfully.",
          });
        }
      } catch (err: any) {
        if (
          err.response &&
          (err.response.status === 500 || err.response.status === 400)
        ) {
          setShowAlert(true);
          setAlertMsg({
            message: err.response.data.message,
            alertBoxColor: "danger",
          });
        }
      }
    }
  }

  // ============call api remove change request for faculty ================>> 
  const handleDeleteFacultyChangeRequest = () => {
    props.toggleModalConfirmation(true)
   
  }

  const handleReset = (resetForm: any) => {
    setInitialValues({
      id: 0,
      sessionDate: "",
      timeSlotId: 0,
      classRoomId: 0,
      reason: "",
    });
    resetForm();
  };

  function getDayOfWeek(dateString: string | number | Date) {
    const date = new Date(dateString);
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayIndex = date.getDay();
    return weekdays[dayIndex];
  }

  const handleEditClick = () => {
    setDisableFeald(!disableFeald);
  };

  useEffect(() => {
    if (props.modalShow === false) {
      setDisableFeald(true);
    } else if (
      props.modalShow === true &&
      props.modalFormData.status !== "changeRequest"
    ) {
      setDisableFeald(false);
    }
  }, [props.modalShow]);

  const onHideModal = () => {
    props.toggleModalShow(false);
    props.updateAddRefresh();
  };

  return (
    <React.Fragment>
      <Modal
        centered
        onHide={onHideModal}
        show={props.modalShow}
        onExited={() => handleReset(() => {})}
        aria-labelledby="contained-modal-title-vcenter"
        className="modal-design-wrapper"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          {props.modalFormData?.status === "changeRequest" ? 
            "Update Slot Change Request" : "Request for Slot Change" }
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
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, action) => {
              handleFormSubmit(values, action);
            }}
          >
            {({ isSubmitting, resetForm, errors, touched }) => (
              <Form>
                <div
                  className="mb-3"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div>
                      <b>Session</b> : {props.modalFormData.description}
                    </div>
                    <div>
                      <b>Selected Timeslot</b>: {props.modalFormData?.weekday}{" "}
                      {props.filteredTime.length > 0
                        ? `(${props.filteredTime[0].startTime} - ${props.filteredTime[0].endTime})`
                        : ""}
                    </div>
                  </div>
                  <div>
                    {props.modalFormData?.status === "changeRequest" && (
                      <>
                      <OverlayTrigger
                  placement="top"
                  overlay={<BsTooltip id="button-tooltip-2">Edit Slot Change Request</BsTooltip>}
                >
                      <Link className="action-icons me-2" to="">
                        <img
                          src={editIcon}
                          alt="Edit"
                          onClick={handleEditClick}
                        />
                      </Link>
                      </OverlayTrigger>
                      <OverlayTrigger
                  placement="top"
                  overlay={<BsTooltip id="button-tooltip-2">Delete Slot Change Request</BsTooltip>}
                >
                    <Link className="action-icons" to="">
                      <img 
                      src={deleteIcon} 
                      alt="Delete" 
                      onClick={handleDeleteFacultyChangeRequest} />
                    </Link>
                    </OverlayTrigger>
                    </>
                    )}
                  </div>
                </div>
                <div className="mb-3">
                  <FieldLabel
                    htmlFor="timeSlotId"
                    labelText="Preferred Timeslot"
                    required
                    star="*"
                  />
                  <Field
                    as="select"
                    className="form-select"
                    name="timeSlotId"
                    disabled={disableFeald}
                  >
                    <option value="0" key={0}>
                      Select
                    </option>
                    {Object.keys(props.availableSlotdata).map((key) => (
                      <optgroup
                        label={`${key} (${getDayOfWeek(key)})`}
                        key={key}
                      >
                        {props.availableSlotdata[key].map((item: any) => (
                          <option key={item.id} value={item.id}>
                            {`${item.startTime.slice(
                              0,
                              5
                            )} - ${item.endTime.slice(0, 5)}`}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </Field>
                  <FieldErrorMessage
                    errors={errors.timeSlotId}
                    touched={touched.timeSlotId}
                  />
                </div>

                <div className="mb-3">
                  <FieldLabel
                    htmlFor="classRoomId"
                    labelText="Available Room"
                    required
                    star="*"
                  />
                  <Field
                    as="select"
                    className="form-select"
                    name="classRoomId"
                    disabled={disableFeald}
                  >
                    <option value="0" key={0}>
                      Select
                    </option>
                    {props.availableRooms &&
                      props.availableRooms.map((item: any) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </Field>
                  <FieldErrorMessage
                    errors={errors.classRoomId}
                    touched={touched.classRoomId}
                  />
                </div>

                <div className="mb-3">
                  <FieldLabel
                    htmlFor="reason"
                    labelText="Reason"
                    required
                    star="*"
                  />
                  <Field
                    as="textarea"
                    name="reason"
                    className="form-control"
                    placeholder="Type Here ..."
                    disabled={disableFeald}
                  />
                  <FieldErrorMessage
                    errors={errors.reason}
                    touched={touched.reason}
                  />
                </div>
                <div className="modal-buttons">
                  {disableFeald === false && (
                    <>
                      {props.modalFormData?.status !== "changeRequest" ? (
                        <CustomButton
                          type="submit"
                          variant="primary"
                          btnText="Submit"
                        />
                      ) : (
                        <CustomButton
                          type="submit"
                          variant="primary"
                          btnText="Update"
                        />
                      )}
                      <CustomButton
                        type="button"
                        onClick={() => {
                          handleReset(resetForm);
                        }}
                        btnText="Reset"
                        variant="outline-secondary"
                      />
                    </>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <img src={WaveBottom} alt="WaveBottom" className="wavebg" />
      </Modal>
    </React.Fragment>
  );
};

export default ModalForm;
