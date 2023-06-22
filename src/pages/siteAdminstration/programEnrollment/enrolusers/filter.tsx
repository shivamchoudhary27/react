import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const EnrolCourseFilter = ({ togglemodalshow }: any) => {
  const navigate = useNavigate();

  const enrolUserHandler = () => {
    togglemodalshow(true)
  }
  return (
    <React.Fragment>
      <div className="filter-wrapper">
        <div className="filter-form">
          <form>
            <Row className="g-2 align-items-center">
              <Col>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name / Surname"
                />
              </Col>
              <Col>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                />
              </Col>
              <Col>
                <Button variant="outline-secondary">Filter</Button>{" "}
                <Button variant="outline-secondary">Reset</Button>
              </Col>
            </Row>
          </form>
        </div>
        <div className="mt-2">
          <Button variant="primary" onClick={enrolUserHandler}>Enroll</Button>{" "}
          <Button
            variant="outline-secondary"
            onClick={() => navigate("/enrolusers/133/TestEnrolUsers")}
          >
            Go back
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EnrolCourseFilter;
