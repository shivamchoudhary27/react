import React, { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import { filterConfig } from "../../../utils/filterTimeout";
import { IFilter } from "./types/interface";

interface IInitialValues{
  name: string
}

const initialValues: IInitialValues = {
  name: "",
}

const Filter: React.FunctionComponent<IFilter> = ({openAddProgramType, updateinputfilters} : IFilter) => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values: IInitialValues) => {
      if (timeoutId) clearTimeout(timeoutId);  // Clear previous timeout, if any
      updateinputfilters(values.name);
    },
    onReset: () => {
      if (timeoutId) clearTimeout(timeoutId);  // Clear previous timeout, if any
      formik.setValues({
        name: "",
      });
      updateinputfilters(initialValues.name);
    }
  });
  
  // Event handler for filter input change with debounce
  const handleFilterChange = (event : any) => {
    formik.handleChange(event); // Update formik values

    if (timeoutId) clearTimeout(timeoutId);  // Clear previous timeout, if any

    // Set a new timeout to trigger updatefilters after a delay
    const newTimeoutId: NodeJS.Timeout = setTimeout(() => {
      updateinputfilters(event.target.value);
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
                placeholder="Name"
                onChange={handleFilterChange}
                value={formik.values.name}
              />
            </Col>
            <Col>
              <Button variant="primary" type="submit" className="me-2">Filter</Button>
              <Button variant="outline-secondary" type="reset" onClick={formik.handleReset}>Reset</Button>
            </Col>
          </Row>          
        </form>
        <div className="site-button-group">
          <Button variant="primary" onClick={openAddProgramType}>Add Program Type</Button>{" "}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Filter;
