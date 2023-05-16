import React from "react";
import { useParams } from "react-router-dom";
import "./style.scss";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

const initialValues = {
  name: "",
  email: "",
  roleNumber: ""
}

const UserFilter = ({ updateinputfilters, programname, toggleModalShow } : any) => {
  const navigate = useNavigate();
  const { programid } = useParams();
  const parsedProgramid = parseInt(programid);
  const addUserLink = `/enrolusertoprogram/${parsedProgramid}/0/${programname}`;
  
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      console.log(values);
      updateinputfilters(values, false);
    },
    onReset: () => {
      formik.setValues({
        name: "",
        email: "",
        roleNumber: ""
      });
      updateinputfilters({}, true);
    }
  });

  const toEnrolProgramCourses = () => {
    const enrollToCourses = `/enrolusers/${parsedProgramid}/${programname}`;
    navigate(enrollToCourses);
  }

  return (
    <React.Fragment>
      <div className="filter-wrapper">
        <div className="site-button-group ">
          <Button variant="primary" onClick={toggleModalShow}>Upload Users</Button>{" "}
          <Button variant="primary" onClick={() => navigate(addUserLink)}>Add Users</Button>
          <Button variant="primary" style={{float:"right"}} onClick={toEnrolProgramCourses}>Enroll Users To Courses</Button>{" "}
        </div>
        <div className="filter-form mt-2">
          <div className="row g-3 align-items-center">
            <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
              <div className="row mb-3">
                <div className="col-md-4">
                  {/* <label htmlFor="name">Name</label> */}
                  <input
                    className="form-control"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Fullname"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                </div>
                <div className="col-md-4">
                  {/* <label htmlFor="email">Email</label> */}
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
                  {/* <label htmlFor="roleNumber">Role number</label> */}
                  <input
                    className="form-control"
                    id="roleNumber"
                    name="roleNumber"
                    type="text"
                    placeholder="Role number"
                    onChange={formik.handleChange}
                    value={formik.values.roleNumber}
                  />
                </div>
              </div>
              <Button variant="outline-secondary" type="submit">Filter</Button>{" "}
              <Button variant="outline-secondary" type="reset" onClick={formik.handleReset}>Reset</Button>
            </form>
          </div>
        </div>
      </div> 
    </React.Fragment>
  );
};

export default UserFilter;
