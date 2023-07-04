import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { postData, putData } from "../../../../adapters/coreservices";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FieldLabel from "../../../../widgets/formInputFields/labels";
import FieldTypeText from "../../../../widgets/formInputFields/formTextField";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import FieldErrorMessage from "../../../../widgets/formInputFields/errorMessage";
import TimerAlertBox from "../../../../widgets/alert/timerAlert";
import { LoadingButton } from "../../../../widgets/formInputFields/buttons";
import FieldTypeSelect from "../../../../widgets/formInputFields/formSelectField";

// Formik Yup validation === >>>
const departmentSchema = Yup.object({
  name: Yup.string().min(1).required(),
});

const DepartmentModal = ({
  departmentobj,
  togglemodalshow,
  refreshdepartmentdata,
  show,
  onHide,
  currentInstitute,
}: any) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });
  const moduleList = [
    {id: "user", name: "User"},
    {id: "course", name: "Course"},
    {id: "category", name: "Category"},
    {id: "program", name: "Program"},
    {id: "institute", name: "Institute"},
    {id: "group", name: "Group"},
    {id: "tag", name: "Tag"},
  ];

  // Initial values of react table === >>>
  const initialValues = {
    name: departmentobj.name,
    module: departmentobj.module
  };

  // custom Obj & handle form data === >>>
  let formTitles = {
    titleHeading: "",
    btnTitle: "",
  };
  if (departmentobj.id === 0) {
    formTitles = {
      titleHeading: "Add Authority",
      btnTitle: "Save",
    };
  } else {
    formTitles = {
      titleHeading: "Update Authority",
      btnTitle: "Update",
    };
  }

  // handle Form CRUD operations === >>>
  const handleFormData = (values: {}, { setSubmitting, resetForm }: any) => {
    let endPoint = `/authorities`;
    if (departmentobj.id === 0) {
      postData(endPoint, values)
        .then((res: any) => {
          if (res.data !== "") {
            togglemodalshow(false);
            setSubmitting(false);
            refreshdepartmentdata();
            resetForm();
          }
        })
        .catch((err: any) => {
          setSubmitting(false);
          setShowAlert(true);
          setAlertMsg({
            message: "Failed to add Authority! Please try again.",
            alertBoxColor: "danger",
          });
        });
    } else {
      endPoint += `/${departmentobj.id}`;
      setSubmitting(true);
      putData(endPoint, values)
        .then((res: any) => {
          if (res.data !== "" && res.status === 200) {
            togglemodalshow(false);
            setSubmitting(false);
            refreshdepartmentdata();
            resetForm();
          }
        })
        .catch((err: any) => {
          setSubmitting(false);
          setShowAlert(true);
          setAlertMsg({
            message: "Failed to update Authotrity! Please try again.",
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
        <TimerAlertBox
          alertMsg={alertMsg.message}
          className="mt-3"
          variant={alertMsg.alertBoxColor}
          setShowAlert={setShowAlert}
          showAlert={showAlert}
        />
        <Formik
          initialValues={initialValues}
          validationSchema={departmentSchema}
          onSubmit={(values, action) => {
            handleFormData(values, action);
          }}
        >
          {({values, setValues, errors, touched, isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <FieldLabel
                  htmlfor="module"
                  labelText="Module"
                  required="required"
                  star="*"
                />
                <FieldTypeSelect
                  name="module"
                  options={moduleList}
                  setcurrentvalue={setValues}
                  currentformvalue={values}
                  emptyOption={true}
                />
                <FieldErrorMessage
                  errors={errors.module}
                  touched={touched.module}
                  msgText="Please select a module"
                />
              </div>
              <div className="mb-3">
                <FieldLabel
                  htmlfor="name"
                  labelText="Name"
                  required="required"
                  star="*"
                />
                <FieldTypeText name="name" placeholder="Name" />
                <FieldErrorMessage
                  errors={errors.name}
                  touched={touched.name}
                  msgText="Name is required for authority"
                />
              </div>
              {isSubmitting === false ? (
                <div className="modal-buttons">
                  <CustomButton
                    type="submit"
                    variant="primary"
                    isSubmitting={isSubmitting}
                    btnText={formTitles.btnTitle}
                  />{" "}
                  {formTitles.btnTitle === "Submit" && (
                    <CustomButton
                      type="reset"
                      btnText="Reset"
                      variant="outline-secondary"
                    />
                  )}
                </div>
              ) : (
                <LoadingButton
                  variant="primary"
                  btnText={departmentobj.id === 0 ? "Saving..." : "Updating..."}
                  className="modal-buttons"
                />
              )}
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default DepartmentModal;
