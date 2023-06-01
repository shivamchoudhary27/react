import React, { useState } from "react";
import "./style.scss";
import { Button, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Filter = ({
  toggleModalShow,
  resetDepartmentForm,
  departmentData,
  setDepartmentData,
  refreshDepartmentData,
  updateInputFilters,
}: any) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e: any) => {
    e.preventDefault();
  };

  const getInputValues = () => {
    updateInputFilters(searchValue);
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
          <Row className="align-items-center gx-3">
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
              <Button variant="primary" className="me-2" onClick={() => getInputValues()}>
                Filter
              </Button>{" "}
              <Button variant="outline-secondary" onClick={() => resetHandler()}>
                Reset
              </Button>
            </Col>
          </Row>
        </form>
        <Button variant="primary" onClick={calendarConfig}>Events Color</Button>
      </div>
    </>
  );
};

export default Filter;
