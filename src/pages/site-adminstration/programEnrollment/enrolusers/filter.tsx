import React from "react";
import { Button } from "react-bootstrap";
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
            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name / Surname"
                />
              </div>
              <div className="col-auto">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                />
              </div>
              <div className="col-auto">
                <Button variant="outline-secondary">Filter</Button>{" "}
                <Button variant="outline-secondary">Reset</Button>
              </div>
            </div>
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
