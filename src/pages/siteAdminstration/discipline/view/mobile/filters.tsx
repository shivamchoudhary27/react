import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { FiltersLoadingBtn } from "../../../../../utils/filtersLoading";

type props = {
  commonProps: {
    formik: any;
    apiStatus: string;
    disciplinePermissions: any;
    handleFilterChange: (params: any) => void;
    openAddDiscipline: (params: boolean) => void;
  };
};

const MobileFilters: React.FunctionComponent<props> = ({
  commonProps,
}: props) => {
  return (
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
        {commonProps.disciplinePermissions.canAdd === true && (
          <Button variant="primary" onClick={commonProps.openAddDiscipline}>
            Add Discipline
          </Button>
        )}{" "}
      </div>
    </div>
  );
};

export default MobileFilters;
