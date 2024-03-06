import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import React from "react";
import { Modal } from "react-bootstrap";
import FieldLabel from "../../../../widgets/formInputFields/labels";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import FieldErrorMessage from "../../../../widgets/formInputFields/errorMessage";
import FieldTypeText from "../../../../widgets/formInputFields/formTextField";
import { putData } from "../../../../adapters/microservices";
import gearIcon from "../../../../assets/images/icons/setting-action.svg";
import WaveBottom from "../../../../assets/images/background/bg-modal.svg"

type Props = {
  onHide: any;
  modalShow: boolean;
  programId: any;
  refreshcategories: any;
  toggleModalShow: any;
  maxMinorCoursesObj: any;
  categoryData: any;
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
    dateUserUnenrolmentAllowed: props.maxMinorCoursesObj.dateUserUnenrolmentAllowed,
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

  const Getcategory = props.categoryData.filter((category:any) => {
    return category.id === props.maxMinorCoursesObj.id;
  }).map((category:any) => category.name);
  
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
            {Getcategory} : Settings
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
                    labelText="Max Minor Courses Allowed"
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

                <div className="mb-3">
                  <FieldLabel
                    htmlfor="startDate"
                    labelText="User UnEnrol Allowed Until Date"
                    required="required"
                  />
                  <FieldTypeText
                    type="date"
                    name="dateUserUnenrolmentAllowed"
                    min={new Date()}
                    placeholder="Start Date"
                  />
                  {/* <FieldErrorMessage
                    errors={errors.startDate}
                    touched={touched.startDate}
                    msgText="Required"
                  /> */}
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

export default ModalForm;
