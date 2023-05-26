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
    confirmPassword: "",
};

const ResetPasswordForm = () => {
  const location = useLocation().search;
  const [requestToken, setRequestToken] = useState<string | null>(null);

  // Formik Yup validation === >>>
  const userFormSchema = Yup.object({
    newPassword: Yup.string().required(),
    confirmPassword: Yup.string()
    .required()
    .test('passwords-match', 'Passwords must match', function (value) {
      return value === this.parent.newPassword;
    }),
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
      if (res.status === 200) {
        window.alert(res.data);
      } else {
        window.alert('Some error occurred');
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
                  htmlfor="newPassword"
                  labelText="New Password"
                  required="required"
                  className="form-label"
                />
                <FieldTypeText type="password" name="newPassword" placeholder="New Password" />
                <FieldErrorMessage
                  errors={errors.newPassword}
                  touched={touched.newPassword}
                  msgText="Please enter a new password"
                />
              </div>              
              <div className="col-12 mb-4 text-start">
                <FieldLabel
                  htmlfor="confirmPassword"
                  labelText="Confirm Password"
                  required="required"
                  className="form-label"
                />
                <FieldTypeText type="password" name="confirmPassword" placeholder="Confirm Password" />
                <FieldErrorMessage
                  errors={errors.confirmPassword}
                  touched={touched.confirmPassword}
                  msgText="Please re-enter password that must match new password"
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
