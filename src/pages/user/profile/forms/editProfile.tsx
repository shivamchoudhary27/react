import * as Yup from "yup";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import Header from "../../../newHeader";
import Footer from "../../../newFooter";
import { useSelector } from "react-redux";
import HeaderTabs from "../../../headerTabs";
import { useNavigate } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import CountryList from "../../../../globals/country";
import timeZone from "../../../../globals/timeZone/timeZone";
import PageTitle from "../../../../widgets/pageTitle";
import { postData } from "../../../../adapters/coreservices";
import TimerAlertBox from "../../../../widgets/alert/timerAlert";
import BreadcrumbComponent from "../../../../widgets/breadcrumb";
import FieldLabel from "../../../../widgets/formInputFields/labels";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import { LoadingButton } from "../../../../widgets/formInputFields/buttons";
import FieldTypeText from "../../../../widgets/formInputFields/formTextField";
import FieldErrorMessage from "../../../../widgets/formInputFields/errorMessage";
import FieldTypeSelect from "../../../../widgets/formInputFields/formSelectField";
import { isMobile, isDesktop } from "react-device-detect";
import MobileHeader from "../../../newHeader/mobileHeader";
import MobileFooter from "../../../newFooter/mobileFooter";
import "sweetalert2/src/sweetalert2.scss";
import Swal from "sweetalert2";

type Props = {};

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
  timezone: Yup.string().required("Time Zone is required"),
  userCountry: Yup.string().required("Country is required"),

  mobile: Yup.string()
  .nullable()
  .matches(/^[0-9]+$/, "Only digits are allowed")
  .min(10, "Mobile number must be at least 10 digits")
  .max(15, "Mobile number must be at most 15 digits"),

  parentsMobile: Yup.string().nullable()
  .matches(/^[0-9]+$/, "Only digits are allowed")
  .min(10, "Mobile number must be at least 10 digits")
  .max(15, "Mobile number must be at most 15 digits"),

  fatherName: Yup.string()
  .nullable()
  .matches(/^[A-Za-z]*$/, "Only alphabetic characters are allowed")
  .trim(),

  motherName: Yup.string()
  .nullable()
  .matches(/^[A-Za-z]*$/, "Only alphabetic characters are allowed")
  .trim(),

  parentEmail: Yup.string().nullable().email("Invalid email").required("Email is required"),
});

const bloodGroupOptions = [
  { id: "A+", name: "A+" },
  { id: "A-", name: "A-" },
  { id: "B+", name: "B+" },
  { id: "B-", name: "B-" },
  { id: "AB+", name: "AB+" },
  { id: "AB-", name: "AB-" },
  { id: "O+", name: "O+" },
  { id: "O-", name: "O-" },
];

const EditProfile = (props: Props) => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });
  const userProfileInfo = useSelector(
    (state: any) => state.userProfile.userProfile
  );

  const initialValues = {
    mobile: userProfileInfo?.mobile,
    userEmail: userProfileInfo?.userEmail,
    genderType: userProfileInfo?.genderType,
    bloodGroup: userProfileInfo?.bloodGroup,
    fatherName: userProfileInfo?.fatherName,
    motherName: userProfileInfo?.motherName,
    dateOfBirth: userProfileInfo?.dateOfBirth,
    parentEmail: userProfileInfo?.parentEmail,
    userCountry: userProfileInfo?.userCountry,
    userLastName: userProfileInfo?.userLastName,
    parentsMobile: userProfileInfo?.parentsMobile,
    userFirstName: userProfileInfo?.userFirstName,
    timezone: userProfileInfo?.timezone || "Asia/Kolkata",
  };

  // console.log(userProfileInfo.userId)

  // handle Form CRUD operations === >>>
  const handleFormData = (values: {}, { setSubmitting, resetForm }: any) => {
    setSubmitting(true);
    postData(`/user/profile/${userProfileInfo.userId}`, values)
      .then((res: any) => {
        // if (res.status === 200) {
          // togglemodalshow(false);
          // updateAddRefresh();
          setSubmitting(false);
          Swal.fire({
            timer: 3000,
            width: "25em",
            color: "#666",
            icon: "success",
            background: "#e7eef5",
            showConfirmButton: false,
            text: "Profile has been successfully updated"
          });
          navigate("/profile");
        // }
      })
      .catch((err: any) => {  
        setSubmitting(false);
        if (err.response.status === 400) {
          setShowAlert(true);
          setAlertMsg({
            message: err.response.data.message,
            alertBoxColor: "danger",
          });
        }else{
          setAlertMsg({
          message: err.response.data.message,
          alertBoxColor: "danger",
        });}
      });
  };

  return (
    <React.Fragment>
      {isMobile ? (
        <MobileHeader />
      ) : isDesktop ? (
        <>
          <Header />
          <HeaderTabs />
        </>
      ) : (
        <>
          <Header />
          <HeaderTabs />
        </>
      )}
      <BreadcrumbComponent
        routes={[
          { name: "User Profile", path: "/profile" },
          { name: "Edit Profile", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mb-wraper">
        <div className="contentarea-wrapper mt-3 mb-3">
          <Container fluid>
            <PageTitle pageTitle="Edit Profile" gobacklink="/profile" />
            <TimerAlertBox
              className="mt-3"
              showAlert={showAlert}
              alertMsg={alertMsg.message}
              variant={alertMsg.alertBoxColor}
              setShowAlert={setShowAlert}
            />
            <Formik
              enableReinitialize={true}
              initialValues={initialValues}
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
                      <FieldTypeText
                        name="userFirstName"
                        placeholder="First Name"
                      />
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
                      <FieldTypeText
                        name="userLastName"
                        placeholder="Last Name"
                      />
                      <FieldErrorMessage
                        errors={errors.userLastName}
                        touched={touched.userLastName}
                      />
                    </Col>

                    <Col sm={6} lg={4}>
                      <FieldLabel
                        htmlfor="userEmail"
                        labelText="Email"
                        star="*"
                      />
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
                        // required="required"
                        // star="*"
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
                      {/* <FieldErrorMessage
                        errors={errors.genderType}
                        touched={touched.genderType}
                      /> */}
                    </Col>

                    <Col sm={6} lg={4}>
                      <FieldLabel
                        htmlfor="dateOfBirth"
                        labelText="Date of Birth"
                      />
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
                      <FieldLabel
                        htmlfor="timezone"
                        labelText="Time Zone"
                        required="required"
                        star="*"
                      />
                      <FieldTypeSelect
                        name="timezone"
                        options={timeZone}
                        setcurrentvalue={setValues}
                        currentformvalue={values}
                        selectDefaultLabel={"Time Zone"}
                      />
                      <FieldErrorMessage
                        errors={errors.timezone}
                        touched={touched.timezone}
                      />
                    </Col>

                    {/* <Col sm={6} lg={4}>
                      <FieldLabel
                        htmlfor="bloodGroup"
                        labelText="Blood Group"
                      />
                      <FieldTypeText
                        name="bloodGroup"
                        placeholder="Blood Group"
                      />
                      <FieldErrorMessage
                        errors={errors.bloodGroup}
                        touched={touched.bloodGroup}
                      />
                    </Col> */}
                      <Col sm={6} lg={4}>
                      <FieldLabel
                        htmlFor="bloodGroup"
                        labelText="Blood Group"
                      />
                      <FieldTypeSelect
                        name="bloodGroup"
                        options={bloodGroupOptions}
                        setcurrentvalue={setValues}
                        currentformvalue={values}
                        selectDefaultLabel={"Select Blood Group"}
                      />
                      <FieldErrorMessage
                        errors={errors.bloodGroup}
                        touched={touched.bloodGroup}
                      />
                    </Col>

                    <Col sm={6} lg={4}>
                      <FieldLabel
                        htmlfor="fatherName"
                        labelText="Father's Name"
                      />
                      <FieldTypeText
                        name="fatherName"
                        placeholder="Father's Name"
                      />
                      <FieldErrorMessage
                        errors={errors.fatherName}
                        touched={touched.fatherName}
                      />
                    </Col>

                    <Col sm={6} lg={4}>
                      <FieldLabel
                        htmlfor="motherName"
                        labelText="Mother's Name"
                      />
                      <FieldTypeText
                        name="motherName"
                        placeholder="Mother's Name"
                      />
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
          </Container>
        </div>
      </div>
      {isMobile ? <MobileFooter /> : isDesktop ? <Footer /> : <Footer />}
    </React.Fragment>
  );
};

export default EditProfile;
