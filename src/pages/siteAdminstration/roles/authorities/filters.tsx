import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";

const initialValues = {
  module: "",
}

const Filter = ({  toggleModalShow,
  resetDepartmentForm,
  departmentData,
  setDepartmentData,
  refreshDepartmentData,
  updateInputFilters,} : any) => {
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      let newRequest = {
        module: values.module,
      }
      updateInputFilters(newRequest.module)
    },
    onReset: () => {
      formik.setValues({
        module: "",
      });
      updateInputFilters("")
    }
  });

  // handle to open Add Department modal === >>>
  const openAddDepartment = () => {
    toggleModalShow(true);
    resetDepartmentForm(true);
  };
  
  return (
    <React.Fragment>
      <div className="filter-wrapper mt-2">
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <Row className="g-2">
            <Col>
              <label htmlFor="name" hidden>Name</label>
              <input
                className="form-control"
                id="module"
                name="module"
                type="text"
                placeholder="Module"
                onChange={formik.handleChange}
                value={formik.values.module}
              />
            </Col>
            <Col>
              <Button variant="primary" type="submit" className="me-2">Filter</Button>
              <Button variant="outline-secondary" type="reset" onClick={formik.handleReset}>Reset</Button>
            </Col>
          </Row>          
        </form>
        <div className="site-button-group">
          <Button variant="primary" onClick={openAddDepartment}>Add Authority</Button>{" "}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Filter;
