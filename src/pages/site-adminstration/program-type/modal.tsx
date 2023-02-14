import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  postData as addProgramData,
  putData as putProgramData,
} from "../../../adapters/microservices";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

// Formik Yup validation === >>>
const programTypeSchema = Yup.object({
  name: Yup.string().min(3).max(25).required("Please Enter Name"),
  description: Yup.string().max(100).required("Please Enter Address"),
  isBatchYearRequired: Yup.bool()
    .required("Please Check")
    .oneOf([true], "Please Check the required field"),
});

const AddProgramModal = ({
  programtypeobj,
  togglemodalshow,
  refreshprogramdata,
  show,
  onHide,
}: any) => {

  // Initial values of react table === >>>
  const initialValues = {
    name: programtypeobj.name,
    description: programtypeobj.description,
    isBatchYearRequired: programtypeobj.batchYearRequired,
  };

  // custom Obj & handle form data === >>>
  let formTitles = {
    titleHeading: "",
    btnTitle: "",
  };
  if (programtypeobj.id === 0) {
    formTitles = {
      titleHeading: "Add Program Type",
      btnTitle: "Save",
    };
  } else {
    formTitles = {
      titleHeading: "Update Program Type",
      btnTitle: "Update",
    };
  }

  // handle Form CRUD operations === >>>
  const handleFormData = (values: any, { setSubmitting, resetForm }: any) => {
    let endPoint = "/program-types";
    setSubmitting(true);
    if (programtypeobj.id === 0) {
      addProgramData(endPoint, values)
      .then((res) => {
          if (res.data !== "") {
            togglemodalshow(false);
            refreshprogramdata(true);
            setSubmitting(false);
            resetForm();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      endPoint += `/${programtypeobj.id}`;
      putProgramData(endPoint, values)
      .then((res) => {
          if (res.data !== "" && res.status === 200) {
            togglemodalshow(false);
            refreshprogramdata(true);
            setSubmitting(false);
            resetForm();
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
          validationSchema={programTypeSchema}
          onSubmit={(values, action) => {
            handleFormData(values, action);
            console.log(values)
          }}
        >
          {({ errors, touched }) => (
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
              <div className="mb-3">
                <Field name="isBatchYearRequired" type="checkbox" />{" "}
                <span style={{ color: "#666" }}>Batch Year Required?</span>
                {errors.description && touched.description ? (
                  <p className="error-message">
                    Please check the required field
                  </p>
                ) : null}
              </div>
              <div className="text-center">
                <Button variant="primary" type="submit">
                  {formTitles.btnTitle}
                </Button>{" "}
                {formTitles.btnTitle === "Save" && (
                  <Button variant="outline-secondary" type="reset">
                    Reset
                  </Button>
                )}
              </div>
              <div className="mt-4" style={{ color: "#666" }}>
                <span style={{ fontWeight: "600" }}>Note: </span>If batch year
                checked it's available on add program form.
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default AddProgramModal;
