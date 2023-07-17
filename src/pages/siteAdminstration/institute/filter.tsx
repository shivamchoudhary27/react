import React, { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import { filterConfig } from "../../../utils/filterTimeout";
import { TypeFilter } from "./types/type";

type TypeInitialValues = {
  name: string;
  shortCode: string;
}

const initialValues: TypeInitialValues = {
  name: "",
  shortCode: "",
}

const Filter: React.FunctionComponent<TypeFilter> = ({updatefilters, toggleUploadModal, openAddUserModal} : TypeFilter) => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values: TypeInitialValues) => {
      if (timeoutId) clearTimeout(timeoutId);  // Clear previous timeout, if any
      let newRequest = {
        name: values.name,
        shortCode: values.shortCode,
      }
      updatefilters(newRequest);
    },
    onReset: () => {
      if (timeoutId) clearTimeout(timeoutId);  // Clear previous timeout, if any
      formik.setValues({
        shortCode: "",
        name:""
      });
      updatefilters(initialValues, true);
    }
  });

  // Event handler for filter input change with debounce
  const handleFilterChange = (event : React.ChangeEvent<HTMLInputElement>): void => {
    formik.handleChange(event); // Update formik values

    if (timeoutId) clearTimeout(timeoutId);  // Clear previous timeout, if any

    // Set a new timeout to trigger updatefilters after a delay
    const newTimeoutId = setTimeout(() => {
      let newRequest = {
        name: event.target.name === 'name' ? event.target.value : formik.values.name,
        shortCode: event.target.name === 'shortCode' ? event.target.value : formik.values.shortCode,
      };
      updatefilters(newRequest);
    }, filterConfig.timeoutNumber); // Adjust the delay (in milliseconds) as per your needs

    setTimeoutId(newTimeoutId); // Update the timeout ID in state
  };


  return (
    <React.Fragment>
      <div className="filter-wrapper mt-2">
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <Row className="g-2">
            <Col>
              <label htmlFor="name" hidden>Name</label>
              <input
                className="form-control"
                id="name"
                name="name"
                type="text"
                placeholder="Institute Name"
                onChange={handleFilterChange}
                value={formik.values.name}
              />
            </Col>
            <Col>
              <label htmlFor="email" hidden>Email</label>
              <input
                className="form-control"
                id="shortCode"
                name="shortCode"
                type="text"
                placeholder="Short Code"
                onChange={handleFilterChange}
                value={formik.values.shortCode}
              />
            </Col>
            <Col>
              <Button variant="primary" type="submit" className="me-2">Filter</Button>
              <Button variant="outline-secondary" type="reset" onClick={formik.handleReset}>Reset</Button>
            </Col>
          </Row>          
        </form>
        <div className="site-button-group">
          <Button variant="primary" onClick={openAddUserModal}>Add Institute</Button>{" "}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Filter;
