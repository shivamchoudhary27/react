import React, { useRef, useState } from "react";
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
import AttachmentIcon from "../../../assets/images/icons/file-attachment.svg";
import AttachmentWhiteIcon from "../../../assets/images/icons/file-attachment-white.svg";

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
  const fileInputRef = useRef(null);
  const [selectedFileName, setSelectedFileName] = useState("");

  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      setSelectedFileName(file.name);

    }
  };
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
        {props.repliesAction !== "reply" ? (
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
        ) : null}
        {props.repliesAction === "reply" && props.selectedTopicId !== 0 ? (
          <div className="my-3">
            <MessagesView
              getAllComment={props.getAllComment}
              apiStatus={props.apiStatus}
              customClass="chat-reverse"
            />
          </div>
        ) : null}

        {props.repliesAction === "reply" ? (
          <Formik
            initialValues={initialValues}
            validationSchema={queryFormSchema}
            onSubmit={(values, action) => {
              handleFormSubmit(values, action);
            }}
            onReset={(values, action) => {
              setSelectedFileName("");
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <div className="d-flex flex-column">
                <div className="w-100">
                  <FieldTypeTextarea
                    name="comment"
                    component="textarea"
                    placeholder="Type your reply here..."
                  />
                  <FieldErrorMessage
                    errors={errors.comment}
                    touched={touched.comment}
                  />
                </div>
                {selectedFileName && (
                      <div className="attachedfile"> <img src={AttachmentIcon} alt="attachedfile" /> {selectedFileName}</div>
                    )}
                  <div className="modal-buttons d-flex gap-1 w-100 justify-content-center">
                  <input
                      ref={fileInputRef}
                      className="d-none"
                      id="file"
                      name="file"
                      type="file"
                      onChange={handleFileChange}
                    />
                  <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleFileButtonClick}
                    >
                      <img src={AttachmentWhiteIcon} alt="attachment" />
                    </button>
                  <CustomButton
                    type="submit"
                    variant="primary"
                    isSubmitting={isSubmitting}
                    btnText="Submit"
                  />
                  <CustomButton
                    type="reset"
                    btnText="Reset"
                    variant="outline-secondary"
                  />
                </div>
                </div>
              </Form>
            )}
          </Formik>
        ) : null}
      </Modal.Body>
    </Modal>
  </React.Fragment>
  );
};

export default RepliesForm;
