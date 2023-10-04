import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import { filterConfig } from "../../../utils/filterTimeout";
import { LoadingButton } from "../../../widgets/formInputFields/buttons";

const initialValues = {
  name: "",
};

const Filters = ({ updateInputFilters, apiStatus }: any) => {
  const navigate = useNavigate();
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
  const calendarConfig = () => {
    navigate("/calenderconfig");
    // toggleModalShow(true);
    // resetDepartmentForm(true);
  };

  return (
    <React.Fragment>
      <div className="filter-wrapper mt-2">
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <Row className="g-2">
            <Col>
              <label htmlFor="name" hidden>
                Name
              </label>
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
              <Button variant="primary" type="submit" className="me-2">
                {apiStatus !== "finished" ? <LoadingButton status="filterLoader" /> : "Filter"}
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
        <div className="site-button-group">
          <div>
            {/* <Button variant="primary" onClick="">Add Timetable</Button>{" "} */}
            <Button variant="primary" onClick={() => navigate("/classroom")}>
              Manage Classroom
            </Button>{" "}
            <Button variant="primary" onClick={() => navigate("/holidays")}>
              Manage Holidays
            </Button>{" "}
            <Button variant="primary" onClick={() => navigate("/timesslot")}>
              Manage Times Slot
            </Button>{" "}
            <Button variant="primary" onClick={() => navigate("/workload")}>
              Faculty Work Load
            </Button>{" "}
            <Button variant="primary" onClick={calendarConfig}>
              Events Color
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Filters;
