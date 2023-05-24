import React , {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { Formik, Form } from "formik";
import FieldLabel from "../../../widgets/formInputFields/labels";
import FieldTypeText from "../../../widgets/formInputFields/formTextField";
import FieldErrorMessage from "../../../widgets/formInputFields/errorMessage";
import { putData } from "../../../adapters/coreservices";
import * as Yup from "yup";

const initialValues = {
    newPassword: "",
    conformPassword: "",
};

const ResetPasswordForm = () => {
  const location = useLocation().search;
  const [requestToken, setRequestToken] = useState<string | null>(null);

  // Formik Yup validation === >>>
  const userFormSchema = Yup.object({
    newPassword: Yup.string().required(),
    conformPassword: Yup.string().required(),
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(location);
    setRequestToken(urlParams.get("token"));
  }, [location]);

  // handle Form CRUD operations === >>>
  const handleFormData = (values: any, { setSubmitting, resetForm }: any) => {
    // values.token = urlParams;
    let endPoint = `/user/resetPassword?token=${requestToken}`
    putData(endPoint, values)
    .then((res: any) => {
      console.log('resetpassowrd', res)
    })
    .catch((err: any) => {
      console.log('error', err);
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
                  htmlfor="newPassword"
                  labelText="New Password"
                  required="required"
                  className="form-label"
                />
                <FieldTypeText name="newPassword" placeholder="New Password" />
                <FieldErrorMessage
                  errors={errors.newPassword}
                  touched={touched.newPassword}
                  msgText="Please enter a new password"
                />
              </div>              
              <div className="col-12 mb-4 text-start">
                <FieldLabel
                  htmlfor="conformPassword"
                  labelText="Confirm Password"
                  required="required"
                  className="form-label"
                />
                <FieldTypeText name="conformPassword" placeholder="Confirm Password" />
                <FieldErrorMessage
                  errors={errors.conformPassword}
                  touched={touched.conformPassword}
                  msgText="Please re-enter your new password"
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

export default ResetPasswordForm;
