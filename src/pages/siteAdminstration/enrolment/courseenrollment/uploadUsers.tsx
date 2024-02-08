import * as Yup from "yup";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { postData } from "../../../../adapters/microservices";
import TimerAlertBox from "../../../../widgets/alert/timerAlert";
import WaveBottom from "../../../../assets/images/background/bg-modal.svg";
import { LoadingButton } from "../../../../widgets/formInputFields/buttons";
import FieldErrorMessage from "../../../../widgets/formInputFields/errorMessage";

const validationSchema = Yup.object().shape({
  file: Yup.mixed().required("File is required"),
});

const UploadCourseUsersEnrollment = ({
  show,
  onHide,
  setUploadModalShow,
  updateAddRefresh,
  courseid,
}: any) => {
  const [uploadResponse, setUploadresponse] = React.useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });

  const handleFormData = (values: {}, { setSubmitting, resetForm }: any) => {
    setSubmitting(true);
    setUploadresponse("");
    postData(`/csv/course-user-erol/${courseid}`, {}, values.file)
      .then((res: any) => {
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
      })
      .catch((err: any) => {
        setSubmitting(false);
        setShowAlert(true);
        setAlertMsg({
          message: "Some error occurred",
          alertBoxColor: "danger",
        });
      });
  };

  return (
    <React.Fragment>
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal-design-wrapper"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Upload Users
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
            {({ values, isSubmitting, setFieldValue, errors, touched }) => (
              <Form>
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
                {isSubmitting === false ? (
                  <div className="modal-buttons">
                    <button className="btn btn-primary" type="submit">
                      Upload
                    </button>
                  </div>
                ) : (
                  <LoadingButton
                    variant="primary"
                    btnText="Uploading..."
                    className="modal-buttons"
                  />
                )}
              </Form>
            )}
          </Formik>
          <div dangerouslySetInnerHTML={{ __html: uploadResponse }} />
          <TimerAlertBox
            alertMsg={alertMsg.message}
            className="mt-3"
            variant={alertMsg.alertBoxColor}
            setShowAlert={setShowAlert}
            showAlert={showAlert}
          />
        </Modal.Body>
        <img src={WaveBottom} alt="WaveBottom" className="wavebg"/>
      </Modal>
    </React.Fragment>
  );
};

export default UploadCourseUsersEnrollment;
