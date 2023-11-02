import { useFormik } from "formik";
import React, { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { filterConfig } from "../../../../utils/filterTimeout";
import InstituteDepartmentDropdown from "./instituteDepartmentDropdown";
import { LoadingButton } from "../../../../widgets/formInputFields/buttons";

const initialValues = {
  name: "",
  email: ""
};

const Filters = ({
  apiStatus,
  toggleModalShow,
  currentInstitute,
  updateInputFilters,
  resetClassroomForm,
  updateDepartmentFilter,
}: any) => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [selectedValue, setSelectedValue] = useState('');

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values: any) => {
      if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout, if any
      let newRequest = {
        name: values.name,
        email: values.email
      };
      updateInputFilters(newRequest.name, newRequest.email);
    },
    onReset: () => {
      if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout, if any
      formik.setValues({
        name: "",
        email: ""
      });
      updateInputFilters("", "");
      setSelectedValue("");
      updateDepartmentFilter("");
    },
  });

  // Event handler for filter input change with debounce
  const handleFilterChange = (event: any) => {
    formik.handleChange(event); // Update formik values

    if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout, if any

    // Set a new timeout to trigger updatefilters after a delay
    const newTimeoutId = setTimeout(() => {
      let newRequest = {
        name: event.target.name === 'name' ? event.target.value : formik.values.name,
        email: event.target.name === 'email' ? event.target.value : formik.values.email,
      };
      updateInputFilters(newRequest.name, newRequest.email);
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
              <InstituteDepartmentDropdown 
                currentInstitute={currentInstitute}
                selectedValue ={selectedValue}
                updateDepartmentFilter={updateDepartmentFilter} 
                setSelectedValue ={setSelectedValue}
              />
            </Col>
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
              <Button variant="primary" type="submit" className="me-2">
                {apiStatus !== "finished" ? <LoadingButton status="filterLoader" /> : "Filter"}
              </Button>
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
