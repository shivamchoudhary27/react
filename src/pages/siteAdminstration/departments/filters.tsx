import React from "react";
import { Button } from "react-bootstrap";
import { useFormik } from "formik";

const initialValues = {
  name: "",
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
        name: values.name,
      }
      updateInputFilters(newRequest.name)
    },
    onReset: () => {
      formik.setValues({
        name: "",
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
          <div className="row g-2">
            <div className="col-auto">
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
            </div>
            <div className="col-auto">
            <Button variant="primary" type="submit" className="me-2">Filter</Button>
            <Button variant="outline-secondary" type="reset" onClick={formik.handleReset}>Reset</Button>
            </div>
          </div>          
        </form>
        <div className="site-button-group">
          <Button variant="primary" onClick={openAddDepartment}>Add Department</Button>{" "}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Filter;
