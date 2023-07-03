import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./style.scss";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { filterConfig } from "../../../utils/filterTimeout";

const initialValues = {
  name: "",
  email: "",
  roleNumber: "",
};

const UserFilter = ({
  updateinputfilters,
  programname,
  toggleModalShow,
  AddUsersModalShow
}: any) => {
  const navigate = useNavigate();
  const { programid } = useParams();
  const parsedProgramid = parseInt(programid);
  const [timeoutId, setTimeoutId] = useState<any>(null);
  const addUserLink = `/enrolusertoprogram/${parsedProgramid}/0/${programname}`;
  
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout, if any
      updateinputfilters(values, false);
    },
    onReset: () => {
      if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout, if any
      formik.setValues({
        name: "",
        email: "",
        roleNumber: "",
      });
      updateinputfilters({}, true);
    },
  });

  // Event handler for filter input change with debounce
  const handleFilterChange = (event : any) => {
    formik.handleChange(event); // Update formik values
    
    if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout, if any

    // Set a new timeout to trigger updatefilters after a delay
    const newTimeoutId = setTimeout(() => {
      let newRequest = {
        name: event.target.name === 'name' ? event.target.value : formik.values.name,
        email: event.target.name === 'email' ? event.target.value : formik.values.email,
        roleNumber: event.target.name === 'roleNumber' ? event.target.value : formik.values.roleNumber,
      };
      updateinputfilters(newRequest, false);
    }, filterConfig.timeoutNumber); // Adjust the delay (in milliseconds) as per your needs

    setTimeoutId(newTimeoutId); // Update the timeout ID in state
  };

  const toEnrolProgramCourses = () => {
    const enrollToCourses = `/enrolusers/${parsedProgramid}/${programname}`;
    navigate(enrollToCourses);
  };

  return (
    <React.Fragment>
      <div className="site-button-group mb-3">
        <Button variant="secondary" size="sm" onClick={toggleModalShow}>
          Upload Users
        </Button>{" "}
        <Button variant="secondary" size="sm" onClick={AddUsersModalShow}>
          Add Users
        </Button>{" "}
        <Button variant="secondary" size="sm" onClick={toEnrolProgramCourses}>
          Enroll Users to Courses
        </Button>
      </div>
      <div className="filter-wrapper mt-2">
        <form
          onSubmit={formik.handleSubmit}
          onReset={formik.handleReset}
        >
          <Row className="g-2">
            <Col>
              <label htmlFor="name" hidden>Name</label>
              <input
                className="form-control"
                id="name"
                name="name"
                type="text"
                placeholder="Fullname"
                onChange={handleFilterChange}
                value={formik.values.name}
              />
            </Col>
            <Col>
              <label htmlFor="email" hidden>Email</label>
              <input
                className="form-control"
                id="email"
                name="email"
                type="text"
                placeholder="Email"
                onChange={handleFilterChange}
                value={formik.values.email}
              />
            </Col>
            <Col>
              <label htmlFor="roleNumber" hidden>Role number</label>
              <input
                className="form-control"
                id="roleNumber"
                name="roleNumber"
                type="text"
                placeholder="Role number"
                onChange={handleFilterChange}
                value={formik.values.roleNumber}
              />
            </Col>
            <Col>
              <Button variant="primary" type="submit" className="me-2">
                Filter
              </Button>{" "}
              <Button variant="outline-secondary" type="reset" onClick={formik.handleReset}>
                Reset
              </Button>
            </Col>
          </Row>
        </form>
      </div>
    </React.Fragment>
  );
};

export default UserFilter;
