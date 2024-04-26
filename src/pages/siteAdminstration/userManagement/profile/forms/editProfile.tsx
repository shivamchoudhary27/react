import * as Yup from "yup";
import { Formik, Form } from "formik";
import React, { useState, useEffect } from "react";
import {useNavigate, useParams } from "react-router-dom";
import Header from "../../../../newHeader";
import Footer from "../../../../newFooter";
import { useSelector } from "react-redux";
import HeaderTabs from "../../../../headerTabs";
import { Row, Col, Container } from "react-bootstrap";
import CountryList from "../../../../../globals/country";
import timeZone from "../../../../../globals/timeZone/timeZone";
import PageTitle from "../../../../../widgets/pageTitle";
import TimerAlertBox from "../../../../../widgets/alert/timerAlert";
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";
import FieldLabel from "../../../../../widgets/formInputFields/labels";
import CustomButton from "../../../../../widgets/formInputFields/buttons";
import { LoadingButton } from "../../../../../widgets/formInputFields/buttons";
import FieldTypeText from "../../../../../widgets/formInputFields/formTextField";
import FieldErrorMessage from "../../../../../widgets/formInputFields/errorMessage";
import FieldTypeSelect from "../../../../../widgets/formInputFields/formSelectField";
import { pagination } from "../../../../../utils/pagination";
import { getData, putData } from "../../../../../adapters/coreservices";

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
  timezone: Yup.string().required("Time Zone is required"),
  // mobile: Yup.number().required('Mobile nuber is required'),
});

const EditUserProfile = () => {
  const navigate = useNavigate();
  const { userid } = useParams();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });
  const currentInstitute = useSelector(
    (state: any) => state.globalFilters.currentInstitute
  );
  const [filterUpdate, setFilterUpdate] = useState({
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
    userId: userid,
  });
  
  const initialFormValues = {
    mobile: "",
    userEmail: "",
    genderType: "",
    bloodGroup: "",
    fatherName: "",
    motherName: "",
    dateOfBirth: "",
    parentEmail: "",
    userCountry: "",
    userLastName: "",
    parentsMobile: "",
    userFirstName: "",
    timezone:"Asia/Kolkata",
  };
  const [initialValues, setInitialvalues] = useState(initialFormValues);

  useEffect(() => {
    if (currentInstitute > 0) {
      getData(`/${currentInstitute}/users`, filterUpdate)
        .then((result: any) => {
          if (result.data !== "" && result.status === 200) {
            setInitialvalues(result.data.items[0]);
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }, [currentInstitute]);

  // handle Form CRUD operations === >>>
  const handleFormData = (values: {}, { setSubmitting, resetForm }: any) => {
    setSubmitting(true);
    putData(`/${currentInstitute}/users/${userid}`, values)
    .then((res: any) => {
      if ((res.data !== "", res.status === 200)) {
          setSubmitting(false);
          resetForm();
          navigate(`/userprofile/${userid}`);
      }
    })
    .catch((err: any) => {
        console.log(err.response.data.message);
        if (err.response.status === 400) {
          setSubmitting(false);
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
      <Header />
      <HeaderTabs />
      <BreadcrumbComponent
        routes={[
          { name: "User Profile", path: "/profile" },
          { name: "Edit Profile", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3 mb-3">
        <Container fluid>
          <PageTitle pageTitle="Edit Profile" gobacklink={`/userprofile/${userid}`} />
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

                  <Col sm={6} lg={4}>
                    <FieldLabel htmlfor="bloodGroup" labelText="Blood Group" />
                    <FieldTypeText
                      name="bloodGroup"
                      placeholder="Blood Group"
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
                      labelText="Mother's Name123"
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
      <Footer />
    </React.Fragment>
  );
};

export default EditUserProfile;
