import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form } from "formik";
import FieldTypeText from "../../../widgets/formInputFields/formTextField";
import CustomButton from "../../../widgets/formInputFields/buttons";
import FieldLabel from "../../../widgets/formInputFields/labels";
import FieldErrorMessage from "../../../widgets/formInputFields/errorMessage";
import FieldTypeCheckbox from "../../../widgets/formInputFields/formCheckboxField";
import * as Yup from "yup";
import {
  postData as addTagsData,
  putData as updateTagsData,
} from "../../../adapters/microservices";
import TimerAlertBox from "../../../widgets/alert/timerAlert";
import { LoadingButton } from "../../../widgets/formInputFields/buttons";

// Formik Yup validation === >>>
const tagsSchema = Yup.object({
  name: Yup.string().min(1).required(),
  // description: Yup.string().max(100).required(),
});

const TagsModal = ({
  show,
  onHide,
  togglemodalshow,
  updateAddRefresh,
  tagObj,
  currentInstitute,
}: any) => {
  const initialValues = {
    name: tagObj.name,
    published: tagObj.published
  };
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });

  const handleFormData = (values: {}, { setSubmitting, resetForm }: any) => {
    if (tagObj.id === 0) {
      const endPoint = `/${currentInstitute}/tags`;
      setSubmitting(true);
      addTagsData(endPoint, values)
        .then((res: any) => {
          if (res.data !== "") {
            togglemodalshow(false);
            setSubmitting(false);
            updateAddRefresh();
            resetForm();
          }
        })
        .catch((err: any) => {
          setSubmitting(false);
          setShowAlert(true);
          setAlertMsg({
            message: "Failed to add tags! Please try again.",
            alertBoxColor: "danger",
          });
        });
    } else {
      const endPoint = `/${currentInstitute}/tags/${tagObj.id}`;
      setSubmitting(true);
      updateTagsData(endPoint, values).then((res: any) => {
        togglemodalshow(false);
        setSubmitting(false);
        updateAddRefresh();
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
            {tagObj.id === 0 ? "Add Tags" : "Update Tags"}
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
            validationSchema={tagsSchema}
            onSubmit={(values, action) => {
              handleFormData(values, action);
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <FieldLabel
                    htmlfor="name"
                    labelText="Tag Name"
                    required="required"
                    star="*"
                  />
                  <FieldTypeText name="name" placeholder="Name" />
                  <FieldErrorMessage
                    errors={errors.name}
                    touched={touched.name}
                    msgText="Tag Name required atleast 1 character"
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
                      btnText={tagObj.id === 0 ? "Submit" : "Update"}
                    />{" "}
                    {tagObj.id === 0 && (
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
                    btnText={tagObj.id === 0 ? "Submitting..." : "Updating..."}
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

export default TagsModal;
