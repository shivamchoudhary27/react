import React from "react";
import "./style.scss";
import { Formik, Field, Form } from "formik";
import { Button } from "react-bootstrap";
import { Schemas } from "./schemas";

const initialValues = {
  department: "",
  programName: "",
  programCode: "",
  radio: "",
  select: "",
  batchYear: "",
  mode: "",
  duration: "",
  requirement: "",
  description: "",
  programcontent: "",
  learn: "",
  metatitle: "",
  metadescription: "",
  programinclude: [],
};

const AddProgramForm = () => {
  return (
    <>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={Schemas}
          onSubmit={(values, action) => {
            console.log(values);
            action.resetForm();
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="department">Department</label>
                <Field
                  id="department"
                  name="department"
                  placeholder="Department"
                  className="form-control"
                />
                {errors.department && touched.department ? (
                  <p className="error-message">Please Enter Department</p>
                ) : null}
              </div>

              <div className="mb-3">
                <label htmlFor="programName">Program Name</label>
                <Field
                  id="programName"
                  name="programName"
                  placeholder="Program Name"
                  className="form-control"
                />
                {errors.programName && touched.programName ? (
                  <p className="error-message">Please Enter Program Name</p>
                ) : null}
              </div>

              <div className="mb-3">
                <label htmlFor="programCode">Program Code</label>
                <Field
                  id="programCode"
                  name="programCode"
                  placeholder="Program Code"
                  className="form-control"
                />
                {errors.programCode && touched.programCode ? (
                  <p className="error-message">Please Enter Program Code</p>
                ) : null}
              </div>

              <div className="mb-3">
                <label htmlFor="programType">ProgramType</label>
                <Field type="radio" name="radio" value="certificate"></Field>
                <Field type="radio" name="radio" value="ugrad"></Field>
                <Field type="radio" name="radio" value="pgrad"></Field>
                {errors.programCode && touched.programCode ? (
                  <p className="error-message">Please Enter Program Type</p>
                ) : null}
              </div>

              <div className="mb-3">
                <label htmlFor="batchYear">Batch Year</label>
                <Field
                  id="batchYear"
                  name="batchYear"
                  placeholder="#Year"
                  className="form-control"
                />
                {errors.batchYear && touched.batchYear ? (
                  <p className="error-message">Batch Year must in Number</p>
                ) : null}
              </div>

              <div className="mb-3">
                <label htmlFor="programCode">Discipline</label>
                <Field
                  component="select"
                  name="select"
                  placeholder="Select Options"
                  className="form-control"
                >
                  <option defaultValue="selectoption">Select option</option>
                  <option value="opt1">Option 1</option>
                  <option value="opt2">Option 2</option>
                  <option value="opt3">Option 3</option>
                  <option value="opt4">Option 4</option>
                  <option value="opt5">Option 5</option>
                </Field>
                {errors.select && touched.select ? (
                  <p className="error-message">Please Select Option</p>
                ) : null}
              </div>

              <div className="mb-3">
                <label htmlFor="mode">Mode Of Stydy</label>
                <Field type="radio" name="mode" value="full_time"></Field>
                <Field type="radio" name="mode" value="part_time"></Field>
                {errors.mode && touched.mode ? (
                  <p className="error-message">Please Enter Program Type</p>
                ) : null}
              </div>

              <div className="mb-3">
                <label htmlFor="duration">Duration</label>
                <Field
                  id="duration"
                  name="duration"
                  placeholder="#duration"
                  className="form-control"
                />
                {errors.duration && touched.duration ? (
                  <p className="error-message">Duration must in Number</p>
                ) : null}
              </div>

              <div className="mb-3">
                <label htmlFor="requirement">Requirement</label>
                <Field
                  id="requirement"
                  name="requirement"
                  component="textarea"
                  placeholder=""
                  className="form-control"
                />
                {errors.requirement && touched.requirement ? (
                  <p className="error-message">Please enter requirement</p>
                ) : null}
              </div>

              <div className="mb-3">
                <label htmlFor="description">Description</label>
                <Field
                  id="description"
                  name="description"
                  component="textarea"
                  placeholder=""
                  className="form-control"
                />
                {errors.description && touched.description ? (
                  <p className="error-message">Please enter description</p>
                ) : null}
              </div>

              <div className="mb-3">
                <label htmlFor="programcontent">Program Content</label>
                <Field
                  id="programcontent"
                  name="programcontent"
                  component="textarea"
                  placeholder=""
                  className="form-control"
                />
                {errors.programcontent && touched.programcontent ? (
                  <p className="error-message">Please enter programcontent</p>
                ) : null}
              </div>

              <div className="mb-3">
                <label htmlFor="learn">What you will learn</label>
                <Field
                  id="learn"
                  name="learn"
                  component="textarea"
                  placeholder=""
                  className="form-control"
                />
                {errors.learn && touched.learn ? (
                  <p className="error-message">Please enter learn</p>
                ) : null}
              </div>

              <label htmlFor="metatitle">Program meta Fields</label>
              <div className="card p-3 mb-3">
                <div className="mb-3">
                  <Field
                    id="metatitle"
                    name="metatitle"
                    placeholder="Title"
                    className="form-control"
                  />
                  {errors.metatitle && touched.metatitle ? (
                    <p className="error-message">Please enter Title</p>
                  ) : null}
                </div>

                <div className="mb-3">
                  <Field
                    id="metadescription"
                    name="metadescription"
                    component="textarea"
                    placeholder="Description"
                    className="form-control"
                  />
                  {errors.metadescription && touched.metadescription ? (
                    <p className="error-message">Please enter Description</p>
                  ) : null}
                </div>

                <Button className="primary" style={{ width: "120px" }}>
                  + Add more
                </Button>
              </div>

              <label htmlFor="programinclude">This program include</label>
              <div className="mb-3">
                <div className="form-check">
                  <label>
                    <Field
                      type="checkbox"
                      name="programinclude"
                      value="fullaccess"
                      className="form-check-input"
                    />{" "}
                    Full life time access
                  </label>
                </div>

                <div className="form-check">
                  <label>
                    <Field
                      type="checkbox"
                      name="programinclude"
                      value="fullaccess"
                      className="form-check-input"
                    />{" "}
                    Certificate of completion
                  </label>
                </div>

                <div className="form-check">
                  <label>
                    <Field
                      type="checkbox"
                      name="programinclude"
                      value="fullaccess"
                      className="form-check-input"
                    />{" "}
                    Published
                  </label>
                </div>
                {errors.programinclude && touched.programinclude ? (
                  <p className="error-message">
                    Please Check atleast one option
                  </p>
                ) : null}
              </div>

              <Button type="submit" className="primary">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AddProgramForm;
