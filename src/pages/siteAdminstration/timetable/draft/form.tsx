import React from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import WaveBottom from "../../../../assets/images/background/bg-modal.svg";

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
  changeRequestData: any;
};

const ModalForm = (props: Props) => {

  const currentUserInfo = useSelector((state: any) => state.userInfo.userInfo);

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
            <CustomButton type="submit" variant="primary" btnText="Approve" />

            <CustomButton
              type="button"
              btnText="Cancel"
              variant="secondary"
              size="lg"
              disabled
            />
          </div>
        </Modal.Body>
        <img src={WaveBottom} alt="WaveBottom" className="wavebg" />
      </Modal>
    </React.Fragment>
  );
};

export default ModalForm;
