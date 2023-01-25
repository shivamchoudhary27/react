import React from "react";
import "./style.scss";
import { Button } from "react-bootstrap";
import ManageDropdown from "./manageDropdown";
import { useNavigate } from "react-router-dom";

const ManageFilter = () => {
  const navigate = useNavigate();
  const handleAddProgram = () => {
    navigate('/addprogram');
  }

  return (
    <>
      <div className="filter-wrapper">
        <div className="filter-form">
          <div className="row g-3 align-items-center">
            <div className="col-auto">
              {/* <label>Department</label> */}
              <ManageDropdown />
            </div>
            <div className="col-auto">
              {/* <label>Program Name</label> */}
              <input
                type="text"
                className="form-control"
                placeholder="Program Name"
              />
            </div>
            <div className="col-auto">
              {/* <label>Program Code</label> */}
              <input
                type="text"
                className="form-control"
                placeholder="Program Code"
              />
            </div>
            <div className="col-auto">
              <Button variant="outline-secondary">Filter</Button>{" "}
              <Button variant="outline-secondary">Reset</Button>
            </div>
          </div>
        </div>
        <div>
          <Button variant="primary" onClick={handleAddProgram}>Add Program</Button>
        </div>
      </div>
    </>
  );
};

export default ManageFilter;
