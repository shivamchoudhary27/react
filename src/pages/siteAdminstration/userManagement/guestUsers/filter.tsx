import { useFormik } from "formik";
import React, { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { filterConfig } from "../../../../utils/filterTimeout";

const initialValues = {
  firstName: "",
  email: "",
};

const GuestFilter = ({ updatefilters }: any) => {
  const [timeoutId, setTimeoutId] = useState<any>(null);

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout, if any
      let newRequest = {
        firstName: values.firstName,
        email: values.email,
      };
      updatefilters(newRequest);
    },
    onReset: () => {
      if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout, if any
      formik.setValues({
        firstName: "",
        email: "",
      });
      updatefilters(initialValues, true);
    },
  });

  // Event handler for filter input change with debounce
  const handleFilterChange = (event: any) => {
    formik.handleChange(event); // Update formik values

    if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout, if any

    // Set a new timeout to trigger updatefilters after a delay
    const newTimeoutId = setTimeout(() => {
      let newRequest = {
        firstName:
          event.target.name === "firstName"
            ? event.target.value
            : formik.values.firstName,
        email:
          event.target.name === "email"
            ? event.target.value
            : formik.values.email,
      };
      updatefilters(newRequest);
    }, filterConfig.timeoutNumber);

    setTimeoutId(newTimeoutId); // Update the timeout ID in state
  };

  return (
    <React.Fragment>
      <div className="filter-wrapper mt-2">
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <Row className="g-2">
            <Col>
              <label htmlFor="firstName" hidden>
                Name
              </label>
              <input
                className="form-control"
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Firstname / Surname"
                onChange={handleFilterChange}
                value={formik.values.firstName}
              />
            </Col>
            <Col>
              <label htmlFor="email" hidden>
                Email
              </label>
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
    </React.Fragment>
  );
};

export default GuestFilter;
