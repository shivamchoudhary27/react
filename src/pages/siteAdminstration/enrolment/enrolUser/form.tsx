import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import React from "react";
import { Modal } from "react-bootstrap";
import FieldLabel from "../../../../widgets/formInputFields/labels";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import FieldErrorMessage from "../../../../widgets/formInputFields/errorMessage";
import FieldTypeText from "../../../../widgets/formInputFields/formTextField";
import { putData } from "../../../../adapters/microservices";

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
    id: props.maxMinorCoursesObj.id,
    name: props.maxMinorCoursesObj.name,
    level: props.maxMinorCoursesObj.level,
    weight: props.maxMinorCoursesObj.weight,
    parent: props.maxMinorCoursesObj.parent,
    maxMinorCoursesAllowed: props.maxMinorCoursesObj.maxMinorCoursesAllowed,
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
