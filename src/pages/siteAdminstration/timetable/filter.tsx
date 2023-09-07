import React, { useState } from "react";
import "./style.scss";
import { Button, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Filter = ({
  toggleModalShow,
  resetDepartmentForm,
  setDepartmentData,
  refreshDepartmentData,
  updateInputFilters,
}: any) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e: any) => {
    e.preventDefault();
  };

  const resetHandler = () => {
    updateInputFilters("");
    setSearchValue("");
  };

  // handle to open Add Department modal === >>>
  const calendarConfig = () => {
    navigate('/calenderconfig')
    // toggleModalShow(true);
    // resetDepartmentForm(true);
  };

  return (
    <>
      <div className="filter-wrapper">
        <form onSubmit={handleSearch}>
          <Row className="align-items-center g-2">
            <Col className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
              />
            </Col>
            <Col className="col-auto">
              <Button variant="primary" className="me-2">
                Filter
              </Button>{" "}
              <Button variant="outline-secondary" onClick={() => resetHandler()}>
                Reset
              </Button>
            </Col>
          </Row>
        </form>
        <div>
          <Button variant="primary" onClick={() => navigate('/classroom')}>Manage Classroom</Button>{" "}
          <Button variant="primary" onClick={calendarConfig}>Events Color</Button>
        </div>
      </div>
    </>
  );
};

export default Filter;
