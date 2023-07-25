import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { globalAlertActions } from "../../store/slices/globalAlerts";

const MitGlobalAlert = () => {
  const dispatch = useDispatch();
  const mitGlobalAlert = useSelector((state : any) => state.globalAlerts.mitGlobalAlert);

  const closeAlert = () => {
    dispatch(globalAlertActions.globalAlert({alertMsg: "", status: false}))
  };

  return (
    <React.Fragment>
      <Modal
        show={mitGlobalAlert.hideShow}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Alert
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{mitGlobalAlert.msg}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={closeAlert}>
            Okay
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default MitGlobalAlert;
