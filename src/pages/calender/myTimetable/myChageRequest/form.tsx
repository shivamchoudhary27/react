import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import TimerAlertBox from "../../../../widgets/alert/timerAlert";
import WaveBottom from "../../../../assets/images/background/bg-modal.svg";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import FieldLabel from "../../../../widgets/formInputFields/labels";
import { getData, postData } from "../../../../adapters/microservices";
import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";

type Props = {
  onHide: () => void;
  modalShow: boolean;
  toggleModalShow: () => void;
  modalFormData: any;
  urlArg: any;
};

const ModalForm = (props: Props) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });
  const [availableSlots, setAvailableSlots] = useState<any>({});
  const [availableRooms, setAvailableRooms] = useState<any>();
  const [filteredTime, setFilteredTime] = useState<any[]>([]);
  const [payload, setPayload] = useState({
    sessionDate: props.modalFormData?.sessionDate,
    timeSlotId: props.modalFormData,
    classRoomId: 0,
    reason:""
  })
  const currentInstitute = useSelector(
    (state: any) => state.globalFilters.currentInstitute
  );

  useEffect(() => {
    if (props.urlArg?.prgId > 0 && props.modalFormData) {
      Promise.all([
        getData(
          `/${props.urlArg.prgId}/timetable/availableslots?slotId=${props.modalFormData.timeSlotId}&sessionDate=${props.modalFormData.sessionDate}&slotDetailId=${props.modalFormData.slotDetailId}`,
          {}
        ),
        getData(
          `/${props.urlArg.prgId}/timetable/availablerooms?selectedSlotId=${props.modalFormData.timeSlotId}&sessionDate=${props.modalFormData.sessionDate}&slotDetailId=${props.modalFormData.slotDetailId}`,
          {}
        ),
        getData(
          `/${currentInstitute}/timetable/timeslot?departmentId=${props.urlArg.dpt}&pageNumber=0&pageSize=50`,
          {}
        ),
        getData(
          `/${props.urlArg.prgId}/timetable/${props.modalFormData.changeRequestId}/change-request`,
          {}
        ),
      ])
        .then(([slotsRes, roomsRes, timeSlotsRes, changeRequest]) => {
          if (slotsRes.data && slotsRes.status === 200) {
            setAvailableSlots(slotsRes.data);
          }
          if (roomsRes.data && roomsRes.status === 200) {
            setAvailableRooms(roomsRes.data);
          }
          if (timeSlotsRes.data && timeSlotsRes.status === 200) {
            const allTime = timeSlotsRes.data.items || [];
            setFilteredTime(
              allTime.filter(
                (timeSlot: any) =>
                  props.modalFormData.timeSlotId === timeSlot.id
              )
            );
          } if (changeRequest.data && changeRequest.status === 200) {
            setPayload({
              sessionDate: props.modalFormData?.sessionDate,
              timeSlotId: changeRequest.data.timeSlotId,
              classRoomId: changeRequest.data.classRoomId,
              reason:changeRequest.data.reason,
            })
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [props.modalFormData, props.urlArg, currentInstitute]);

  function handleTimeslotChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setPayload((prevValue: any) => ({
      ...prevValue,
      sessionDate: props.modalFormData?.sessionDate,
      timeSlotId: event.target.value
    }));
       
  }

  function handleRoomChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setPayload((prevValue: any) => ({
      ...prevValue,
      classRoomId: event.target.value
    }));
  }

  function handleResonChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setPayload((prevValue: any) => ({
      ...prevValue,
      reason: event.target.value
    }));
  }
  function handleSubmit(values: any) {
       // Hit the API with the payload
    postData(`/${props.urlArg.prgId}/timetable/${props.modalFormData.slotDetailId}/change-request`, payload)
      .then(response => {
        // Handle success
      })
      .catch(error => {
        // Handle error
        console.error('Error submitting request', error);
      });
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

  return (
    <React.Fragment>
      <Modal
        centered
        onHide={props.onHide}
        show={props.modalShow}
        aria-labelledby="contained-modal-title-vcenter"
        className="modal-design-wrapper"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Change Request
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={payload}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <TimerAlertBox
                  alertMsg={alertMsg.message}
                  className="mt-3"
                  variant={alertMsg.alertBoxColor}
                  setShowAlert={setShowAlert}
                  showAlert={showAlert}
                />
                <div className="mb-3">
                  <div>
                    <b>Session</b> : {props.modalFormData.description}
                  </div>
                  <div>
                    <b>Timeslot</b>: {props.modalFormData?.weekday} {filteredTime.length > 0 ? `(${filteredTime[0].startTime} - ${filteredTime[0].endTime})` : ''}
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
                  >
                    <option value="">Select</option>
                    {Object.keys(availableSlots).map((key) => (
                      <optgroup label={`${key} (${getDayOfWeek(key)})`} key={key}>
                        {availableSlots[key].map((item: any) => (
                          <option key={item.id} value={item.id}>
                            {`${item.startTime.slice(0, 5)} ${item.endTime.slice(0, 5)}`}
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

                  >
                    <option value="0" key={0}>Select</option>
                    {availableRooms &&
                      availableRooms.map((item: any) => (
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
                  />
                  <ErrorMessage name="reason" component="div" className="text-danger" />
                </div>
                <div className="modal-buttons">
                  <CustomButton
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    btnText="Submit"
                  />
                  <CustomButton
                    type="reset"
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
