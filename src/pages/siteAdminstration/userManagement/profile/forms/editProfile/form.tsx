import * as Yup from "yup";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import CountryList from "../../../../../../globals/country";
import { postData } from "../../../../../../adapters/coreservices";
import TimerAlertBox from "../../../../../../widgets/alert/timerAlert";
import FieldLabel from "../../../../../../widgets/formInputFields/labels";
import CustomButton from "../../../../../../widgets/formInputFields/buttons";
import { LoadingButton } from "../../../../../../widgets/formInputFields/buttons";
import FieldTypeText from "../../../../../../widgets/formInputFields/formTextField";
import FieldErrorMessage from "../../../../../../widgets/formInputFields/errorMessage";
import FieldTypeSelect from "../../../../../../widgets/formInputFields/formSelectField";

type Props = {
  currentInstitute: any;
  initialValues: any;
};
// Formik Yup validation === >>>
const userFormSchema = Yup.object({
  userEmail: Yup.string().email("Invalid email").required("Email is required"),
  userFirstName: Yup.string()
    .min(3, "First name must be at least 1 characters")
    .test(
      "character-allowed",
      "Only specific characters are allowed",
      function (value: any) {
        return /^[A-Za-z]+$/.test(value);
      }
    )
    .trim()
    .required("First name is required"),
  userLastName: Yup.string()
    .min(1, "Last name must be at least 1 characters")
    .test(
      "character-allowed",
      "Only specific characters are allowed",
      function (value: any) {
        return /^[A-Za-z]+$/.test(value);
      }
    )
    .trim()
    .required("Last name is required"),
  userCountry: Yup.string().required("Country is required"),
  // genderType: Yup.string().required("Gender is required"),
  // mobile: Yup.number().required('Mobile nuber is required'),
});

const FormData = (props: Props) => {
  const navigate = useNavigate();
  const { userid } = useParams();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });

  // handle Form CRUD operations === >>>
  const handleFormData = (values: {}, { setSubmitting, resetForm }: any) => {
    setSubmitting(true);
    postData(`/user/profile/${userid}`, values)
      .then((res: any) => {
        if ((res.data !== "", res.status === 200)) {
          console.log(res.data)
          setSubmitting(false);
          resetForm();
          //   props.updateAddRefresh();
          navigate(`/userprofile/${userid}`);
        }
      })
      .catch((err: any) => {
        console.log(err);
        setSubmitting(false);
        if (err.response.status === 400) {
          setShowAlert(true);
          setAlertMsg({
            message: "Failed update profile.",
            alertBoxColor: "danger",
          });
        }
      });
  };

  return (
    <React.Fragment>
      <TimerAlertBox
        className="mt-3"
        showAlert={showAlert}
        alertMsg={alertMsg.message}
        variant={alertMsg.alertBoxColor}
        setShowAlert={setShowAlert}
      />
      <Formik
        enableReinitialize={true}
        initialValues={props.initialValues}
        validationSchema={userFormSchema}
        onSubmit={(values, action) => {
          handleFormData(values, action);
        }}
      >
        {({ errors, touched, setValues, values, isSubmitting }) => (
          <Form>
            <Row className="gy-3">
              <Col sm={6} lg={4}>
                <FieldLabel
                  htmlfor="userFirstName"
                  labelText="First Name"
                  star="*"
                />
                <FieldTypeText name="userFirstName" placeholder="First Name" />
                <FieldErrorMessage
                  errors={errors.userFirstName}
                  touched={touched.userFirstName}
                />
              </Col>

              <Col sm={6} lg={4}>
                <FieldLabel
                  htmlfor="userLastName"
                  labelText="Last Name"
                  star="*"
                />
                <FieldTypeText name="userLastName" placeholder="Last Name" />
                <FieldErrorMessage
                  errors={errors.userLastName}
                  touched={touched.userLastName}
                />
              </Col>

              <Col sm={6} lg={4}>
                <FieldLabel htmlfor="userEmail" labelText="Email" star="*" />
                <FieldTypeText name="userEmail" placeholder="Email" />
                <FieldErrorMessage
                  errors={errors.userEmail}
                  touched={touched.userEmail}
                />
              </Col>

              <Col sm={6} lg={4}>
                <FieldLabel htmlfor="mobile" labelText="Mobile" />
                <FieldTypeText name="mobile" placeholder="Mobile" />
                <FieldErrorMessage
                  errors={errors.mobile}
                  touched={touched.mobile}
                />
              </Col>

              <Col sm={6} lg={4}>
                <FieldLabel
                  htmlfor="genderType"
                  labelText="Gender"
                  required="required"
                  star="*"
                />
                <FieldTypeSelect
                  name="genderType"
                  options={[
                    { id: "male", name: "Male" },
                    { id: "female", name: "Female" },
                    { id: "other", name: "Other" },
                  ]}
                  setcurrentvalue={setValues}
                  currentformvalue={values}
                  selectDefaultLabel={"Gender"}
                />
                <FieldErrorMessage
                  errors={errors.genderType}
                  touched={touched.genderType}
                />
              </Col>

              <Col sm={6} lg={4}>
                <FieldLabel htmlfor="dateOfBirth" labelText="Date of Birth" />
                <FieldTypeText
                  type="date"
                  name="dateOfBirth"
                  placeholder="Date of birth"
                />
                {/* <FieldErrorMessage
                      errors={errors.dateOfBirth}
                      touched={touched.dateOfBirth}
                    /> */}
              </Col>

              <Col sm={6} lg={4}>
                <FieldLabel
                  htmlfor="userCountry"
                  labelText="Country"
                  required="required"
                  star="*"
                />
                <FieldTypeSelect
                  name="userCountry"
                  options={CountryList}
                  setcurrentvalue={setValues}
                  currentformvalue={values}
                  selectDefaultLabel={"Country"}
                />
                <FieldErrorMessage
                  errors={errors.userCountry}
                  touched={touched.userCountry}
                />
              </Col>

              <Col sm={6} lg={4}>
                <FieldLabel htmlfor="bloodGroup" labelText="Blood Group" />
                <FieldTypeText name="bloodGroup" placeholder="Blood Group" />
                <FieldErrorMessage
                  errors={errors.bloodGroup}
                  touched={touched.bloodGroup}
                />
              </Col>

              <Col sm={6} lg={4}>
                <FieldLabel htmlfor="fatherName" labelText="Father's Name" />
                <FieldTypeText name="fatherName" placeholder="Father's Name" />
                <FieldErrorMessage
                  errors={errors.fatherName}
                  touched={touched.fatherName}
                />
              </Col>

              <Col sm={6} lg={4}>
                <FieldLabel htmlfor="motherName" labelText="Mother's Name" />
                <FieldTypeText name="motherName" placeholder="Mother's Name" />
                <FieldErrorMessage
                  errors={errors.motherName}
                  touched={touched.motherName}
                />
              </Col>

              <Col sm={6} lg={4}>
                <FieldLabel
                  htmlfor="parentsMobile"
                  labelText="Parents Mobile No"
                />
                <FieldTypeText
                  name="parentsMobile"
                  placeholder="Parents Mobile No"
                />
                <FieldErrorMessage
                  errors={errors.parentsMobile}
                  touched={touched.parentsMobile}
                />
              </Col>

              <Col sm={6} lg={4}>
                <FieldLabel
                  htmlfor="parentEmail"
                  labelText="Parents Email Id"
                />
                <FieldTypeText
                  name="parentEmail"
                  placeholder="Parents Email Id"
                />
                <FieldErrorMessage
                  errors={errors.parentEmail}
                  touched={touched.parentEmail}
                />
              </Col>
            </Row>
            {isSubmitting === false ? (
              <div className="modal-buttons my-3">
                <CustomButton
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  btnText="Update"
                />{" "}
              </div>
            ) : (
              <LoadingButton
                variant="primary"
                btnText="Updating..."
                className="modal-buttons"
              />
            )}
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default FormData;
