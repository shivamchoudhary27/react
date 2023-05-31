import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, ErrorMessage } from "formik";
import FieldLabel from "../../../widgets/formInputFields/labels";
import FieldTypeText from "../../../widgets/formInputFields/formTextField";
import FieldErrorMessage from "../../../widgets/formInputFields/errorMessage";
import FieldTypeSelect from "../../../widgets/formInputFields/formSelectField";
import CustomButton from "../../../widgets/formInputFields/buttons";
import { CountryList } from "./countryDataList";
import * as Yup from "yup";
import { postData, putData } from "../../../adapters/coreservices";
// import FieldTypeCheckbox from "../../../widgets/formInputFields/formCheckboxField";

const AddUserModal = ({
  show,
  onHide,
  userobj,
  togglemodalshow,
  updateAddRefresh
}: any) => {
  const initialValues = {
    username: userobj.username,
    lastName: userobj.lastname,
    firstName: userobj.firstname,
    email: userobj.email,
    password: userobj.password,
    country: userobj.country,
    shouldValidatePassword: (userobj.id > 0) ? false : true
  };

  // Formik Yup validation === >>>
  const userFormSchema = Yup.object({
    username: Yup.string().trim().min(4).required(),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().when('shouldValidatePassword', {
      is: true,
      then: Yup.string().min(6).trim().required(),
      otherwise: Yup.string().trim()
    }),
    firstName: Yup.string().min(1).trim().required(),
    lastName: Yup.string().min(1).trim().required(),
  });

  // handle Form CRUD operations === >>>
  const handleFormData = (values: {}, { setSubmitting, resetForm }: any) => {
    console.log(values);
    if (userobj.id === 0) {
      postData("/user/", values)
        .then((res: any) => {
          if ((res.data !== "", res.status === 201)) {
            togglemodalshow(false);
            updateAddRefresh();
            setSubmitting(false);
            resetForm();
          }
        })
        .catch((err: any) => {
          if (err.response.status === 404) {
            window.alert(err.response.data.message);
          }
        });
    } else {
      putData(`/user/${userobj.id}`, values)
        .then((res: any) => {
          if ((res.data !== "", res.status === 200)) {
            togglemodalshow(false);
            updateAddRefresh();
            setSubmitting(false);
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  };

  return (
    <React.Fragment>
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {userobj.id === 0 ? "Add User" : "Update User"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={userFormSchema}
            onSubmit={(values, action) => {
              handleFormData(values, action);
              console.log(values);
            }}
          >
            {({ errors, touched, isSubmitting, setValues, values }) => (
              <Form>
                {userobj.id === 0 &&
                  <React.Fragment>
                    <div className="mb-3">
                      <FieldLabel
                        htmlfor="username"
                        labelText="Username"
                        required="required"
                        star="*"
                      />
                      <FieldTypeText name="username" placeholder="Username" />
                      <FieldErrorMessage
                        errors={errors.username}
                        touched={touched.username}
                        msgText="Username is required with 4 characters minimum"
                      />
                    </div>
                    <div className="mb-3">                  
                      <FieldLabel
                        htmlfor="password"
                        labelText="Password"
                        required="required"
                        star="*"
                      />
                      <FieldTypeText
                        type="password"
                        name="password"
                        placeholder="Password"
                      />
                      <FieldErrorMessage
                        errors={errors.password}
                        touched={touched.password}
                        msgText="Password is required with 6 characters minimum"
                      />
                    </div>
                  </React.Fragment>
                }

                <div className="mb-3">
                  <FieldLabel
                    htmlfor="firstName"
                    labelText="First Name"
                    required="required"
                    star="*"
                  />
                  <FieldTypeText name="firstName" placeholder="First Name" />
                  <FieldErrorMessage
                    errors={errors.firstName}
                    touched={touched.firstName}
                    msgText="Firstname is required"
                  />
                </div>

                <div className="mb-3">
                  <FieldLabel
                    htmlfor="lastName"
                    labelText="Last Name"
                    required="required"
                    star="*"
                  />
                  <FieldTypeText name="lastName" placeholder="Last Name" />
                  <FieldErrorMessage
                    errors={errors.lastName}
                    touched={touched.lastName}
                    msgText="Lastname is required"
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
                    msgText="Email is required"
                  />
                </div>

                {/* <div className="mb-3">
                    <FieldLabel
                      htmlfor="idnumber"
                      labelText="Idnumber"
                      required="required"
                    />
                    <FieldTypeText type="number" name="idnumber" placeholder="Id number" />
                    <FieldErrorMessage
                      errors={errors.idnumber}
                      touched={touched.idnumber}
                      msgText="Idnumber is required with minimun 4 and maximum 9 digits"
                    />
                  </div> */}

                {/* <div className="mb-3">
                    <FieldLabel
                      htmlfor="city"
                      labelText="City"
                      required="required"
                    />
                    <FieldTypeText name="city" placeholder="City" />
                    <FieldErrorMessage
                      errors={errors.city}
                      touched={touched.city}
                      msgText="City is required"
                    />
                  </div> */}

                <div className="mb-3">
                  <FieldLabel
                    htmlfor="country"
                    labelText="Country"
                    required="required"
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
                    msgText="Please select country"
                  />
                </div>

                <div className="modal-buttons">
                  <CustomButton
                    type="submit"
                    variant="primary"
                    // isSubmitting={isSubmitting}
                    btnText={userobj.id === 0 ? "Save" : "Update"}
                  />{" "}
                  {userobj.id === 0 && (
                    <CustomButton
                      type="reset"
                      btnText="Reset"
                      variant="outline-secondary"
                    />
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default AddUserModal;
