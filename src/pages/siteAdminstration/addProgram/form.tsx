import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import { Formik, Form } from "formik";
import { makeGetDataRequest } from "../../../features/api_calls/getdata";
import {
  postData as postProgramData,
  putData as updateProgramData,
} from "../../../adapters/microservices";
import TinymceEditor from "../../../widgets/editor/tinyMceEditor";
import {
  addMetaInputField,
  generateProgramDataObject,
  addExtraMetaDataToInitialValues,
  addMetaFields,
  generateAcademicYears,
  durationTypeObj
} from "./utils";
import FieldLabel from "../../../widgets/formInputFields/labels";
import FieldTypeText from "../../../widgets/formInputFields/formTextField";
import CustomButton from "../../../widgets/formInputFields/buttons";
import FieldTypeCheckbox from "../../../widgets/formInputFields/formCheckboxField";
import FieldTypeSelect from "../../../widgets/formInputFields/formSelectField";
import FieldErrorMessage from "../../../widgets/formInputFields/errorMessage";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import FieldMultiSelect from "../../../widgets/formInputFields/multiSelect";
import * as Yup from "yup";
import './multiStepFrom.scss';

const steps = ['Step 1', 'Step 2', 'Step 3'];

// Step 1 validation schema
const step1Schema = Yup.object({
  department: Yup.string().required(),
  programName: Yup.string().min(1).trim().required(),
  programCode: Yup.string().min(1).trim().required(),
  discipline: Yup.string().required(),
});

// Step 2 validation schema
const step2Schema = Yup.object({
  programtype: Yup.string().required(),
  batchYear: Yup.string().required(),
  durationValue: Yup
  .number()
  .integer('Number must be an integer')
  .positive('Number must be positive')
  .required('Number is required'),
});

// Step 3 validation schema
const step3Schema = Yup.object({
});

const AddProgramForm = ({ initialformvalues, programid }: any) => {
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

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };
  
  // fetch Department & Discipline list ===== >>>
  useEffect(() => {
    generateAcademicYears();
    const apiFilters = { pageNumber: 0, pageSize: 100 };
    makeGetDataRequest("/departments", apiFilters, setDepartmentName);
    makeGetDataRequest("/disciplines", apiFilters, setDisciplineName);
    makeGetDataRequest("/program-types", apiFilters, setProgramTypeId);
    makeGetDataRequest("/tags", apiFilters, setTags);
  }, []);

  useEffect(() => {
    let addedValues = addExtraMetaDataToInitialValues(
      initValues,
      programTypeId.items,
      "programtypeList"
    );
    setInitValues(addedValues);
  }, [programTypeId]);

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

  const handlerFormSubmit = (values: {}, { setSubmitting, resetForm }: any) => {
    
    let programValues = generateProgramDataObject(values);
    let error_Msg = "";
    
    console.log('programValues', programValues);

    if (programid == 0) {
      let endPoint = "/programs";
      postProgramData(endPoint, programValues)
        .then((res: any) => {
          if (res.data !== "" && res.status === 201) {
            Swal.fire({
              icon: "success",
              title: "Added Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            setSubmitting(false);
            resetForm();
            navigate("/manageprogram", { state: values });
          }
        })
        .catch((err: any) => {
          console.log(err);
          if (err.response.status === 400) {
            Object.entries(err.response.data).map(
              ([key, value]) => (error_Msg += `${key}: ${value} \n`)
            );
            alert(error_Msg);
          } else if (err.response.status === 500) {
            alert(`${err.response.data.error}, 500!`);
            navigate("/manageprogram", { state: values });
          }
        });
    } else {
      let endPoint = `/programs/${programid}`;
      updateProgramData(endPoint, programValues)
        .then((res: any) => {
          if (res.data !== "" && res.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Update Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            setSubmitting(false);
            resetForm();
            navigate("/manageprogram", { state: values });
          }
        })
        .catch((err: any) => {
          console.log(err);
          if (err.response.status === 400) {
            Object.entries(err.response.data).map(
              ([key, value]) => (error_Msg += `${key}: ${value} \n`)
            );
            alert(error_Msg);
          } else if (err.response.status === 500) {
            alert(`${err.response.data.error}, 500!`);
            navigate("/manageprogram", { state: values });
          }
        });
    }
    // navigate("/manageprogram", { state: values });
  };

  return (
    <>
      <div>
        <Formik
          enableReinitialize={true}
          initialValues={initValues}
          onSubmit={(values, action) => {
            handlerFormSubmit(values, action);
          }}
          validationSchema={step === 0 ? step1Schema : step === 1 ? step2Schema : step3Schema}
        >
          {({
            values,
            errors,
            touched,
            setValues,
            handleChange,
          }) => (
            <Form>
              <div className="step-indicator">
                {steps.map((label, index) => (
                  <div key={index} className={`step ${index === step ? 'active' : ''}`}>
                    {label}
                  </div>
                ))}
              </div>
              {step === 0 && (
              <>
                <div className="mb-3">
                  <FieldLabel
                    htmlfor="department"
                    labelText="Department"
                    required="required"
                  />
                  <FieldTypeSelect
                    name="department"
                    options={departmentName.items}
                    setcurrentvalue={setValues}
                    currentformvalue={values}
                  />
                  <FieldErrorMessage
                    errors={errors.department}
                    touched={touched.department}
                    msgText="Please select Department"
                  />
                </div>
                <div className="mb-3">
                  <FieldLabel
                    htmlfor="programName"
                    labelText="Program Name"
                    required="required"
                  />
                  <FieldTypeText name="programName" placeholder="Program Name" />
                  <FieldErrorMessage
                    errors={errors.programName}
                    touched={touched.programName}
                    msgText="Program Name required atleast 1 characters"
                  />
                </div>
                <div className="mb-3">
                  <FieldLabel
                    htmlfor="programCode"
                    labelText="Program Code"
                    required="required"
                  />
                  <FieldTypeText name="programCode" placeholder="Program Code" />
                  <FieldErrorMessage
                    errors={errors.programCode}
                    touched={touched.programCode}
                    msgText="Program Code required alteast 1 characters"
                  />
                </div>
                <div className="mb-3">
                  <FieldLabel
                    htmlfor="discipline"
                    labelText="Discipline"
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
                    msgText="Please select Discipline"
                  />
                </div>
              </>
              )}
              {step === 1 && (
                <>
                  <div className="mb-3">
                    <FieldLabel
                      htmlfor="programtype"
                      labelText="Program Type "
                      required="required"
                    />
                    <FieldTypeSelect
                      name="programtype"
                      options={programTypeId.items}
                      setcurrentvalue={setValues}
                      currentformvalue={values}
                    />
                    <FieldErrorMessage
                      errors={errors.programtype}
                      touched={touched.programtype}
                      msgText="Please select Program Type"
                    />
                  </div>
                  {values.isBatchYearRequired === true && (
                    <div className="mb-3">
                      <FieldLabel
                        htmlfor="batchYear"
                        labelText="Batch Year"
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
                        msgText="Batch Year must in number"
                      />
                    </div>
                  )}

                  <div className="mb-3">
                    <FieldLabel
                      htmlfor="modeOfStudy"
                      labelText="Mode Of Study"
                      required="required"
                    />
                    <label className="mx-3">
                      <input
                        type="radio"
                        name="modeOfStudy"
                        value="fulltime"
                        onChange={handleChange}
                        checked={values.modeOfStudy === 'fulltime' ? true : false}
                      />{" "}
                      Full Time
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="modeOfStudy"
                        value="parttime"
                        onChange={handleChange}
                        checked={values.modeOfStudy === 'parttime' ? true : false}
                      />{" "}
                      Part Time
                    </label>
                    <FieldErrorMessage
                      errors={errors.mode}
                      touched={touched.mode}
                      msgText="Please select Program Mode"
                    />
                  </div>  
                  
                  <div className="mb-3">
                    <FieldLabel
                      htmlfor="tags"
                      labelText="Tags"
                    />
                    <FieldMultiSelect
                      name="tags"
                      options={tags.items}
                    />
                  </div>

                  <div className="mb-3">
                    <FieldLabel
                      htmlfor="durationValue"
                      labelText="Duration"
                      required="required"
                    />
                    <FieldTypeText type="number" name="durationValue" placeholder="#duration" />
                    <FieldErrorMessage
                      errors={errors.durationValue}
                      touched={touched.durationValue}
                      msgText="Duration must in positive number and non decimal"
                    />
                    <FieldTypeSelect
                      name="durationUnit"
                      options={durationType}
                      setcurrentvalue={setValues}
                      currentformvalue={values}
                      emptyOption={true}
                    />
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <div className="mb-3">
                    <FieldLabel htmlfor="objective" labelText="Objective" />
                    <TinymceEditor name="objective" handleChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <FieldLabel
                      htmlfor="description"
                      labelText="Learning outcome"
                    />
                    <TinymceEditor name="description" handleChange={handleChange} />
                  </div>
                  <FieldLabel htmlfor="metatitle" labelText="Program meta Fields" />
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
                            <TinymceEditor
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
                  <div
                    role="group"
                    aria-labelledby="checkbox-group"
                    className="mb-3"
                  >
                    <div>
                      <FieldTypeCheckbox
                        name="programaccessinfo"
                        value="fullaccess"
                        checkboxLabel="Full life time access"
                      />
                    </div>
                    <div>
                      <FieldTypeCheckbox
                        name="programaccessinfo"
                        value="published"
                        checkboxLabel="Published"
                      />
                    </div>
                  </div>
              </>
              )}
              <div className="button-group">
                {step > 0 && (
                  <button type="button" className="previous-button" onClick={handlePreviousStep}>
                    Previous
                  </button>
                )}
                {step < steps.length - 1 && (
                  <button type="button" className="next-button" onClick={handleNextStep}>
                    Next
                  </button>
                )}
                {step === steps.length - 1 && (
                  // <button type="submit" className="submit-button" disabled={!values.confirmPassword}>
                  //   Submit
                  // </button>
                  <div className="text-center">
                    <CustomButton
                      type="submit"
                      btnText="Submit"
                      variant="primary"
                      // isSubmitting={isSubmitting}
                    />{" "}
                    {/* <CustomButton
                      type="reset"
                      btnText="Reset"
                      variant="outline-secondary"
                    /> */}
                  </div>
                )}
              </div>
              {/* <div className="text-center">
                <CustomButton
                  type="submit"
                  btnText="Submit"
                  variant="primary"
                  // isSubmitting={isSubmitting}
                />{" "}
                <CustomButton
                  type="reset"
                  btnText="Reset"
                  variant="outline-secondary"
                />
              </div> */}
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AddProgramForm;
