import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const AddProgramModal = (props) => {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Program Type
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <input type="text" className="form-control mb-3" placeholder="Name" />
          <textarea
            className="form-control mb-3"
            placeholder="Description"
          ></textarea>
          <input type="checkbox" /> <span style={{color: '#666'}}>Batch Year Required?</span>
          <div className="mt-4 text-center">
            <Button variant="primary">Save</Button>{" "}
            <Button variant="outline-secondary">Reset</Button>
          </div>
          <p className="mt-4" style={{color: '#666'}}>
            <span style={{ fontWeight: "600" }}>Note: </span>If batch year
            checked it's available on add program form.
          </p>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddProgramModal;
