import React from "react";
import Header from "../../../header";
import Sidebar from "../../../sidebar";
import { Formik, Form } from "formik";
import { Container, Button } from "react-bootstrap";
import FieldLabel from "../../../../widgets/form_input_fields/labels";
import FieldTypeText from "../../../../widgets/form_input_fields/form_text_field";
import FieldErrorMessage from "../../../../widgets/form_input_fields/error_message";
import FieldTypeTextarea from "../../../../widgets/form_input_fields/form_textarea_field";
import CustomButton from "../../../../widgets/form_input_fields/buttons";
import FieldTypeCheckbox from "../../../../widgets/form_input_fields/form_checkbox_field";
import FieldTypeSelect from "../../../../widgets/form_input_fields/form_select_field";
import * as Yup from "yup"
import { useNavigate } from "react-router-dom";

// Formik Yup validation === >>>
const formSchema = Yup.object({
  name: Yup.string().min(1).required(),
  // description: Yup.string().max(100).required(),
});

const AddCourseForm = () => {
  const navigate = useNavigate();
  // Initial values of react table === >>>
  const initialValues = {
    name: "",
    code: "",
    category:"",
    description: "",
  };
  return (
    <>
      <Header pageHeading="Manage Courses: Master of Computer Applications" welcomeIcon={false} />
      <div className="main-content-container">
        <Sidebar />
        <div
          className="content-area content-area-slider"
          id="contentareaslider"
        >
          <Container fluid className="administration-wrapper">
          <Button
              variant="outline-secondary"
              onClick={() => navigate("/tags")}
            >
              Go back
            </Button>
            <hr />
            <Formik
              initialValues={initialValues}
              // validationSchema={formSchema}
              onSubmit={(values, action) => {
                console.log(values);
              }}
            >
              {({ errors, touched, isSubmitting, setValues, values }) => (
                <Form>
                  <div className="mb-3">
                    <FieldLabel
                      htmlfor="name"
                      labelText="Name"
                      required="required"
                      star="*"
                    />
                    <FieldTypeText name="name" placeholder="Name" />
                    <FieldErrorMessage
                      errors={errors.name}
                      touched={touched.name}
                      msgText="Name required atleast 1 character"
                    />
                  </div>

                  <div className="mb-3">
                    <FieldLabel
                      htmlfor="code"
                      labelText="Code"
                      required="required"
                      star="*"
                    />
                    <FieldTypeText name="code" placeholder="Short Code" />
                    <FieldErrorMessage
                      errors={errors.name}
                      touched={touched.name}
                      msgText="Code required atleast 1 character"
                    />
                  </div>

                  <div className="mb-3">
                <FieldLabel
                  htmlfor="category"
                  labelText="Category"
                  required="required"
                  star="*"
                />
                <FieldTypeSelect
                  name="category"
                  options={["1","2"]}
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
                      htmlfor="description"
                      labelText="Description"
                      // required="required"
                      // star="*"
                    />
                    <FieldTypeTextarea
                      name="description"
                      component="textarea"
                      placeholder="Description"
                    />
                    <FieldErrorMessage
                      errors={errors.description}
                      touched={touched.description}
                      msgText="Please Enter description"
                    />
                  </div>
                  <div className="mb-3">
                    <FieldTypeCheckbox
                      name="publish"
                      checkboxLabel="Publish"
                    />{" "}
                    <FieldErrorMessage
                      errors={errors.publish}
                      touched={touched.publish}
                      msgText="Please Check required field"
                    />
                  </div>
                  <div className="text-center">
                    <CustomButton
                      type="submit"
                      variant="primary"
                      // isSubmitting={isSubmitting}
                      btnText="Save"
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
          </Container>
        </div>
      </div>
    </>
  );
};

export default AddCourseForm;
