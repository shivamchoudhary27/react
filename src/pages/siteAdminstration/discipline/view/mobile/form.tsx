import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Modal from "react-bootstrap/Modal";
import TimerAlertBox from "../../../../../widgets/alert/timerAlert";
import FieldLabel from "../../../../../widgets/formInputFields/labels";
import { Interface_DisciplineCustomObject } from "../../type/interface";
import CustomButton from "../../../../../widgets/formInputFields/buttons";
import { LoadingButton } from "../../../../../widgets/formInputFields/buttons";
import FieldTypeText from "../../../../../widgets/formInputFields/formTextField";
import FieldErrorMessage from "../../../../../widgets/formInputFields/errorMessage";
import FieldTypeCheckbox from "../../../../../widgets/formInputFields/formCheckboxField";
import FieldTypeTextarea from "../../../../../widgets/formInputFields/formTextareaField";
import {
  Type_AlertMsg,
  Type_FormTitles,
  Type_InitialValues,
} from "../../type/type";

type Props = {
  commonProps: {
    show: boolean;
    showAlert: boolean;
    alertMsg: Type_AlertMsg;
    formTitles: Type_FormTitles;
    initialValues: Type_InitialValues;
    disciplineobj: Interface_DisciplineCustomObject;
    onHide: () => void;
    setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
    handleFormData: (params1: any, { setSubmitting, resetForm }: any) => void;
  };
};

// Formik Yup Validation === >>>
const diciplineSchema = Yup.object({
  name: Yup.string().min(1).trim().required("Discipline name is required"),
  description: Yup.string().min(1).required("Description is required"),
});

const MobileDiciplineModal: React.FunctionComponent<Props> = ({
  commonProps,
}: Props) => {
  return (
    <Modal
      show={commonProps.show}
      onHide={commonProps.onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {commonProps.formTitles.titleHeading}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={commonProps.initialValues}
          validationSchema={diciplineSchema}
          onSubmit={(values, action) => {
            commonProps.handleFormData(values, action);
            action.resetForm();
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <FieldLabel
                  star="*"
                  htmlfor="name"
                  labelText="Name"
                  required="required"
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
                  star="*"
                  required="required"
                  htmlfor="description"
                  labelText="Description"
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
                <FieldTypeCheckbox name="published" checkboxLabel="Published" />{" "}
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
                    btnText={commonProps.formTitles.btnTitle}
                  />{" "}
                  {commonProps.formTitles.btnTitle === "Submit" && (
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
                  btnText={
                    commonProps.disciplineobj.id === 0
                      ? "Submitting..."
                      : "Updating..."
                  }
                  className="modal-buttons"
                />
              )}
            </Form>
          )}
        </Formik>
        <TimerAlertBox
          className="mt-3"
          showAlert={commonProps.showAlert}
          alertMsg={commonProps.alertMsg.message}
          variant={commonProps.alertMsg.alertBoxColor}
          setShowAlert={commonProps.setShowAlert}
        />
      </Modal.Body>
    </Modal>
  );
};

export default MobileDiciplineModal;
