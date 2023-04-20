import React from "react";
import { Button } from "react-bootstrap";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const initialValues = {
  name: "",
  email: "",
  city: "",
  firstName: "",
  lastName: "",
}

const Filter = ({updatefilters} : any) => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      let newRequest = {
        firstName: values.name,
        email: values.email,
        city: values.city
      }
      updatefilters(newRequest);
    },
    onReset: () => {
      formik.setValues({
        firstName: "",
        lastName: "",
        email: "",
        city: "",
        name:""
      });
      updatefilters(initialValues, true);
    }
  });

  return (
    <React.Fragment>
      <div className="filter-wrapper">
        <div className="filter-form">
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="name">Name</label>
              <input
                className="form-control"
                id="name"
                name="name"
                type="text"
                placeholder="Firstname / Surname"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="email">Email</label>
              <input
                className="form-control"
                id="email"
                name="email"
                type="text"
                placeholder="Email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="city">City</label>
              <input
                className="form-control"
                id="city"
                name="city"
                type="text"
                placeholder="City"
                onChange={formik.handleChange}
                value={formik.values.city}
              />
            </div>
          </div>
          <Button variant="outline-secondary" type="submit">Filter</Button>
          <Button variant="outline-secondary" type="reset" onClick={formik.handleReset}>Reset</Button>
        </form>
        </div>
        <div className="mt-2">
          <Button variant="primary" onClick={()=>navigate("/addusersform/0")}>Add Users</Button>{" "}
          <Button
            variant="outline-secondary"
            onClick={() => navigate("/siteadmin")}
          >
            Go back 
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Filter;
