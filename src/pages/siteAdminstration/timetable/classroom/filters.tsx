import { useFormik } from "formik";
import React, { useState } from "react";
import ManageDropdown from "./manageDropdown";
import { Button, Row, Col } from "react-bootstrap";
import { filterConfig } from "../../../../utils/filterTimeout";
import { LoadingButton } from "../../../../widgets/formInputFields/buttons";

const initialValues = {
  name: "",
};

const Filters = ({
  apiStatus,
  departmentList,
  toggleModalShow,
  updateInputFilters,
  resetClassroomForm,
  updateClassroomFilter,
}: any) => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [selectedValue, setSelectedValue] = useState('');

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values: any) => {
      if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout, if any
      updateClassroomFilter(selectedValue)
    },
    onReset: () => {
      if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout, if any
      formik.setValues({
        name: "",
      });
      setSelectedValue("");
      updateClassroomFilter("");
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
              <ManageDropdown
                departmentList={departmentList}
                updateClassroomFilter={updateClassroomFilter}
                setSelectedValue ={setSelectedValue}
                selectedValue ={selectedValue}
              />
            </Col>
            <Col>
              <Button variant="primary" type="submit" className="me-2">
                {apiStatus !== "finished" ? <LoadingButton status="filterLoader" /> : "Filter"}
              </Button>
              <Button
                variant="outline-secondary"
                type="reset"
                onClick={formik.handleReset}
                className="me-2"
              >
                Reset
              </Button>
            </Col>
          </Row>
        </form>
        <div className="site-button-group">
          <Button variant="primary" onClick={openAddDepartment}>
            Add Classroom
          </Button>{" "}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Filters;
