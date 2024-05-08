import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import TimerAlertBox from "../../../../widgets/alert/timerAlert";
import WaveBottom from "../../../../assets/images/background/bg-modal.svg";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import FieldLabel from "../../../../widgets/formInputFields/labels";

type Props = {
  onHide: any;
  modalShow: boolean;
  toggleModalShow: any;
  // updateAddRefresh: any;
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
          <div className="mb-3">
            <div>
              <b>Session</b> : AJ - TUT - B113
            </div>
            <div>
              <b>Timeslot</b>: Thursday (11:30 - 12:30)
            </div>
          </div>
          <div className="mb-3">
            <FieldLabel
              htmlfor="Timeslot"
              labelText="Available Timeslot"
              required="required"
              star="*"
            />
            <select
              className="form-select"
              name="topicName"
              // onChange={(e) => {
              //   getCurrentValue(e);
              //   handleChange(e);
              // }}
              // value={topicId}
            >
              <option value="">Select </option>
            </select>
          </div>
          <div className="mb-3">
            <FieldLabel
              htmlfor="AvailableRoom"
              labelText="Available Room"
              required="required"
              star="*"
            />
            <select
              className="form-select"
              name="topicName"
              // onChange={(e) => {
              //   getCurrentValue(e);
              //   handleChange(e);
              // }}
              // value={topicId}
            >
              <option value="">Select </option>
              {/* {props.selectedTopic.map((option: any, index: number) => (
                      <option key={index} value={option.id}>
                        {option.topicName}
                      </option>
                    ))} */}
            </select>
          </div>

          <div className="mb-3">
                  <FieldLabel
                    // star="*"
                    htmlfor="reason"
                    labelText="Reason"
                    // required="required"
                  />
                  <textarea
                    name="reason"
                    // component="textarea"
                    placeholder="Type Here ..."
                  />
                  {/* <FieldErrorMessage
                    errors={errors.query}
                    touched={touched.query}
                    // msgText="query is required"
                  /> */}
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
