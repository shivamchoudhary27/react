import { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import { filterConfig } from "../../../../../utils/filterTimeout";
import { FiltersLoadingBtn } from "../../../../../utils/filtersLoading";
import React from "react";
import { isMobile } from "react-device-detect";
const initialValues = {
  name: "",
  email: "",
};

const ManageFilter = ({ updateInputFilters, apiStatus }: any) => {
  const [timeoutId, setTimeoutId] = useState<any>(null);
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout, if any
      updateInputFilters(values, false);
    },
    onReset: () => {
      if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout, if any
      formik.setValues({
        name: "",
        email: "",
      });
      updateInputFilters({}, true);
    },
  });

  // Event handler for filter input change with debounce
  const handleFilterChange = (event : any) => {
    formik.handleChange(event); // Update formik values

    if (timeoutId) clearTimeout(timeoutId);  // Clear previous timeout, if any

    // Set a new timeout to trigger updatefilters after a delay
    const newTimeoutId = setTimeout(() => {
      let newRequest = {
        name: event.target.name === 'name' ? event.target.value : formik.values.name,
        email: event.target.name === 'email' ? event.target.value : formik.values.email,
      };
      updateInputFilters(newRequest, false);
    }, filterConfig.timeoutNumber); // Adjust the delay (in milliseconds) as per your needs

    setTimeoutId(newTimeoutId); // Update the timeout ID in state
  };

  return (
    <React.Fragment>
      <div className="filter-wrapper mt-2">
        <div className={`${isMobile ? "w-100" : ""}`}>
      <form
        onSubmit={formik.handleSubmit}
        onReset={formik.handleReset}
      >
        <Row className="g-2">
          <Col>
            <input
              className="form-control"
              id="name"
              name="name"
              type="text"
              placeholder="Fullname"
              onChange={handleFilterChange}
              value={formik.values.name}
            />
          </Col>
          <Col>
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
            {FiltersLoadingBtn(apiStatus)}
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
      </div>
    </React.Fragment>
  );
};

export default ManageFilter;
