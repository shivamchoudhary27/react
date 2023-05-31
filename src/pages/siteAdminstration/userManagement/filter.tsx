import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const initialValues = {
  name: "",
  email: "",
  firstName: "",
  lastName: "",
}

const Filter = ({updatefilters, toggleUploadModal, openAddUserModal} : any) => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      let newRequest = {
        firstName: values.name,
        email: values.email,
      }
      updatefilters(newRequest);
    },
    onReset: () => {
      formik.setValues({
        firstName: "",
        lastName: "",
        email: "",
        name:""
      });
      updatefilters(initialValues, true);
    }
  });

  return (
    <React.Fragment>
      <div className="filter-wrapper mt-2">
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <div className="row">
            <div className="col-auto">
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
            </div>
            <div className="col-auto">
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
            </div>
            <div className="col-auto">
            <Button variant="primary" type="submit" className="me-2">Filter</Button>
            <Button variant="outline-secondary" type="reset" onClick={formik.handleReset}>Reset</Button>
            </div>
          </div>          
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
