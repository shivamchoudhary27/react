import React, {useState} from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form } from "formik";
import FieldLabel from "../../../widgets/formInputFields/labels";
import FieldTypeText from "../../../widgets/formInputFields/formTextField";
import FieldErrorMessage from "../../../widgets/formInputFields/errorMessage";
import FieldTypeCheckbox from "../../../widgets/formInputFields/formCheckboxField";
import CustomButton from "../../../widgets/formInputFields/buttons";
import * as Yup from "yup";
import { putData } from "../../../adapters/microservices";
import Errordiv from "../../../widgets/alert/errordiv";
import { LoadingButton } from "../../../widgets/formInputFields/buttons";
import TimerAlertBox from "../../../widgets/alert/timerAlert";

const Schema = Yup.object({
  instanceUrl: Yup.string().trim().url().required(),
  webServiceToken: Yup.string().trim().min(20).required(),
});

const ConfigModal = ({ show, onHide, userobj, configModalShow, updateAddRefresh }: any) => {
  console.log(userobj);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });

  const initialValues = {
    instanceUrl: userobj.instanceUrl,
    webServiceToken: userobj.webServiceToken,
    locked: userobj.locked,
    name: userobj.name,
    userEmail: userobj.userEmail,
    shortCode: userobj.shortCode,
  };

  // handle Form CRUD operations === >>>
  const handleFormData = (values: {}, { setSubmitting, resetForm }: any) => {
    setSubmitting(true)
    putData(`/institutes/${userobj.id}`, values)
      .then((res: any) => {
        if ((res.data !== "", res.status === 200)) {
          configModalShow(false);
          setSubmitting(false);
          updateAddRefresh();
          resetForm();
        }
      })
      .catch((err: any) => {
        setSubmitting(false);
        setShowAlert(true);
        if (err.response.status === 404)
          setAlertMsg({
            message: `${err.response.data.message}.`,
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
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Institute Configuration
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={Schema}
            onSubmit={(values, action) => {
              handleFormData(values, action);
            }}
          >
            {({ errors, touched, isSubmitting, setValues, values }) => (
              <Form>
                <div className="mb-3">
                  <FieldLabel
                    htmlfor="instanceUrl"
                    labelText="Instance URL"
                    required="required"
                    star="*"
                  />
                  <FieldTypeText
                    name="instanceUrl"
                    placeholder="Instance URL"
                    disabled={userobj.locked === true && "disabled"}
                  />
                  <FieldErrorMessage
                    errors={errors.instanceUrl}
                    touched={touched.instanceUrl}
                    msgText="A proper instance url is required"
                  />
                </div>

                <div className="mb-3">
                  <FieldLabel
                    htmlfor="webServiceToken"
                    labelText="Web Service Token"
                    required="required"
                    star="*"
                  />
                  <FieldTypeText
                    name="webServiceToken"
                    placeholder="webServiceToken"
                    disabled={userobj.locked === true && "disabled"}
                  />
                  <FieldErrorMessage
                    errors={errors.webServiceToken}
                    touched={touched.webServiceToken}
                    msgText="Webservice token is required with minimum 20 characters"
                  />
                </div>
                {userobj.locked === false ? (
                  <div className="mb-3">
                    <FieldTypeCheckbox name="locked" checkboxLabel="Locked" />
                  </div>
                ) : (
                  <span>
                    <i className="fa-solid fa-square-check"></i> Institute configuration is locked
                  </span>
                )}
                {userobj.locked === false && (
                  isSubmitting === false ?
                  <div className="modal-buttons">
                    <CustomButton
                      type="submit"
                      variant="primary"
                      isSubmitting={isSubmitting}
                      btnText="Submit"
                    />{" "}
                    <CustomButton
                      type="reset"
                      variant="outline-secondary"
                      btnText="Reset"
                    />
                  </div> : <LoadingButton
                  variant="primary"
                  btnText="Submitting..."
                  className="modal-buttons"
                />
                )}
                <Errordiv
                  msg="Note: Once locked, configuration can not be changed later"
                  cstate
                  className="mt-3"
                />
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
    </React.Fragment>
  );
};

export default ConfigModal;
