import React from "react";
import "./style.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "react-bootstrap";

const diciplineSchema = Yup.object({
  department: Yup.string().min(3).max(25).required("Please Enter Department"),
  programName: Yup.string().min(3).max(25).required("Please Enter Program Name"),
  programCode: Yup.string().min(3).max(25).required("Please Enter Program Code"),
});

const initialValues = {
  department: "",
  programName: "",
  programCode: "",
  programType: "",
};

const AddProgramForm = () => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: diciplineSchema,
      onSubmit: (values, action) => {
        console.log(values);
        action.resetForm();
      },
    });
  return (
    <>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Department</label>
            <input
              type="text"
              className="form-control mb-3"
              name="department"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.department}
            />
            {errors.department && touched.department ? (
              <p>{errors.department}</p>
            ) : null}
          </div>
          <div>
            <label>Program Name</label>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="#Name"
              name="programName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.programName}
            />
            {errors.programName && touched.programName ? (
              <p>{errors.programName}</p>
            ) : null}
          </div>
          <div>
            <label>Program Code</label>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="#Code"
              name="programCode"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.programCode}
            />
            {errors.programCode && touched.programCode ? (
              <p>{errors.programCode}</p>
            ) : null}
          </div>
          <div>
            <label>Program Type</label>
            <input type="radio" name="click" value="certificate" />
            Certificate & Diploma
            <input type="radio" name="click" value="underGrad" />
            Under Graduate
            <input type="radio" name="click" value="postGrad" />
            Post Graduate
            <input type="radio" name="click" value="phd" />
            Ph.D
          </div>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddProgramForm;
