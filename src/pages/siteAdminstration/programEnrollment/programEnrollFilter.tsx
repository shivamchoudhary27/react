import React, { useState } from "react";
import "./style.scss";
import { Button } from "react-bootstrap";
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
            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <ProgramEnrollDropdown updateDepartment={updateDepartment} />
              </div>
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Program Name"
                  onChange={(e) => setInputName(e.target.value)}
                  value={inputName}
                />
              </div>
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Program Code"
                  onChange={(e) => setInputCode(e.target.value)}
                  value={inputCode}
                />
              </div>
              <div className="col-auto">
                <Button
                  variant="outline-secondary"
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
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProgramEnrollFilter;
