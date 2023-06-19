import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";

const initialValues = {
  name: "",
  email: "",
}

const Filter = ({updatefilters, toggleUploadModal, openAddUserModal} : any) => {
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      let newRequest = {
        name: values.name,
        email: values.email, 
      }
      updatefilters(newRequest);
    },
    onReset: () => {
      formik.setValues({
        name: "",
        email: "",
      });
      updatefilters(initialValues, true);
    }
  });

  return (
    <React.Fragment>
      <div className="filter-wrapper mt-2">
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <Row className="g-2">
            <Col>
              <label htmlFor="name" hidden>Name</label>
              <input
                className="form-control"
                id="name"
                name="name"
                type="text"
                placeholder="Firstname / Surname"
                onChange={formik.handleChange}
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
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </Col>
            <Col>
              <Button variant="primary" type="submit" className="me-2">Filter</Button>
              <Button variant="outline-secondary" type="reset" onClick={formik.handleReset}>Reset</Button>
            </Col>
          </Row>          
        </form>
        <div className="site-button-group">
          <Button variant="primary" onClick={toggleUploadModal}>Upload Users</Button>{" "}
          <Button variant="primary" onClick={openAddUserModal}>Add User</Button>{" "}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Filter;
