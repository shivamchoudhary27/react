import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const departmentSchema = Yup.object({
  name: Yup.string().min(3).max(25).required("Please Enter Name"),
  description: Yup.string().max(100).required("Please Enter Address"),
});

const initialValues = {
  name: "",
  description: "",
};

const DepartmentModal = (props: any) => {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Department
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={departmentSchema}
          onSubmit={(values, action) => {
            console.log(values);
            action.resetForm();
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
              <div className="text-center">
                <Button variant="primary" type="submit">
                  Save
                </Button>{" "}
                <Button variant="outline-secondary">Reset</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default DepartmentModal;
