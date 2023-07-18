import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Formik, Form } from "formik";
import {
  postData as addDisciplineData,
  putData as putDesciplineData,
} from "../../../adapters/microservices";
import * as Yup from "yup";
import FieldLabel from "../../../widgets/formInputFields/labels";
import FieldTypeText from "../../../widgets/formInputFields/formTextField";
import FieldTypeTextarea from "../../../widgets/formInputFields/formTextareaField";
import CustomButton from "../../../widgets/formInputFields/buttons";
import FieldErrorMessage from "../../../widgets/formInputFields/errorMessage";
import TimerAlertBox from "../../../widgets/alert/timerAlert";
import { LoadingButton } from "../../../widgets/formInputFields/buttons";
import FieldTypeCheckbox from "../../../widgets/formInputFields/formCheckboxField";
import { IInitialValues, IDisciplineModal, IAlertMsg } from "./types/interface";

// Formik Yup Validation === >>>
const diciplineSchema = Yup.object({
  name: Yup.string().min(1).trim().required("Discipline name is required"),
  description: Yup.string().min(1).required("Description is required"),
});

const DiciplineModal: React.FunctionComponent<IDisciplineModal> = ({
  disciplineobj,
  togglemodalshow,
  refreshDisciplineData,
  show,
  onHide,
  currentInstitute,
}: IDisciplineModal) => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState<IAlertMsg>({ message: "", alertBoxColor: "" });

  // Initial values of react table === >>>
  const initialValues: IInitialValues = {
    name: disciplineobj.name,
    description: disciplineobj.description,
    published: disciplineobj.published
  };

  // custom Obj & handle form data === >>>
  let formTitles = {
    btnTitle: "",
    titleHeading: "",
  };
  if (disciplineobj.id === 0) {
    formTitles = {
      btnTitle: "Submit",
      titleHeading: "Add Discipline",
    };
  } else {
    formTitles = {
      btnTitle: "Update",
      titleHeading: "Update Discipline",
    };
  }

  // handle Form CRUD operations === >>>
  const handleFormData = (values: IInitialValues, { setSubmitting, resetForm }: any) => {
    setSubmitting(true);
    let endPoint: string = `/${currentInstitute}/disciplines`;
    if (disciplineobj.id === 0) {
      addDisciplineData(endPoint, values)
        .then((res: any) => {
          if (res.data !== "") {
            togglemodalshow(false);
            setSubmitting(false);
            refreshDisciplineData();
            resetForm();
          }
        })
        .catch((err: any) => {
          setSubmitting(false);
          setShowAlert(true);
          setAlertMsg({
            message: "Failed to add discipline! Please try again.",
            alertBoxColor: "danger",
          });
        });
    } else {
      endPoint += `/${disciplineobj.id}`;
      setSubmitting(true);
      putDesciplineData(endPoint, values)
        .then((res: any) => {
          if (res.data !== "" && res.status === 200) {
            togglemodalshow(false);
            setSubmitting(false);
            refreshDisciplineData();
          }
        })
        .catch((err: any) => {
          setSubmitting(false);
          setShowAlert(true);
          setAlertMsg({
            message: "Failed to update discipline! Please try again.",
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
        <Formik
          initialValues={initialValues}
          validationSchema={diciplineSchema}
          onSubmit={(values, action) => {
            handleFormData(values, action);
            action.resetForm();
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
                    />
                  )}
                </div>
              ) : (
                <LoadingButton
                  variant="primary"
                  btnText={disciplineobj.id === 0 ? "Submitting..." : "Updating..."}
                  className="modal-buttons"
                />
              )}
            </Form>
          )}
        </Formik>
        <TimerAlertBox
          alertMsg={alertMsg.message}
          className="mt-3"
          variant={alertMsg.alertBoxColor}
          setShowAlert={setShowAlert}
          showAlert={showAlert}
        />
      </Modal.Body>
    </Modal>
  );
};

export default DiciplineModal;
