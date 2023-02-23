import React, { useState, useEffect } from "react";
import "./style.scss";
import { Formik, Field, Form } from "formik";
import { Button } from "react-bootstrap";
import { Schemas } from "./schemas";
import { getData as getName } from "../../../adapters/microservices";

const initialValues = {
  department: "",
  programName: "",
  programCode: "",
  programtype: "",
  discipline: "",
  batchYear: "",
  mode: "",
  duration: "",
  requirement: "",
  description: "",
  programcontent: "",
  learn: "",
  metatitle: "",
  metadescription: "",
  // programinclude: [],
};

const addInputField = [
  [
    {
      type: "text",
      id: 1,
      value: "",
    },
    {
      type: "textarea",
      id: 2,
      value: "",
    },
  ],
];

const AddProgramForm = () => {
  const [inputFieldArr, setinputFieldArr] = useState(addInputField);
  const [departmentName, setDepartmentName] = useState<any>([]);
  const [disciplineName, setDisciplineName] = useState<any>([]);

  const addFieldHandler = () => {
    setinputFieldArr((el: any) => {
      return [...el, inputFieldArr];
    });
  };

  useEffect(() => {
    const endPoint = "/departments";
    const endPoint2 = "/disciplines";
    getName(endPoint).then((res) => {
      if (res.data != "" && res.status === 200) {
        setDepartmentName(res.data);
      }
    });
    getName(endPoint2).then((res) => {
      if (res.data != "" && res.status === 200) {
        setDisciplineName(res.data);
      }
    });
  }, []);

  const removeBlockHandler = () => {
    if(inputFieldArr.length > 1){
      inputFieldArr.pop();
    }
  }

  return (
    <>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={Schemas}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            console.log(values);
            setSubmitting(false);
            resetForm();
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="programCode">Department</label>
                <Field
                  as="select"
                  name="department"
                  placeholder="Select Options"
                  className="form-control"
                >
                  <option defaultValue="selectoption">Select option</option>
                  {departmentName.map((el: any, index: number) => (
                    <option value={el.name} key={index}>
                      {el.name}
                    </option>
                  ))}
                </Field>
                {errors.department && touched.department ? (
                  <p className="error-message">Please department Option</p>
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
                <label htmlFor="programType" className="d-block">
                  ProgramType
                </label>
                <label className="mx-2">
                  <Field type="radio" name="programtype" value="certificate" />{" "}
                  Certificate
                </label>
                <label className="mx-2">
                  <Field type="radio" name="programtype" value="ugrad" /> Under
                  Graduate
                </label>
                <label className="mx-2">
                  <Field type="radio" name="programtype" value="pgrad" /> Post
                  Graduate
                </label>
                {errors.programtype && touched.programtype ? (
                  <p className="error-message">Please select Program Type</p>
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
                <label htmlFor="discipline">Discipline</label>
                <Field as="select" name="discipline" className="form-control">
                  <option defaultValue="selectoption">Select option</option>
                  {disciplineName.map((el: any, index: number) => (
                    <option value={el.name} key={index}>
                      {el.name}
                    </option>
                  ))}
                </Field>
                {errors.discipline && touched.discipline ? (
                  <p className="error-message">Please discipline Option</p>
                ) : null}
              </div>

              <div className="mb-3">
                <label htmlFor="mode" className="d-block">
                  Mode Of Stydy
                </label>
                <label className="mx-2">
                  <Field type="radio" name="mode" value="full_time" /> Full Time
                </label>
                <label className="mx-2">
                  <Field type="radio" name="mode" value="part_time" /> Part Time
                </label>
                {errors.mode && touched.mode ? (
                  <p className="error-message">Please select Program mode</p>
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
                {inputFieldArr.map((item) => {
                  return (
                    <>
                      <div className="mb-3">
                        <Field
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
                          name="metadescription"
                          as={"textarea"}
                          placeholder="Description"
                          className="form-control"
                        />
                        {errors.metadescription && touched.metadescription ? (
                          <p className="error-message">
                            Please enter Description
                          </p>
                        ) : null}
                      </div>
                    </>
                  );
                })}

                <div>
                  <Button className="primary" onClick={addFieldHandler}>
                    + Add more
                  </Button>{" "}
                  <Button variant="outline-secondary" onClick={removeBlockHandler}>Remove</Button>
                </div>
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

              <Button type="submit" className="primary" disabled={isSubmitting}>
                Submit
              </Button>{" "}
              <Button variant="outline-secondary" type="reset">
                Reset
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AddProgramForm;