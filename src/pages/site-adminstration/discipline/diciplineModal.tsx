import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const DiciplineModal = (props) => {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Dicipline
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <input type="text" className="form-control mb-3" placeholder="Name" />
          <textarea
            className="form-control mb-3"
            placeholder="Description"
          ></textarea>
          <div className="mt-4 text-center">
            <Button variant="primary">Save</Button>{" "}
            <Button variant="outline-secondary">Reset</Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default DiciplineModal;
