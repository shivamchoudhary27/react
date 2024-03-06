import React from "react";
import { Modal, Button } from "react-bootstrap";
import WaveBottom from "../../assets/images/background/bg-modal.svg";
interface IDeleteAlert {
  show: boolean;
  onHide: () => void;
  deleteActionResponse: (params: string) => void;
  modalHeading: string;
}

const DeleteAlert: React.FunctionComponent<IDeleteAlert> = ({
  show,
  onHide,
  deleteActionResponse,
  modalHeading,
}: IDeleteAlert) => {
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
        className="modal-design-wrapper"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete {modalHeading}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3 text-center">
            Are you sure, you want to delete!
          </div>
          <div className="modal-buttons">
            <Button variant="primary" onClick={(e) => deleteHandler(e)}>
              Yes
            </Button>
            <Button variant="secondary" onClick={(e) => deleteHandler(e)}>
              No
            </Button>
          </div>
        </Modal.Body>
        <img src={WaveBottom} alt="WaveBottom" className="wavebg" />
      </Modal>
    </React.Fragment>
  );
};

export default DeleteAlert;
