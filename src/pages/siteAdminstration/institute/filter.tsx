import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const initialValues = {
  name: "",
  shortCode: "",
}

const Filter = ({updatefilters, toggleUploadModal, openAddUserModal} : any) => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      let newRequest = {
        name: values.name,
        shortCode: values.shortCode,
      }
      updatefilters(newRequest);
    },
    onReset: () => {
      formik.setValues({
        shortCode: "",
        name:""
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
                placeholder="Institute Name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </Col>
            <Col>
              <label htmlFor="email" hidden>Email</label>
              <input
                className="form-control"
                id="shortCode"
                name="shortCode"
                type="text"
                placeholder="Short Code"
                onChange={formik.handleChange}
                value={formik.values.shortCode}
              />
            </Col>
            <Col>
              <Button variant="primary" type="submit" className="me-2">Filter</Button>
              <Button variant="outline-secondary" type="reset" onClick={formik.handleReset}>Reset</Button>
            </Col>
          </Row>          
        </form>
        <div className="site-button-group">
          <Button variant="primary" onClick={openAddUserModal}>Add Institute</Button>{" "}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Filter;
