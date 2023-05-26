import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Step 1 validation schema
const step1Schema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
});

// Step 2 validation schema
const step2Schema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
});

// Step 3 validation schema
const step3Schema = Yup.object({
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const MultiStepForm = () => {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (values) => {
    // Handle form submission
    console.log(values);
  };

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={step === 1 ? step1Schema : step === 2 ? step2Schema : step3Schema}
    >
      {({ values }) => (
        <Form>
          {step === 1 && (
            <div>
              <h2>Step 1</h2>
              <div>
                <label htmlFor="firstName">First Name</label>
                <Field type="text" name="firstName" />
                <ErrorMessage name="firstName" component="div" />
              </div>
              <div>
                <label htmlFor="lastName">Last Name</label>
                <Field type="text" name="lastName" />
                <ErrorMessage name="lastName" component="div" />
              </div>
              <button type="button" onClick={handleNextStep}>
                Next
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2>Step 2</h2>
              <div>
                <label htmlFor="email">Email</label>
                <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" />
              </div>
              <div>
                <label htmlFor="phone">Phone</label>
                <Field type="text" name="phone" />
                <ErrorMessage name="phone" component="div" />
              </div>
              <button type="button" onClick={handlePreviousStep}>
                Previous
              </button>
              <button type="button" onClick={handleNextStep}>
                Next
              </button>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2>Step 3</h2>
              <div>
                <label htmlFor="password">Password</label>
                <Field type="password" name="password" />
                <ErrorMessage name="password" component="div" />
              </div>
              <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Field type="password" name="confirmPassword" />
                <ErrorMessage name="confirmPassword" component="div" />
              </div>
              <button type="button" onClick={handlePreviousStep}>
                Previous
              </button>
              <button type="submit" disabled={!values.confirmPassword}>
                Submit
              </button>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default MultiStepForm;
