import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form } from "formik";
import FieldLabel from "../../../../../widgets/formInputFields/labels";
import FieldErrorMessage from "../../../../../widgets/formInputFields/errorMessage";
import FieldTypeText from "../../../../../widgets/formInputFields/formTextField";
import FieldTypeCheckbox from "../../../../../widgets/formInputFields/formCheckboxField";
import FieldTypeTextarea from "../../../../../widgets/formInputFields/formTextareaField";
import CustomButton from "../../../../../widgets/formInputFields/buttons";
import TimerAlertBox from "../../../../../widgets/alert/timerAlert";
import { LoadingButton } from "../../../../../widgets/formInputFields/buttons";
import { TypeDepartmentObj } from "../../types/type";

type Props = {
  formTitles: any;
  showAlert: boolean;
  setShowAlert: any;
  alertMsg: { message: string; alertBoxColor: string };
  handleFormData: any;
  initialValues: { name: string; description: string; published: boolean };
  departmentSchema: any;
  departmentobj: TypeDepartmentObj;
  show: any;
  onHide: any;
};

const MobileForm = ({
  formTitles,
  showAlert,
  setShowAlert,
  alertMsg,
  handleFormData,
  initialValues,
  departmentSchema,
  departmentobj,
  show,
  onHide,
}: Props) => {
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
            validationSchema={departmentSchema}
            onSubmit={(values, action) => {
              handleFormData(values, action);
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
                    btnText={
                      departmentobj.id === 0 ? "Submitting..." : "Updating..."
                    }
                    className="modal-buttons"
                  />
                )}
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default MobileForm;
