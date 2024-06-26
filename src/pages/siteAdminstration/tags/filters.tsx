import { useFormik } from "formik";
import React, { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { filterConfig } from "../../../utils/filterTimeout";
import { FiltersLoadingBtn } from "../../../utils/filtersLoading";

const initialValues = {
  name: "",
};

const Filters = ({
  apiStatus,
  setTagObj,
  toggleModalShow,
  userPermissions,
  updateInputFilters,
}: any) => {
  const [timeoutId, setTimeoutId] = useState<any>(null);
  const addTagsHandler = () => {
    toggleModalShow(true);
    setTagObj({ id: 0, name: "" });
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout, if any
      updateInputFilters(values.name);
    },
    onReset: () => {
      if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout, if any
      formik.setValues({
        name: "",
      });
      updateInputFilters(initialValues.name);
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
        <div className="site-button-group">
          {userPermissions.canAdd === true && (
            <Button variant="primary" onClick={addTagsHandler}>
              Add Tags
            </Button>
          )}{" "}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Filters;
