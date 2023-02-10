import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import { Formik, Field, Form } from "formik";

import * as Yup from "yup";

const programTypeSchema = Yup.object({
  name: Yup.string().min(3).max(25).required("Please Enter Name"),
  description: Yup.string().max(100).required("Please Enter Address"),
  check: Yup.bool().required("Please Check"), //oneOf([true], "Please Check the required field")
});

const initialValues = {
  name: "",
  description: "",
  check: "",
};

const AddProgramModal = (props: any) => {
  // const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
  //   useFormik({
  //     initialValues: initialValues,
  //     validationSchema: programTypeSchema,
  //     onSubmit: (values, action) => {
  //       console.log(values);
  //       action.resetForm();
  //     },
  //   });

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Program Type
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={programTypeSchema}
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
              <div className="mb-3">
                <input name="check" type="checkbox" />{" "}
                <span style={{ color: "#666" }}>Batch Year Required?</span>
                {errors.description && touched.description ? (
                  <p className="error-message">
                    Please check the required field
                  </p>
                ) : null}
              </div>
              <div className="text-center">
                <Button variant="primary" type="submit">
                  Save
                </Button>{" "}
                <Button variant="outline-secondary">Reset</Button>
              </div>
              <div className="mt-4" style={{ color: "#666" }}>
                <span style={{ fontWeight: "600" }}>Note: </span>If batch year
                checked it's available on add program form.
              </div>
            </Form>
          )}
        </Formik>
        {/* <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-3"
            name="name"
            autoComplete="off"
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
          <input
            name="check"
            type="checkbox"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.check}
          />{" "}
          <span style={{ color: "#666" }}>Batch Year Required?</span>
          {errors.check && touched.check ? <p>{errors.check}</p> : null}
          <div className="mt-4 text-center">
            <Button variant="primary" type="submit">
              Save
            </Button>{" "}
            <Button variant="outline-secondary">Reset</Button>
          </div>
          <p className="mt-4" style={{ color: "#666" }}>
            <span style={{ fontWeight: "600" }}>Note: </span>If batch year
            checked it's available on add program form.
          </p>
        </form> */}
      </Modal.Body>
    </Modal>
  );
};

export default AddProgramModal;
