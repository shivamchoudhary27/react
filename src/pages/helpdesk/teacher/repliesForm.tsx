import React from "react";
import { Formik, Form } from "formik";
import MessagesView from "./messages";
import { Modal } from "react-bootstrap";
import FieldLabel from "../../../widgets/formInputFields/labels";
import CustomButton from "../../../widgets/formInputFields/buttons";
import { LoadingButton } from "../../../widgets/formInputFields/buttons";
import FieldTypeText from "../../../widgets/formInputFields/formTextField";
import FieldErrorMessage from "../../../widgets/formInputFields/errorMessage";
import FieldTypeTextarea from "../../../widgets/formInputFields/formTextareaField";

type Props = {
  onHide: any;
  modalShow: any;
  toggleRepliesModalShow: any;
  repliesAction: any;
};

const initialValues = {};

const RepliesForm = (props: Props) => {
  return (
    <React.Fragment>
      <Modal
        centered
        onHide={props.onHide}
        show={props.modalShow}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.repliesAction === "allview" ? "View All" : "Reply"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <TimerAlertBox
            className="mt-3"
            showAlert={commonProps.showAlert}
            alertMsg={commonProps.alertMsg.message}
            variant={commonProps.alertMsg.alertBoxColor}
            setShowAlert={commonProps.setShowAlert}
          /> */}
          {props.repliesAction === "reply" ? (
            <Formik
              initialValues={initialValues}
              // validationSchema={commonProps.departmentSchema}
              onSubmit={(values, action) => {
                console.log(values);
                action.resetForm();
              }}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form>
                  <div className="mb-3">
                    <FieldLabel
                      star="*"
                      htmlfor="reply"
                      labelText="Reply"
                      // required="required"
                    />
                    <FieldTypeTextarea
                      name="reply"
                      component="textarea"
                      placeholder="Type Here ..."
                    />
                    <FieldErrorMessage
                    // errors={errors}
                    // touched={touched}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="file">Upload Image:</label>
                    <input
                      className="form-control"
                      id="file"
                      name="file"
                      type="file"
                    />
                    <FieldErrorMessage
                    // errors={errors.file}
                    // touched={touched.file}
                    />
                  </div>

                  <div className="modal-buttons">
                    <CustomButton
                      type="submit"
                      variant="primary"
                      isSubmitting={isSubmitting}
                      btnText="Submit"
                    />{" "}
                    <CustomButton
                      type="reset"
                      btnText="Reset"
                      variant="outline-secondary"
                    />
                  </div>
                </Form>
              )}
            </Formik>
          ) : (
            <MessagesView />
          )}
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default RepliesForm;
