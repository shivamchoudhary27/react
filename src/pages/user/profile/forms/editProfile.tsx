import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Header from "../../../newHeader";
import Footer from "../../../newFooter";
import HeaderTabs from "../../../headerTabs";
import { useNavigate } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import CountryList from "../../../../globals/country";
import PageTitle from "../../../../widgets/pageTitle";
import { postData } from "../../../../adapters/coreservices";
import BreadcrumbComponent from "../../../../widgets/breadcrumb";
import FieldLabel from "../../../../widgets/formInputFields/labels";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import { LoadingButton } from "../../../../widgets/formInputFields/buttons";
import FieldTypeText from "../../../../widgets/formInputFields/formTextField";
import FieldErrorMessage from "../../../../widgets/formInputFields/errorMessage";
import FieldTypeSelect from "../../../../widgets/formInputFields/formSelectField";

type Props = {};

const initialValues = {
  mobile: "",
  userEmail: "",
  parentsId: "",
  bloodGroup: "",
  fatherName: "",
  motherName: "",
  userCountry: "",
  userLastName: "",
  userFirstName: "",
  parentsMobile: "",
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
});

const EditProfile = (props: Props) => {
  const navigate = useNavigate();

  // handle Form CRUD operations === >>>
  const handleFormData = (values: {}, { setSubmitting, resetForm }: any) => {
    setSubmitting(true);
    postData(`/user/profile`, values)
      .then((res: any) => {
        if (res.status === 200) {
          // togglemodalshow(false);
          // updateAddRefresh();
          setSubmitting(false);
          resetForm();
          navigate("/profile");
        }
      })
      .catch((err: any) => {
        console.log(err);
        if (err.response.status === 404) {
          // setSubmitting(false);
          // setShowAlert(true);
          // setAlertMsg({
          //     message: `${err.response.data.message}`,
          //     alertBoxColor: "danger",
          // });
        }
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
          <PageTitle pageTitle="Edit Profile" gobacklink="/profile" />
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
                  <Col md={6}>
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

                  <Col md={6}>
                    <FieldLabel htmlfor="userLastName" labelText="Last Name" star="*" />
                    <FieldTypeText
                      name="userLastName"
                      placeholder="Last Name"
                    />
                    <FieldErrorMessage
                      errors={errors.userLastName}
                      touched={touched.userLastName}
                    />
                  </Col>

                  <Col md={6}>
                    <FieldLabel htmlfor="userEmail" labelText="Email" star="*" />
                    <FieldTypeText name="userEmail" placeholder="Email" />
                    <FieldErrorMessage
                      errors={errors.userEmail}
                      touched={touched.userEmail}
                    />
                  </Col>

                  <Col md={6}>
                    <FieldLabel htmlfor="mobile" labelText="Mobile" />
                    <FieldTypeText name="mobile" placeholder="Mobile" />
                    <FieldErrorMessage
                      errors={errors.mobile}
                      touched={touched.mobile}
                    />
                  </Col>

                  <Col md={6}>
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
                      msgText="Please select country"
                    />
                  </Col>

                  <Col md={6}>
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

                  <Col md={6}>
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

                  <Col md={6}>
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

                  <Col md={6}>
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

                  <Col md={6}>
                    <FieldLabel
                      htmlfor="parentsId"
                      labelText="Parents Email Id"
                    />
                    <FieldTypeText
                      name="parentsId"
                      placeholder="Parents Email Id"
                    />
                    <FieldErrorMessage
                      errors={errors.parentsId}
                      touched={touched.parentsId}
                    />
                  </Col>
                </Row>
                {isSubmitting === false ? (
                  <div className="modal-buttons">
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

export default EditProfile;
