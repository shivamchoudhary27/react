import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";

const initialValues = {
    permission: "",
  //   email: "",
};

const Filter = ({ updatefilters, toggleModalShow }: any) => {
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      let newRequest = {
        permission: values.permission,
        // email: values.email,
      };
      updatefilters(newRequest);
    },
    onReset: () => {
      formik.setValues({
        permission: "",
        // email: "",
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
                id="permission"
                name="permission"
                type="text"
                placeholder="Permission"
                onChange={formik.handleChange}
                value={formik.values.permission}
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
