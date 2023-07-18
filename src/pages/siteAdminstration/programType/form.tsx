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
import { LoadingButton } from "../../../widgets/formInputFields/buttons";
import { IAlertMsg, IAddProgramModal } from "./types/interface";

// Formik Yup validation === >>>
const programTypeSchema = Yup.object({
  name: Yup.string().min(1).trim().required("Name is required"),
  description: Yup.string().min(1).required("Description is required"),
  // isBatchYearRequired: Yup.bool()
  //   .required("Please Check")
  //   .oneOf([true], "Please Check the required field"),
});

const AddProgramModal: React.FunctionComponent<IAddProgramModal> = ({
  programtypeobj,
  togglemodalshow,
  refreshprogramdata,
  show,
  onHide,
  currentInstitute,
}: IAddProgramModal) => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState<IAlertMsg>({ message: "", alertBoxColor: "" });

  interface IInitialValues{
    name: string;
    description: string;
    isBatchYearRequired: boolean;
    published: boolean;
  }

  // Initial values of react table === >>>
  const initialValues: IInitialValues = {
    name: programtypeobj.name,
    description: programtypeobj.description,
    isBatchYearRequired: programtypeobj.batchYearRequired,
    published: programtypeobj.published
  };

  // custom Obj & handle form data === >>>
  let formTitles = {
    titleHeading: "",
    btnTitle: "",
  };
  if (programtypeobj.id === 0) {
    formTitles = {
      titleHeading: "Add Program Type",
      btnTitle: "Submit",
    };
  } else {
    formTitles = {
      titleHeading: "Update Program Type",
      btnTitle: "Update",
    };
  }

  // handle Form CRUD operations === >>>
  const handleFormData = (values: any, { setSubmitting, resetForm }: any) => {
    setSubmitting(true);
    let endPoint = `/${currentInstitute}/program-types`;
    if (programtypeobj.id === 0) {
      addProgramData(endPoint, values)
        .then((res: any) => {
          if (res.data !== "") {
            togglemodalshow(false);
            setSubmitting(false);
            refreshprogramdata();
            resetForm();
          }
        })
        .catch((err: any) => {
          setSubmitting(false);
          setShowAlert(true);
          setAlertMsg({
            message: "Failed to add program! Please try again.",
            alertBoxColor: "danger",
          });
        });
    } else {
      endPoint += `/${programtypeobj.id}`;
      setSubmitting(true);
      putProgramData(endPoint, values)
        .then((res: any) => {
          if (res.data !== "" && res.status === 200) {
            togglemodalshow(false);
            setSubmitting(false);
            refreshprogramdata();
            resetForm();
          }
        })
        .catch((err: any) => {
          setSubmitting(false);
          setShowAlert(true);
          setAlertMsg({
            message: "Failed to update program! Please try again.",
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
              <div className="mb-3">
                <FieldTypeCheckbox
                  name="published"
                  checkboxLabel="Published"
                />{" "}
                <FieldErrorMessage
                  errors=""
                  touched=""
                  msgText="Please Check required field"
                />
              </div>
              {isSubmitting === false ? (
                <div className="modal-buttons">
                  <Custom_Button
                    type="submit"
                    variant="primary"
                    isSubmitting={isSubmitting}
                    btnText={formTitles.btnTitle}
                  />{" "}
                  {formTitles.btnTitle === "Submit" && (
                    <Custom_Button
                      type="reset"
                      btnText="Reset"
                      variant="outline-secondary"
                    />
                  )}
                </div>
              ) : (
                <LoadingButton
                  variant="primary"
                  btnText={
                    programtypeobj.id === 0 ? "Submitting..." : "Updating..."
                  }
                  className="modal-buttons"
                />
              )}
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
