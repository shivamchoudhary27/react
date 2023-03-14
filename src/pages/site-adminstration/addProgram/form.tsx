import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import { Formik, Form } from "formik";
import { Schemas } from "./schemas";
import {
  getData as getName,
  postData as postProgramData,
  putData as updateProgramData,
} from "../../../adapters/microservices";
import TinymceEditor from "../../../widgets/editor/tinyMceEditor";
import { addMetaInputField, generateProgramDataObject } from "./utils";
import FieldLabel from "../../../widgets/form_input_fields/labels";
import FieldTypeText from "../../../widgets/form_input_fields/form_text_field";
import Custom_Button from "../../../widgets/form_input_fields/buttons";
import FieldTypeCheckbox from "../../../widgets/form_input_fields/form_checkbox_field";
import FieldTypeRadio from "../../../widgets/form_input_fields/form_radio_field";
import FieldTypeSelect from "../../../widgets/form_input_fields/form_select_field";
import FieldErrorMessage from "../../../widgets/form_input_fields/error_message";

const AddProgramForm = ({ initialformvalues, programid }: any) => {
  const navigate = useNavigate();
  const [inputFieldArr, setinputFieldArr] = useState(addMetaInputField);
  const [departmentName, setDepartmentName] = useState<any>([]);
  const [disciplineName, setDisciplineName] = useState<any>([]);
  const [programTypeId, setProgramTypeId] = useState<any>([]);
  const [radioValue, setRadioValue] = useState("");

  // fetch Department & Discipline list ===== >>>
  useEffect(() => {
    const departmentEndPoint = "/departments";
    const disciplineEndPoint = "/disciplines";
    const programTypeEndPoint = "/program-types";
    getName(departmentEndPoint).then((res: any) => {
      if (res.data !== "" && res.status === 200) {
        setDepartmentName(res.data);
      }
    });
    getName(disciplineEndPoint).then((res: any) => {
      if (res.data !== "" && res.status === 200) {
        setDisciplineName(res.data);
      }
    });
    getName(programTypeEndPoint).then((res: any) => {
      if (res.data !== "" && res.status === 200) {
        setProgramTypeId(res.data);
      }
    });
  }, []);

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

  const handlerFormSubmit = (values: {}, { setSubmitting, resetForm }: any) => {
    let programValues = generateProgramDataObject(values);

    if (programid == 0) {
      let endPoint = "/programs";
      postProgramData(endPoint, programValues)
        .then((res) => {
          if (res.data !== "") {
            setSubmitting(false);
            resetForm();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      let endPoint = `/programs/${programid}`;
      updateProgramData(endPoint, programValues)
        .then((res: any) => {
          if (res.data !== "") {
            setSubmitting(false);
            resetForm();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    navigate("/manageprogram", { state: values });
  };

  return (
    <>
      <div>
        <Formik
          initialValues={initialformvalues}
          validationSchema={Schemas}
          onSubmit={(values, action) => {
            handlerFormSubmit(values, action);
          }}
        >
          {({ errors, touched, isSubmitting, handleChange }) => (
            <Form>
              <div className="mb-3">
                <FieldLabel
                  htmlfor="department"
                  labelText="Department"
                  required="required"
                  star="*"
                />
                <FieldTypeSelect name="department" options={departmentName} />
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
                  htmlfor="programType"
                  labelText="Program Type "
                  required="required"
                  star="*"
                />
                {programTypeId.map((el: any) => (
                  <FieldTypeRadio
                    value={el.id}
                    name="programtype"
                    radioText={el.name}
                    checked={radioValue == el.id}
                    onChange={(e: any)=>setRadioValue(e.target.value)}
                  />
                ))}
                <FieldErrorMessage
                  errors={errors.programtype}
                  touched={touched.programtype}
                  msgText="Please Enter Program Type"
                />
              </div>
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
              <div className="mb-3">
                <FieldLabel
                  htmlfor="discipline"
                  labelText="Discipline"
                  required="required"
                  star="*"
                />
                <FieldTypeSelect name="discipline" options={disciplineName} />
                <FieldErrorMessage
                  errors={errors.discipline}
                  touched={touched.discipline}
                  msgText="Select Discipline"
                />
              </div>
              <div className="mb-3">
                <FieldLabel
                  htmlfor="mode"
                  labelText="Mode Of Stydy"
                  required="required"
                  star="*"
                />
                <FieldTypeRadio
                  value="full_time"
                  name="mode"
                  radioText="Full Time"
                />
                <FieldTypeRadio
                  value="part_time"
                  name="mode"
                  radioText="Part Time"
                />
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
                <FieldLabel htmlfor="requirement" labelText="Objective" />
                <TinymceEditor name="requirement" handleChange={handleChange} />
              </div>
              <div className="mb-3">
                <FieldLabel
                  htmlfor="description"
                  labelText="Learning outcomes"
                />
                <TinymceEditor name="description" handleChange={handleChange} />
              </div>

              <FieldLabel htmlfor="metatitle" labelText="Program meta Fields" />
              <div className="card p-3 mb-3">
                {inputFieldArr.map(() => {
                  return (
                    <>
                      <div className="mb-3">
                        <FieldLabel htmlfor="metatitle" labelText="Title" />
                        <FieldTypeText name="metatitle" placeholder="Title" />
                      </div>

                      <div className="mb-3">
                        <FieldLabel
                          htmlfor="metadescription"
                          labelText="Description"
                        />
                        <TinymceEditor
                          name="metadescription"
                          handleChange={handleChange}
                        />
                      </div>
                    </>
                  );
                })}
                <div>
                  <Custom_Button
                    variant="primary"
                    onClick={addFieldHandler}
                    btnText="+ Add more"
                  />{" "}
                  <Custom_Button
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
                    name="checked"
                    value="fullaccess"
                    checkboxLabel="Full life time access"
                  />
                </div>
                <div>
                  <FieldTypeCheckbox
                    name="checked"
                    value="certificate"
                    checkboxLabel="Certificate of completion"
                  />
                </div>
                <div>
                  <FieldTypeCheckbox
                    name="checked"
                    value="published"
                    checkboxLabel="Published"
                  />
                </div>
              </div>

              <div className="text-center">
                <Custom_Button
                  type="submit"
                  btnText="Submit"
                  variant="primary"
                  isSubmitting={isSubmitting}
                />{" "}
                <Custom_Button
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
