import React, { useState } from "react";
import { useFormik } from "formik";
import "./style.scss";
import { Button, Row, Col } from "react-bootstrap";
import ProgramEnrollDropdown from "./programEnrollDropdown";
import { filterConfig } from "../../../utils/filterTimeout";

const ProgramEnrollFilter = ({ updateDepartment, updateinputfilters }: any) => {
  const [timeoutId, setTimeoutId] = useState<any>(null);
  const initialValues = {
    name: "",
    code: "",
  }

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      if (timeoutId) clearTimeout(timeoutId);  // Clear previous timeout, if any
      let newRequest = {
        name: values.name,
        code: values.code, 
      }
      updateinputfilters(newRequest);
    },
    onReset: () => {
      if (timeoutId) clearTimeout(timeoutId);  // Clear previous timeout, if any
      formik.setValues({
        name: "",
        code: "",
      });
      updateinputfilters(initialValues);
    }
  });

  // Event handler for filter input change with debounce
  const handleFilterChange = (event : any) => {
    formik.handleChange(event); // Update formik values

    if (timeoutId) clearTimeout(timeoutId);  // Clear previous timeout, if any

    // Set a new timeout to trigger updatefilters after a delay
    const newTimeoutId = setTimeout(() => {
      let newRequest = {
        name: event.target.name === 'name' ? event.target.value : formik.values.name,
        code: event.target.name === 'code' ? event.target.value : formik.values.code,
      };
      updateinputfilters(newRequest);
    }, filterConfig.timeoutNumber); // Adjust the delay (in milliseconds) as per your needs

    setTimeoutId(newTimeoutId); // Update the timeout ID in state
  };

  return (
    <React.Fragment>
      <div className="filter-wrapper mt-2 input-styles">  
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <Row className="g-2">
            <Col>
              <ProgramEnrollDropdown updateDepartment={updateDepartment} />
            </Col>
            <Col>
              <label htmlFor="name" hidden>Program Name</label>
              <input
                className="form-control"
                id="name"
                name="name"
                type="text"
                placeholder="Program Name"
                onChange={handleFilterChange}
                value={formik.values.name}
              />
            </Col>
            <Col>
              <label htmlFor="code" hidden>Program Code</label>
              <input
                className="form-control"
                id="code"
                name="code"
                type="text"
                placeholder="Program Code"
                onChange={handleFilterChange}
                value={formik.values.code}
              />
            </Col>
            <Col>
              <Button variant="primary" type="submit" className="me-2">Filter</Button>
              <Button variant="outline-secondary" type="reset" onClick={formik.handleReset}>Reset</Button>
            </Col>
          </Row>          
        </form>
      </div>
    </React.Fragment>
  );
};

export default ProgramEnrollFilter;
