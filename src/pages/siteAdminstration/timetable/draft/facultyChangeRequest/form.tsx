import Swal from "sweetalert2";
import React, {useState} from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { postData } from "../../../../../adapters/microservices";
import TimerAlertBox from "../../../../../widgets/alert/timerAlert";
import CustomButton from "../../../../../widgets/formInputFields/buttons";
import WaveBottom from "../../../../../assets/images/background/bg-modal.svg";

type Props = {
  urlArg: any;
  onHide: any;
  filteredTime: any;
  modalFormData: any;
  modalShow: boolean;
  availableSlots: any;
  availableRooms: any;
  requestTimeSlot: any;
  toggleModalShow: any;
  updateAddRefresh: any;
  changeRequestData: any;
};

const ModalForm = (props: Props) => {
  const [showAlert, setShowAlert] = useState(false);
  const currentUserInfo = useSelector((state: any) => state.userInfo.userInfo);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });

  const handleChangeFacultyAccept = () => {
    if(props.urlArg.prgId !== 0){
      postData(`/${props.urlArg.prgId}/timetable/${props.modalFormData.changeRequestId}/change-request/accept`,{})
        .then((res: any) => {
          if (res.data != "" && res.status === 200) {
            props.toggleModalShow(false);
            props.updateAddRefresh();
            Swal.fire({
              timer: 3000,
              width: "25em",
              color: "#666",
              icon: "success",
              background: "#e7eef5",
              showConfirmButton: false,
              text: "Change Request successfully accepted.",
            });
          }
        })
        .catch((err: any) => {
          console.log(err)
          if (err.response.status === 500 || err.response.status === 404) {
            setShowAlert(true);
            setAlertMsg({
              message: err.response.data.message,
              alertBoxColor: "danger",
            });
          }
        });
    }
  }

  const handleChangeFacultyReject = () => {
    if(props.urlArg.prgId !== 0){
      postData(`/${props.urlArg.prgId}/timetable/${props.modalFormData.changeRequestId}/change-request/reject`,{})
        .then((res: any) => {
          if (res.data != "" && res.status === 200) {
            props.toggleModalShow(false);
            props.updateAddRefresh();
            Swal.fire({
              timer: 3000,
              width: "25em",
              color: "#666",
              icon: "success",
              background: "#e7eef5",
              showConfirmButton: false,
              text: "Change Request successfully rejected.",
            });
          }
        })
        .catch((err: any) => {
          console.log(err)
          if (err.response.status === 500 || err.response.status === 404) {
            setShowAlert(true);
            setAlertMsg({
              message: err.response.data.message,
              alertBoxColor: "danger",
            });
          }
        });
    }
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
            Change Request : {currentUserInfo.first_name}{" "}
            {currentUserInfo.last_name}
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
                <b>Session : </b>
                {props.modalFormData.description}
              </div>
              <div>
                <b>Timeslot:</b> {props.modalFormData?.weekday}
                {props.filteredTime.length > 0
                  ? `(${props.filteredTime[0].startTime} - ${props.filteredTime[0].endTime})`
                  : ""}
              </div>
              <div>
                {props.requestTimeSlot.length > 0 && (
                  <div>
                    {props.requestTimeSlot.map((slot: any) => (
                      <div>
                        <b>Request TimeSlots :</b>
                        {slot.startTime}-{slot.endTime}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                {props.availableRooms.length > 0 && (
                  <div>
                    {props.availableRooms.map((room: any) => (
                      <div key={room.id}>
                        <b>Request Rooms :</b>
                        {room.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <b>Reason :</b> {props.changeRequestData?.reason}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <CustomButton type="submit" variant="primary" btnText="Approve" onClick={handleChangeFacultyAccept}/>

            <CustomButton
              type="button"
              btnText="Reject"
              variant="secondary"
              size="lg"
              // disabled
              onClick={handleChangeFacultyReject}
            />
          </div>
        </Modal.Body>
        <img src={WaveBottom} alt="WaveBottom" className="wavebg" />
      </Modal>
    </React.Fragment>
  );
};

export default ModalForm;
