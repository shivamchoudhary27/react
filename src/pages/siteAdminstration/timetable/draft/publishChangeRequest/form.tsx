import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import TimerAlertBox from "../../../../../widgets/alert/timerAlert";
import WaveBottom from "../../assets/images/background/bg-modal.svg";
import CustomButton from "../../../../../widgets/formInputFields/buttons";

type Props = {
  onHide: any;
  isEnrolled: any;
  isWaitlisted: any;
  modalShow: boolean;
  minorcourseObj: any;
  toggleModalShow: any;
  updateAddRefresh: any;
};

const ModalForm = (props: Props) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });

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
            Change Request - Faculty name
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
          <div className="mb-3">
            <span>Session: AJ - TUT - B113</span>
            <span>Timeslot: Thursday (11:30 - 12:30)</span>
            <span>Requested Timeslot: Saturday (9:30 - 10:30)</span>
            <span>Requested Room: B112</span>
            <span>
              Reason: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis
              vulputate commodo
            </span>
          </div>

          <div className="modal-buttons">
                  <CustomButton
                    type="submit"
                    variant="primary"
                    // isSubmitting={isSubmitting}
                    btnText="Submit"
                  />{" "}
                  <CustomButton
                    type="reset"
                    btnText="Reset"
                    variant="outline-secondary"
                    // onClick={handlesReset}
                  />
                </div>
        </Modal.Body>
        <img src={WaveBottom} alt="WaveBottom" className="wavebg" />
      </Modal>
    </React.Fragment>
  );
};

export default ModalForm;
