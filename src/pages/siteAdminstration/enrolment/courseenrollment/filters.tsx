import { Button, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import "./style.scss";

const initialValues = {
  name: "",
  email: "",
};

const ManageFilter = ({ updateinputfilters }: any) => {
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      updateinputfilters(values, false);
    },
    onReset: () => {
      formik.setValues({
        name: "",
        email: "",
      });
      updateinputfilters({}, true);
    },
  });

  return (
    <>
      {/* <div className="filter-wrapper">
        <div className="filter-form"> */}
      <form
        onSubmit={formik.handleSubmit}
        onReset={formik.handleReset}
      >
        <Row className="g-2">
          <Col>
            <input
              className="form-control"
              id="name"
              name="name"
              type="text"
              placeholder="Fullname"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </Col>
          <Col>
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
      {/* </div>
      </div> */}
    </>
  );
};

export default ManageFilter;
