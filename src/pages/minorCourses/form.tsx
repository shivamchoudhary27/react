import * as Yup from "yup";
import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import FieldLabel from "../../widgets/formInputFields/labels";
import CustomButton from "../../widgets/formInputFields/buttons";
import FieldTypeText from "../../widgets/formInputFields/formTextField";
import FieldErrorMessage from "../../widgets/formInputFields/errorMessage";

type Props = {
  onHide: any;
  refreshToggle: any;
  modalShow: boolean;
  toggleModalShow: any;
};

const validationSchema = Yup.object({
  maxMinorCoursesAllowed: Yup.number()
    .required("Field is required")
    .integer("Must be an integer")
    .positive("Must be a positive integer")
    .min(0, "Must be greater than or equal to 0"),
});

const ModalForm = (props: Props) => {
  const initialValues = {
    maxMinorCoursesAllowed: ""
  };

const handleFormSubmit = (values:any, action:any) => {
    console.log(values)
}

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
            Max Minor Courses Allowed
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, action) => {
              handleFormSubmit(values, action);
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <FieldLabel
                    htmlFor="maxMinorCoursesAllowed" />
                  <Field
                    type="number"
                    name="maxMinorCoursesAllowed"
                    as={FieldTypeText}
                  />
                  <FieldErrorMessage
                    errors={errors.maxMinorCoursesAllowed}
                    touched={touched.maxMinorCoursesAllowed}
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

export default ModalForm;
