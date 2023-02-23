import React from "react";
import "./style.scss";
import { Button } from "react-bootstrap";
import ProgramEnrollDropdown from "./programEnrollDropdown";
import { useNavigate } from "react-router-dom";

const ProgramEnrollFilter = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="filter-wrapper">
        <div className="filter-form">
          <form>
            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <ProgramEnrollDropdown />
              </div>
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Program Name"
                />
              </div>
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Program Code"
                />
              </div>
              <div className="col-auto">
                <Button variant="outline-secondary">Filter</Button>{" "}
                <Button variant="outline-secondary">Reset</Button>
                {" "}
              <Button variant="outline-secondary" onClick={() => navigate("/siteadmin")}>Go back</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProgramEnrollFilter;