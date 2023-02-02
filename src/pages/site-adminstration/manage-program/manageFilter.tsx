import React, { useState } from "react";
import "./style.scss";
import { Button } from "react-bootstrap";
import ManageDropdown from "./manageDropdown";
import { useNavigate } from "react-router-dom";
import { ManageRawData } from "./rawData";

const ManageFilter = () => {
  const [inputName, setInputName] = useState("");
  const [inputCode, setInputCode] = useState("");

  const navigate = useNavigate();
  const handleAddProgram = () => {
    navigate("/addprogram");
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    console.log(e);
  };

  const handleReset = () => {};

  return (
    <>
      <div className="filter-wrapper">
        <div className="filter-form">
          <form onSubmit={handleSearch}>
            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <ManageDropdown />
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
                <Button variant="outline-secondary" type="submit">
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
        <div>
          <Button variant="primary" onClick={handleAddProgram}>
            Add Program
          </Button>
        </div>
      </div>
    </>
  );
};

export default ManageFilter;
