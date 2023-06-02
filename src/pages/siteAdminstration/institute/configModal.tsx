import React from "react";
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

const Schema = Yup.object({
  instanceUrl: Yup.string().trim().required(),
  webServiceToken: Yup.string().trim().required(),
  // locked: Yup.required(),
});

const ConfigModal = ({ show, onHide, userobj, configModalShow, updateAddRefresh }: any) => {
  console.log(userobj);
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
    putData(`/institutes/${userobj.id}`, values)
      .then((res: any) => {
        if ((res.data !== "", res.status === 200)) {
          configModalShow(false);
          updateAddRefresh();
          setSubmitting(false);
        }
      })
      .catch((err: any) => {
        console.log(err);
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
            Institute Config
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={Schema}
            onSubmit={(values, action) => {
              handleFormData(values, action);
              //   console.log(values);
            }}
          >
            {({ errors, touched, isSubmitting, setValues, values }) => (
              <Form>
                <div className="mb-3">
                  <FieldLabel
                    htmlfor="instanceUrl"
                    labelText="Instance Url"
                    required="required"
                    star="*"
                  />
                  <FieldTypeText
                    name="instanceUrl"
                    placeholder="instanceUrl"
                    disabled={userobj.locked === true && "disabled"}
                  />
                  <FieldErrorMessage
                    errors={errors.instanceUrl}
                    touched={touched.instanceUrl}
                    msgText="instanceUrl is required"
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
                    msgText="webServiceToken is required"
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
                  <div className="modal-buttons">
                    <CustomButton
                      type="submit"
                      variant="primary"
                      // isSubmitting={isSubmitting}
                      btnText="Save"
                    />{" "}
                    <CustomButton
                      type="reset"
                      variant="outline-secondary"
                      // isSubmitting={isSubmitting}
                      btnText="Reset"
                    />
                  </div>
                )}
                <Errordiv
                  msg="Note: Once locked, configuration can not be changed"
                  cstate
                  className="mt-3"
                />
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default ConfigModal;
