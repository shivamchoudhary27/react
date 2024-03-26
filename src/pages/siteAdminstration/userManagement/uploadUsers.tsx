import * as Yup from "yup";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaDownload } from "react-icons/fa6";
import { postData } from "../../../adapters/coreservices";
import TimerAlertBox from "../../../widgets/alert/timerAlert";
import CustomButton from "../../../widgets/formInputFields/buttons";
import { downloadCSVSampleFile } from "../../../globals/CSV/sampleCSV";
import WaveBottom from "../../../assets/images/background/bg-modal.svg";
import { LoadingButton } from "../../../widgets/formInputFields/buttons";
import FieldErrorMessage from "../../../widgets/formInputFields/errorMessage";

const validationSchema = Yup.object().shape({
  file: Yup.mixed().required("File is required"),
});

const UploadNewUsers = ({
  show,
  onHide,
  setUploadModalShow,
  updateAddRefresh,
  currentInstitute,
}: any) => {
  const [uploadResponse, setUploadresponse] = React.useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });

  const handleFormData = (values: {}, { setSubmitting, resetForm }: any) => {
    setSubmitting(true);
    setUploadresponse("");
    postData(`/${currentInstitute}/users/upload`, {}, values.file)
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
            // downloadCSV(res.data.rows_not_processed); // Download sample CSV file
          }
          setTimeout(() => {
            setUploadModalShow(false);
            setUploadresponse("");
          }, 3000);
          setUploadresponse(responseMsg);
          setSubmitting(false);
          updateAddRefresh();
          setShowAlert(false);
          resetForm();
        }
      })
      .catch((err: any) => {
        setSubmitting(false);
        setShowAlert(true);
        setAlertMsg({
          message: "File upload failed! Please try again.",
          alertBoxColor: "danger",
        });
      });
  };

  // download unsuccessful users list in CSV === >>
  // const downloadCSV = (data) => {
  //   // Define headers and prepare rows
  //   const headers = ["Firstname", "LastName", "Email", "Country"];
  //   const rows = data.map((user) => [user.firstname, user.lastname, user.email, user.country]);

  //   // Combine headers and rows
  //   const csvContent =
  //     "data:text/csv;charset=utf-8," +
  //     [headers.join(","), ...rows.map(row => row.join(","))].join("\n");

  //   // Create a link element
  //   const link = document.createElement("a");
  //   link.setAttribute("href", encodeURI(csvContent));
  //   link.setAttribute("download", "unsuccessful_users.csv");

  //   // Trigger the download
  //   document.body.appendChild(link);
  //   link.click();
  // };

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
                    <Link to="" onClick={() => downloadCSVSampleFile(["Firstname", "LastName", "Email", "Country"])}>
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
          <TimerAlertBox
            alertMsg={alertMsg.message}
            variant={alertMsg.alertBoxColor}
            setShowAlert={setShowAlert}
            showAlert={showAlert}
          />
          <div dangerouslySetInnerHTML={{ __html: uploadResponse }} />
        </Modal.Body>
        <img src={WaveBottom} alt="WaveBottom" className="wavebg" />
      </Modal>
    </React.Fragment>
  );
};

export default UploadNewUsers;
