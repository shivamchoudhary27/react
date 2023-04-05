import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

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

const CourseForm = () => {
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
};

export default CourseForm;
