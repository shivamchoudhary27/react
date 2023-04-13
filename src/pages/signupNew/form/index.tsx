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

const initialValues = {
  username: "",
  lastname: "",
  firstname: "",
  email: "",
  password: "",
  city: "",
  country: "",
};

const SignupForm = () => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <h2 className="form-head">Registration</h2>
      <div className="title-head mb-2">Please let us know little bit about yourself!</div>
      <Container className="">
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          onSubmit={(values, action) => {
            console.log(values, action);
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
                  msgText="Username required atleast 1 character"
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
                <FieldTypeText name="password" placeholder="Password" />
                <FieldErrorMessage
                  errors={errors.password}
                  touched={touched.password}
                  msgText="Password required"
                />
              </div>

              <div className="mb-2">
                <FieldLabel
                  htmlfor="firstname"
                  labelText="Firstname"
                  required="required"
                  className="label-style"
                />
                <FieldTypeText name="firstname" placeholder="First Name" />
                <FieldErrorMessage
                  errors={errors.firstname}
                  touched={touched.firstname}
                  msgText="Firstname required atleast 1 character"
                />
              </div>

              <div className="mb-2">
                <FieldLabel
                  htmlfor="lastname"
                  labelText="Lastname"
                  required="required"
                  className="label-style"
                />
                <FieldTypeText name="lastname" placeholder="Last Name" />
                <FieldErrorMessage
                  errors={errors.lastname}
                  touched={touched.lastname}
                  msgText="Last name required atleast 1 character"
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
              <div className="form-link">
                Already a member? <Link to={"/"} className="redirect-link">Log in</Link>
              </div>
              <div className="text-center">
                <CustomButton
                  type="submit"
                  variant="warning"
                  // isSubmitting={isSubmitting}
                  btnText="Register"
                />{" "}
                {/* <CustomButton
                      type="reset"
                      btnText="Reset"
                      variant="secondary"
                    /> */}
              </div>
            </Form>
          )}
        </Formik>
        {/* <CustomButton
            type="button"
            btnText="Back"
            variant="outline-secondary"
            onClick={()=>navigate('/')}
          /> */}
      </Container>
    </React.Fragment>
  );
};

export default SignupForm;
