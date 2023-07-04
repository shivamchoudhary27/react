import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form } from "formik";
import FieldLabel from "../../../../widgets/formInputFields/labels";
import FieldTypeText from "../../../../widgets/formInputFields/formTextField";
import FieldErrorMessage from "../../../../widgets/formInputFields/errorMessage";
import FieldTypeTextarea from "../../../../widgets/formInputFields/formTextareaField";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import * as Yup from "yup";
import { postData, putData } from "../../../../adapters/microservices";
import { useDispatch } from "react-redux";
import ACTIONSLIST from "../../../../store/actions";
import { LoadingButton } from "../../../../widgets/formInputFields/buttons";

// Formik Yup validation === >>>
const Schema = Yup.object({
  name: Yup.string().min(1).required(),
  // description: Yup.string().max(100).required(),
});

const GroupModal = ({
  show,
  onHide,
  setModalShow,
  courseid,
  groupObj,
  refreshGroupData,
}: any) => {
  const dispatch = useDispatch();
  // Initial values of react table === >>>
  const initialValues = {
    name: groupObj.name,
    description: groupObj.description,
  };

  const handleSubmit = (values: {}, { setSubmitting, resetForm }: any) => {
    let endPoint = `/${courseid}/group`;
    if (groupObj.id === 0) {
      postData(endPoint, values)
        .then((res: any) => {
          if (res.data !== "" && res.status === 201) {
            setModalShow(false);
            refreshGroupData();
            setSubmitting(false);
            resetForm();
          }
        })
        .catch((err: any) => {
          if (err.response.status === 404 || err.response.status === 400) {
            if (err.response.data.userEmail !== undefined) {
              dispatch({
                type: ACTIONSLIST.mitGlobalAlert,
                alertMsg: err.response.data.userEmail,
                status: true,
              });
            } else {
              dispatch({
                type: ACTIONSLIST.mitGlobalAlert,
                alertMsg: err.response.data.message,
                status: true,
              });
            }
          }
        });
    } else {
      endPoint += `/${groupObj.id}`;
      putData(endPoint, values)
        .then((res: any) => {
          if (res.data !== "" && res.status === 200) {
            setModalShow(false);
            refreshGroupData();
            setSubmitting(false);
          }
        })
        .catch((err: any) => {
          if (err.response.status === 404 || err.response.status === 400) {
            if (err.response.data.userEmail !== undefined) {
              dispatch({
                type: ACTIONSLIST.mitGlobalAlert,
                alertMsg: err.response.data.userEmail,
                status: true,
              });
            } else {
              dispatch({
                type: ACTIONSLIST.mitGlobalAlert,
                alertMsg: err.response.data.message,
                status: true,
              });
            }
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
            {groupObj.id === 0 ? "Add Group" : "Update Group"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={Schema}
            onSubmit={(values, action) => {
              handleSubmit(values, action);
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
                {isSubmitting === false ? (
                  <div className="modal-buttons">
                    <CustomButton
                      type="submit"
                      variant="primary"
                      btnText={groupObj.id === 0 ? "Submit" : "Update"}
                    />{" "}
                    {groupObj.id === 0 && (
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
                      groupObj.id === 0 ? "Submitting..." : "Updating..."
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

export default GroupModal;
