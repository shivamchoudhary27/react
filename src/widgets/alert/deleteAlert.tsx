import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteAlert = ({
  show,
  onHide,
  deleteActionResponse,
  modalHeading,
}: any) => {
  const deleteHandler = (e: any) => {
    if (e.type === "click") {
      deleteActionResponse(e.target.innerHTML);
    }
  };

  return (
    <React.Fragment>
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete {modalHeading}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Are tou sure, you want to delete!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={(e) => deleteHandler(e)}>
            Yes
          </Button>
          <Button variant="secondary" onClick={(e) => deleteHandler(e)}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default DeleteAlert;
