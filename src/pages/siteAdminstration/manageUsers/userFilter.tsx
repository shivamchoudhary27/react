import React from "react";
import { useParams } from "react-router-dom";
import "./style.scss";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

const initialValues = {
  name: "",
  email: "",
  roleNumber: "",
};

const UserFilter = ({
  updateinputfilters,
  programname,
  toggleModalShow,
}: any) => {
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
        roleNumber: "",
      });
      updateinputfilters({}, true);
    },
  });

  const toEnrolProgramCourses = () => {
    const enrollToCourses = `/enrolusers/${parsedProgramid}/${programname}`;
    navigate(enrollToCourses);
  };

  return (
    <React.Fragment>
      <div className="action-btn mt-3">
        <Button variant="primary" onClick={toggleModalShow}>
          Upload Users
        </Button>{" "}
        <Button variant="primary" onClick={() => navigate(addUserLink)}>
          Add Users
        </Button>{" "}
        <Button variant="primary" onClick={toEnrolProgramCourses}>
          Enroll Users to Courses
        </Button>
      </div>
      <form
        className="filter-form mt-3"
        onSubmit={formik.handleSubmit}
        onReset={formik.handleReset}
      >
        <div className="row">
          <div className="col-auto">
            <label htmlFor="name" hidden>
              Name
            </label>
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
          <div className="col-auto">
            <label htmlFor="email" hidden>
              Email
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
          </div>
          <div className="col-auto">
            <label htmlFor="roleNumber" hidden>
              Role number
            </label>
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
          <div className="col-auto">
            <Button variant="primary" type="submit" className="me-2">
              Filter
            </Button>{" "}
            <Button
              variant="outline-secondary"
              type="reset"
              onClick={formik.handleReset}
            >
              Reset
            </Button>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default UserFilter;
