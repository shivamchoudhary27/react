import React, {useRef, useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import MessagesView from "./messages";
import { Modal } from "react-bootstrap";
import Errordiv from "../../../widgets/alert/errordiv";
import { postData } from "../../../adapters/microservices";
import { formattedDate } from "../../../lib/timestampConverter";
import CustomButton from "../../../widgets/formInputFields/buttons";
import FieldErrorMessage from "../../../widgets/formInputFields/errorMessage";
import AttachmentIcon from "../../../assets/images/icons/file-attachment.svg";
import FieldTypeTextarea from "../../../widgets/formInputFields/formTextareaField";
import AttachmentWhiteIcon from "../../../assets/images/icons/file-attachment-white.svg";
import WaveBottom from "../../../assets/images/background/bg-modal.svg";
import RouterLadyLoader from "../../../globals/globalLazyLoader/routerLadyLoader";

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

  const handleFormSubmit = async (values: any, action: any) => {

    if (props.selectedTopicId !== "") {
      action.setSubmitting(true);
      try {
        const commentResponse = await postData(
          `/comment/${props.selectedTopicId}`, values);
        if (commentResponse.status === 200) {
          const commentData = commentResponse.data;
          if (commentData && commentData.id) {
            const commentId = commentData.id;
            action.resetForm();
            if (values.file) {
              await postData(`/files/comment/${commentId}`, {}, values.file)
              .then((response) => {
                if (response.status === 200) {
                  props.updateAddRefresh();
                  } 
                });
            }
            else {
              props.updateAddRefresh();
            }
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        action.setSubmitting(false);
      }
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
        className="modal-design-wrapper"
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
        <Modal.Body className="helpdeskmodlebody">
          {props.repliesAction !== "reply" ? (
            <>
              {props.apiStatus === "finished" &&
              props.getAllComment.length === 0 ? (
               <RouterLadyLoader status={true}/>
              ) : props.apiStatus === "started" &&
                props.getAllComment.length === 0 ? (
                <p>Loading.....</p>
              ) : (
                <div className="my-3">
                <MessagesView
                  getAllComment={props.getAllComment}
                  apiStatus={props.apiStatus}
                  customClass="chat-reverse"
                  selectedTopicId={props.selectedTopicId}
                />
                </div>
              )}
            </>
          ) : null}
          {props.repliesAction === "reply" && props.selectedTopicId !== 0 ? (
            <>
            {props.apiStatus === "finished" &&
            props.getAllComment.length === 0 ? (
             <RouterLadyLoader status={true}/>
            ) : props.apiStatus === "started" &&
              props.getAllComment.length === 0 ? (
              <p>Loading.....</p>
            ) : (
              <div className="my-3">
              <MessagesView
                getAllComment={props.getAllComment}
                apiStatus={props.apiStatus}
                customClass="chat-reverse"
                selectedTopicId={props.selectedTopicId}
              />
              </div>
            )}
          </>

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
              {({ errors, touched, isSubmitting, setFieldValue }) => (
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

                      <div className="user-picture-form"></div>
                    </div>

                    {selectedFileName && (
                      <div className="attachedfile">
                        {" "}
                        <img src={AttachmentIcon} alt="attachedfile" />{" "}
                        {selectedFileName}
                      </div>
                    )}
                    <div className="modal-buttons d-flex gap-1 w-100 justify-content-center">
                      <input
                        ref={fileInputRef}
                        className="d-none"
                        id="file"
                        name="file"
                        type="file"
                        // onChange={handleFileChange}
                        onChange={(event: any) => {
                          handleFileChange(event);
                          setFieldValue("file", event.currentTarget.files[0]);
                        }}
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
        <img src={WaveBottom} alt="WaveBottom" className="wavebg" />
      </Modal>
    </React.Fragment>
  );
};

export default RepliesForm;
