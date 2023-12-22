import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import TimerAlertBox from "../../../../widgets/alert/timerAlert";
import FieldLabel from "../../../../widgets/formInputFields/labels";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import { postData, putData } from "../../../../adapters/microservices";
import { LoadingButton } from "../../../../widgets/formInputFields/buttons";
import FieldTypeText from "../../../../widgets/formInputFields/formTextField";
import FieldErrorMessage from "../../../../widgets/formInputFields/errorMessage";
import Errordiv from "../../../../widgets/alert/errordiv";

const ManageTopicModal = ({
  show,
  onHide,
  topicObj,
  togglemodalshow,
  updateAddRefresh,
}: any) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });

  const initialValues = {
    topicName: topicObj.topicName,
    description: topicObj.description,
    published: topicObj.id === 0 ? true : topicObj.published,
  };

  // Formik Yup validation === >>>
  const topicFormSchema = Yup.object({
    topicName: Yup.string().trim().required("Name is required"),
    description: Yup.string().min(5).required("description is required"),
  });

  // handle Form CRUD operations === >>>
  const handleFormData = (values: {}, { setSubmitting, resetForm }: any) => {
    setSubmitting(true);
    if (topicObj.id === 0) {
      postData("/topic", values)
        .then((res: any) => {
          if ((res.data !== "", res.status === 201)) {
            togglemodalshow(false);
            setSubmitting(false);
            updateAddRefresh();
            resetForm();
          }
        })
        .catch((err: any) => {
          console.log(err);
          if (err.response.status === 404) {
            setSubmitting(false);
            setShowAlert(true);
            setAlertMsg({
              message: `${err.response.data.message}. Please try again later`,
              alertBoxColor: "danger",
            });
          }
        });
    } else {
      setSubmitting(true);
      putData(`/topic/${topicObj.id}`, values)
        .then((res: any) => {
          if ((res.data !== "" && res.status === 201)) {
            togglemodalshow(false);
            updateAddRefresh();
            setSubmitting(false);
          }
        })
        .catch((err: any) => {
          console.log(err);
          setSubmitting(false);
          if (err.response.status === 500) {
            setShowAlert(true);
            setAlertMsg({
              message: `Failed to Update topic, ${err.response.data.error}.`,
              alertBoxColor: "danger",
            });
          }
        });
    }
  };

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
            {topicObj.id === 0 ? "Add Topic" : "Update Topic"}
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
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={topicFormSchema}
            onSubmit={(values, action) => {
              handleFormData(values, action);
            }}
          >
            {({ errors, touched, isSubmitting, setValues, values }) => (
              <Form>
                <div className="mb-3">
                  <FieldLabel
                    htmlfor="topicName"
                    labelText="Topic"
                    required="required"
                    star="*"
                  />
                  <FieldTypeText name="topicName" placeholder="Name" />
                  <FieldErrorMessage
                    errors={errors.topicName}
                    touched={touched.topicName}
                    msgText="Topic topic name is required"
                  />
                </div>
                <div className="mb-3">
                  <FieldLabel
                    htmlfor="description"
                    labelText="Description"
                    required="required"
                    star="*"
                  />
                  <FieldTypeText name="description" placeholder="Description" />
                  <FieldErrorMessage
                    errors={errors.description}
                    touched={touched.description}
                    msgText="Description is required"
                  />
                </div>

                <div className="mb-3">
                  <Field
                    name="published"
                    type="checkbox"
                    className="form-check-input"
                    defaultChecked
                  />{" "}
                  Published
                  <FieldErrorMessage
                    errors={errors.published}
                    touched={touched.published}
                    msgText="Please Check Required Field"
                  />
                </div>

                <Errordiv
                  msg="Allow to comment if published is checked otherwise not able to comment."
                  cstate
                  className="mt-3"
                />

                {isSubmitting === false ? (
                  <div className="modal-buttons">
                    <CustomButton
                      type="submit"
                      variant="primary"
                      // disabled={isSubmitting}
                      btnText={topicObj.id === 0 ? "Submit" : "Update"}
                    />{" "}
                    {topicObj.id === 0 && (
                      <CustomButton
                        type="reset"
                        btnText="Reset"
                        variant="outline-secondary"
                        onClick={() => setShowAlert(false)}
                      />
                    )}
                  </div>
                ) : (
                  <LoadingButton
                    variant="primary"
                    btnText={topicObj.id === 0 ? "Submitting..." : "Updating"}
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

export default ManageTopicModal;
