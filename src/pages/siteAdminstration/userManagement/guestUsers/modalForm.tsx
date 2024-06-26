import * as Yup from "yup";
import Swal from "sweetalert2";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "sweetalert2/src/sweetalert2.scss";
import { Formik, Form } from "formik";
import { putData } from "../../../../adapters/coreservices";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import { LoadingButton } from "../../../../widgets/formInputFields/buttons";
import WaveBottom from "../../../../assets/images/background/bg-modal.svg";
import { useSelector } from "react-redux";

const UpdateUserModal = ({
  show,
  onHide,
  guestUserObj,
  togglemodalshow,
  updateAddRefresh,
  setGuestUserObj,
}: any) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });

  const currentInstitute = useSelector(
    (state: any) => state.globalFilters.currentInstitute
  );

  const initialValues = {
    firstName: guestUserObj.firstName,
    lastName: guestUserObj.lastName,
    email: guestUserObj.email,
    country: guestUserObj.country,
    instituteIds: guestUserObj.instituteIds,
    // shouldValidatePassword: userobj.id > 0 ? false : true,
  };

  // Formik Yup validation === >>>
  const userFormSchema = Yup.object({
    userEmail: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    userFirstName: Yup.string()
      .min(3, "First name must be at least 1 characters")
      .test(
        "character-allowed",
        "Only specific characters are allowed",
        function (value) {
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
        function (value) {
          return /^[A-Za-z]+$/.test(value);
        }
      )
      .trim()
      .required("Last name is required"),
    userCountry: Yup.string().required("Country is required"),
  });

  // handle Form CRUD operations === >>>
  const handleFormData = (values: any, { setSubmitting }: any) => {
    let instituteList: number[] = [];
    if (values.instituteIds !== undefined) {
      instituteList = Object.entries(values.instituteIds)
        .filter(([key, value]) => value === true)
        .map(([key, value]) => parseInt(key, 10));
      values = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        country: values.country,
        enabled: values.enabled,
        instituteIds: instituteList,
      };
    } else {
      values = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        country: values.country,
        enabled: values.enabled,
        instituteIds: [],
      };
    }

    setSubmitting(true);
    if (guestUserObj.id !== 0) {
      putData(`${currentInstitute}/guest-users/${guestUserObj.id}`, values)
        .then((res: any) => {
          if (res.data !== "" && res.status === 200) {
            togglemodalshow(false);
            updateAddRefresh();
            setSubmitting(false);
            Swal.fire({
              timer: 3000,
              width: "25em",
              color: "#666",
              icon: "success",
              background: "#e7eef5",
              showConfirmButton: false,
              text: "User has been successfully confirmed",
            });
          }
        })
        .catch((err: any) => {
          console.log(err);
          setSubmitting(false);
          setShowAlert(true);
          setAlertMsg({
            message: `${err.response.data.message}`,
            alertBoxColor: "danger",
          });
        });
    }
  };

  const handleCheckboxChange = (id: any) => {
    // Check if the ID is already selected
    const isChecked = guestUserObj.instituteIds.includes(id);

    // If the ID is already selected, remove it from the selected list
    // If not, add it to the selected list
    if (isChecked) {
      setGuestUserObj((prevState: { instituteIds: any[] }) => ({
        ...prevState,
        instituteIds: prevState.instituteIds.filter(
          (itemId: any) => itemId !== id
        ),
      }));
    } else {
      setGuestUserObj((prevState: { instituteIds: any }) => ({
        ...prevState,
        instituteIds: [...prevState.instituteIds, id],
      }));
    }
  };

  return (
    <React.Fragment>
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal-design-wrapper"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Confirm Guest User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <TimerAlertBox
            className="mt-3"
            showAlert={showAlert}
            alertMsg={alertMsg.message}
            variant={alertMsg.alertBoxColor}
            setShowAlert={setShowAlert}
          /> */}
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            // validationSchema={userFormSchema}
            onSubmit={(values, action) => {
              handleFormData(values, action);
            }}
          >
            {({ isSubmitting, setValues, }) => (
              <Form>
                {/* <div className="mb-3">
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
                    msgText="First Name is required"
                  />
                </div> */}

                {/* <div className="mb-3">
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
                    msgText="Last Name is required"
                  />
                </div> */}

                {/* <div className="mb-3">
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
                </div> */}

                {/* <div className="mb-3">
                  <FieldLabel
                    htmlfor="institute"
                    labelText="Institute"
                    required="required"
                    star="*"
                  /> */}
                {/* {instituteList.map((item: any, index: number) => (
                    <div key={index}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name={`instituteIds[${
                          item.id !== undefined && item.id
                        }]`}
                        checked={guestUserObj.instituteIds.includes(item.id)}
                        onChange={() => handleCheckboxChange(item.id)}
                        disabled
                      />
                      <label style={{ color: "gray" }}>{item.name}</label>
                    </div>
                  ))} */}

                {/* <Alert variant="primary" className="mt-3">
                    <strong>Note: </strong> Are you sure, you want to confirm
                    user{" "}
                    <strong>
                      {guestUserObj.firstName} {guestUserObj.lastName},{" "}
                      {guestUserObj.email}
                    </strong>{" "}
                    for institute confirmation and allotment .
                  </Alert>

                  <FieldErrorMessage
                    errors=""
                    touched=""
                    msgText="Please Check required field"
                  />
                </div> */}
                {/* <div className="mb-3">
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
                    selectDefaultLabel={"Country"}
                  />
                  <FieldErrorMessage
                    errors={errors.country}
                    touched={touched.country}
                    msgText="Please select country"
                  />
                </div> */}

                {/* <div className="mb-3">
                  <FieldTypeCheckbox name="enabled" checkboxLabel="Enable" />{" "}
                  <FieldErrorMessage
                    errors=""
                    touched=""
                    msgText="Please Check required field"
                  />
                </div> */}

                <div className="text-center">
                  Are you sure, you want to confirm user{" "}
                  <strong>
                    {guestUserObj.firstName} {guestUserObj.lastName},{" "}
                    {guestUserObj.email}
                  </strong>{" "}
                  for institute confirmation and allotment.
                </div>

                {isSubmitting === false ? (
                  <div className="modal-buttons">
                    <CustomButton
                      type="submit"
                      variant="primary"
                      disabled={isSubmitting}
                      btnText="Confirm"
                    />{" "}
                    {guestUserObj.id === 0 && (
                      <CustomButton
                        type="reset"
                        btnText="Reset"
                        variant="outline-secondary"
                        onClick={() => setShowAlert(false)}
                      />
                    )}
                  </div>
                ) : (
                  <LoadingButton
                    variant="primary"
                    btnText="Confirming ..."
                    className="modal-buttons"
                  />
                )}
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <img src={WaveBottom} alt="WaveBottom" className="wavebg" />
      </Modal>
    </React.Fragment>
  );
};

export default UpdateUserModal;
