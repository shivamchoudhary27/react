import { useState } from "react";
import "./style.scss";
import { Button } from "react-bootstrap";
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
      <div>
          <Button variant="primary" onClick={handleAddProgram}>
            Add Program
          </Button>
        </div>
        <div className="filter-form mt-2">
          <form onSubmit={handleSearch}>
            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <ManageDropdown updatedepartment={updatedepartment}/>
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
                  variant="primary" type="submit" className="me-2"
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

export default ManageFilter;
