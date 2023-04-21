import React from "react";
import { Container } from "react-bootstrap";
import { Formik, Form } from "formik";
import FieldLabel from "../../../widgets/form_input_fields/labels";
import FieldTypeText from "../../../widgets/form_input_fields/form_text_field";
import FieldErrorMessage from "../../../widgets/form_input_fields/error_message";
import FieldTypeSelect from "../../../widgets/form_input_fields/form_select_field";
import CustomButton from "../../../widgets/form_input_fields/buttons";
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
  city: "",
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
    city: Yup.string().min(1).trim().required(),
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
      <Container className="">
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={userFormSchema}
          onSubmit={(values, action) => {
            handleFormData(values, action)
          }}
        >
          {({ errors, touched, isSubmitting, setValues, values }) => (
            <Form>
              <div className="mb-2">
                <FieldLabel
                  htmlfor="username"
                  labelText="Username"
                  required="required"
                  star="*"
                  className="label-style"
                />
                <FieldTypeText name="username" placeholder="Username" />
                <FieldErrorMessage
                  errors={errors.username}
                  touched={touched.username}
                  msgText="Username required with minimum 4 - 20 characters"
                />
              </div>

              <div className="mb-2">
                <FieldLabel
                  htmlfor="password"
                  labelText="Password"
                  required="required"
                  star="*"
                  className="label-style"
                />
                <FieldTypeText type="password" name="password" placeholder="Password" />
                <FieldErrorMessage
                  errors={errors.password}
                  touched={touched.password}
                  msgText="Password required with 5 minimum characters"
                />
              </div>

              <div className="mb-2">
                <FieldLabel
                  htmlfor="firstName"
                  labelText="firstName"
                  required="required"
                  className="label-style"
                />
                <FieldTypeText name="firstName" placeholder="First Name" />
                <FieldErrorMessage
                  errors={errors.firstName}
                  touched={touched.firstName}
                  msgText="firstName required"
                />
              </div>

              <div className="mb-2">
                <FieldLabel
                  htmlfor="lastName"
                  labelText="lastName"
                  required="required"
                  className="label-style"
                />
                <FieldTypeText name="lastName" placeholder="Last Name" />
                <FieldErrorMessage
                  errors={errors.lastName}
                  touched={touched.lastName}
                  msgText="Last name required"
                />
              </div>

              <div className="mb-2">
                <FieldLabel
                  htmlfor="email"
                  labelText="Email"
                  required="required"
                  className="label-style"
                />
                <FieldTypeText name="email" placeholder="Email" />
                <FieldErrorMessage
                  errors={errors.email}
                  touched={touched.email}
                  msgText="Email required"
                />
              </div>

              <div className="mb-2">
                <FieldLabel
                  htmlfor="city"
                  labelText="City"
                  required="required"
                  className="label-style"
                />
                <FieldTypeText name="city" placeholder="City" />
                <FieldErrorMessage
                  errors={errors.city}
                  touched={touched.city}
                  msgText="City required"
                />
              </div>

              <div className="mb-2">
                <FieldLabel
                  htmlfor="country"
                  labelText="Country"
                  required="required"
                  className="label-style"
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
                  msgText="Please select Country"
                />
              </div>              
              <div className="text-center">
                <CustomButton
                  type="submit"
                  variant="warning"
                  btnText="Sign up"
                />{" "}
              </div>
              <div className="form-link mt-3">
                Already a member? <Link to={"/"} className="redirect-link">Sign in</Link>
              </div>
            </Form>            
          )}
        </Formik>
      </Container>
    </React.Fragment>
  );
};

export default SignupForm;
