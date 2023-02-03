import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";

const diciplineSchema = Yup.object({
  name: Yup.string().min(3).max(25).required("Please Enter Name"),
  description: Yup.string().max(100).required("Please Enter Address"),
});

const initialValues = {
  name: "",
  description: "",
};

const DiciplineModal = (props: any) => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: diciplineSchema,
      onSubmit: (values, action) => {
        console.log(values);
        action.resetForm();
      },
    });

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Dicipline
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            className="form-control mb-3"
            placeholder="Name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
          />
          {errors.name && touched.name ? <p>{errors.name}</p> : null}
          <textarea
            className="form-control mb-3"
            name="description"
            placeholder="Description"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description}
          ></textarea>
          {errors.description && touched.description ? (
            <p>{errors.description}</p>
          ) : null}
          <div className="mt-4 text-center">
            <Button variant="primary" type="submit">
              Save
            </Button>{" "}
            <Button variant="outline-secondary">Reset</Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default DiciplineModal;
