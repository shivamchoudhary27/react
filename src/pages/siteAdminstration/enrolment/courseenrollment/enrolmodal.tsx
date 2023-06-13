import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Formik, Form } from "formik";
import { postData, putData } from "../../../../adapters/microservices";
import { makeGetDataRequest } from "../../../../features/api_calls/getdata";
import { pagination } from "../../../../utils/pagination";
import * as Yup from "yup";
import FieldLabel from "../../../../widgets/formInputFields/labels";
import FieldTypeText from "../../../../widgets/formInputFields/formTextField";
import Custom_Button from "../../../../widgets/formInputFields/buttons";
import FieldErrorMessage from "../../../../widgets/formInputFields/errorMessage";
import FieldMultiSelect from "../../../../widgets/formInputFields/multiSelect";
import { LoadingButton } from "../../../../widgets/formInputFields/buttons";
import TimerAlertBox from "../../../../widgets/alert/timerAlert";

// Formik Yup Validation === >>>
const diciplineSchema = Yup.object({
  userEmail: Yup.string().email().required(""),
});

const DiciplineModal = ({
  disciplineobj,
  togglemodalshow,
  refreshDisciplineData,
  show,
  onHide,
  courseid,
}: any) => {
  // Initial values of react table === >>>
  const initialValues = {
    userEmail: disciplineobj.userEmail,
    groups: disciplineobj.groups.map((obj: any) => obj.id),
  };
  const dummyData = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };
  const [groupData, setGroupData] = useState(dummyData);
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE * 5,
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });

  // custom Obj & handle form data === >>>
  let formTitles = {
    btnTitle: "",
    titleHeading: "",
  };
  if (disciplineobj.id === 0) {
    formTitles = {
      btnTitle: "Save",
      titleHeading: "Enrol User",
    };
  } else {
    formTitles = {
      btnTitle: "Save",
      titleHeading: "Enrol User",
    };
  }

  useEffect(() => {
    makeGetDataRequest(`/${courseid}/group`, filterUpdate, setGroupData);
  }, []);

  const convertFormSubmittedTagsData = (tags: any) => {
    const filteredArray = tags.filter((value: any) => value != 0); // to remove value zero
    const newArray = filteredArray.map((id: any) => {
      return { id: parseInt(id) };
    });
    return newArray;
  };

  // handle Form CRUD operations === >>>
  const handleFormData = (values: {}, { setSubmitting, resetForm }: any) => {
    setSubmitting(true);
    values.groups = convertFormSubmittedTagsData(values.groups);
    if (disciplineobj.userId === 0) {
      let endPoint = `/course/${courseid}/enrol-user`;
      postData(endPoint, values)
        .then((res: any) => {
          if (res.data !== "") {
            togglemodalshow(false);
            setSubmitting(false);
            refreshDisciplineData();
            resetForm();
          }
        })
        .catch((err: any) => {
          console.log(err);
          setSubmitting(false);
          if (err.response.status === 404 || err.response.status === 400) {
            if (err.response.data.userEmail !== undefined) {
              setShowAlert(true);
              setAlertMsg({
                message: err.response.data.userEmail,
                alertBoxColor: "danger",
              });
            } else {
              setShowAlert(true);
              setAlertMsg({
                message: err.response.data.message,
                alertBoxColor: "danger",
              });
            }
          }
        });
    } else {
      let endPoint = `/course/${courseid}/enrol-user/${disciplineobj.userId}`;
      setShowAlert(true);
      putData(endPoint, values)
        .then((res: any) => {
          if (res.data !== "" && res.status === 200) {
            togglemodalshow(false);
            setSubmitting(false);
            refreshDisciplineData();
            resetForm();
          }
        })
        .catch((err: any) => {
          console.log(err);
          setShowAlert(true);
          setAlertMsg({
            message: err.response.data.message,
            alertBoxColor: "danger",
          });
        });
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
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
          validationSchema={diciplineSchema}
          onSubmit={(values, action) => {
            handleFormData(values, action);
            action.resetForm();
          }}
        >
          {({ values, errors, touched, isSubmitting, setValues }) => (
            <Form>
              <div className="mb-3">
                <FieldLabel
                  htmlfor="userEmail"
                  labelText="Email"
                  required="required"
                />
                <FieldTypeText name="userEmail" placeholder="User Email" />
                <FieldErrorMessage
                  errors={errors.userEmail}
                  touched={touched.userEmail}
                  msgText="Enter proper user email address"
                />
              </div>
              <div className="mb-3">
                <FieldLabel
                  htmlfor="groups"
                  labelText="Group"
                  // required="required"
                />
                <FieldMultiSelect name="groups" options={groupData.items} />
                <FieldErrorMessage
                  errors={errors.groupId}
                  touched={touched.groupId}
                  // msgText="Please select Discipline"
                />
              </div>
              {isSubmitting === false ? (
                <div className="modal-buttons">
                  <Custom_Button
                    type="submit"
                    variant="primary"
                    isSubmitting={isSubmitting}
                    btnText={disciplineobj.userId === 0 ? "Submit" : "Update"}
                  />{" "}
                  {disciplineobj.userId === 0 && (
                    <Custom_Button
                      type="reset"
                      btnText="Reset"
                      variant="outline-secondary"
                    />
                  )}
                </div>
              ) : (
                <LoadingButton
                  variant="primary"
                  btnText={
                    disciplineobj.userId === 0 ? "Submitting..." : "Updating..."
                  }
                  className="modal-buttons"
                />
              )}
            </Form>
          )}
        </Formik>
        <TimerAlertBox
          alertMsg={alertMsg.message}
          className="mt-3"
          variant={alertMsg.alertBoxColor}
          setShowAlert={setShowAlert}
          showAlert={showAlert}
        />
      </Modal.Body>
    </Modal>
  );
};

export default DiciplineModal;
