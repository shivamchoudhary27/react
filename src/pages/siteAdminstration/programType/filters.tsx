import React from "react";
import { Button } from "react-bootstrap";
import { useFormik } from "formik";

const initialValues = {
  name: "",
}

const Filter = ({openAddProgramType, updateinputfilters} : any) => {
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      let newRequest = {
        name: values.name,
      }
      updateinputfilters(newRequest.name);
    },
    onReset: () => {
      formik.setValues({
        name: "",
      });
      updateinputfilters(initialValues.name);
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
          <Button variant="primary" onClick={openAddProgramType}>Add Program Type</Button>{" "}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Filter;
