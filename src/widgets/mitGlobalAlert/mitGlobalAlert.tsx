import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import ACTIONSLIST from "../../store/actions";

const MitGlobalAlert = () => {
  const dispatch = useDispatch();
  const mitGlobalAlert = useSelector((state) => state.mitGlobalAlert);

  const deleteHandler = () => {
    dispatch({
      type: ACTIONSLIST.mitGlobalAlert,
      alertMsg: "Hello",
      status: false,
    });
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
          <Button variant="primary" onClick={deleteHandler}>
            Okay
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default MitGlobalAlert;
