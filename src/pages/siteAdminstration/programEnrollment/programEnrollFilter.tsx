import React, { useState } from "react";
import "./style.scss";
import { Button, Row, Col } from "react-bootstrap";
import ProgramEnrollDropdown from "./programEnrollDropdown";
import { useNavigate } from "react-router-dom";

const ProgramEnrollFilter = ({ updateDepartment, updateinputfilters }: any) => {
  const navigate = useNavigate();
  const [inputName, setInputName] = useState("");
  const [inputCode, setInputCode] = useState("");

  const handleReset = () => {
    updateinputfilters({ name: "", code: "" });
    setInputName("");
    setInputCode("");
  };

  const getInputValues = () => {
    updateinputfilters({ name: inputName, code: inputCode });
  };

  return (
    <>
      <div className="filter-wrapper">
        <div className="filter-form">
          <form>
            <Row className="g-2 align-items-center">
              <Col>
                <ProgramEnrollDropdown updateDepartment={updateDepartment} />
              </Col>
              <Col>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Program Name"
                  onChange={(e) => setInputName(e.target.value)}
                  value={inputName}
                />
              </Col>
              <Col>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Program Code"
                  onChange={(e) => setInputCode(e.target.value)}
                  value={inputCode}
                />
              </Col>
              <Col>
                <Button
                  variant="primary" className="me-2"
                  onClick={() => getInputValues()}
                >
                  Filter
                </Button>{" "}
                <Button
                  variant="outline-secondary"
                  onClick={() => handleReset()}
                >
                  Reset
                </Button>
              </Col>
            </Row>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProgramEnrollFilter;
