import Modal from "react-bootstrap/Modal";
import { Formik, Form } from "formik";
import { postData } from "../../../../adapters/microservices";
import * as Yup from "yup";
import FieldLabel from "../../../../widgets/form_input_fields/labels";
import FieldTypeText from "../../../../widgets/form_input_fields/form_text_field";
import Custom_Button from "../../../../widgets/form_input_fields/buttons";
import FieldErrorMessage from "../../../../widgets/form_input_fields/error_message";

// Formik Yup Validation === >>>
const diciplineSchema = Yup.object({
  userEmail: Yup.string().email().required('sdfdf'),
});

const DiciplineModal = ({
  disciplineobj,
  togglemodalshow,
  refreshDisciplineData,
  show,
  onHide,
  courseid
}: any) => {
  // Initial values of react table === >>>
  const initialValues = {
    userEmail: ""
  };

  // custom Obj & handle form data === >>>
  let formTitles = {
    btnTitle: "",
    titleHeading: "",
  };
  if (disciplineobj.id === 0) {
    formTitles = {
      btnTitle: "Save",
      titleHeading: "Enrol User",
    };
  }

  // handle Form CRUD operations === >>>
  const handleFormData = (values: {}, { setSubmitting, resetForm }: any) => {
    console.log(values);
    
    let endPoint = `/course/${courseid}/enrol-user`;
    setSubmitting(true);
    postData(endPoint, values)
      .then((res: any) => {
        if (res.data !== "") {
          togglemodalshow(false);
          refreshDisciplineData();
          setSubmitting(false);
          resetForm();
        }
      })
      .catch((err: any) => {
        console.log(err);
        if (err.response.status === 404 || err.response.status === 400) {
          if (err.response.data.userEmail !== undefined) {
            window.alert(err.response.data.userEmail);
          } else {
            window.alert(err.response.data.message);
          }
        }
      });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {formTitles.titleHeading}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={diciplineSchema}
          onSubmit={(values, action) => {
            handleFormData(values, action);
            action.resetForm();
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <FieldLabel
                  htmlfor="userEmail"
                  labelText="Email"
                  required="required"
                  star="*"
                />
                <FieldTypeText name="userEmail" placeholder="User Email" />
                <FieldErrorMessage
                  errors={errors.userEmail}
                  touched={touched.userEmail}
                  msgText="Enter proper user email address"
                />
              </div>              
              <div className="text-center">
                <Custom_Button
                  type="submit"
                  variant="primary"
                  isSubmitting={isSubmitting}
                  btnText={formTitles.btnTitle}
                />{" "}
                {/* {formTitles.btnTitle === "Save" && ( */}
                  <Custom_Button
                    type="reset"
                    btnText="Reset"
                    variant="outline-secondary"
                  />
                {/* )} */}
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default DiciplineModal;
