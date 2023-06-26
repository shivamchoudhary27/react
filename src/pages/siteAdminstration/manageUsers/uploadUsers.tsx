import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form } from "formik";
import FieldErrorMessage from "../../../widgets/formInputFields/errorMessage";
import * as Yup from "yup";
import { postData } from "../../../adapters/microservices";

const validationSchema = Yup.object().shape({
  file: Yup.mixed().required("File is required"),
});

const UploadUsersEnrollment = ({
  show,
  onHide,
  togglemodalshow,
  updateAddRefresh,
  programid,
}: any) => {
  const [submitBtn, setSubmitBtn] = React.useState("Submit");
  const [uploadResponse, setUploadresponse] = React.useState("");

  const handleFormData = (values: {}, { setSubmitting, resetForm }: any) => {
    setSubmitBtn("Submitting...");
    setUploadresponse("");
    postData(`/csv/program-user-erol/${programid}`, {}, values.file)
      .then((res: any) => {
        console.log("res", res);
        if (res.status === 200) {
          let responseMsg = "";
          if (res.data.total_rows_processed !== undefined) {
            responseMsg += `<strong>Success :</strong> <p>Total rows processed : ${res.data.total_rows_processed} </p>`;
          }
          if (
            res.data.rows_not_processed !== undefined &&
            Object.keys(res.data.rows_not_processed).length > 0
          ) {
            responseMsg += `<strong>Error :</strong>`;
            Object.entries(res.data.rows_not_processed).map(
              ([key, value]) =>
                (responseMsg += `<p><strong>${key}</strong>: ${value} </p>`)
            );
          }
          setUploadresponse(responseMsg);
          resetForm();
          updateAddRefresh();
          setSubmitting(false);
        }
        setSubmitBtn("Submit");
      })
      .catch((err: any) => {
        console.log("error", err);
        window.alert("Some error occurred");
        setSubmitBtn("Submit");
      });
  };

  return (
    <React.Fragment>
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Upload file
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{ file: null }}
            validationSchema={validationSchema}
            onSubmit={(values, action) => {
              handleFormData(values, action);
            }}
          >
            {({ values, setFieldValue, errors, touched }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="file">Upload a csv file:</label>
                  <input
                    className="form-control"
                    id="file"
                    name="file"
                    type="file"
                    onChange={(event) => {
                      setFieldValue("file", event.currentTarget.files[0]);
                    }}
                  />
                  <FieldErrorMessage
                    errors={errors.file}
                    touched={touched.file}
                    msgText="File is required"
                  />
                </div>
                <div className="modal-buttons">
                  <button className="btn btn-primary" type="submit">
                    {submitBtn}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <div dangerouslySetInnerHTML={{ __html: uploadResponse }} />
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default UploadUsersEnrollment;
