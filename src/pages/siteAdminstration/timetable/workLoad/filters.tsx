import { useFormik } from "formik";
import React, { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { filterConfig } from "../../../../utils/filterTimeout";

const initialValues = {
  name: "",
};

const Filters = ({
  toggleModalShow,
  updateInputFilters,
  resetClassroomForm,
  updateClassroomFilter,
}: any) => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values: any) => {
      if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout, if any
      let newRequest = {
        name: values.name,
      };
      updateInputFilters(newRequest.name);
    },
    onReset: () => {
      if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout, if any
      formik.setValues({
        name: "",
      });
      updateInputFilters("");
    },
  });

  // Event handler for filter input change with debounce
  const handleFilterChange = (event: any) => {
    formik.handleChange(event); // Update formik values

    if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout, if any

    // Set a new timeout to trigger updatefilters after a delay
    const newTimeoutId = setTimeout(() => {
      updateInputFilters(event.target.value);
    }, filterConfig.timeoutNumber); // Adjust the delay (in milliseconds) as per your needs

    setTimeoutId(newTimeoutId); // Update the timeout ID in state
  };

  // handle to open Add Department modal === >>>
  const openAddDepartment = () => {
    toggleModalShow(true);
    resetClassroomForm(true);
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
                placeholder="Name"
                onChange={handleFilterChange}
                value={formik.values.name}
              />
            </Col>
            <Col>
              <label htmlFor="email" hidden>Email</label>
              <input
                className="form-control"
                id="email"
                name="email"
                type="text"
                placeholder="Email"
                onChange={handleFilterChange}
                value={formik.values.email}
              />
            </Col>
            <Col>
              <Button variant="primary" type="submit" className="me-2">Filter</Button>
              <Button variant="outline-secondary" type="reset" onClick={formik.handleReset}>Reset</Button>
            </Col>
          </Row>          
        </form>
        <div className="site-button-group">
          <Button variant="primary" onClick={openAddDepartment}>
            Set Faculty Default Work Load
          </Button>{" "}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Filters;
