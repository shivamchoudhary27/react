import * as Yup from "yup";
import Swal from "sweetalert2";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "sweetalert2/src/sweetalert2.scss";
import { postData } from "../../../adapters/microservices";
import FieldLabel from "../../../widgets/formInputFields/labels";
import CustomButton from "../../../widgets/formInputFields/buttons";
import WaveBottom from "../../../assets/images/background/bg-modal.svg";
import FieldErrorMessage from "../../../widgets/formInputFields/errorMessage";
import FieldTypeTextarea from "../../../widgets/formInputFields/formTextareaField";

type Props = {
  onHide: any;
  modalShow: boolean;
  selectedProgram: any;
  updateAddRefresh: any;
  toggleModalShow: any;
  selectedTopic: any;
};

const initialValues = {
  query: "",
  topicName: "",
  name: "",
};

// Formik Yup validation === >>>
const queryFormSchema = Yup.object({
  query: Yup.string().trim().min(5).required("query is required"),
  topicName: Yup.string().required("topicName is required"),
});

const NewRequestForm = (props: Props) => {
  const [topicId, setTopicId] = useState("");
  const [programId, setProgramId] = useState(0);

  const handleFormSubmit = (values: any, action: any) => {
    if (topicId !== "") {
      action.setSubmitting(true);
      // Construct the API URL
      let apiUrl = `/enquiry/${parseInt(topicId)}`;
      if (programId !== 0) {
        apiUrl += `?programId=${programId}`;
      }
      postData(apiUrl, values)
        .then((res: any) => {
          if (res.data !== "" && res.status === 200) {
            // Handle success case
            props.toggleModalShow(false);
            action.setSubmitting(false);
            props.updateAddRefresh();
            Swal.fire({
              timer: 3000,
              width: "25em",
              color: "#666",
              icon: "success",
              background: "#e7eef5",
              showConfirmButton: false,
              text: "New request has been added successfully",
            });
          }
        })
        .catch((error: any) => {
          console.log(error);

          // Handle errors as needed
          action.setSubmitting(false);
        });
    }
  };

  const getCurrentValue = (e: any) => {
    if (e.type === "change") {
      setTopicId(e.target.value);
    }
  };

  const getCurrentProgramValue = (e: any) => {
    setProgramId(e.target.value);
  };

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
            New Request
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={queryFormSchema}
            onSubmit={(values, action) => {
              handleFormSubmit(values, action);
            }}
            onReset={() => {
              setTopicId("")
              setProgramId(0)
            }}
          >
            {({ errors, touched, isSubmitting, setValues, handleChange }) => (
              <Form>
                <div className="mb-3">
                  <FieldLabel
                    htmlfor="topicName"
                    labelText="Topic"
                    required="required"
                    star="*"
                  />
                  <select
                    className="form-select"
                    name="topicName"
                    onChange={(e) => {
                      getCurrentValue(e);
                      handleChange(e);
                    }} 
                    value={topicId}
                  >
                    <option value="">Select Topic</option>
                    {props.selectedTopic.map((option: any, index: number) => (
                      <option key={index} value={option.id}>
                        {option.topicName}
                      </option>
                    ))}
                  </select>
                  <FieldErrorMessage
                    errors={errors.topicName}
                    touched={touched.topicName}
                  />
                </div>

                <div className="mb-3">
                  <FieldLabel
                    htmlfor="programId"
                    labelText="Program"
                    required="required"
                    // star="*"
                  />
                  <select
                    className="form-select"
                    name="programId"
                    onChange={(e) => {
                      getCurrentProgramValue(e);
                      handleChange(e);
                    }}
                    value={programId}
                  >
                    <option value={0}>Select Program</option>
                    {props.selectedProgram.map((option: any, index: number) => (
                      <option key={index} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <FieldLabel
                    star="*"
                    htmlfor="query"
                    labelText="Your Query"
                    // required="required"
                  />
                  <FieldTypeTextarea
                    name="query"
                    component="textarea"
                    placeholder="Type Here ..."
                  />
                  <FieldErrorMessage
                    errors={errors.query}
                    touched={touched.query}
                    // msgText="query is required"
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
        </Modal.Body>
        <img src={WaveBottom} alt="WaveBottom" className="wavebg"/>
      </Modal>
    </React.Fragment>
  );
};

export default NewRequestForm;
