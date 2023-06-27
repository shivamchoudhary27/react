import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Formik, Form } from "formik";
import FieldLabel from "../../../../widgets/formInputFields/labels";
import FieldTypeText from "../../../../widgets/formInputFields/formTextField";
import FieldErrorMessage from "../../../../widgets/formInputFields/errorMessage";
import FieldTypeCheckbox from "../../../../widgets/formInputFields/formCheckboxField";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import * as Yup from "yup";

const initialValues = {
  email: "",
};

// Formik Yup validation === >>>
const userFormSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const AssignInstituteModal = ({ show, onHide }: any) => {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const handleCheckboxChange = (checkboxId) => {
    if (selectedCheckboxes.includes(checkboxId)) {
      setSelectedCheckboxes(
        selectedCheckboxes.filter((id) => id !== checkboxId)
      );
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, checkboxId]);
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
            Assign Institute Admin Role
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={userFormSchema}
            onSubmit={(values, action) => {
              console.log(values);
            }}
          >
            {({ errors, touched, isSubmitting, setValues, values }) => (
              <Form>
                <div className="mb-3">
                  <FieldLabel
                    htmlfor="Email"
                    labelText="Email"
                    required="required"
                    star="*"
                  />
                  <FieldTypeText name="email" placeholder="Email" />
                  <FieldErrorMessage
                    errors={errors.email}
                    touched={touched.email}
                    msgText="Email is required"
                  />
                  <CustomButton type="button" btnText="Search" />
                </div>

                <div className="mb-3">
                  <FieldLabel
                    htmlfor="Institite"
                    labelText="Select Institute"
                    required="required"
                    star="*"
                  />
                  <div style={{ overflow: "auto", height: "150px" }}>
                    {options.map((option, index) => (
                      <div key={option.id}>
                        <label>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={selectedCheckboxes.includes(option.id)}
                            onChange={() => handleCheckboxChange(option.id)}
                          />{" "}
                          {option.label}
                        </label>
                      </div>
                    ))}{" "}
                  </div>
                  <FieldErrorMessage
                    errors=""
                    touched=""
                    msgText="Please Check required field"
                  />
                </div>

                <div className="modal-buttons">
                  <CustomButton
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    btnText="Submit"
                  />{" "}
                  <CustomButton
                    type="reset"
                    btnText="Reset"
                    variant="outline-secondary"
                    // onClick={() => setShowAlert(false)}
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

export default AssignInstituteModal;

const options = [
  { id: 1, label: "Option 1" },
  { id: 2, label: "Option 2" },
  { id: 3, label: "Option 3" },
  { id: 4, label: "Option 4" },
  { id: 5, label: "Option 5" },
  { id: 6, label: "Option 6" },
  { id: 7, label: "Option 7" },
];
