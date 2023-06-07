import React, {useState} from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { postData } from "../../../adapters/coreservices";
import CustomButton from "../../../widgets/formInputFields/buttons";
import TimerAlertBox from "../../../widgets/alert/timerAlert";

const validationSchema = Yup.object().shape({
  file: Yup.mixed().required("File is required"),
});

const UploadNewUsers = ({
  show,
  onHide,
  setUploadModalShow,
  updateAddRefresh,
  courseid,
}: any) => {
  const [submitBtn, setSubmitBtn] = React.useState("Submit");
  const [uploadResponse, setUploadresponse] = React.useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });

  const handleFormData = (values: {}, { setSubmitting, resetForm }: any) => {
    setSubmitBtn("Submitting...");
    setUploadresponse("");
    postData(`/user/upload`, {}, values.file)
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
        // window.alert("Some error occurred");
        setShowAlert(true)
        setAlertMsg({ message: "File upload failed! Please try again.", alertBoxColor: "danger" })
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
            Upload Users
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TimerAlertBox
            alertMsg={alertMsg.message}
            className="mt-3"
            variant={alertMsg.alertBoxColor}
            setShowAlert={setShowAlert}
            showAlert={showAlert}
          />
          <Formik
            initialValues={{ file: null }}
            validationSchema={validationSchema}
            onSubmit={(values, action) => {
              handleFormData(values, action);
            }}
          >
            {({ values, setFieldValue, errors, touched, isSubmitting }) => (
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
                  <ErrorMessage name="file" />
                </div>
                <div className="modal-buttons">
                  <CustomButton
                    type="submit"
                    variant="primary"
                    // disabled={isSubmitting}
                    btnText={submitBtn}
                  />
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

export default UploadNewUsers;
