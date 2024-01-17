import * as Yup from "yup";
import { Formik, Form } from "formik";
import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import FieldLabel from "../../../../widgets/formInputFields/labels";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import FieldErrorMessage from "../../../../widgets/formInputFields/errorMessage";
import FieldTypeTextarea from "../../../../widgets/formInputFields/formTextareaField";
import { putData } from "../../../../adapters/microservices";
import FieldTypeText from "../../../../widgets/formInputFields/formTextField";

type Props = {
  onHide: any;
  modalShow: boolean;
  programId: any;
  refreshcategories: any;
  toggleModalShow: any;
  maxMinorCoursesObj: any;
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
    ...props.maxMinorCoursesObj,
    maxMinorCoursesAllowed: "",
  };

  const handleFormSubmit = (values: any, { setSubmitting }: any) => {
    putData(`/${props.programId}/category/${props.maxMinorCoursesObj.id}`, {
      ...values,
    })
      .then((result: any) => {
        if (result.data !== "" && result.status === 200) {
          props.toggleModalShow(false);
          setSubmitting(true);
          props.refreshcategories();
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
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
            {({ errors, touched, handleChange, isSubmitting, setValues }) => (
              <Form>
                <div className="mb-3">
                  <FieldLabel
                    htmlfor="maxMinorCoursesAllowed"
                    // labelText="Max Minor Courses Allowed"
                    // required="required"
                  />
                  <FieldTypeText
                    type="number"
                    name="maxMinorCoursesAllowed"
                    placeholder="Maximum Number Of Minor Courses"
                    onChange={handleChange}
                  />
                  <FieldErrorMessage
                    errors={errors.maxMinorCoursesAllowed}
                    touched={touched.maxMinorCoursesAllowed}
                    // msgText="query is required"
                  />
                </div>
                {isSubmitting === false && (
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
                )}
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default ModalForm;
