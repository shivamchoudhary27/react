import React from "react";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { Formik, Form } from "formik";
import FieldLabel from "../../../widgets/form_input_fields/labels";
import FieldTypeText from "../../../widgets/form_input_fields/form_text_field";
import FieldErrorMessage from "../../../widgets/form_input_fields/error_message";
import FieldTypeSelect from "../../../widgets/form_input_fields/form_select_field";
import { CountryList } from "../data";
import { useNavigate, Link } from "react-router-dom";
import { postData } from "../../../adapters/coreservices";
import * as Yup from "yup";

const initialValues = {
  username: "",
  lastName: "",
  firstName: "",
  email: "",
  password: "",
  country: "",
};

const SignupForm = () => {
  const navigate = useNavigate();

  // Formik Yup validation === >>>
  const userFormSchema = Yup.object({
    username: Yup.string().trim().min(4).required(),
    password: Yup.string().min(5).trim().required(),
    email: Yup.string().email().required(),
    firstName: Yup.string().min(1).trim().required(),
    lastName: Yup.string().min(1).trim().required(),
    country: Yup.string().required(),
  });

  // handle Form CRUD operations === >>>
  const handleFormData = (values: any, { setSubmitting, resetForm }: any) => {
    values.idnumber = 98789871;
    postData('/user/signup', values)
    .then((res: any) => {
      console.log('res', res);
      if (res.status === 201 || res.status  === 200 ) {
        window.alert('Registration successful');
      } else {
        window.alert("Some error occurred")
      }
      navigate('/');
    })
    .catch((err: any) => {
      if (err.response.status === 404) {
        window.alert(err.response.data.message);
      } else {
        window.alert('Some error occurred');
      }
    });
  };

  return (
    <React.Fragment>
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={userFormSchema}
          onSubmit={(values, action) => {
            handleFormData(values, action)
          }}
        >
          {({ errors, touched, isSubmitting, setValues, values }) => (
            <Form className="row">
              <div className="col-lg-6 mb-3 text-start">
                <FieldLabel
                  htmlfor="username"
                  labelText="Username"
                  required="required"
                  className="form-label"
                />
                <FieldTypeText name="username" placeholder="Username" />
                <FieldErrorMessage
                  errors={errors.username}
                  touched={touched.username}
                  msgText="Required with minimum 4-20 characters."
                />
              </div>

              <div className="col-lg-6 mb-3 text-start">
                <FieldLabel
                  htmlfor="password"
                  labelText="Password"
                  required="required"
                  className="form-label"
                />
                <FieldTypeText type="password" name="password" placeholder="Password" />
                <FieldErrorMessage
                  errors={errors.password}
                  touched={touched.password}
                  msgText="Required with minimum 5 characters."
                />
              </div>

              <div className="col-lg-6 mb-3 text-start">
                <FieldLabel
                  htmlfor="firstName"
                  labelText="First name"
                  required="required"
                  className="form-label"
                />
                <FieldTypeText name="firstName" placeholder="First Name" />
                <FieldErrorMessage
                  errors={errors.firstName}
                  touched={touched.firstName}
                  msgText="Required."
                />
              </div>

              <div className="col-lg-6 mb-3 text-start">
                <FieldLabel
                  htmlfor="lastName"
                  labelText="Last name"
                  required="required"
                  className="form-label"
                />
                <FieldTypeText name="lastName" placeholder="Last Name" />
                <FieldErrorMessage
                  errors={errors.lastName}
                  touched={touched.lastName}
                  msgText="Required."
                />
              </div>

              <div className="col-lg-6 mb-4 text-start">
                <FieldLabel
                  htmlfor="email"
                  labelText="Email"
                  required="required"
                  className="form-label"
                />
                <FieldTypeText name="email" placeholder="Email" />
                <FieldErrorMessage
                  errors={errors.email}
                  touched={touched.email}
                  msgText="Required."
                />
              </div>

              <div className="col-lg-6 mb-4 text-start">
                <FieldLabel
                  htmlfor="country"
                  labelText="Country"
                  required="required"
                  className="form-label"
                />
                <FieldTypeSelect
                  name="country"
                  options={CountryList}
                  setcurrentvalue={setValues}
                  currentformvalue={values}
                />
                <FieldErrorMessage
                  errors={errors.country}
                  touched={touched.country}
                  msgText="Required please select country."
                />
              </div>              
              <div className="col-12 mb-4 d-grid">
                <Button
                  type="submit"
                  variant="primary"
                >
                  Sign up
                </Button>
                {" "}
              </div>
            </Form>            
          )}
        </Formik>
    </React.Fragment>
  );
};

export default SignupForm;
