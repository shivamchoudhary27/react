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

  // Comp for show custom ERROR_Messages ===== >>>
  const Error_Message = ({ val }: any) => {
    return (
      <p className="error-message">
        <i className="fa fa-circle-exclamation"></i> {val}
      </p>
    );
  };

  // Form submit & reset buttons ===== >>>
  const FORM_BUTTTONS = ({isSubmitting}: any) => {
    return (
      <div className="text-center">
        <Button variant="primary" type="submit" disabled={isSubmitting}>
          {formTitles.btnTitle}
        </Button>{" "}
        {formTitles.btnTitle === "Save" && (
          <Button variant="outline-secondary" type="reset">
            Reset
          </Button>
        )}
      </div>
    );
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
                  <Error_Message val={"Please Enter name"} />
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
                  <Error_Message val={"Please Enter description"} />
                ) : null}
              </div>
              <div className="mb-3">
                <Field name="isBatchYearRequired" type="checkbox" />{" "}
                <span style={{ color: "#666" }}>Batch Year Required?</span>
                {errors.isBatchYearRequired && touched.isBatchYearRequired ? (
                  <Error_Message val={"Please Check required field"} />
                ) : null}
              </div>
              {<FORM_BUTTTONS isSubmitting={isSubmitting} />}
              <div className="mt-4" style={{ color: "#666" }}>
                <span style={{ fontWeight: "600" }}>Note: </span>If batch year is
                checked then it is available on add program form.
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default AddProgramModal;
