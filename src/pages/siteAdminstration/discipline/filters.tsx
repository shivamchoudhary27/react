import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";

const initialValues = {
  name: "",
}

const Filter = ({openAddDiscipline, updateInputFilters} : any) => {
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      let newRequest = {
        name: values.name,
      }
      updateInputFilters(newRequest.name);
    },
    onReset: () => {
      formik.setValues({
        name: "",
      });
      updateInputFilters(initialValues.name);
    }
  });

  return (
    <React.Fragment>
      {/* Institute : <InstituteFilter updateCurrentInstitute={updateCurrentInstitute}/> */}
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
                placeholder="Name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </Col>
            <Col>
              <Button variant="primary" type="submit" className="me-2">Filter</Button>
              <Button variant="outline-secondary" type="reset" onClick={formik.handleReset}>Reset</Button>
            </Col>
          </Row>          
        </form>
        <div className="site-button-group">
          <Button variant="primary" onClick={openAddDiscipline}>Add Discipline</Button>{" "}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Filter;
