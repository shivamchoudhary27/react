import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import { getData } from "../../../../adapters/coreservices";

const Filter = ({ validateFilterEmail, currentInstitute, userData }: any) => {
  const navigate = useNavigate();
  const [validateEmail, setValidateEmail] = useState("");
  const [validatedUser, setValidatedUser] = useState({});
  const initialValues = {
    email: userData
  };

  useEffect(() => {
    if (validateEmail !== "")
    getData(`/${currentInstitute}/users`, {pageNumber: 0, pageSize: 1, email: validateEmail})
    .then((result: any) => {
      if (result.data !== "" && result.status === 200) {
        if (result.data.items.length === 1) {
          setValidatedUser(result.data.items[0]);
          navigate(`/assignroles/${result.data.items[0].userId}`)
        } else {
          setValidatedUser({});
        }
      }
    })
    .catch((err: any) => {
      console.log(err);
    });
  }, [validateEmail])

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      setValidateEmail(values.email);
    },
    onReset: () => {
      formik.setValues({
        email: "",
      });
      setValidateEmail("");
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
