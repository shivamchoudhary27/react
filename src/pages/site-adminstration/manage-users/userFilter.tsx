import React from "react";
import "./style.scss";
import { Button } from "react-bootstrap";

const UserFilter = () => {
  const handleInput = (e: any) => {
    console.log(e.target.value);
  };

  return (
    <>
      <div className="filter-wrapper">
        <div className="filter-form">
          <div className="row g-3 align-items-center">
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Name / Email"
                onChange={(e) => handleInput(e)}
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Roll No"
                onChange={(e) => handleInput(e)}
              />
            </div>
            <div className="col-auto">
              <Button variant="outline-secondary">Filter</Button>{" "}
              <Button variant="outline-secondary">Reset</Button>
            </div>
          </div>
        </div>
        <div>
          <div className="site-button-group">
            <Button variant="primary">Upload Users</Button>{" "}
            <Button variant="primary">Add Users</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserFilter;
