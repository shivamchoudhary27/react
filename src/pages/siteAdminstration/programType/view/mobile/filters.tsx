import React from "react";
import { Button, Row, Col } from "react-bootstrap";

type Props = {
  CommonProps: {
    formik: any;
    programtypePermissions: any;
    openAddProgramType: () => void;
    handleFilterChange: (params: any) => void;
  };
};

const MobileFilters: React.FunctionComponent<Props> = ({
  CommonProps,
}: Props) => {
  return (
    <div className="filter-wrapper mt-2">
      <form
        onReset={CommonProps.formik.handleReset}
        onSubmit={CommonProps.formik.handleSubmit}
      >
        <Row className="g-2">
          <Col>
            <label htmlFor="name" hidden>
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Name"
              className="form-control"
              value={CommonProps.formik.values.name}
              onChange={CommonProps.handleFilterChange}
            />
          </Col>
          <Col>
            <Button variant="primary" type="submit" className="me-2">
              Filter
            </Button>
            <Button
              type="reset"
              variant="outline-secondary"
              onClick={CommonProps.formik.handleReset}
            >
              Reset
            </Button>
          </Col>
        </Row>
      </form>
      <div className="site-button-group">
        {CommonProps.programtypePermissions.canAdd === true && (
          <Button variant="primary" onClick={CommonProps.openAddProgramType}>
            Add Program Type
          </Button>
        )}{" "}
      </div>
    </div>
  );
};

export default MobileFilters;
