import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import { Formik, Form } from "formik";
import FieldLabel from "../../widgets/formInputFields/labels";
import FieldTypeText from "../../widgets/formInputFields/formTextField";
import FieldErrorMessage from "../../widgets/formInputFields/errorMessage";
// import { useNavigate } from "react-router-dom";
import { postData } from "../../adapters/coreservices";
import * as Yup from "yup";
import Errordiv from "../../widgets/alert/errordiv";

const initialValues = {
  email: "",
};

// Formik Yup validation === >>>
const userFormSchema = Yup.object({
  email: Yup.string().email().required(),
});

const ForgotPasswordForm = () => {
  const [alertStatus, setAlertStatus] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });
  

  // handle Form CRUD operations === >>>
  const handleFormData = (values: any, { setSubmitting, resetForm }: any) => {
    postData('/user/forgotPassword', values)
    .then((res: any) => {
      console.log('forgotpassowrd', res)
      if (res.status === 200) {
        setAlertStatus(true)
        setAlertMsg({
          message: "Success! Please check your email and follow the instructions to complete the password reset process.",
          alertBoxColor: ""
        })
      } else {
        setAlertStatus(true)
        setAlertMsg({
          message: "Error! Unable to process the forgot password request. Please try again later.",
          alertBoxColor: "alert-danger"
        })
      }
    })
    .catch((err: any) => {
      setAlertStatus(true)
        setAlertMsg({
          message: "Error! Unable to process the forgot password request. Please try again later.",
          alertBoxColor: "alert-danger"
        })
    });
  };

  return (
    <React.Fragment>
      {alertStatus === true && (
        <Errordiv
          msg={alertMsg.message}
          cstate
          className="mt-3"
          alertColor={alertMsg.alertBoxColor}
        />
      )}
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
