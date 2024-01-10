import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import MessagesView from "./messages";
import { Modal } from "react-bootstrap";
import Errordiv from "../../../widgets/alert/errordiv";
import { postData } from "../../../adapters/microservices";
import { formattedDate } from "../../../lib/timestampConverter";
import FieldLabel from "../../../widgets/formInputFields/labels";
import CustomButton from "../../../widgets/formInputFields/buttons";
import FieldErrorMessage from "../../../widgets/formInputFields/errorMessage";
import FieldTypeTextarea from "../../../widgets/formInputFields/formTextareaField";

type Props = {
  onHide: any;
  modalShow: any;
  modalTitle: any;
  apiStatus: string;
  repliesAction: any;
  getAllComment: any;
  modalTitleDate: any;
  selectedTopicId: any;
  updateAddRefresh: any;
  toggleRepliesModalShow: any;
};

const initialValues = {
  comment: "",
};

// Formik Yup validation === >>>
const queryFormSchema = Yup.object({
  comment: Yup.string().min(5).max(1000).required("Reply is required"),
});

const RepliesForm = (props: Props) => {
  const sortComments = props.getAllComment.sort((a: any, b: any) => {
    return new Date(b.date) - new Date(a.date);
  });

  const handleFormSubmit = (values: any, action: any) => {
    if (props.selectedTopicId !== "") {
      action.setSubmitting(true);
      postData(`/comment/${props.selectedTopicId}`, values)
        .then((result: any) => {
          if (result.data !== "" && result.status === 200) {
            props.toggleRepliesModalShow(false);
            action.setSubmitting(false);
            props.updateAddRefresh();
            action.resetForm();
          }
        })
        .catch((err: any) => {
          console.log(err);
          action.setSubmitting(false);
        });
    }
  };

  return (
    <React.Fragment>
      <Modal
        centered
        onHide={props.onHide}
        show={props.modalShow}
        aria-labelledby="contained-modal-title-vcenter"
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {`${
              props.modalTitle !== undefined &&
              props.modalTitleDate !== undefined &&
              props.modalTitle
            } (${formattedDate(props.modalTitleDate)})`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.repliesAction === "reply" ? (
            <Formik
              initialValues={initialValues}
              validationSchema={queryFormSchema}
              onSubmit={(values, action) => {
                handleFormSubmit(values, action);
              }}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form>
                  <div className="mb-3">
                    <FieldLabel
                      star="*"
                      htmlfor="comment"
                      labelText="Reply"
                      // required="required"
                    />
                    <FieldTypeTextarea
                      name="comment"
                      component="textarea"
                      placeholder="Type Here ..."
                    />
                    <FieldErrorMessage
                      errors={errors.comment}
                      touched={touched.comment}
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
            <>
              {props.apiStatus === "finished" &&
              props.getAllComment.length === 0 ? (
                <Errordiv
                  msg="No comments available!"
                  cstate
                  className="mt-3"
                />
              ) : props.apiStatus === "started" &&
                props.getAllComment.length === 0 ? (
                <p>Loading.....</p>
              ) : (
                <MessagesView
                  getAllComment={props.getAllComment}
                  apiStatus={props.apiStatus}
                />
              )}
            </>
          )}
          {props.repliesAction === "reply" && props.selectedTopicId !== 0 ? (
            <div className="my-3">
              <MessagesView
                getAllComment={props.getAllComment}
                apiStatus={props.apiStatus}
              />
            </div>
          ) : null}
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default RepliesForm;
