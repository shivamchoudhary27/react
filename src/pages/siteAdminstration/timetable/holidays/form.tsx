import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Formik, Form, Field } from "formik";
import TimerAlertBox from "../../../../widgets/alert/timerAlert";
import FieldLabel from "../../../../widgets/formInputFields/labels";
import { postData, putData } from "../../../../adapters/microservices";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import WaveBottom from "../../../../assets/images/background/bg-modal.svg";
import { LoadingButton } from "../../../../widgets/formInputFields/buttons";
import FieldTypeText from "../../../../widgets/formInputFields/formTextField";
import FieldErrorMessage from "../../../../widgets/formInputFields/errorMessage";
import FieldTypeSelect from "../../../../widgets/formInputFields/formSelectField";
import "sweetalert2/src/sweetalert2.scss";
import Swal from "sweetalert2";
// Formik Yup validation === >>>
const Schema = Yup.object({
  name: Yup.string().min(1).required(),
  holidayDate: Yup.date().required("Date is required field"),
  year: Yup.string().required(),
});

const HolidaysModal = ({
  show,
  onHide,
  holidaysObj,
  yearOptions,
  togglemodalshow,
  currentInstitute,
  getCurrentBatchYear,
  refreshHolidaysData,
}: any) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({
    message: "",
    alertBoxColor: "",
  });

  const [formValues, setFormValues] = useState({});
  
  useEffect(() => {    
    // Initial values of react table === >>>
    const initialValues = {
      name: holidaysObj.name,
      holidayDate: holidaysObj.holidayDate,
      year: holidaysObj.year //!== 0 ? holidaysObj.year : getCurrentBatchYear(),
    };
    setFormValues(initialValues);
  }, [holidaysObj]);

  // custom Obj & handle form data === >>>
  let formTitles = {
    titleHeading: "",
    btnTitle: "",
  };
  if (holidaysObj.id === 0) {
    formTitles = {
      titleHeading: "Add Holiday",
      btnTitle: "Submit",
    };
  } else {
    formTitles = {
      titleHeading: "Update Holiday",
      btnTitle: "Update",
    };
  }

  const resetFormData = () => {
    const resetValues = {
      name: "",
      holidayDate: "",
      year: holidaysObj.year //!== 0 ? holidaysObj.year : getCurrentBatchYear(),
    };
    setFormValues(resetValues);
  } 
  // handle Form CRUD operations === >>>
  const handleFormData = (values: any, { setSubmitting, resetForm }: any) => {
    let endPoint = `/${currentInstitute}/timetable/holiday`;
    if (holidaysObj.id === 0) {
      postData(endPoint, values)
        .then((res: any) => {
          if (res.data !== "") {
            togglemodalshow(false);
            setSubmitting(false);
            refreshHolidaysData();
            Swal.fire({
              timer: 3000,
              width: "25em",
              color: "#666",
              icon: "success",
              background: "#e7eef5",
              showConfirmButton: false,
              text: "Holiday has been successfully added"
            });
            resetForm();
          }
        })
        .catch((err: any) => {
          setSubmitting(false);
          setShowAlert(true);
          setAlertMsg({
            message: "Failed to add holiday! Please try again.",
            alertBoxColor: "danger",
          });
        });
    } else {
      endPoint += `/${holidaysObj.id}`;
      setSubmitting(true);
      putData(endPoint, values)
        .then((res: any) => {
          if (res.data !== "" && res.status === 200) {
            togglemodalshow(false);
            setSubmitting(false);
            refreshHolidaysData();
            Swal.fire({
              timer: 3000,
              width: "25em",
              color: "#666",
              icon: "success",
              background: "#e7eef5",
              showConfirmButton: false,
              text: "Holiday has been successfully updated"
            }); 
            resetForm();
          }
        })
        .catch((err: any) => {
          setSubmitting(false);
          setShowAlert(true);
          setAlertMsg({
            message: "Failed to update holiday! Please try again.",
            alertBoxColor: "danger",
          });
        });
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modal-design-wrapper"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {formTitles.titleHeading}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TimerAlertBox
          alertMsg={alertMsg.message}
          className="mt-3"
          variant={alertMsg.alertBoxColor}
          setShowAlert={setShowAlert}
          showAlert={showAlert}
        />
        <Formik
          enableReinitialize={true}
          initialValues={formValues}
          validationSchema={Schema}
          onSubmit={(values, action) => {
            handleFormData(values, action);
          }}
        >
          {({ errors, touched, isSubmitting, setValues, values }) => (
            <Form>
              <div className="mb-3">
                <FieldLabel
                  htmlfor="name"
                  labelText="Holiday Name"
                  required="required"
                  star="*"
                />
                <FieldTypeText name="name" placeholder="Name" />
                <FieldErrorMessage
                  errors={errors.name}
                  touched={touched.name}
                  msgText="Name required atleast 1 character"
                />
              </div>

              <div className="mb-3">
                <FieldLabel
                  htmlfor="holidayDate"
                  labelText="Date"
                  required="required"
                  star="*"
                />
                <FieldTypeText
                  type="date"
                  name="holidayDate"
                  placeholder="01/01/2023"
                />
                <FieldErrorMessage
                  errors={errors.holidayDate}
                  touched={touched.holidayDate}
                  msgText="Name required atleast 1 character"
                />
              </div>

              <div className="mb-3">
                <FieldLabel
                  htmlfor="year"
                  labelText="Year"
                  required="required"
                  star="*"
                />
                <FieldTypeSelect
                  name="year"
                  options={yearOptions}
                  setcurrentvalue={setValues}
                  currentformvalue={values}
                />
                <FieldErrorMessage
                  errors={errors.year}
                  touched={touched.year}
                />
              </div>

              {isSubmitting === false ? (
                <div className="modal-buttons">
                  <CustomButton
                    type="submit"
                    variant="primary"
                    isSubmitting={isSubmitting}
                    btnText={formTitles.btnTitle}
                  />{" "}
                  {formTitles.btnTitle === "Submit" && (
                    <CustomButton
                      type="reset"
                      btnText="Reset"
                      variant="outline-secondary"
                      onClick={() => resetFormData()}
                    />
                  )}
                </div>
              ) : (
                <LoadingButton
                  variant="primary"
                  btnText={
                    holidaysObj.id === 0 ? "Submitting..." : "Updating..."
                  }
                  className="modal-buttons"
                />
              )}
            </Form>
          )}
        </Formik>
      </Modal.Body>
      <img src={WaveBottom} alt="WaveBottom" className="wavebg"/>
    </Modal>
  );
};

export default HolidaysModal;
