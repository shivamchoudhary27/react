import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";

const ManageFilter = () => {
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    code: "",
  };

  const handleAddProgram = () => {
    navigate(`/addprogram/0`);
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
    },
    onReset: () => {
    },
  });

  // Event handler for filter input change with debounce
  const handleFilterChange = (event: any) => {
  };
  return (
    <>
      <div className="filter-wrapper mt-2 input-styles">
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <Row className="g-2">
            <Col>
                <label htmlFor="courses" hidden>
                    Courses
                </label>
                <select className="form-select">
                    <option value="">Courses</option>
                    <option value="">Course 1</option>
                    <option value="">Course 2</option>
                    <option value="">Course 3</option>
              </select>   
            </Col>
            <Col>
              <label htmlFor="faculty" hidden>
                Faculty
              </label>
              <select className="form-select">
                <option value="">All Faculty</option>
                <option value="">Faculty 1</option>
                <option value="">Faculty 2</option>
                <option value="">Faculty 3</option>
              </select>
            </Col>
            <Col>
              <label htmlFor="code" hidden>
                Program Code
              </label>
              <input
                className="form-control"
                id="code"
                name="code"
                type="text"
                onChange={handleFilterChange}
                value={formik.values.code}
              />
            </Col>
            <Col>
              <Button variant="primary" type="submit" className="me-2">
                Filter
              </Button>
              <Button
                variant="outline-secondary"
                type="reset"
                onClick={formik.handleReset}
              >
                Reset
              </Button>
            </Col>
          </Row>
        </form>
      </div>
    </>
  );
};

export default ManageFilter;
