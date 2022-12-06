import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
function Modal_Elem(props) {
  const [show, setShow] = useState(props.openModal);
  const handleYes = () => {
    setShow(false);
    props.getResponse(true);
  };
  const handleNo = () => {
    setShow(false);
    props.getResponse(false);
  };
  return (
    <Modal
      show={show}
      // onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>Resume video</Modal.Title>
      </Modal.Header>
      <Modal.Body>Do you want to play video from where you left it last time?</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleYes}>
          Yes
        </Button>
        <Button variant="secondary" onClick={handleNo}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default Modal_Elem;
