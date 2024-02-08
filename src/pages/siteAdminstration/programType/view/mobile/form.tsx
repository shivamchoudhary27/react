import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Alert } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import TimerAlertBox from "../../../../../widgets/alert/timerAlert";
import FieldLabel from "../../../../../widgets/formInputFields/labels";
import CustomButton from "../../../../../widgets/formInputFields/buttons";
import WaveBottom from "../../../../../assets/images/background/bg-modal.svg";
import { LoadingButton } from "../../../../../widgets/formInputFields/buttons";
import FieldTypeText from "../../../../../widgets/formInputFields/formTextField";
import FieldErrorMessage from "../../../../../widgets/formInputFields/errorMessage";
import FieldTypeTextarea from "../../../../../widgets/formInputFields/formTextareaField";
import FieldTypeCheckbox from "../../../../../widgets/formInputFields/formCheckboxField";
import {
  Type_AlertMsg,
  Type_FormTitles,
  Type_ProgramTypeObject,
} from "../../type/types";

type Props = {
  CommonProps: {
    show: boolean;
    showAlert: boolean;
    alertMsg: Type_AlertMsg;
    formTitles: Type_FormTitles;
    initialValues: Type_InitialValues;
    programtypeobj: Type_ProgramTypeObject;
    onHide: () => void;
    setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
    handleFormData: (params1: any, { setSubmitting, resetForm }: any) => void;
  };
};

type Type_InitialValues = {
  name: string;
  published: boolean;
  description: string;
  isBatchYearRequired: boolean;
};

// Formik Yup validation === >>>
const programTypeSchema = Yup.object({
  name: Yup.string().min(1).trim().required("Name is required"),
  description: Yup.string().min(1).required("Description is required"),
  // isBatchYearRequired: Yup.bool()
  //   .required("Please Check")
  //   .oneOf([true], "Please Check the required field"),
});

const MobileProgramModal: React.FunctionComponent<Props> = ({
  CommonProps,
}: Props) => {
  return (
    <Modal
      centered
      show={CommonProps.show}
      onHide={CommonProps.onHide}
      aria-labelledby="contained-modal-title-vcenter"
      className="modal-design-wrapper"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {CommonProps.formTitles.titleHeading}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TimerAlertBox
          className="mt-3"
          showAlert={CommonProps.showAlert}
          setShowAlert={CommonProps.setShowAlert}
          alertMsg={CommonProps.alertMsg.message}
          variant={CommonProps.alertMsg.alertBoxColor}
        />
        <Formik
          initialValues={CommonProps.initialValues}
          validationSchema={programTypeSchema}
          onSubmit={(values, action) => {
            CommonProps.handleFormData(values, action);
            console.log(values);
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
                    btnText={CommonProps.formTitles.btnTitle}
                  />{" "}
                  {CommonProps.formTitles.btnTitle === "Submit" && (
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
                    CommonProps.programtypeobj.id === 0
                      ? "Submitting..."
                      : "Updating..."
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
      <img src={WaveBottom} alt="WaveBottom" className="wavebg"/>
    </Modal>
  );
};

export default MobileProgramModal;
