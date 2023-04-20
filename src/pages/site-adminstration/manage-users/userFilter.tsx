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

const UserFilter = ({ updateinputfilters } : any) => {
  const navigate = useNavigate();
  const { programid } = useParams();
  const parsedProgramid = parseInt(programid);
  const addUserLink = `/enrolusertoprogram/${parsedProgramid}/0`;

  const [inputName, setInputName] = React.useState("");
  const [inputCode, setInputCode] = React.useState("");
  
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

  const handleSearch = (e: any) => {
    e.preventDefault();
  };

  const handleReset = () => {
    updateinputfilters({firstNameStart: "", userEmail: ""});
    setInputName("");
    setInputCode("");
  };

  const getInputValues = () => {
    updateinputfilters({firstNameStart: inputName, userEmail: inputCode});
  }

  const toEnrolProgramCourses = () => {
    const enrollToCourses = `/enrolusers/${parsedProgramid}/Enrol To Courses`;
    navigate(enrollToCourses);
  }

  return (
    <React.Fragment>
      <div className="filter-wrapper">
        <div className="filter-form">
          <div className="row g-3 align-items-center">
            <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
              <label htmlFor="name">Name</label>
              <input
                className="form-control"
                id="name"
                name="name"
                type="text"
                placeholder="Fullname"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
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
              <label htmlFor="roleNumber">Role number</label>
              <input
                className="form-control"
                id="roleNumber"
                name="roleNumber"
                type="text"
                placeholder="Role number"
                onChange={formik.handleChange}
                value={formik.values.roleNumber}
              />
              <Button variant="outline-secondary" type="submit">Filter</Button>
              <Button variant="outline-secondary" type="reset" onClick={formik.handleReset}>Reset</Button>
            </form>
          </div>
        </div>
        <div className="mt-2">
          <div className="site-button-group">
            <Button variant="primary" onClick={toEnrolProgramCourses}>Enroll Users</Button>{" "}
            <Button variant="primary">Upload Users</Button>{" "}
            <Button variant="primary" onClick={() => navigate(addUserLink)}>Add Users</Button>{" "}
            <Button variant="outline-secondary" onClick={() => navigate("/programenrollment")}>Go back</Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserFilter;
