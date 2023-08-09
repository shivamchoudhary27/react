import React from "react";
import { Row, Col, Button } from "react-bootstrap";

type Props = {
  permissions?: any;
  openAddDepartment: any;
  handleFilterChange: any;
  formik: any;
};

function MobileFilter({
  permissions,
  openAddDepartment,
  handleFilterChange,
  formik,
}: Props) {
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
        <div className="site-button-group">
          {permissions.canAdd && (
            <Button variant="primary" onClick={openAddDepartment}>
              Add Department
            </Button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default MobileFilter;
