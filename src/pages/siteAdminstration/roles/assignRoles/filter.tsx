import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";


const Filter = ({ updatefilters, toggleModalShow, findUserData }: any) => {
  console.log("infilter comp---", findUserData.userEmail)
  const initialValues = {
      // email: findUserData.userEmail,
      email:"hii"
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      let newRequest = {
        email: values.email,
      };
      updatefilters(newRequest);
    },
    onReset: () => {
      formik.setValues({
        email: "",
      });
      updatefilters(initialValues, true);
    },
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
                id="email"
                name="email"
                type="text"
                placeholder="Email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </Col>
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
      </div>
    </React.Fragment>
  );
};

export default Filter;
