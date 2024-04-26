import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { Modal } from "react-bootstrap";
import FieldLabel from "../../../../widgets/formInputFields/labels";
import CustomButton, {
  LoadingButton,
} from "../../../../widgets/formInputFields/buttons";
import WaveBottom from "../../../../assets/images/background/bg-modal.svg";
import FieldTypeText from "../../../../widgets/formInputFields/formTextField";
import { getData, postData, putData } from "../../../../adapters/microservices";
import { useParams } from "react-router-dom";
import FieldErrorMessage from "../../../../widgets/formInputFields/errorMessage";
import Swal from "sweetalert2";
import TimerAlertBox from "../../../../widgets/alert/timerAlert";

type Props = {
  onHide: any;
  modalShow: boolean;
  toggleModalShow: any;
  cosAbbreviation: any;
  refreshToggle: any;
  outcomeObj: any;
};

// Formik Yup validation === >>>
const Schema = Yup.object({
  suffixValue: Yup.string().required("Course outcome name is required"),
  description: Yup.string().max(100).required("Description is required"),
  target: Yup.number().required("Target must be required"),
});

const AddCosModal = (props: Props) => {
  const { id } = useParams();
  const [statusValue, setStatusValue] = useState("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState({
    message: "",
    alertBoxColor: "",
  });

  const initialValues = {
    suffixValue: props.outcomeObj.suffixValue,
    description: props.outcomeObj.description,
    target: props.outcomeObj.target,
  };

  // Formik Yup validation === >>>
  // const queryFormSchema = Yup.object({
  //   status: Yup.string().trim().required("status is required"),
  // });

  const handleFormSubmit = (values: any, action: any) => {
    action.setSubmitting(true);
    if (props.outcomeObj.id === 0) {
      postData(`/${id}/courseoutcomes/add`, values)
        .then((res: any) => {
          if (res.data !== "" && res.status === 200) {
            action.setSubmitting(false);
            props.toggleModalShow(false);
            props.refreshToggle();
            Swal.fire({
              timer: 3000,
              width: "25em",
              color: "#666",
              icon: "success",
              background: "#e7eef5",
              showConfirmButton: false,
              text: "Course outcome added successfully",
            });
          }
          // Reset the form after a successful submission
          action.resetForm();
        })
        .catch((error: any) => {
          action.setSubmitting(false);
          setShowAlert(true);
          setAlertMsg({
            message: error.response.data.message,
            alertBoxColor: "danger",
          });
        });
    } else {
      console.log(values);
      let newValues = {
        ...values,
        id: props.outcomeObj.id,
      };
      putData(`/${id}/courseoutcomes`, newValues)
        .then((res: any) => {
          if (res.data !== "" && res.status === 200) {
            action.setSubmitting(false);
            props.toggleModalShow(false);
            props.refreshToggle();
            Swal.fire({
              timer: 3000,
              width: "25em",
              color: "#666",
              icon: "success",
              background: "#e7eef5",
              showConfirmButton: false,
              text: "Course outcome updated successfully",
            });
          }
          // Reset the form after a successful submission
          action.resetForm();
        })
        .catch((error: any) => {
          action.setSubmitting(false);
          setShowAlert(true);
          setAlertMsg({
            message: error.response.data.message,
            alertBoxColor: "danger",
          });
        });
    }
  };

  const getCurrentValue = (
    e: any,
    handleChange: (e: React.ChangeEvent<any>) => void
  ) => {
    if (e.type === "change") {
      handleChange(e);
      setStatusValue(e.target.value);
    }
  };

  const handlesReset = () => {
    setStatusValue("");
  };

  console.log(props.cosAbbreviation, "-------------")

  return (
    <React.Fragment>
      <Modal
        centered
        onHide={props.onHide}
        show={props.modalShow}
        aria-labelledby="contained-modal-title-vcenter"
        className="modal-design-wrapper"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.outcomeObj.id === 0 ? "Add CO's" : "Update CO's"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TimerAlertBox
            className="mt-3"
            showAlert={showAlert}
            alertMsg={alertMsg.message}
            variant={alertMsg.alertBoxColor}
            setShowAlert={setShowAlert}
          />
          <Formik
            initialValues={initialValues}
            validationSchema={Schema}
            onSubmit={(values, action) => {
              handleFormSubmit(values, action);
            }}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <div className="mb-3">
                <FieldLabel
                    htmlfor="suffixValue"
                    labelText="Suffix Value"
                    required="required"
                    // star="*"
                  />
                  <label htmlFor="" className="d-flex programModalInput">
                    {props.cosAbbreviation !== undefined &&
                      props.cosAbbreviation}
                    <Field
                      className="w-25"
                      type="number"
                      name="suffixValue"
                      as={FieldTypeText}
                    />
                  </label>
                  <FieldErrorMessage
                    errors={errors.suffixValue}
                    touched={touched.suffixValue}
                  />
                </div>

                <div className="mb-3">
                  <FieldLabel
                    htmlfor="description"
                    labelText="Description"
                    required="required"
                    // star="*"
                  />
                  <FieldTypeText
                    id=""
                    name="description"
                    placeholder="Description"
                  />
                  <FieldErrorMessage
                    errors={errors.description}
                    touched={touched.description}
                    msgText="Name required atleast 1 character"
                  />
                </div>

                <div className="mb-3">
                  <FieldLabel
                    htmlfor="target"
                    labelText="Target"
                    required="required"
                    // star="*"
                  />
                  <FieldTypeText
                    id=""
                    type="number"
                    name="target"
                    placeholder="Target"
                  />
                  <FieldErrorMessage
                    errors={errors.target}
                    touched={touched.target}
                    msgText="Name required atleast 1 character"
                  />
                </div>

                {isSubmitting === false ? (
                  <div className="modal-buttons">
                    <CustomButton
                      type="submit"
                      variant="primary"
                      isSubmitting={isSubmitting}
                      btnText="Submit"
                    />{" "}
                    {props.outcomeObj.id === 0 && (
                      <CustomButton
                        type="reset"
                        btnText="Reset"
                        variant="outline-secondary"
                        onClick={handlesReset}
                      />
                    )}
                  </div>
                ) : (
                  <LoadingButton
                    variant="primary"
                    btnText={
                      // commonProps.departmentobj.id === 0
                      //   ?
                      "Submitting..."
                      // : "Updating..."
                    }
                    className="modal-buttons"
                  />
                )}
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <img src={WaveBottom} alt="WaveBottom" className="wavebg" />
      </Modal>
    </React.Fragment>
  );
};

export default AddCosModal;
