import React from 'react'
import Header from '../../header';
import Sidebar from '../../sidebar';
import { Container, Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import FieldLabel from '../../../widgets/form_input_fields/labels';
import FieldTypeText from '../../../widgets/form_input_fields/form_text_field';
import FieldErrorMessage from '../../../widgets/form_input_fields/error_message';
import CustomButton from '../../../widgets/form_input_fields/buttons';
import FieldTypeSelect from '../../../widgets/form_input_fields/form_select_field';
import { useNavigate } from 'react-router-dom';

const initValues = {
    name: "",
    email: "",
    roleNo:"",
    role:""
  };

  const roleData = [
    {id:1, name: "option 1"},
    {id:2, name: "option 2"},
    {id:3, name: "option 3"},
  ]

const AddUsers = () => {
    const navigate = useNavigate();
  return (
    <>
        <Header
        pageHeading="Add Users"
        welcomeIcon={false}
      />
      <div className="main-content-container">
        <Sidebar />
        <div
          className="content-area content-area-slider"
          id="contentareaslider"
        >
          <Container fluid className="administration-wrapper">
            <Button
              variant="outline-secondary"
              onClick={() => navigate("/manageusers")}
            >
              Go back
            </Button>
            <hr />
            <Formik
              enableReinitialize={true}
              initialValues={initValues}
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
                      htmlfor="roleNo"
                      labelText="Role No"
                      required="required"
                      star="*"
                    />
                    <FieldTypeText name="roleNo" placeholder="Role No" />
                    <FieldErrorMessage
                      errors={errors.roleNo}
                      touched={touched.roleNo}
                      msgText="role no required"
                    />
                  </div>

                  <div className="mb-3">
                    <FieldLabel
                      htmlfor="role"
                      labelText="Role"
                      required="required"
                      star="*"
                    />
                    <FieldTypeSelect
                      name="role"
                      options={roleData}
                      setcurrentvalue={setValues}
                      currentformvalue={values}
                    />
                    <FieldErrorMessage
                      errors={errors.role}
                      touched={touched.role}
                      msgText="Please select Role"
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
  )
}

export default AddUsers