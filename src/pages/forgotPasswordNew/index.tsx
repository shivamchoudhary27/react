import React from "react";
import Button from 'react-bootstrap/Button';
import { Formik, Form } from "formik";
import FieldLabel from "../../widgets/formInputFields/labels";
import FieldTypeText from "../../widgets/formInputFields/formTextField";
import FieldErrorMessage from "../../widgets/formInputFields/errorMessage";
// import { useNavigate } from "react-router-dom";
import { postData } from "../../adapters/coreservices";
import * as Yup from "yup";

const initialValues = {
  email: "",
};

const ForgotPasswordForm = () => {
  // Formik Yup validation === >>>
  const userFormSchema = Yup.object({
    email: Yup.string().email().required(),
  });

  // handle Form CRUD operations === >>>
  const handleFormData = (values: any, { setSubmitting, resetForm }: any) => {
    postData('/user/forgotPassword', values)
    .then((res: any) => {
      console.log('forgotpassowrd', res)
      if (res.status === 200) {
        window.alert('An email has been sent, Please check and follow the link');
      } else {
        window.alert('There was an error');
      }
    })
    .catch((err: any) => {
      console.log('error', err);
      window.alert('Some error occurred');
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
              <div className="col-12 mb-4 text-start">
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
                  msgText="Please provide your email"
                />
              </div>              
              <div className="col-12 mb-4 d-grid">
                <Button
                  type="submit"
                  variant="primary"
                >
                  Submit
                </Button>
                {" "}
              </div>
            </Form>            
          )}
        </Formik>
    </React.Fragment>
  );
};

export default ForgotPasswordForm;
