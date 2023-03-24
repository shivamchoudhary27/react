import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import { Formik, Form } from "formik";
import { Schemas } from "./schemas";
import { makeGetDataRequest } from "../../../features/api_calls/getdata";
import {
  postData as postProgramData,
  putData as updateProgramData,
} from "../../../adapters/microservices";
import TinymceEditor from "../../../widgets/editor/tinyMceEditor";
import { addMetaInputField, generateProgramDataObject, addExtraMetaDataToInitialValues, addMetaFields } from "./utils";
import FieldLabel from "../../../widgets/form_input_fields/labels";
import FieldTypeText from "../../../widgets/form_input_fields/form_text_field";
import CustomButton from "../../../widgets/form_input_fields/buttons";
import FieldTypeCheckbox from "../../../widgets/form_input_fields/form_checkbox_field";
import FieldTypeRadio from "../../../widgets/form_input_fields/form_radio_field";
import FieldTypeSelect from "../../../widgets/form_input_fields/form_select_field";
import FieldErrorMessage from "../../../widgets/form_input_fields/error_message";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

const AddProgramForm = ({ initialformvalues, programid }: any) => {
  const navigate = useNavigate();
  const dummyData = {items: [], pager: {totalElements: 0, totalPages: 0}}
  const [inputFieldArr, setinputFieldArr] = useState<any>(addMetaFields(initialformvalues.meta.length));
  const [departmentName, setDepartmentName] = useState<any>(dummyData);
  const [disciplineName, setDisciplineName] = useState<any>(dummyData);
  const [programTypeId, setProgramTypeId] = useState<any>(dummyData);
  const [initValues, setInitValues] = useState<any>(initialformvalues);

  // fetch Department & Discipline list ===== >>>
  useEffect(() => {
    const apiFilters = {pageNumber: 0, pageSize : 30};
    makeGetDataRequest('/departments', apiFilters, setDepartmentName);
    makeGetDataRequest('/disciplines', apiFilters, setDisciplineName);
    makeGetDataRequest('/program-types', apiFilters, setProgramTypeId);
  }, []);
  
  useEffect(() => {
    let addedValues = addExtraMetaDataToInitialValues(initValues, programTypeId.items, 'programtypeList');
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
      let removeItem = inputFieldArr.slice(0, inputFieldArr.length-1);
      setinputFieldArr(removeItem);
    }
  };

  const handlerFormSubmit = (values: {}, { setSubmitting, resetForm }: any) => {
    console.log(values)
    let programValues = generateProgramDataObject(values);
    let error_Msg = "";
    
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
            Object.entries(err.response.data).map(([key, value])=>(
              error_Msg += `${key}: ${value} \n`
            ))
            alert(error_Msg)
          } else if (err.response.status === 500) {
            alert(`${err.response.data.error}, 500!`);
            navigate("/manageprogram", { state: values });
          }
        });
    } else {
      let endPoint = `/programs/${programid}`;
      updateProgramData(endPoint, programValues)
        .then((res: any) => {
          if (res.data.items !== "" && res.status === 200) {
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
            Object.entries(err.response.data).map(([key, value])=>(
              error_Msg += `${key}: ${value} \n`
            ))
            alert(error_Msg)
          }else if (err.response.status === 500) {
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
          validationSchema={Schemas}
          onSubmit={(values, action) => {
            handlerFormSubmit(values, action);
          }}
        >
          {({ values, errors, touched, setValues, handleChange }) => (
            <Form>
              <div className="mb-3">
                <FieldLabel
                  htmlfor="department"
                  labelText="Department"
                  required="required"
                  star="*"
                />
                <FieldTypeSelect 
                  name="department" 
                  options={departmentName.items} 
                  setcurrentvalue={setValues}
                  currentformvalue={values} />
                <FieldErrorMessage
                  errors={errors.department}
                  touched={touched.department}
                  msgText="Please Enter Department"
                />
              </div>
              <div className="mb-3">
                <FieldLabel
                  htmlfor="programName"
                  labelText="Program Name"
                  required="required"
                  star="*"
                />
                <FieldTypeText name="programName" placeholder="Program Name" />
                <FieldErrorMessage
                  errors={errors.programName}
                  touched={touched.programName}
                  msgText="Please Enter Program Name"
                />
              </div>
              <div className="mb-3">
                <FieldLabel
                  htmlfor="programCode"
                  labelText="Program Code"
                  required="required"
                  star="*"
                />
                <FieldTypeText name="programCode" placeholder="Program Code" />
                <FieldErrorMessage
                  errors={errors.programCode}
                  touched={touched.programCode}
                  msgText="Please Enter Program Code"
                />
              </div>
              <div className="mb-3">
                <FieldLabel
                  htmlfor="programtype"
                  labelText="Program Type "
                  required="required"
                  star="*"
                />
                <FieldTypeSelect 
                  name="programtype" 
                  options={programTypeId.items}
                  setcurrentvalue={setValues}
                  currentformvalue={values}
                />
                {/* {programTypeId.map((el: any, index: number) => (
                  <div key={index}>
                    <FieldTypeRadio
                      setcurrentvalue={setValues}
                      currentformvalue={values}
                      type='radio'
                      name="programtype"
                      value={el.id}
                      radioText={el.name}
                    />
                  </div>
                ))} */}
                <FieldErrorMessage
                  errors={errors.programtype}
                  touched={touched.programtype}
                  msgText="Please Enter Program Type"
                />
              </div>
              {values.isBatchYearRequired === true && 
                <div className="mb-3">
                  <FieldLabel
                    htmlfor="batchYear"
                    labelText="Batch Year"
                    required="required"
                    star="*"
                  />
                  <FieldTypeText name="batchYear" placeholder="#Year" />
                  <FieldErrorMessage
                    errors={errors.batchYear}
                    touched={touched.batchYear}
                    msgText="Batch Year must in number"
                  />
                </div>
              }
              <div className="mb-3">
                <FieldLabel
                  htmlfor="discipline"
                  labelText="Discipline"
                  required="required"
                  star="*"
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
                  msgText="Select Discipline"
                />
              </div>
              <div className="mb-3">
                <FieldLabel
                  htmlfor="modeOfStudy"
                  labelText="Mode Of Stydy"
                  required="required"
                  star="*"
                />
                {/* {modeStudy.map((el: any, index: number) => (
                  <div key={index}>
                    <FieldTypeRadio
                      setcurrentvalue={setValues}
                      currentformvalue={values}
                      type='radio'
                      name="modeOfStudy"
                      value={el.value}
                      radioText={el.name}
                    />
                  </div>
                ))} */}
                <label className="mx-3">
                  <input type="radio" name="modeOfStudy" value="fulltime" onChange={handleChange} />
                  {" "}Full Time
                </label>
                <label>
                  <input type="radio" name="modeOfStudy" value="partime" onChange={handleChange} />
                  {" "}Part Time
                </label>
                <FieldErrorMessage
                  errors={errors.mode}
                  touched={touched.mode}
                  msgText="Please select Program Mode"
                />
              </div>
              <div className="mb-3">
                <FieldLabel
                  htmlfor="duration"
                  labelText="Duration"
                  required="required"
                  star="*"
                />
                <FieldTypeText name="duration" placeholder="#duration" />
                <FieldErrorMessage
                  errors={errors.duration}
                  touched={touched.duration}
                  msgText="Duration must in number"
                />
              </div>
              <div className="mb-3">
                <FieldLabel htmlfor="objective" labelText="Objective" />
                <TinymceEditor name="objective" handleChange={handleChange}/>
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
                        <FieldLabel htmlfor={`meta[${index}][title]`} labelText="Title" />
                        <FieldTypeText name={`meta[${index}][title]`} placeholder="Title" />
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
                {/* <div>
                  <FieldTypeCheckbox
                    name="programaccessinfo"
                    value="certificate"
                    checkboxLabel="Certificate of completion"
                  />
                </div> */}
                <div>
                  <FieldTypeCheckbox
                    name="programaccessinfo"
                    value="published"
                    checkboxLabel="Published"
                  />
                </div>
              </div>

              <div className="text-center">
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
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AddProgramForm;
