import "./style.scss";
import "./style.scss";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { Formik, Form } from "formik";
import "sweetalert2/src/sweetalert2.scss";
import { useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import CkEditor from "../../../../widgets/editor/CKEditor";
import FieldLabel from "../../../../widgets/formInputFields/labels";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import { makeGetDataRequest } from "../../../../features/apiCalls/getdata";
import { LoadingButton } from "../../../../widgets/formInputFields/buttons";
import FieldTypeText from "../../../../widgets/formInputFields/formTextField";
import FieldMultiSelect from "../../../../widgets/formInputFields/multiSelect";
import FieldErrorMessage from "../../../../widgets/formInputFields/errorMessage";
import FieldTypeSelect from "../../../../widgets/formInputFields/formSelectField";
import {
  uploadFile,
  addRemoveFileProperty,
} from "../../../../globals/storefile";
import FieldTypeCheckbox from "../../../../widgets/formInputFields/formCheckboxField";
import {
  postData as postProgramData,
  postData as postProgramImage,
  putData as updateProgramData,
  getData,
} from "../../../../adapters/microservices";
import {
  addMetaInputField,
  generateProgramDataObject,
  addExtraMetaDataToInitialValues,
  addMetaFields,
  generateAcademicYears,
  durationTypeObj,
} from "./utils";

const steps = ["Step 1", "Step 2"];

// Step 1 validation schema
const step1Schema = Yup.object({
  programName: Yup.string().min(1).trim().required("Program name is required"),
  programCode: Yup.string().min(1).trim().required("Program code is required"),
  department: Yup.string()
    .required("Department is required")
    .test("Please select a department", (value) => value !== "0"),
  discipline: Yup.string()
    .test("Please select a discipline", (value) => value !== "0")
    .required("Discipline is required"),
  programtype: Yup.string()
    .required("Program type is required")
    .test("Please select a program type", (value) => value !== "0"),
  batchYear: Yup.string().required("Batch year is required"),
  durationValue: Yup.number()
    .integer("Number must be an integer")
    .positive("Number must be positive")
    .required("Number is required"),
  // file: Yup.mixed().required("File is required"),
});

// Step 2 validation schema
const step2Schema = Yup.object({
  objective: Yup.string().required("Objective is required"),
  description: Yup.string().required("Description is required"),
});

const AddProgramForm = ({ initialformvalues, programid, instituteId }: any) => {
  const navigate = useNavigate();
  const dummyData = { items: [], pager: { totalElements: 0, totalPages: 0 } };
  const [inputFieldArr, setinputFieldArr] = useState<any>(
    addMetaFields(initialformvalues.meta.length)
  );
  const [departmentName, setDepartmentName] = useState<any>(dummyData);
  const [disciplineName, setDisciplineName] = useState<any>(dummyData);
  const [programTypeId, setProgramTypeId] = useState<any>(dummyData);
  const [tags, setTags] = useState<any>(dummyData);
  const [initValues, setInitValues] = useState<any>(initialformvalues);
  const [step, setStep] = useState(0);
  const batchYearOptions = generateAcademicYears();
  const durationType = durationTypeObj();
  const selectedDepartment = useSelector(
    (state) => state.globalFilters.currentDepartmentFilterId
  );
  // const [filterUpdate, setFilterUpdate] = useState<any>({
  //   departmentId: selectedDepartment,
  //   name: "",
  //   pageNumber: 0,
  //   pageSize: pagination.PERPAGE,
  // });

  const currentInstitute = useSelector(
    (state) => state.globalFilters.currentInstitute
  );

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  // fetch Department & Discipline list ===== >>>
  useEffect(() => {
    if (instituteId > 0) generateAcademicYears();
    let apiFilters = { pageNumber: 0, pageSize: 100 };
    if (!(programid > 0)) {
      apiFilters.published = true;
    }
    makeGetDataRequest(
      `/${instituteId}/departments`,
      apiFilters,
      setDepartmentName
    );
    makeGetDataRequest(
      `/${instituteId}/disciplines`,
      apiFilters,
      setDisciplineName
    );
    makeGetDataRequest(
      `/${instituteId}/program-types`,
      apiFilters,
      setProgramTypeId
    );
    makeGetDataRequest(`/${instituteId}/tags`, apiFilters, setTags);
  }, [instituteId]);

  useEffect(() => {
    const valuesPacket = { ...initialformvalues };
    let addedValues = addExtraMetaDataToInitialValues(
      valuesPacket,
      programTypeId.items,
      "programtypeList"
    );
    setInitValues(addedValues);
  }, [initialformvalues, programTypeId]);

  // add extra meta field ===== >>>
  const addFieldHandler = () => {
    setinputFieldArr((currentFields: any) => {
      return [...currentFields, addMetaInputField];
    });
  };

  // remove meta field ===== >>>
  const removeBlockHandler = () => {
    if (inputFieldArr.length > 1) {
      let removeItem = inputFieldArr.slice(0, inputFieldArr.length - 1);
      setinputFieldArr(removeItem);
    }
  };

  function _handleSubmit(values: any, actions: any) {
    if (step === 1) {
      _submitForm(values, actions);
    } else {
      actions.setSubmitting(false);
      filterProgramCode(
        `/${currentInstitute}/programs`,
        values.programCode,
        actions
      );
    }
  }

  const _submitForm = (values: any, actions: any) => {
    let programValues = generateProgramDataObject(values);

    if (values.deleteImage === true) {
      programValues.files = addRemoveFileProperty(programValues.files);
      programValues.deleted = true;
      delete programValues.deleteImage;
    }

    let programImage = values.file;
    delete programValues?.file;
    let error_Msg = "";

    if (programid == 0) {
      let endPoint = `/${instituteId}/programs`;
      actions.setSubmitting(true);
      postProgramData(endPoint, programValues)
        .then((res: any) => {
          if (res.data !== "" && res.status === 201) {
            uploadFile("program", res.data.id, programImage);
            Swal.fire({
              timer: 3000,
              width: "25em",
              color: "#666",
              icon: "success",
              background: "#e7eef5",
              showConfirmButton: false,
              text: "Program has been successfully added",
            });
            actions.setSubmitting(false);
            actions.resetForm();
            navigate("/manageprogram", { state: values });
          }
        })
        .catch((err: any) => {
          actions.setSubmitting(false);
          if (err.response.status === 400) {
            if (err.response.data.errorCode === "PROGRAM_CODE_ALREADY_EXIST") {
              setStep(0);
              actions.setErrors({ programCode: err.response.data.message });
            }
            Object.entries(err.response.data).map(
              ([key, value]) => (error_Msg += `${key}: ${value} \n`)
            );
          } else if (err.response.status === 500) {
            alert(`${err.response.data.error}, 500!`);
            navigate("/manageprogram", { state: values });
          }
        });
    } else {
      let endPoint = `/${instituteId}/programs/${programid}`;
      actions.setSubmitting(true);

      updateProgramData(endPoint, programValues)
        .then((res: any) => {
          if (res.data !== "" && res.status === 200) {
            Swal.fire({
              timer: 3000,
              width: "25em",
              color: "#666",
              icon: "success",
              background: "#e7eef5",
              showConfirmButton: false,
              text: "Program has been successfully updated",
            });
            actions.setSubmitting(false);
            actions.resetForm();
            navigate("/manageprogram", { state: values });
          }
        })
        .catch((err: any) => {
          actions.setSubmitting(false);
          if (err.response.status === 400) {
            if (err.response.data.errorCode === "PROGRAM_CODE_ALREADY_EXIST") {
              setStep(0);
              actions.setErrors({ programCode: err.response.data.message });
            }
            Object.entries(err.response.data).map(
              ([key, value]) => (error_Msg += `${key}: ${value} \n`)
            );
            // alert(error_Msg);
          } else if (err.response.status === 500) {
            alert(`${err.response.data.error}, 500!`);
            navigate("/manageprogram", { state: values });
          }
        });

      uploadFile("program", programid, programImage);
    }
    // navigate("/manageprogram", { state: values });
  };

  const filterProgramCode = (
    endPoint: string,
    programCode: any,
    actions: any
  ) => {
    getData(endPoint, { pageNumber: 0, pageSize: 10, programCode })
      .then((result: any) => {
        if (result.data !== "" && result.status === 200) {
          if (result.data.items.length > 0) {
            if (programid == 0) {
              actions.setErrors({
                programCode:
                  "This program code is already used in other program",
              });
            } else {
              const filteredCode = result.data.items.filter((item: any) => {
                return item.programCode === programCode && item.id != programid;
              });
              if (filteredCode.length > 0) {
                actions.setErrors({
                  programCode:
                    "This program code is already used in other program",
                });
              } else {
                actions.setTouched({});
                handleNextStep();
              }
            }
          } else {
            actions.setTouched({});
            handleNextStep();
          }
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <>
      <div>
        <Formik
          enableReinitialize={true}
          initialValues={initValues}
          onSubmit={_handleSubmit}
          validationSchema={
            step === 0 ? step1Schema : step === 1 && step2Schema
          }
        >
          {({
            values,
            errors,
            touched,
            setValues,
            handleChange,
            isSubmitting,
            setFieldValue,
          }) => (
            <Form>
              <div className="tabStep-indicator">
                {steps.map((label, index) => (
                  <div
                    key={index}
                    className={`step ${index === step ? "active" : ""}`}
                  >
                    {label}
                  </div>
                ))}
              </div>

              {/*** Step 1 ***/}
              {step === 0 && (
                <div className="tabStep-content">
                  <Row className="gy-3">
                    <Col md={4}>
                      <FieldLabel
                        htmlfor="programName"
                        labelText="Program Name *"
                      />
                      <FieldTypeText
                        name="programName"
                        placeholder="Program Name"
                      />
                      <FieldErrorMessage
                        errors={errors.programName}
                        touched={touched.programName}
                      />
                    </Col>
                    <Col md={4}>
                      <FieldLabel
                        htmlfor="programCode"
                        labelText="Program Code *"
                        required="required"
                      />
                      <FieldTypeText
                        name="programCode"
                        placeholder="Program Code"
                      />
                      <FieldErrorMessage
                        errors={errors.programCode}
                        touched={touched.programCode}
                      />
                    </Col>
                    <Col md={4}>
                      <FieldLabel
                        htmlfor="durationValue"
                        labelText="Duration *"
                        required="required"
                      />
                      <div className="d-flex">
                        <FieldTypeText
                          className="me-2"
                          min="0"
                          type="number"
                          name="durationValue"
                          placeholder="#duration"
                        />
                        <FieldTypeSelect
                          name="durationUnit"
                          options={durationType}
                          setcurrentvalue={setValues}
                          currentformvalue={values}
                          emptyOption={true}
                        />
                      </div>
                      <FieldErrorMessage
                        errors={errors.durationValue}
                        touched={touched.durationValue}
                      />
                    </Col>
                    <Col md={4}>
                      <FieldLabel htmlfor="department" labelText="Department *" />
                      <FieldTypeSelect
                        name="department"
                        options={departmentName.items}
                        setcurrentvalue={setValues}
                        currentformvalue={values}
                      />
                      <FieldErrorMessage
                        errors={errors.department}
                        touched={touched.department}
                      />
                    </Col>
                    <Col md={4}>
                      <FieldLabel
                        htmlfor="discipline"
                        labelText="Discipline *"
                        required="required"
                      />
                      <FieldTypeSelect
                        name="discipline"
                        options={disciplineName.items}
                        setcurrentvalue={setValues}
                        currentformvalue={values}
                      />
                      <FieldErrorMessage
                        errors={errors.discipline}
                        touched={touched.discipline}
                      />
                    </Col>

                    <Col md={4}>
                      <FieldLabel
                        htmlfor="programtype"
                        labelText="Program Type *"
                        required="required"
                      />
                      <FieldTypeSelect
                        name="programtype"
                        options={programTypeId.items}
                        setcurrentvalue={setValues}
                        currentformvalue={values}
                        selectDefaultLabel="Program Type"
                      />
                      <FieldErrorMessage
                        errors={errors.programtype}
                        touched={touched.programtype}
                      />
                    </Col>
                    {values.isBatchYearRequired === true && (
                      <Col md={4}>
                        <FieldLabel
                          htmlfor="batchYear"
                          labelText="Batch Year *"
                          required="required"
                        />
                        <FieldTypeSelect
                          name="batchYear"
                          options={batchYearOptions}
                          setcurrentvalue={setValues}
                          currentformvalue={values}
                        />
                        <FieldErrorMessage
                          errors={errors.batchYear}
                          touched={touched.batchYear}
                        />
                      </Col>
                    )}
                    <Col md={4}>
                      <FieldLabel htmlfor="tags" labelText="Tags" />
                      <FieldMultiSelect name="tags" options={tags.items} />
                    </Col>
                    <Col md={4}>
                      <FieldLabel
                        htmlfor="modeOfStudy"
                        labelText="Mode Of Study *"
                        required="required"
                      />
                      <div>
                        <label className="me-3">
                          <input
                            type="radio"
                            name="modeOfStudy"
                            value="Full time"
                            onChange={handleChange}
                            checked={
                              values.modeOfStudy === "Full time" ? true : false
                            }
                          />{" "}
                          Full time
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="modeOfStudy"
                            value="Part time"
                            onChange={handleChange}
                            checked={
                              values.modeOfStudy === "Part time" ? true : false
                            }
                          />{" "}
                          Part time
                        </label>
                      </div>
                      <FieldErrorMessage
                        errors={errors.mode}
                        touched={touched.mode}
                      />
                    </Col>
                  </Row>
                </div>
              )}

              {/*** Step 2 ***/}
              {step === 1 && (
                <Row className="gy-4">
                  <Col md={6}>
                    <FieldLabel htmlfor="description" labelText="Description *" />
                    <CkEditor name="description" handleChange={handleChange} />
                    <FieldErrorMessage
                      errors={errors.description}
                      touched={touched.description}
                    />
                  </Col>
                  <Col md={6}>
                    <FieldLabel htmlfor="objective" labelText="Objective *" />
                    <CkEditor name="objective" handleChange={handleChange} />
                    <FieldErrorMessage
                      errors={errors.objective}
                      touched={touched.objective}
                    />
                  </Col>
                  <Col md={12}>
                    <FieldLabel
                      htmlfor="metatitle"
                      labelText="Program meta fields"
                    />
                    <div className="card p-3 mb-3">
                      {inputFieldArr.map((el: any, index: number) => {
                        return (
                          <div key={index}>
                            <div className="mb-3">
                              <FieldLabel
                                htmlfor={`meta[${index}][title]`}
                                labelText="Title"
                              />
                              <FieldTypeText
                                name={`meta[${index}][title]`}
                                placeholder="Title"
                              />
                            </div>

                            <div className="mb-3">
                              <FieldLabel
                                htmlfor={`meta[${index}][description]`}
                                labelText="Description"
                              />
                              <CkEditor
                                name={`meta[${index}][description]`}
                                handleChange={handleChange}
                              />
                            </div>
                          </div>
                        );
                      })}
                      <div>
                        <CustomButton
                          type="button"
                          variant="primary"
                          onClick={addFieldHandler}
                          btnText="+ Add more"
                        />{" "}
                        <CustomButton
                          type="button"
                          variant="outline-secondary"
                          onClick={removeBlockHandler}
                          btnText="Remove"
                        />
                      </div>
                    </div>
                  </Col>

                  {/* =============================Minor course setting=============================== */}

                  <Col md={6}>
                    <FieldLabel
                      htmlfor="metatitle"
                      labelText="Minor course setting"
                    />
                    <div className="card p-3 mb-3">
                      <Col md={6}>
                        <FieldLabel
                          htmlFor="userSelfUnernolmentAllowed"
                          labelText="Allowed students to Unenrollment"
                          required="required"
                        />
                        <div>
                          <label className="me-3">
                            <input
                              type="radio"
                              id="trueOption"
                              name="userSelfUnernolmentAllowed"
                              value="true"
                              onChange={handleChange}
                              checked={
                                values.userSelfUnernolmentAllowed?.toString() === "true"
                              }
                            />{" "}
                            Yes
                          </label>
                          <label>
                            <input
                              type="radio"
                              id="falseOption"
                              name="userSelfUnernolmentAllowed"
                              value="false"
                              onChange={handleChange}
                              checked={
                                values.userSelfUnernolmentAllowed?.toString() === "false"
                              }
                            />{" "}
                            No
                          </label>
                        </div>
                        <FieldErrorMessage
                          errors={errors.userSelfUnernolmentAllowed}
                          touched={touched.userSelfUnernolmentAllowed}
                        />
                      </Col>

                      <br />

                      <Col md={4}>
                        <FieldLabel
                          htmlFor="waitListProcessMode"
                          labelText="Waitlist Enrollment Criteria"
                          required="required"
                        />
                        <div>
                          <label className="me-3">
                            <input
                              type="radio"
                              id="trueOption"
                              name="waitListProcessMode"
                              value="automate"
                              onChange={handleChange}
                              checked={
                                values.waitListProcessMode === "automate"}
                            />{" "}
                            Automated
                          </label>
                          <label>
                            <input
                              type="radio"
                              id="falseOption"
                              name="waitListProcessMode"
                              value="manual"
                              onChange={handleChange}
                              checked={values.waitListProcessMode === "manual"}
                            />{" "}
                            Manual
                          </label>
                        </div>
                        <FieldErrorMessage
                          errors={errors.waitListProcessMode}
                          touched={touched.waitListProcessMode}
                        />
                      </Col>
                    </div>
                  </Col>

                  {/* =================Minor course setting========= */}

                  <Col md={6}>
                    <FieldLabel
                      htmlfor="file"
                      labelText="Program Picture"
                      className="mt-3"
                    />
                    <div className="d-flex flex-wrap">
                      {initValues.files !== undefined &&
                        initValues.files.length > 0 && (
                          <React.Fragment>
                            <div>

                              <img
                                src={initValues.files[0].url}
                                alt={initValues.files[0].originalFileName}
                                width="150px"
                              />

                            </div>
                          </React.Fragment>
                        )}
                      <div className="d-flex flex-column justify-content-end">
                        {initValues.files !== undefined &&
                          initValues.files.length > 0 && (
                            <FieldTypeCheckbox
                              name="deleteImage"
                              checkboxLabel="Remove Picture"
                            />
                          )}
                        <input
                          className="form-control mt-2"
                          id="file"
                          name="file"
                          type="file"
                          onChange={(event) => {
                            setFieldValue("file", event.currentTarget.files[0]);
                          }}
                        />
                      </div>
                    </div>
                    {/* <UploadImage setFieldValue={setFieldValue} values={values} /> */}
                  </Col>

                  <Col md={6}>

                    <div className="mb-3">
                      <FieldTypeCheckbox
                        name="programaccessinfo"
                        value="fullaccess"
                        checkboxLabel="Lifetime Access"
                      />
                    </div>
                    <div>
                      <FieldTypeCheckbox
                        name="published"
                        checkboxLabel="Published"
                      />{" "}
                    </div>
                  </Col>
                </Row>

              )}

              <Col className=""></Col>
              <div className="tabStep-footer mt-3">
                {isSubmitting === false && step > 0 && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary me-3"
                    onClick={handlePreviousStep}
                  >
                    Previous
                  </button>
                )}
                {step < steps.length - 1 && (
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="btn btn-primary"
                  >
                    Next
                  </button>
                )}
                {step === steps.length - 1 &&
                  (isSubmitting === false ? (
                    <div className="text-center">
                      <CustomButton
                        type="submit"
                        btnText={programid == 0 ? "Submit" : "Update"}
                        variant="primary"
                      />{" "}
                    </div>
                  ) : (
                    <LoadingButton
                      variant="primary"
                      btnText={
                        programid.id == 0 ? "Submitting..." : "Updating..."
                      }
                      className="modal-buttons"
                    />
                  ))}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AddProgramForm;
