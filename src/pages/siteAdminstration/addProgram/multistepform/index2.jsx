import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './MultiStepForm.css';

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

const steps = ['Step 1', 'Step 2', 'Step 3'];

const StudentDashboard = () => {
  const [step, setStep] = useState(0);

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
      validationSchema={step === 0 ? step1Schema : step === 1 ? step2Schema : step3Schema}
    >
      {({ values }) => (
        <Form className="multi-step-form">
          <div className="step-indicator">
            {steps.map((label, index) => (
              <div key={index} className={`step ${index === step ? 'active' : ''}`}>
                {label}
              </div>
            ))}
          </div>

          <div className="step-content">
            {step === 0 && (
              <div>
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <Field type="text" name="firstName" />
                  <ErrorMessage name="firstName" component="div" className="error-message" />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <Field type="text" name="lastName" />
                  <ErrorMessage name="lastName" component="div" className="error-message" />
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field type="email" name="email" />
                  <ErrorMessage name="email" component="div" className="error-message" />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <Field type="text" name="phone" />
                  <ErrorMessage name="phone" component="div" className="error-message" />
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Field type="password" name="password" />
                  <ErrorMessage name="password" component="div" className="error-message" />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <Field type="password" name="confirmPassword" />
                  <ErrorMessage name="confirmPassword" component="div" className="error-message" />
                </div>
              </div>
            )}
          </div>

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
              <button type="submit" className="submit-button" disabled={!values.confirmPassword}>
                Submit
              </button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default StudentDashboard;


////
.multi-step-form {
    max-width: 400px;
    margin: 0 auto;
  }
  
  .step-indicator {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  .step {
    flex: 1;
    padding: 10px;
    text-align: center;
    background-color: #f0f0f0;
  }
  
  .step.active {
    background-color: #007bff;
    color: #fff;
  }
  
  .step-content {
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 10px;
  }
  
  .error-message {
    color: red;
  }
  
  .button-group {
    display: flex;
    justify-content: flex-end;
  }
  
  .previous-button {
    margin-right: 10px;
  }
  
  .submit-button {
    background-color: #28a745;
    color: #fff;
  }
  