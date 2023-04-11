import React from "react";
import { Formik, Form } from "formik";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../../../header";
import Sidebar from "../../../sidebar";
import FieldLabel from "../../../../widgets/form_input_fields/labels";
import FieldTypeText from "../../../../widgets/form_input_fields/form_text_field";
import FieldErrorMessage from "../../../../widgets/form_input_fields/error_message";
import FieldTypeSelect from "../../../../widgets/form_input_fields/form_select_field";
import CustomButton from "../../../../widgets/form_input_fields/buttons";
import { CountryList } from "../countryDataList";

const initialValues = {
  name: "",
  email: "",
  password: "",
  city: "",
  country: "",
};

const AddUsersForm = () => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Header pageHeading="Add Users" welcomeIcon={false} />
      <div className="main-content-container">
        <Sidebar />
        <div
          className="content-area content-area-slider"
          id="contentareaslider"
        >
          <Container fluid className="administration-wrapper">
            <Button
              variant="outline-secondary"
              onClick={() => navigate("/usermanagement/")}
            >
              Go back
            </Button>
            <hr />
            <Formik
              enableReinitialize={true}
              initialValues={initialValues}
              onSubmit={(values, action) => {
                console.log(values, action);
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
                      htmlfor="email"
                      labelText="Email"
                      required="required"
                      star="*"
                    />
                    <FieldTypeText name="email" placeholder="Email" />
                    <FieldErrorMessage
                      errors={errors.email}
                      touched={touched.email}
                      msgText="Email required"
                    />
                  </div>

                  <div className="mb-3">
                    <FieldLabel
                      htmlfor="password"
                      labelText="Password"
                      required="required"
                      star="*"
                    />
                    <FieldTypeText name="password" placeholder="Password" />
                    <FieldErrorMessage
                      errors={errors.password}
                      touched={touched.password}
                      msgText="Password required"
                    />
                  </div>

                  <div className="mb-3">
                    <FieldLabel
                      htmlfor="city"
                      labelText="City"
                      required="required"
                      star="*"
                    />
                    <FieldTypeText name="city" placeholder="City" />
                    <FieldErrorMessage
                      errors={errors.city}
                      touched={touched.city}
                      msgText="City required"
                    />
                  </div>

                  <div className="mb-3">
                    <FieldLabel
                      htmlfor="country"
                      labelText="Country"
                      required="required"
                      star="*"
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
    </React.Fragment>
  );
};

export default AddUsersForm;
