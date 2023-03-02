import React, { useState, useEffect } from "react";
import "./style.scss";
import { Formik, Field, Form } from "formik";
import { Button } from "react-bootstrap";
import { Schemas } from "./schemas";
import { getData as getName } from "../../../adapters/microservices";
import TinymceEditor from "../../../widgets/editor/tinyMceEditor";

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
  checked: [],
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

  // fetch Department & Discipline list ===== >>>
  useEffect(() => {
    const departmentEndPoint = "/departments";
    const disciplineEndPoint = "/disciplines";
    getName(departmentEndPoint).then((res) => {
      if (res.data !== "" && res.status === 200) {
        setDepartmentName(res.data);
      }
    });
    getName(disciplineEndPoint).then((res) => {
      if (res.data !== "" && res.status === 200) {
        setDisciplineName(res.data);
      }
    });
  }, []);

  // iterate to get Department list ===== >>>
  const DEPARTMENT_LIST = departmentName.map((el: any, index: number) => (
    <option value={el.name} key={index}>
      {el.name}
    </option>
  ));

  // iterate to get Discipline list ===== >>>
  const DISCIPLINE_LIST = disciplineName.map((el: any, index: number) => (
    <option value={el.name} key={index}>
      {el.name}
    </option>
  ));

  // add extra meta field ===== >>>
  const addFieldHandler = () => {
    setinputFieldArr((el: any) => {
      return [...el, inputFieldArr];
    });
  };

  // remove meta field ===== >>>
  const removeBlockHandler = () => {
    if (inputFieldArr.length > 1) {
      inputFieldArr.pop();
    }
  };

  // Comp for show custom ERROR_Messages ===== >>>
  const Error_Message = ({ val }: any) => {
    return (
      <p className="error-message">
        <i className="fa fa-circle-exclamation"></i> {val}
      </p>
    );
  };

  // Form submit & reset buttons ===== >>>
  const PROGRAM_FORM_BUTTONS = ({ isSubmitting }: any) => {
    return (
      <>
        <Button type="submit" className="primary" disabled={isSubmitting}>
          Submit
        </Button>{" "}
        <Button variant="outline-secondary" type="reset">
          Reset
        </Button>
      </>
    );
  };

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
          {({ errors, touched, isSubmitting, handleChange }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="programCode">
                  Department <sup className="required">*</sup>
                </label>
                <Field as="select" name="department" className="form-control">
                  {DEPARTMENT_LIST}
                </Field>
                {errors.department && touched.department ? (
                  <Error_Message val={"Please Enter Department"} />
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="programName">
                  Program Name <sup className="required">*</sup>
                </label>
                <Field
                  id="programName"
                  name="programName"
                  placeholder="Program Name"
                  className="form-control"
                />
                {errors.programName && touched.programName ? (
                  <Error_Message val={"Please Enter Program Name"} />
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="programCode">
                  Program Code <sup className="required">*</sup>
                </label>
                <Field
                  id="programCode"
                  name="programCode"
                  placeholder="Program Code"
                  className="form-control"
                />
                {errors.programCode && touched.programCode ? (
                  <Error_Message val={"Please Enter Program Code"} />
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="programType" className="d-block">
                  ProgramType <sup className="required">*</sup>
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
                  <Error_Message val={"Please Enter Program Type"} />
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="batchYear">
                  Batch Year <sup className="required">*</sup>
                </label>
                <Field
                  id="batchYear"
                  name="batchYear"
                  placeholder="#Year"
                  className="form-control"
                />
                {errors.batchYear && touched.batchYear ? (
                  <Error_Message val={"Batch Year must in number"} />
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="discipline">
                  Discipline <sup className="required">*</sup>
                </label>
                <Field as="select" name="discipline" className="form-control">
                  {DISCIPLINE_LIST}
                </Field>
                {errors.discipline && touched.discipline ? (
                  <Error_Message val={"Select Discipline"} />
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="mode" className="d-block">
                  Mode Of Stydy <sup className="required">*</sup>
                </label>
                <label className="mx-2">
                  <Field type="radio" name="mode" value="full_time" /> Full Time
                </label>
                <label className="mx-2">
                  <Field type="radio" name="mode" value="part_time" /> Part Time
                </label>
                {errors.mode && touched.mode ? (
                  <Error_Message val={"Please select Program Mode"} />
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="duration">
                  Duration <sup className="required">*</sup>
                </label>
                <Field
                  id="duration"
                  name="duration"
                  placeholder="#duration"
                  className="form-control"
                />
                {errors.duration && touched.duration ? (
                  <Error_Message val={"Duration must in number"} />
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="requirement">Requirement</label>
                <Field name="requirement">
                  {({ field, meta }: any) => (
                    <TinymceEditor
                      handleChange={handleChange}
                      meta={meta}
                      field={field}
                    />
                  )}
                </Field>
              </div>
              <div className="mb-3">
                <label htmlFor="description">Description</label>
                <Field name="description">
                  {({ field, meta }: any) => (
                    <TinymceEditor
                      handleChange={handleChange}
                      meta={meta}
                      field={field}
                    />
                  )}
                </Field>
              </div>
              <div className="mb-3">
                <label htmlFor="programcontent">Program Content</label>
                <Field name="programcontent">
                  {({ field, meta }: any) => (
                    <TinymceEditor
                      handleChange={handleChange}
                      meta={meta}
                      field={field}
                    />
                  )}
                </Field>
              </div>
              <div className="mb-3">
                <label htmlFor="learn">What you will learn</label>
                <Field name="learn">
                  {({ field, meta }: any) => (
                    <TinymceEditor
                      handleChange={handleChange}
                      meta={meta}
                      field={field}
                    />
                  )}
                </Field>
              </div>
              <label htmlFor="metatitle">Program meta Fields</label>
              <div className="card p-3 mb-3">
                {inputFieldArr.map(() => {
                  return (
                    <>
                      <div className="mb-3">
                        <label htmlFor="metatitle">Title</label>
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
                        <label htmlFor="metadescription">Description</label>
                        <Field name="metadescription">
                          {({ field, meta }: any) => (
                            <TinymceEditor
                              handleChange={handleChange}
                              meta={meta}
                              field={field}
                            />
                          )}
                        </Field>
                      </div>
                    </>
                  );
                })}

                <div>
                  <Button className="primary" onClick={addFieldHandler}>
                    + Add more
                  </Button>{" "}
                  <Button
                    variant="outline-secondary"
                    onClick={removeBlockHandler}
                  >
                    Remove
                  </Button>
                </div>
              </div>
              <div
                role="group"
                aria-labelledby="checkbox-group"
                className="mb-3"
              >
                <div>
                  <label>
                    <Field
                      type="checkbox"
                      name="checked"
                      value="fullaccess"
                      className="form-check-input"
                    />{" "}
                    Full life time access
                  </label>
                </div>
                <div>
                  <label>
                    <Field
                      type="checkbox"
                      name="checked"
                      value="certificate"
                      className="form-check-input"
                    />{" "}
                    Certificate of completion
                  </label>
                </div>
                <div>
                  <label>
                    <Field
                      type="checkbox"
                      name="checked"
                      value="published"
                      className="form-check-input"
                    />{" "}
                    Published
                  </label>
                </div>
              </div>
              {<PROGRAM_FORM_BUTTONS isSubmitting={isSubmitting} />}
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AddProgramForm;
