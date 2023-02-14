import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  postData as addDepartmentData,
  putData as putDepartmentData,
} from "../../../adapters/microservices";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

// Formik Yup validation === >>>
const departmentSchema = Yup.object({
  name: Yup.string().min(3).max(25).required(),
  description: Yup.string().max(100).required(),
});

const DepartmentModal = ({
  departmentobj,
  togglemodalshow,
  refreshdepartmentdata,
  show,
  onHide,
}: any) => {
  
  // Initial values of react table === >>>
  const initialValues = {
    name: departmentobj.name,
    description: "",
  };

  // custom Obj & handle form data === >>>
  let formTitles = {
    titleHeading: "",
    btnTitle: "",
    description: "",
  };
  if (departmentobj.id === 0) {
    formTitles = {
      titleHeading: "Add Department",
      btnTitle: "Save",
      description: "",
    };
  } else {
    formTitles = {
      titleHeading: "Update Department",
      btnTitle: "Update",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typ....",
    };
  }

  // handle Form CRUD operations === >>>
  const handleFormData = (values: {}, { setSubmitting, resetForm }: any) => {
    let endPoint = "/departments";
    setSubmitting(true);
    if (departmentobj.id === 0) {
      addDepartmentData(endPoint, values)
        .then((res) => {
          if(res.data !== ""){
            togglemodalshow(false);
            refreshdepartmentdata(true);
            setSubmitting(false);
            resetForm();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      endPoint += `/${departmentobj.id}`;
      putDepartmentData(endPoint, values)
        .then((res) => {
          if(res.data !== "" && res.status === 200){
            togglemodalshow(false);
            refreshdepartmentdata(true);
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
          validationSchema={departmentSchema}
          onSubmit={(values, action) => {
            handleFormData(values, action);
          }}
        >
          {({ errors, touched, isSubmitting, values }) => (
            <Form>
              <div className="mb-3">
                <Field 
                  id="name"
                  name="name"
                  placeholder="Name"
                  className="form-control"
                  // value={values.name}
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
                  // value={}
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
                  <Button variant="outline-secondary" type="reset">
                    Reset
                  </Button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default DepartmentModal;
