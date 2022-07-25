import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Modal_Elem = () => {
  const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleYes = () => {
    const video_id = document.getElementById("video_time");
    alert(video_id.currentTime);
    setShow(false);
  }
  const handleNo = () => {
      alert("no");
    setShow(false);
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button>

      <Modal
        show={show}
        // onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>Want to Resume?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleYes}>
            Yes
          </Button>
          <Button variant="primary" onClick={handleNo}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Modal_Elem;
