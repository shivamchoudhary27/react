import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { postData } from "../../../../adapters/microservices";
import TimerAlertBox from "../../../../widgets/alert/timerAlert";
import FieldLabel from "../../../../widgets/formInputFields/labels";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import WaveBottom from "../../../../assets/images/background/bg-modal.svg";

type Props = {
  onHide: () => void;
  modalShow: boolean;
  toggleModalShow: () => void;
  modalFormData: any;
  urlArg: any;
  availableSlotdata: any;
  availableRooms: any;
  updateAddRefresh: any;
  changeRequestData: any;
  filteredTime: any;
};

const ModalForm = (props: Props) => {

  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });
  // const [availableSlots, setAvailableSlots] = useState<any>({});
  // const [availableRooms, setAvailableRooms] = useState<any>();
  // const [filteredTime, setFilteredTime] = useState<any[]>([]);
  const [disableFeald, setDisableFeald] = useState(true);
  const [payload, setPayload] = useState({
    sessionDate: props.modalFormData?.sessionDate,
    timeSlotId: props.modalFormData?.timeSlotId,
    classRoomId: 0,
    reason: "",
  });
  const currentInstitute = useSelector(
    (state: any) => state.globalFilters.currentInstitute
  );

  function handleTimeslotChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setPayload((prevValue: any) => ({
      ...prevValue,
      sessionDate: props.modalFormData?.sessionDate,
      timeSlotId: event.target.value,
    }));
  }

  function handleRoomChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setPayload((prevValue: any) => ({
      ...prevValue,
      classRoomId: event.target.value,
    }));
  }

  function handleResonChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setPayload((prevValue: any) => ({
      ...prevValue,
      reason: event.target.value,
    }));
  }

  function handleFormSubmit(values: any, action: any) {
    if (props.urlArg.prgId > 0) {
      const endPoint = `/${props.urlArg.prgId}/timetable/${props.modalFormData.slotDetailId}/change-request`;
      postData(endPoint, values)
        .then((res: any) => {
          if (res.data != "" && res.status === 200) {
            props.updateAddRefresh();
            props.toggleModalShow(false);
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
        })
        .catch((err: any) => {
          if (err.response.status === 500 || err.response.status === 400) {
            setShowAlert(true);
            setAlertMsg({
              message: err.response.data.message,
              alertBoxColor: "danger",
            });
          }
        });
    }
  }

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

  const handleResetButton = () => {
    // Reset form fields to initial values
    if (disableFeald === false) {
      
      setPayload({
        sessionDate: props.modalFormData?.sessionDate,
        timeSlotId: "",
        classRoomId: 0,
        reason: "",
      });
    }
  };

  const handleEditClick = () => {
    setDisableFeald(!disableFeald);
  };

useEffect(() => {
  if (props.modalShow === false) {
    setDisableFeald(true)
    setPayload({
      sessionDate: "",
      timeSlotId: "",
      classRoomId: 0,
      reason: "",
    });
  }
},[props.modalShow])

 const handleReset = () => {
  // Reset form fields to initial values
    setPayload({
      sessionDate: "",
      timeSlotId: "",
      classRoomId: 0,
      reason: "",
    });
  }

  useEffect(() => {
    setPayload({
      sessionDate: props.modalFormData?.sessionDate,
      timeSlotId: props.changeRequestData?.timeSlotId,
      classRoomId: props.changeRequestData?.classRoomId,
      reason: props.changeRequestData?.reason,
    });
  }, [props.changeRequestData]);

  return (
    <React.Fragment>
      <Modal
        centered
        onHide={props.onHide}
        show={props.modalShow}
        onExited={()=>handleReset()}
        aria-labelledby="contained-modal-title-vcenter"
        className="modal-design-wrapper"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Change Request
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
            initialValues={payload}
            // onSubmit={handleFormSubmit}
            onSubmit={(values, action) => {
              handleFormSubmit(values, action);
            }}
          >
            {({ isSubmitting, resetForm }) => (
              <Form>
                <Button onClick={handleEditClick}>edit</Button>
                <div className="mb-3">

                  <div>
                    <b>Session</b> : {props.modalFormData.description}
                  </div>
                  <div>
                    <b>Timeslot</b>: {props.modalFormData?.weekday}{" "}
                    {props.filteredTime.length > 0
                      ? `(${props.filteredTime[0].startTime} - ${props.filteredTime[0].endTime})`
                      : ""}
                  </div>
                </div>
                <div className="mb-3">
                  <FieldLabel
                    htmlFor="Timeslot"
                    labelText="Available Timeslot"
                    required
                    star="*"
                  />
                  <select
                    className="form-select"
                    name="Timeslot"
                    onChange={(e) => {
                      handleTimeslotChange(e);
                    }}
                    value={payload.timeSlotId}
                    disabled={disableFeald}
                  >
                    <option value="">Select</option>
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
                            )} ${item.endTime.slice(0, 5)}`}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <FieldLabel
                    htmlFor="classRoomId"
                    labelText="Available Room"
                    required
                    star="*"
                  />
                  <select
                    className="form-select"
                    name="classRoomId"
                    onChange={handleRoomChange}
                    value={payload.classRoomId}
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
                  </select>
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
                    onChange={handleResonChange}
                    value={payload.reason}
                    className="form-control"
                    placeholder="Type Here ..."
                    disabled={disableFeald}
                  />
                  <ErrorMessage
                    name="reason"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="modal-buttons">
                  <CustomButton
                    type="submit"
                    variant="primary"
                    // disabled={isSubmitting}
                    btnText="Submit"
                  />
                  <CustomButton
                    type="button"
                    onClick={() => {
                      resetForm();
                      handleResetButton();
                    }}
                    btnText="Reset"
                    variant="outline-secondary"
                  />
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
