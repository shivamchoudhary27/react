import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Formik, Field, Form } from "formik";
import {
  postData as addDisciplineData,
  putData as putDesciplineData,
} from "../../../adapters/microservices";
import * as Yup from "yup";

// Formik Yup Validation === >>>
const diciplineSchema = Yup.object({
  name: Yup.string().min(3).max(25).required("Please Enter Name"),
  description: Yup.string().max(100).required("Please Enter Address"),
});

const DiciplineModal = ({
  disciplineobj,
  togglemodalshow,
  refreshDisciplineData,
  show,
  onHide,
}: any) => {

  // Initial values of react table === >>>
const initialValues = {
  name: disciplineobj.name,
  description: disciplineobj.description,
};

console.log(disciplineobj.name)

  // custom Obj & handle form data === >>>
  let formTitles = {
    btnTitle: "",
    titleHeading: "",
  };
  if (disciplineobj.id === 0) {
    formTitles = {
      btnTitle: "Save",
      titleHeading: "Add Discipline",
    };
  } else {
    formTitles = {
      btnTitle: "Update",
      titleHeading: "Update Discipline",
    };
  }

  // handle Form CRUD operations === >>>
  const handleFormData = (values: {}, { setSubmitting, resetForm }: any) => {
    let endPoint = "/disciplines";
    setSubmitting(true);
    if (disciplineobj.id === 0) {
      addDisciplineData(endPoint, values)
        .then((res) => {
          if(res.data !== ""){
            togglemodalshow(false);
            refreshDisciplineData(true);
            setSubmitting(false);
            resetForm();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      endPoint += `/${disciplineobj.id}`;
      putDesciplineData(endPoint, values)
        .then((res) => {
          console.log(values, res)
          if(res.data !== "" && res.status === 200){
            togglemodalshow(false);
            refreshDisciplineData(true);
            setSubmitting(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
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
                <Field
                  id="name"
                  name="name"
                  placeholder="Name"
                  className="form-control"
                />
                {errors.name && touched.name ? (
                  <p className="error-message">Please Enter name</p>
                ) : null}
              </div>

              <div className="mb-3">
                <Field
                  id="description"
                  name="description"
                  component="textarea"
                  placeholder="Description"
                  className="form-control"
                />
                {errors.description && touched.description ? (
                  <p className="error-message">Please enter description</p>
                ) : null}
              </div>
              <div className="text-center">
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  {formTitles.btnTitle}
                </Button>{" "}
                {formTitles.btnTitle === "Save" && (
                  <Button variant="outline-secondary">Reset</Button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default DiciplineModal;
