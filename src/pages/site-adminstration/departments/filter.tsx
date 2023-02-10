import React from "react";
import "./style.scss";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Filter = ({ setModalShow }: any) => {
  const navigate = useNavigate();
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
                placeholder="Name"
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
            <Button variant="primary" onClick={() => setModalShow(true)}>Add Department</Button>
            {" "}
            <Button variant="outline-secondary" onClick={() => navigate("/manageprogram")}>Go back</Button>
        </div>
      </div>
    </>
  );
};

export default Filter;
