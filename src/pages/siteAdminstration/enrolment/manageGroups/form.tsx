import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import FieldLabel from "../../../../widgets/formInputFields/labels";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import { postData, putData } from "../../../../adapters/microservices";
import { globalAlertActions } from "../../../../store/slices/globalAlerts";
import WaveBottom from "../../../../assets/images/background/bg-modal.svg";
import { LoadingButton } from "../../../../widgets/formInputFields/buttons";
import FieldTypeText from "../../../../widgets/formInputFields/formTextField";
import FieldErrorMessage from "../../../../widgets/formInputFields/errorMessage";
import FieldTypeTextarea from "../../../../widgets/formInputFields/formTextareaField";
import Swal from "sweetalert2";
import FieldTypeCheckbox from "../../../../widgets/formInputFields/formCheckboxField";
import { capitalizeFirstWords } from "../../../../globals/titleCapitalize/capitalizeFirstWords";

// Formik Yup validation === >>>
const Schema = Yup.object({
  name: Yup.string().min(1).trim().required("Group name is required"),
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
    published: groupObj.published
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
            Swal.fire({
              timer: 3000,
              width: "25em",
              color: "#666",
              icon: "success",
              background: "#e7eef5",
              showConfirmButton: false,
              text: "Group has been successfully added"
            });
            resetForm();
          }
        })
        .catch((err: any) => {
          if (err.response.status === 404 || err.response.status === 400) {
            if (err.response.data.userEmail !== undefined) {
              dispatch(globalAlertActions.globalAlert({alertMsg: err.response.data.userEmail, status: true}))
            } else {
              dispatch(globalAlertActions.globalAlert({alertMsg: err.response.data.message, status: true}))
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
            Swal.fire({
              timer: 3000,
              width: "25em",
              color: "#666",
              icon: "success",
              background: "#e7eef5",
              showConfirmButton: false,
              text: "Group has been successfully updated"
            });
          }
        })
        .catch((err: any) => {
          if (err.response.status === 404 || err.response.status === 400) {
            if (err.response.data.userEmail !== undefined) {
              dispatch(globalAlertActions.globalAlert({alertMsg: err.response.data.userEmail, status: true}))
            } else {
              dispatch(globalAlertActions.globalAlert({alertMsg: err.response.data.message, status: true}))
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
        className="modal-design-wrapper"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {groupObj.id === 0 ? capitalizeFirstWords("Add Group") : capitalizeFirstWords("Update Group")}
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
        <img src={WaveBottom} alt="WaveBottom" className="wavebg"/>
      </Modal>
    </React.Fragment>
  );
};

export default GroupModal;
