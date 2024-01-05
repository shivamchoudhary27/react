import * as Yup from "yup";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { postData } from "../../../adapters/microservices";
import FieldLabel from "../../../widgets/formInputFields/labels";
import CustomButton from "../../../widgets/formInputFields/buttons";
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
  // topicName: Yup.string().required("Please select Topic"),
  query: Yup.string().trim().min(5).required("query is required"),
});

const NewRequestForm = (props: Props) => {
  const [topicId, setTopicId] = useState("");

  const handleFormSubmit = (values: any, action: any) => {
    if (topicId !== "") {
      action.setSubmitting(true);
      postData(`/enquiry/${parseInt(topicId)}`, values)
        .then((res: any) => {
          if (res.data !== "" && res.status === 200) {
            console.log(res.data);
            props.toggleModalShow(false);
            action.setSubmitting(false);
            props.updateAddRefresh()
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  };

  const getCurrentValue = (e: any) => {
    if (e.type === "change") {
      setTopicId(e.target.value);
    }
  };

  const getCurrentProgramValue = (e: any) => {
    if (e.type === "change") {
      console.log(e.target.value);
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
            New Request
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
          <Formik
            initialValues={initialValues}
            validationSchema={queryFormSchema}
            onSubmit={(values, action) => {
              handleFormSubmit(values, action);
            }}
          >
            {({ errors, touched, isSubmitting, setValues }) => (
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
                    onChange={getCurrentValue}
                    // value={selectedValue}
                  >
                    <option value="0">Select Topic</option>
                    {props.selectedTopic.map((option: any, index: number) => (
                      <option key={index} value={option.id}>
                        {option.topicName}
                      </option>
                    ))}
                  </select>
                  {/* <FieldErrorMessage
                    errors={errors.topicName}
                    touched={touched.topicName}
                  /> */}
                </div>

                <div className="mb-3">
                  <FieldLabel
                    htmlfor="name"
                    labelText="Program"
                    required="required"
                    star="*"
                  />
                  <select
                    className="form-select"
                    name="name"
                    onChange={getCurrentProgramValue}
                    // value={selectedValue}
                  >
                    <option value="0">Select Program</option>
                    {props.selectedProgram.map((option: any, index: number) => (
                      <option key={index} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                  {/* <FieldErrorMessage
                    errors={errors.topicName}
                    touched={touched.topicName}
                  /> */}
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
      </Modal>
    </React.Fragment>
  );
};

export default NewRequestForm;
