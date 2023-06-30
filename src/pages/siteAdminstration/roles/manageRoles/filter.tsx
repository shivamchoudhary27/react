import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";

const initialValues = {
  name: "",
  //   email: "",
};

const Filter = ({ updateSearchFilters, toggleModalShow, openAddRoleModal }: any) => {
  const navigate = useNavigate();
  const [timeoutId, setTimeoutId] = useState<any>(null);

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      let newRequest = {
        name: values.name,
        // email: values.email,
      };
      updateSearchFilters(newRequest);
    },
    onReset: () => {
      formik.setValues({
        name: "",
      });
      updateSearchFilters(initialValues, true);
    }
  });

  // Event handler for permission input change with debounce
  const handlePermissionChange = (event : any) => {
    formik.handleChange(event); // Update formik values

    // Clear previous timeout, if any
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set a new timeout to trigger updatefilters after a delay
    const newTimeoutId = setTimeout(() => {
      let newRequest = {
        name: event.target.value,
      };
      updateSearchFilters(newRequest);
    }, 700); // Adjust the delay (in milliseconds) as per your needs

    setTimeoutId(newTimeoutId); // Update the timeout ID in state
  };

  const manageauthorities = () => {
    navigate("/manageauthorities");
  }
  
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
                onChange={handlePermissionChange}
                value={formik.values.name}
              />
            </Col>
            {/* <Col>
              <label htmlFor="email" hidden>Email</label>
              <input
                className="form-control"
                id="email"
                name="email"
                type="text"
                placeholder="Email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </Col> */}
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
          <Button variant="primary" onClick={manageauthorities}>Manage Authorities</Button>{" "}
          <Button variant="primary" onClick={toggleModalShow}>Assign Institute Admin</Button>{" "}
          <Button variant="primary" onClick={openAddRoleModal}>Add Role</Button>{" "}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Filter;
