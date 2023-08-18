import React from "react";
import { Button, Row, Col } from "react-bootstrap";

type props = {
  commonProps:{
    formik: any;
    disciplinePermissions: any;
    handleFilterChange: (params: any) => void;
    openAddDiscipline: (params: boolean) => void;
  }
};

const BrowserFilters: React.FunctionComponent<props> = ({commonProps}: props) => {
  return (
    <React.Fragment>
      <div className="filter-wrapper mt-2">
        <form onSubmit={commonProps.formik.handleSubmit} onReset={commonProps.formik.handleReset}>
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
              <Button variant="primary" type="submit" className="me-2">
                Filter
              </Button>
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
          {commonProps.disciplinePermissions.canAdd === true && (
            <Button variant="primary" onClick={commonProps.openAddDiscipline}>
              Add Discipline
            </Button>
          )}{" "}
        </div>
      </div>
    </React.Fragment>
  );
};

export default BrowserFilters;
