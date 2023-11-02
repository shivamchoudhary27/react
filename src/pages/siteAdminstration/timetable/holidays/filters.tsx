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
  yearOptions,
  toggleModalShow,
  updateInputFilters,
  resetHolidaysForm,
  updateHolidaysFilter,
}: any) => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [selectedValue, setSelectedValue] = useState('');

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values: any) => {
      if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout, if any
      updateInputFilters(selectedValue);
    },
    onReset: () => {
      if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout, if any
      formik.setValues({
        year: "",
      });
      updateInputFilters("");
      setSelectedValue("");
    },
  });

  // handle to open Add Department modal === >>>
  const openAddHoliday = () => {
    toggleModalShow(true);
    resetHolidaysForm(true);
  };

  return (
    <React.Fragment>
      <div className="filter-wrapper mt-2">
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <Row className="g-2">
            <Col>
              <ManageDropdown
                yearOptions={yearOptions}
                updateHolidaysFilter={updateHolidaysFilter}
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
          <Button variant="primary" onClick={openAddHoliday}>
            Add Holiday
          </Button>{" "}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Filters;
