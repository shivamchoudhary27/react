import { useState } from "react";
import "./style.scss";
import { Button, Row, Col, Container } from "react-bootstrap";
import ManageDropdown from "./manageDropdown";
import { useNavigate } from "react-router-dom";

const ManageFilter = ({ updatedepartment, updateinputfilters } : any) => {
  const [inputName, setInputName] = useState("");
  const [inputCode, setInputCode] = useState("");

  const navigate = useNavigate();
  const handleAddProgram = () => {
    navigate("/addprogram/0");
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
  };

  const handleReset = () => {
    updateinputfilters({name: "", code: ""});
    setInputName("");
    setInputCode("");
  };

  const getInputValues = () => {
    updateinputfilters({name: inputName, code: inputCode});
  }

  return (
    <>
      <div className="filter-wrapper mt-2">        
        <form onSubmit={handleSearch}>
          <Row className="align-items-center gx-3">
            <Col className="col-auto">
            <ManageDropdown updatedepartment={updatedepartment}/>
            </Col>
            <Col className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Program Name"
                onChange={(e) => setInputName(e.target.value)}
                value={inputName}
              />
            </Col>
            <Col className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Program Code"
                onChange={(e) => setInputCode(e.target.value)}
                value={inputCode}
              />
            </Col>
            <Col className="col-auto">
              <Button variant="primary" type="submit" className="me-2" onClick={() => getInputValues()}>
                Filter
              </Button>{" "}
              <Button variant="outline-secondary" onClick={() => handleReset()}>Reset</Button>
            </Col>
          </Row>
        </form>
        <Button variant="primary" onClick={handleAddProgram}>Add Program</Button>
      </div>
    </>
  );
};

export default ManageFilter;
