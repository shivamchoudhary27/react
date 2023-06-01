import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, ErrorMessage } from "formik";
import FieldLabel from "../../../widgets/formInputFields/labels";
import FieldTypeText from "../../../widgets/formInputFields/formTextField";
import FieldErrorMessage from "../../../widgets/formInputFields/errorMessage";
import FieldTypeCheckbox from "../../../widgets/formInputFields/formCheckboxField";
import CustomButton from "../../../widgets/formInputFields/buttons";
import * as Yup from "yup";
import { postData, putData } from "../../../adapters/microservices";

const AddUserModal = ({
  show,
  onHide,
  userobj,
  togglemodalshow,
  updateAddRefresh
}: any) => {
  // console.log(userobj);
  const initialValues = {
    name: userobj.name,
    userEmail: userobj.userEmail,
    shortCode: userobj.shortCode,
    instanceUrl: userobj.instanceUrl,
    webServiceToken: userobj.webServiceToken,
    locked: userobj.locked,
  };

  // Formik Yup validation === >>>
  const userFormSchema = Yup.object({
    // name: Yup.string().trim().min(4).required(),
    userEmail: Yup.string().email("Invalid email").required("Email is required"),
    // shortCode: Yup.string().min(1).trim().required(),
    // lastName: Yup.string().min(1).trim().required(),
  });

  // handle Form CRUD operations === >>>
  const handleFormData = (values: {}, { setSubmitting, resetForm }: any) => {
    console.log('formvalues', values);
    if (userobj.id === 0) {
      postData("/institutes", values)
        .then((res: any) => {
          if ((res.data !== "", res.status === 201)) {
            togglemodalshow(false);
            updateAddRefresh();
            setSubmitting(false);
            resetForm();
          }
        })
        .catch((err: any) => {
          if (err.response.status === 404) {
            window.alert(err.response.data.message);
          }
        });
    } else {
      putData(`/institutes/${userobj.id}`, values)
        .then((res: any) => {
          if ((res.data !== "", res.status === 200)) {
            togglemodalshow(false);
            updateAddRefresh();
            setSubmitting(false);
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
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
            {userobj.id === 0 ? "Add Institute" : "Update Institue"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={userFormSchema}
            onSubmit={(values, action) => {
              handleFormData(values, action);
              console.log(values);
            }}
          >
            {({ errors, touched, isSubmitting, setValues, values }) => (
              <Form>
                <div className="mb-3">
                  <FieldLabel
                    htmlfor="name"
                    labelText="Name"
                    required="required"
                    star="*"
                  />
                  <FieldTypeText name="name" placeholder="name" />
                  <FieldErrorMessage
                    errors={errors.name}
                    touched={touched.name}
                    msgText="Name is required with 4 characters minimum"
                  />
                </div>
                <div className="mb-3">                  
                  <FieldLabel
                    htmlfor="userEmail"
                    labelText="userEmail"
                    required="required"
                    star="*"
                  />
                  <FieldTypeText
                    name="userEmail"
                    placeholder="userEmail"
                  />
                  <FieldErrorMessage
                    errors={errors.userEmail}
                    touched={touched.userEmail}
                    msgText="userEmail is required with 6 characters minimum"
                  />
                </div>
                <div className="mb-3">
                  <FieldLabel
                    htmlfor="shortCode"
                    labelText="shortCode"
                    required="required"
                    star="*"
                  />
                  <FieldTypeText name="shortCode" placeholder="shortCode" />
                  <FieldErrorMessage
                    errors={errors.shortCode}
                    touched={touched.shortCode}
                    msgText="shortCode is required"
                  />
                </div>
                {userobj.id > 0 &&
                  <React.Fragment>
                    <div className="mb-3">
                      <FieldLabel
                        htmlfor="instanceUrl"
                        labelText="instanceUrl"
                        required="required"
                        star="*"
                      />
                      <FieldTypeText name="instanceUrl" placeholder="instanceUrl" />
                      <FieldErrorMessage
                        errors={errors.instanceUrl}
                        touched={touched.instanceUrl}
                        msgText="instanceUrl is required"
                      />
                    </div>

                    <div className="mb-3">
                      <FieldLabel
                        htmlfor="webServiceToken"
                        labelText="webServiceToken"
                        required="required"
                        star="*"
                      />
                      <FieldTypeText name="webServiceToken" placeholder="webServiceToken" />
                      <FieldErrorMessage
                        errors={errors.webServiceToken}
                        touched={touched.webServiceToken}
                        msgText="webServiceToken is required"
                      />
                    </div>

                    <div className="mb-3">
                      <FieldTypeCheckbox
                        name="locked"
                        value="locked"
                        checkboxLabel="locked"
                      />
                    </div>
                  </React.Fragment>
                }

                <div className="modal-buttons">
                  <CustomButton
                    type="submit"
                    variant="primary"
                    // isSubmitting={isSubmitting}
                    btnText={userobj.id === 0 ? "Save" : "Update"}
                  />{" "}
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default AddUserModal;