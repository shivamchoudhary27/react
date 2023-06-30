import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";

const initialValues = {
  name: "",
  //   email: "",
};

const Filter = ({ updateSearchFilters, toggleModalShow, openAddRoleModal }: any) => {
  const navigate = useNavigate();
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
        // email: "",
      });
      updateSearchFilters(initialValues, true);
    },
  });

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
                onChange={formik.handleChange}
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
