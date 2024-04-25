import React, { useRef, useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import MessagesView from "./messages";
import { Modal } from "react-bootstrap";
import { postData } from "../../../adapters/microservices";
import { formattedDate } from "../../../lib/timestampConverter";
import CustomButton, { LoadingButton } from "../../../widgets/formInputFields/buttons";
import WaveBottom from "../../../assets/images/background/bg-modal.svg";
import FieldErrorMessage from "../../../widgets/formInputFields/errorMessage";
import FieldTypeTextarea from "../../../widgets/formInputFields/formTextareaField";
import AttachmentIcon from "../../../assets/images/icons/file-attachment.svg";
import AttachmentWhiteIcon from "../../../assets/images/icons/file-attachment-white.svg";
import RouterLadyLoader from "../../../globals/globalLazyLoader/routerLadyLoader";
import TimerAlertBox from "../../../widgets/alert/timerAlert";

type Props = {
  onHide: any;
  modalShow: any;
  modalTitle: any;
  showAlert: any;
  alertMsg:any;
  setAlertMsg:any;
  setShowAlert:any;
  apiStatus: string;
  repliesAction: any;
  getAllComment: any;
  setGetAllComment:any;
  modalTitleDate: any;
  selectedTopicId: any;
  updateAddRefresh: any;
  toggleRepliesModalShow: any;
};

const initialValues = {
  comment: "",
};

  // Formik Yup validation === >>>
  const  queryFormSchema = Yup.object({
    comment: Yup.string().max(1000).required("Reply is required"),
  });


const RepliesForm = (props: Props) => {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
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
      setLoading(true)
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
                  setLoading(false)
                  } 
                });
            }
            else {
              props.updateAddRefresh();
              setLoading(false)
            }
          }
        }
      } catch (error) {
        // console.error(error);
        if (error.response.status === 404 || 400 || 500) {
          console.log(error)
          props.setShowAlert(true);
          props.setAlertMsg({
            message: error.response.data.message,
            alertBoxColor: "danger",
          });
          setLoading(false)
        }
      } finally {
        action.setSubmitting(false);
      }
    }
  };


  const onHideModal = () => { 
    props.toggleRepliesModalShow(false)
    setSelectedFileName("")
    props.setGetAllComment([])
   }

   
  return (
    <React.Fragment>
      <Modal
        centered
        onHide={onHideModal}
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
        <Modal.Body>
          {props.repliesAction !== "reply" ? (
            // <>
            //   {props.apiStatus === "finished" &&
            //   props.getAllComment.length === 0 ? (
            //     <Errordiv
            //       msg="No comments available!"
            //       cstate
            //       className="mt-3"
            //     />
            //   ) : props.apiStatus === "started" &&
            //     props.getAllComment.length === 0 ? (
            //     <p>Loading.....</p>
            //   ) : (
            //     <MessagesView
            //       apiStatus={props.apiStatus}
            //       customClass="chat-reverse"
            //       getAllComment={props.getAllComment}
            //       selectedTopicId={props.selectedTopicId}
            //     />
            //   )}
            // </>
            <>
            {props.apiStatus === "finished" &&
            props.getAllComment.length === 0 ? (
              <div className = "alert alert-primary">No comments available on the query at this time. </div>
              ) : props.apiStatus === "started" &&
              props.getAllComment.length === 0 ? (
                <RouterLadyLoader status={true}/>
              // <p>Loading.....</p>
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
              <div className = "alert alert-primary">No comments available on the query at this time. </div>
              ) : props.apiStatus === "started" &&
              props.getAllComment.length === 0 ? (
                <RouterLadyLoader status={true}/>
                // <p>Loading.....</p>
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
                setSelectedFileName("")
              }}
              onReset={(values, action) => {
                setSelectedFileName("");
              }}
            >
              {({ errors, touched, isSubmitting, setFieldValue}) => (
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
                    {selectedFileName !== "" && (
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
                        onChange={(event:any) => {
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
                      {loading ?
                        <LoadingButton /> :
                        <CustomButton
                          type="submit"
                          variant="primary"
                          isSubmitting={isSubmitting}
                          btnText="Submit"
                        />}
                      <CustomButton
                        type="reset"
                        btnText="Reset"
                        variant="outline-secondary"
                      />
                    </div>
                    <TimerAlertBox
                        alertMsg={props.alertMsg.message}
                        className="mt-3"
                        variant={props.alertMsg.alertBoxColor}
                        setShowAlert={props.setShowAlert}
                        showAlert={props.showAlert}
                      />
                  </div>
                </Form>
              )}
            </Formik>
          ) : null}
        </Modal.Body>
        <img src={WaveBottom} alt="WaveBottom" className="wavebg"/>
      </Modal>
    </React.Fragment>
  );
};

export default RepliesForm;
