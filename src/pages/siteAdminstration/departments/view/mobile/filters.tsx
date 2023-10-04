import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { FiltersLoadingBtn } from "../../../../../utils/filtersLoading";

type Props = {
  commonProps: {
    formik: any;
    apiStatus: string;
    permissions?: any;
    openAddDepartment: () => void;
    handleFilterChange: (params: any) => void;
  };
};

const MobileFilters = ({ commonProps }: Props) => {
  return (
    <React.Fragment>
      <div className="filter-wrapper mt-2">
        <form
          onReset={commonProps.formik.handleReset}
          onSubmit={commonProps.formik.handleSubmit}
        >
          <Row className="g-2">
            <Col>
              <label htmlFor="name" hidden>
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Name"
                className="form-control"
                value={commonProps.formik.values.name}
                onChange={commonProps.handleFilterChange}
              />
            </Col>
            <Col>
              {FiltersLoadingBtn(commonProps.apiStatus)}
              <Button
                type="reset"
                variant="outline-secondary"
                onClick={commonProps.formik.handleReset}
              >
                Reset
              </Button>
            </Col>
          </Row>
        </form>
        <div className="site-button-group">
          {commonProps.permissions.canAdd && (
            <Button variant="primary" onClick={commonProps.openAddDepartment}>
              Add Department
            </Button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default MobileFilters;
