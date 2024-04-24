import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import React, {useState} from "react";
import { Modal } from "react-bootstrap";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import FieldErrorMessage from "../../../../widgets/formInputFields/errorMessage";
import FieldTypeText from "../../../../widgets/formInputFields/formTextField";
import { putData } from "../../../../adapters/microservices";
import WaveBottom from "../../../../assets/images/background/bg-modal.svg"
import TimerAlertBox from "../../../../widgets/alert/timerAlert";

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
  
  enrolBeforeNoOfDaysToStartDate: Yup.number()
  .required("Field is required")
  .integer("Must be an integer")
  .positive("Must be a positive integer")
  .min(0, "Must be greater than or equal to 0"),
  
  unEnrolafterNoOfDaysToStartDate: Yup.number()
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
    enrolBeforeNoOfDaysToStartDate: props.maxMinorCoursesObj.enrolBeforeNoOfDaysToStartDate,
    unEnrolafterNoOfDaysToStartDate: props.maxMinorCoursesObj.unEnrolafterNoOfDaysToStartDate,
  };
  
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });

  const handleFormSubmit = (values: any, { setSubmitting }: any) => {
    setSubmitting(true);
    putData(`/${props.programId}/category/${props.maxMinorCoursesObj.id}`, {
      ...values,
    })
    .then((result: any) => {
      if (result.data !== "" && result.status === 200) {
        props.toggleModalShow(false);
        props.refreshcategories();
      }
      setSubmitting(false);
      })
      .catch((err: any) => {
        console.log(err);
        if (err.response.status === 500 || 400) {
          setShowAlert(true);
          setSubmitting(false);
          setAlertMsg({
            message: err.response.data.message,
            alertBoxColor: "danger",
          });
        }
      });
  };

  const Getcategory = props.categoryData.filter((category: any) => {
    return category.id === props.maxMinorCoursesObj.id;
  }).map((category: any) => category.name);

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
        <TimerAlertBox
            alertMsg={alertMsg.message}
            className="mt-3"
            variant={alertMsg.alertBoxColor}
            setShowAlert={setShowAlert}
            showAlert={showAlert}
          />
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
                  <label htmlFor="" className="d-flex programModalInput">
                    Students can take maximum
                  </label>
                  <label htmlFor="" className="d-flex programModalInput">

                    <Field
                      className="w-25"
                      type="number"
                      name="maxMinorCoursesAllowed"
                      as={FieldTypeText}
                    />
                      Minor Courses.
                      </label>
                    <FieldErrorMessage
                      errors={errors.maxMinorCoursesAllowed}
                      touched={touched.maxMinorCoursesAllowed}
                    />
                </div>

                <div className="mb-3">
                  <label htmlFor="" className="d-flex programModalInput">
                    Students can enroll in a course before
                  </label>
                  <label htmlFor="" className="d-flex programModalInput">
                    <Field
                      className="w-25"
                      type="number"
                      name="enrolBeforeNoOfDaysToStartDate"
                      as={FieldTypeText}
                    />
                    days of the start date.
                    </label>
                  <FieldErrorMessage
                    errors={errors.enrolBeforeNoOfDaysToStartDate}
                    touched={touched.enrolBeforeNoOfDaysToStartDate}
                    />
                </div>

                <div className="mb-3">
                  <label htmlFor="" className="d-flex programModalInput">
                    Students are not allowed to unenroll from the course after
                  </label>
                  <label htmlFor="" className="d-flex programModalInput">
                    <Field
                      className="w-25"
                      type="number"
                      name="unEnrolafterNoOfDaysToStartDate"
                      as={FieldTypeText}
                    />
                    days of the start date.
                    </label>
                  <FieldErrorMessage
                    errors={errors.unEnrolafterNoOfDaysToStartDate}
                    touched={touched.unEnrolafterNoOfDaysToStartDate}
                    />
                </div>


                {/* <div className="mb-3">
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
                  /> */}
                  {/* <FieldErrorMessage
                    errors={errors.startDate}
                    touched={touched.startDate}
                    msgText="Required"
                  /> */}
                {/* </div> */}
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
        <img src={WaveBottom} alt="WaveBottom" className="wavebg" />
      </Modal>
    </React.Fragment>
  );
};

export default ModalForm;
