import * as Yup from "yup";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import { postData } from "../../../../adapters/microservices";
import TimerAlertBox from "../../../../widgets/alert/timerAlert";
import { downloadCSVSampleFile } from "../../../../globals/CSV/sampleCSV";
import WaveBottom from "../../../../assets/images/background/bg-modal.svg";
import CustomButton, { LoadingButton } from "../../../../widgets/formInputFields/buttons";
import FieldErrorMessage from "../../../../widgets/formInputFields/errorMessage";
import { Link } from "react-router-dom";
import { FaDownload } from "react-icons/fa6";
import Swal from "sweetalert2";
import { capitalizeFirstWords } from "../../../../globals/titleCapitalize/capitalizeFirstWords";

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
  const [visibleDownloadOption, setVisibleDownloadOption] = useState(false);
  const [dummyData, setDummyData] = useState("");

  const handleFormData = (values: {}, { setSubmitting, resetForm }: any) => {
    setSubmitting(true);
    setUploadresponse("");
    postData(`/csv/course-user-erol/${courseid}`, {}, values.file, false)
      .then((res: any) => {
        if (res.status === 200) {
          let responseMsg = "";
          if (res.data.total_rows_processed !== undefined) {
            responseMsg += `</br><p> <strong>${res.data.total_rows_processed} Rows processed successfully. </strong> </p> 
            <p><strong> ${res.data.rows_not_processed_count} Rows failed to process.</strong></p>`;
          }
          if (
            res.data.rows_not_processed_data !== undefined &&
            Object.keys(res.data.rows_not_processed_data).length > 0
          ) {
            setDummyData(res.data.rows_not_processed_data)
            // responseMsg += `<strong>Error :</strong>`;
            // Object.entries(res.data.rows_not_processed).map(
            //   ([key, value]) =>
            //     (responseMsg += `<p><strong>${key}</strong>: ${value} </p>`)
            // );
            resetForm();
          }
          if (res.data.rows_not_processed_data.length > 0) {
            setVisibleDownloadOption(true);
          } else {
            setVisibleDownloadOption(false);
          }
          setUploadresponse(responseMsg);
          setSubmitting(false);
          updateAddRefresh();
          setShowAlert(false);
          downloadUnuploadedUsersCSV(dummyData); // Download sample CSV file
        }
      })

      .catch((err: any) => {
        if (err && err.response && err.response.status === 400) {
          setSubmitting(false);
          setShowAlert(true);
          setAlertMsg({
            message: "File upload failed! Please try again.",
            alertBoxColor: "danger",
          });
        }
    });
  };

  const onHideModal = () => {
    setUploadresponse("");
    setUploadModalShow(false);
    setVisibleDownloadOption(false);
  };

  const downloadUnuploadedUsersCSV = (data: any[]) => {
    // Define headers and prepare rows
    const headers = ["email", "group name", "Reason"];
    const rows = data.map((user) => [
      user.email,
      user.group_name,
      user.reason,
    ]
    );

    // Combine headers and rows
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    // Create a link element
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "unsuccessful_upload_data.csv");

    // Trigger the download
    document.body.appendChild(link);
    link.click();

    Swal.fire({
      timer: 3000,
      width: "25em",
      color: "#666",
      icon: "success",
      background: "#e7eef5",
      showConfirmButton: false,
      text: "Unsuccessful upload user list CSV file downloaded!",
    });
  };

  return (
    <React.Fragment>
      <Modal
        show={show}
        onHide={onHideModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal-design-wrapper"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          {capitalizeFirstWords("Upload Users")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TimerAlertBox
            alertMsg={alertMsg.message}
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
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <label htmlFor="file">Upload a csv file:</label>
                    <Link
                      to=""
                      onClick={() =>
                        downloadCSVSampleFile([
                          "email",
                          "group name",
                        ])
                      }
                    >
                      Sample csv file <FaDownload />
                    </Link>
                  </div>
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
                {isSubmitting === false ? (
                  <div className="modal-buttons">
                    <CustomButton
                      type="submit"
                      variant="primary"
                      btnText="Upload"
                    />
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
          {visibleDownloadOption === true && (
            <Alert variant="primary" className="mt-3">
              <strong>Note: </strong>
              Please ensure to download the list of error fields before closing
              this window. Click the button below to download:{" "}
              <div className="text-center">
                <Button
                  size="sm"
                  onClick={() => {
                    downloadUnuploadedUsersCSV(dummyData);
                  }}
                >
                  Download error fields <FaDownload />
                </Button>
              </div>
            </Alert>
          )}
        </Modal.Body>
        <img src={WaveBottom} alt="WaveBottom" className="wavebg" />
      </Modal>
    </React.Fragment>
  );
};

export default UploadCourseUsersEnrollment;
