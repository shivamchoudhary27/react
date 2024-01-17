import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Modal } from "react-bootstrap";
import { putData } from "../../../adapters/microservices";
import FieldLabel from "../../../widgets/formInputFields/labels";
import CustomButton from "../../../widgets/formInputFields/buttons";

type Props = {
  onHide: any;
  modalShow: boolean;
  updateAddRefresh: any;
  topicObj: any;
  toggleModalShow: any;
  updateTopicFilter: any;
  selectedTopic: any;
};

const StatusModalForm = (props: Props) => {
  const [statusValue, setStatusValue] = useState("");

  const initialValues = {
    status: props.topicObj.status,
    query: props.topicObj.query,
  };  

// Formik Yup validation === >>>
const queryFormSchema = Yup.object({
  status: Yup.string().trim().required("status is required"),
});

  const handleFormSubmit = (values: any, action: any) => {
    action.setSubmitting(true);
    putData(`/enquiry/admin/${props.topicObj.id}`, values)
      .then((res: any) => {
        if (res.data !== "" && res.status === 200) {
          props.toggleModalShow(false);
          action.setSubmitting(false);
          props.updateAddRefresh();
        }
        // Reset the form after a successful submission
        action.resetForm();
      })
      .catch((error: any) => {
        console.log(error);
      });
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
            Update Status
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={queryFormSchema}
            onSubmit={(values, action) => {
              handleFormSubmit(values, action);
            }}
          >
            {({ errors, isSubmitting,handleChange,handleReset, setValues, resetForm  }) => (
              <Form>
                <div className="mb-3">
                  <FieldLabel
                    htmlfor="status"
                    labelText="Status"
                    required="required"
                    star="*"
                  />
                  <select
                    className="form-select"
                    name="status"
                    onChange={(e) => getCurrentValue(e, handleChange)}
                    // onChange={(e) => getCurrentValue(e)}
                    value={statusValue}
                  >
                    <option value="">Select Status</option>
                    <option value="open">Open</option>
                    <option value="close">Close</option>
                  </select>
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
                    onClick={handlesReset}
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

export default StatusModalForm;
