import React from "react";
import { useFormik } from "formik";
import { Button } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

type Props = {
    toggleModalShow: any
};

const Filter = (props: Props) => {
const navigate = useNavigate()
  const formik = useFormik({
    initialValues: "",
    onSubmit: (values: any) => {},
    onReset: () => {},
  });

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
                // onChange={handleFilterChange}
                // value={formik.values.name}
              />
            </Col>
            <Col>
              <Button variant="primary" type="submit" className="me-2">
                {/* {apiStatus !== "finished" ? <LoadingButton status="filterLoader" /> : "Filter"} */}
                Filter
              </Button>
              <Button
                variant="outline-secondary"
                type="reset"
                // onClick={formik.handleReset}
              >
                Reset
              </Button>
            </Col>
          </Row>
        </form>
        <div className="site-button-group">
          <div>
            {/* <Button variant="primary" onClick="">Add Timetable</Button>{" "} */}
            <Button variant="primary" onClick={() => props.toggleModalShow(true)}>New Request</Button>
            <Button variant="primary" onClick={() => navigate("/helpdeskmanagement")}>Helpdesk Management</Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Filter;
