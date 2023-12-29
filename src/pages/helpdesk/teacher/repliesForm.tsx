import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MessagesView from "./messages";
import { Modal } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import FieldLabel from "../../../widgets/formInputFields/labels";
import CustomButton from "../../../widgets/formInputFields/buttons";
import FieldErrorMessage from "../../../widgets/formInputFields/errorMessage";
import FieldTypeTextarea from "../../../widgets/formInputFields/formTextareaField";
import { postData } from "../../../adapters/microservices";

type Props = {
  onHide: any;
  modalShow: any;
  repliesAction: any;
  getAllComment: any;
  selectedTopicId: any;
  toggleRepliesModalShow: any;
};

const initialValues = {
  comment: "",
};

// Formik Yup validation === >>>
const queryFormSchema = Yup.object({
  comment: Yup.string().min(5).required("Reply is required"),
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
            <MessagesView getAllComment={props.getAllComment}/>
          )}
          
          {props.repliesAction === "reply" && props.selectedTopicId !==0
            ? sortComments.map((el: any, index: any) => {
                const formattedDate = new Date(el.date).toLocaleDateString(
                  "en-US",
                  {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  }
                );
                return (
                  <Card
                    style={{ backgroundColor: "#DCDCDC", marginTop: 20 }}
                    key={index}
                  >
                    <Card.Body>
                      <Card.Text>{el.comment}</Card.Text>
                      <Card.Text>{el.firstName + " " + el.lastName}</Card.Text>
                      <Card.Text>{formattedDate}</Card.Text>
                    </Card.Body>
                  </Card>
                );
              })
            : null}
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default RepliesForm;
