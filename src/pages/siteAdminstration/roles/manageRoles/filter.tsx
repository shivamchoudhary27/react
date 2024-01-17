import { useFormik } from "formik";
import React, { useState } from "react";
import { IFilter } from "./types/interface";
import { useNavigate } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import { filterConfig } from "../../../../utils/filterTimeout";
import { FiltersLoadingBtn } from "../../../../utils/filtersLoading";

interface IInitialValues {
  name: string;
}

const initialValues = {
  name: "",
};

const Filter: React.FunctionComponent<IFilter> = ({
  updateSearchFilters,
  toggleModalShow,
  openAddRoleModal,
  rolePermissions,
  apiStatus,
}: IFilter) => {
  const navigate = useNavigate();
  const [timeoutId, setTimeoutId] = useState<any>(null);

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values: IInitialValues) => {
      if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout, if any
      let newRequest = {
        name: values.name,
      };
      updateSearchFilters(newRequest);
    },
    onReset: () => {
      if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout, if any
      formik.setValues({
        name: "",
      });
      updateSearchFilters(initialValues, true);
    },
  });

  // Event handler for filter input change with debounce
  const handleFilterChange = (event: any): void => {
    formik.handleChange(event); // Update formik values

    if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout, if any

    // Set a new timeout to trigger updatefilters after a delay
    const newTimeoutId = setTimeout(() => {
      let newRequest = {
        name: event.target.value,
      };
      updateSearchFilters(newRequest);
    }, filterConfig.timeoutNumber); // Adjust the delay (in milliseconds) as per your needs

    setTimeoutId(newTimeoutId); // Update the timeout ID in state
  };

  const manageauthorities = (): void => {
    navigate("/manageauthorities");
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
          {/* <Button variant="primary" onClick={manageauthorities}>
            Manage Authorities
          </Button>{" "} */}
          {/* <Button variant="primary" onClick={toggleModalShow}>Assign Institute Admin</Button>{" "} */}
          {rolePermissions.canAdd && (
            <Button variant="primary" onClick={openAddRoleModal}>
              Add Role
            </Button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Filter;
