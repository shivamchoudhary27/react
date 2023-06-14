import React from "react";
import { Button } from "react-bootstrap";
import { useFormik } from "formik";

const initialValues = {
  name: "",
}

const Filters = ({ toggleModalShow, setTagObj, updateInputFilters }: any) => {
  const addTagsHandler = () => {
    toggleModalShow(true);
    setTagObj({ id: 0, name: "" });
  };
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
          <Button variant="primary" onClick={addTagsHandler}>Add Tags</Button>{" "}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Filters;
