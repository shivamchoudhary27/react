import React from "react";
import { Formik, Form } from "formik";
import { Modal } from "react-bootstrap";
import TimerAlertBox from "../../../../../widgets/alert/timerAlert";
import FieldLabel from "../../../../../widgets/formInputFields/labels";
import CustomButton from "../../../../../widgets/formInputFields/buttons";
import WaveBottom from "../../../../../assets/images/background/bg-modal.svg";
import { LoadingButton } from "../../../../../widgets/formInputFields/buttons";
import FieldTypeText from "../../../../../widgets/formInputFields/formTextField";
import FieldErrorMessage from "../../../../../widgets/formInputFields/errorMessage";
import { Type_DepartmentObj, Type_AlertMsg, Type_FormTitles } from "../../type/type";
import FieldTypeCheckbox from "../../../../../widgets/formInputFields/formCheckboxField";
import FieldTypeTextarea from "../../../../../widgets/formInputFields/formTextareaField";

type Props = {
  commonProps: {
    show: boolean;
    showAlert: boolean;
    handleFormData: any;
    departmentSchema: any;
    alertMsg: Type_AlertMsg;
    formTitles: Type_FormTitles;
    departmentobj: Type_DepartmentObj;
    initialValues: { name: string; description: string; published: boolean };
    onHide: () => void;
    setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

const BrowserForm = ({ commonProps }: Props) => {
  return (
    <React.Fragment>
      <Modal
        centered
        show={commonProps.show}
        onHide={commonProps.onHide}
        aria-labelledby="contained-modal-title-vcenter"
        className="modal-design-wrapper"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {commonProps.formTitles.titleHeading}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TimerAlertBox
            className="mt-3"
            showAlert={commonProps.showAlert}
            alertMsg={commonProps.alertMsg.message}
            variant={commonProps.alertMsg.alertBoxColor}
            setShowAlert={commonProps.setShowAlert}
          />
          <Formik
            initialValues={commonProps.initialValues}
            validationSchema={commonProps.departmentSchema}
            onSubmit={(values, action) => {
              commonProps.handleFormData(values, action);
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
                    htmlfor="description"
                    labelText="Description"
                    // required="required"
                  />
                  <FieldTypeTextarea
                    name="description"
                    component="textarea"
                    placeholder="Description"
                  />
                  <FieldErrorMessage
                    errors={errors.description}
                    touched={touched.description}
                    msgText="Please Enter description"
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
                      commonProps.departmentobj.id === 0
                        ? "Submitting..."
                        : "Updating..."
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
    </React.Fragment>
  );
};

export default BrowserForm;
