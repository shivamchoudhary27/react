import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import { getData as getProgramData } from "../../../../adapters/microservices";
import Header from "../../../header";
import Sidebar from "../../../sidebar";
import { Container, Button } from "react-bootstrap";
import AddProgramForm from "./form";
import { useNavigate, useParams } from "react-router-dom";
import FieldLabel from "../../../../widgets/form_input_fields/labels";
import FieldTypeText from "../../../../widgets/form_input_fields/form_text_field";
import FieldTypeTextarea from "../../../../widgets/form_input_fields/form_textarea_field";
import Custom_Button from "../../../../widgets/form_input_fields/buttons";
import FieldErrorMessage from "../../../../widgets/form_input_fields/error_message";

const initialValues = {
  courseName: "",
  shortCode: "",
  category: "",
  description: "",
  published: false,
};

const handleSubmit = (values) => {
  console.log(values);
};

const AddCourse = () => {
    const courseForm = () => {
        return (
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              {(formik) => (
                <Form>
                  <label htmlFor="courseName">Course Name:</label>
                  <Field type="text" id="courseName" name="courseName" />
                  <ErrorMessage name="courseName" />
        
                  <label htmlFor="shortCode">Short Code:</label>
                  <Field type="text" id="shortCode" name="shortCode" />
                  <ErrorMessage name="shortCode" />
        
                  <label htmlFor="category">Category:</label>
                  <Field as="select" id="category" name="category">
                    <option value="">Select a category</option>
                    <option value="math">Math</option>
                    <option value="science">Science</option>
                    <option value="history">History</option>
                  </Field>
                  <ErrorMessage name="category" />
        
                  <label htmlFor="description">Description:</label>
                  <Field as="textarea" id="description" name="description" />
                  <ErrorMessage name="description" />
        
                  <label>
                    <Field type="checkbox" name="published" />
                    Published
                  </label>
                  <ErrorMessage name="published" />
        
                  <button type="submit">Submit</button>
                </Form>
              )}
            </Formik>
          );
    } 


    return (
        <>
          <Header pageHeading="Add Course" welcomeIcon={false} />
          <div className="main-content-container">
            <Sidebar />
            <div
              className="content-area content-area-slider"
              id="contentareaslider"
            >
              <Container fluid className="administration-wrapper">
                <hr />
                <Formik
          initialValues={initialValues}
          validationSchema={departmentSchema}
          onSubmit={(values, action) => {
            handleFormData(values, action);
          }}
        >
          {({ errors, touched, isSubmitting }) => (
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
              <div className="text-center">
                <Custom_Button
                  type="submit"
                  variant="primary"
                  isSubmitting={isSubmitting}
                  btnText={formTitles.btnTitle}
                />{" "}
                {formTitles.btnTitle === "Save" && (
                  <Custom_Button
                    type="reset"
                    btnText="Reset"
                    variant="outline-secondary"
                  />
                )}
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

export default AddCourse;
