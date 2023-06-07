import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Alert } from "react-bootstrap";
import {
  postData as addProgramData,
  putData as putProgramData,
} from "../../../adapters/microservices";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FieldLabel from "../../../widgets/formInputFields/labels";
import FieldTypeText from "../../../widgets/formInputFields/formTextField";
import FieldTypeTextarea from "../../../widgets/formInputFields/formTextareaField";
import FieldTypeCheckbox from "../../../widgets/formInputFields/formCheckboxField";
import FieldErrorMessage from "../../../widgets/formInputFields/errorMessage";
import Custom_Button from "../../../widgets/formInputFields/buttons";
import TimerAlertBox from "../../../widgets/alert/timerAlert";

// Formik Yup validation === >>>
const programTypeSchema = Yup.object({
  name: Yup.string().min(1).required(),
  description: Yup.string().min(1).required(),
  // isBatchYearRequired: Yup.bool()
  //   .required("Please Check")
  //   .oneOf([true], "Please Check the required field"),
});

const AddProgramModal = ({
  programtypeobj,
  togglemodalshow,
  refreshprogramdata,
  show,
  onHide,
  currentInstitute,
}: any) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });

  // Initial values of react table === >>>
  const initialValues = {
    name: programtypeobj.name,
    description: programtypeobj.description,
    isBatchYearRequired: programtypeobj.batchYearRequired,
  };

  // custom Obj & handle form data === >>>
  let formTitles = {
    titleHeading: "",
    btnTitle: "",
  };
  if (programtypeobj.id === 0) {
    formTitles = {
      titleHeading: "Add Program Type",
      btnTitle: "Save",
    };
  } else {
    formTitles = {
      titleHeading: "Update Program Type",
      btnTitle: "Update",
    };
  }

  // handle Form CRUD operations === >>>
  const handleFormData = (values: any, { setSubmitting, resetForm }: any) => {
    let endPoint = `/${currentInstitute}/program-types`;
    setSubmitting(true);
    if (programtypeobj.id === 0) {
      addProgramData(endPoint, values)
        .then((res: any) => {
          if (res.data !== "") {
            togglemodalshow(false);
            refreshprogramdata();
            setSubmitting(false);
            resetForm();
          }
        })
        .catch((err: any) => {
          console.log(err);
          setShowAlert(true)
          setAlertMsg({ message: "Failed to add program! Please try again.", alertBoxColor: "danger" })
        });
    } else {
      endPoint += `/${programtypeobj.id}`;
      putProgramData(endPoint, values)
        .then((res: any) => {
          if (res.data !== "" && res.status === 200) {
            togglemodalshow(false);
            refreshprogramdata();
            setSubmitting(false);
            resetForm();
          }
        })
        .catch((err: any) => {
          console.log(err);
          setShowAlert(true)
          setAlertMsg({ message: "Failed to update program! Please try again.", alertBoxColor: "danger" })
        });
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
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
          initialValues={initialValues}
          validationSchema={programTypeSchema}
          onSubmit={(values, action) => {
            handleFormData(values, action);
            console.log(values);
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <FieldLabel
                  htmlfor="name"
                  labelText="Name"
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
                  htmlfor="description"
                  labelText="Description"
                  required="required"
                  star="*"
                />
                <FieldTypeTextarea
                  name="description"
                  component="textarea"
                  placeholder="Description"
                />
                <FieldErrorMessage
                  errors={errors.description}
                  touched={touched.description}
                  msgText="Description required atleast 1 character"
                />
              </div>

              <div className="mb-3">
                <FieldTypeCheckbox
                  name="isBatchYearRequired"
                  checkboxLabel="Batch Year Required?"
                />{" "}
                <FieldErrorMessage
                  errors={errors.isBatchYearRequired}
                  touched={touched.isBatchYearRequired}
                  msgText="Please Check required field"
                />
              </div>

              <div className="modal-buttons">
                <Custom_Button
                  type="submit"
                  variant="primary"
                  isSubmitting={isSubmitting}
                  btnText={formTitles.btnTitle}
                />{" "}
                {formTitles.btnTitle === "Save" && (
                  <Custom_Button
                    type="reset"
                    btnText="Reset"
                    variant="outline-secondary"
                  />
                )}
              </div>
              <Alert variant="primary" className="mt-3 small">
                <strong>Note: </strong>If batch year is checked then it is
                available on add program form.
              </Alert>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default AddProgramModal;
