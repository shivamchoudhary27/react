import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form } from "formik";
import FieldLabel from "../../../../widgets/formInputFields/labels";
import FieldTypeText from "../../../../widgets/formInputFields/formTextField";
import FieldErrorMessage from "../../../../widgets/formInputFields/errorMessage";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import * as Yup from "yup";
import { postData, putData } from "../../../../adapters/coreservices";
import TimerAlertBox from "../../../../widgets/alert/timerAlert";
import { LoadingButton } from "../../../../widgets/formInputFields/buttons";
import FieldTypeCheckbox from "../../../../widgets/formInputFields/formCheckboxField";
import FieldTypeTextarea from "../../../../widgets/formInputFields/formTextareaField";
import FieldTypeSelect from "../../../../widgets/formInputFields/formSelectField";
import { IAlertMsg, IUserObj } from "./types/interface";

interface IAddUserModal{
  show: boolean;
  onHide: () => void;
  userobj: IUserObj,
  setaddrolemodalshow: (params: boolean) => void;
  updateAddRefresh: () => void;
  currentInstitute: number;
}

const AddUserModal: React.FunctionComponent<IAddUserModal> = ({
  show,
  onHide,
  userobj,
  setaddrolemodalshow,
  updateAddRefresh,
  currentInstitute,
}: IAddUserModal) => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState<IAlertMsg>({ message: "", alertBoxColor: "" });

  interface IInitialValues{
    name: string,
    description: string,
    contextType: string,
  }

  const initialValues: IInitialValues = {
    name: userobj.name,
    description: userobj.description,
    contextType:userobj.contextType
  };

  // Formik Yup validation === >>>
  const userFormSchema = Yup.object({
    name: Yup.string().min(1).trim().required("Name is required"),
    // description: Yup.string().required(),
  });

  // handle Form CRUD operations === >>>
  const handleFormData = (values: IInitialValues, { setSubmitting, resetForm }: any) => {
    setSubmitting(true);
    if (userobj.id === 0) {
      postData(`/${currentInstitute}/roles`, values)
        .then((res: any) => {
          console.log(res)
          if ((res.data !== "", res.status === 201)) {
            setaddrolemodalshow(false);
            updateAddRefresh();
            setSubmitting(false);
            resetForm();
          }
        })
        .catch((err: any) => {
          console.log(err);
          // if (err.response.status === 404) {
          setSubmitting(false);
          setShowAlert(true);
          setAlertMsg({
            message: `${err.message}. Please try again!`,
            alertBoxColor: "danger",
          });
          // }
        });
    } else {
      setSubmitting(true);
      putData(`/${currentInstitute}/roles/${userobj.id}`, values)
        .then((res: any) => {
          if ((res.data !== "", res.status === 200)) {
            setaddrolemodalshow(false);
            updateAddRefresh();
            setSubmitting(false);
          }
        })
        .catch((err: any) => {
          console.log(err);
          setSubmitting(true);
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
            {userobj.id === 0 ? "Add Role" : "Update Role"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={userFormSchema}
            onSubmit={(values, action) => {
              handleFormData(values, action);
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
                  <FieldTypeText name="name" placeholder="Name" />
                  <FieldErrorMessage
                    errors={errors.name}
                    touched={touched.name}
                    msgText="Name required atleast 1 character"
                  />
                </div>

                <div className="mb-3">
                  <FieldLabel
                    htmlfor="description"
                    labelText="Description"
                    // required="required"
                  />
                  <FieldTypeTextarea
                    name="description"
                    component="textarea"
                    placeholder="Description"
                  />
                  <FieldErrorMessage
                    errors={errors.description}
                    touched={touched.description}
                    msgText="Please Enter description"
                  />
                </div>

                <div className="mb-3">
                  <FieldLabel
                    htmlfor="description"
                    labelText="Select Context"
                    // required="required"
                  />
                  <FieldTypeSelect
                    name="contextType"
                    options={[
                      // {id:},
                      { id: "institute", name: "Institute" },
                      { id: "program", name: "Program" },
                      { id: "department", name: "Department" },
                      { id: "course", name: "Course" },
                    ]}
                    setcurrentvalue={setValues}
                    currentformvalue={values}
                    emptyOption={false}
                    selectDefaultLabel="Context Type"
                  />
                  <FieldErrorMessage
                    errors={errors.contextType}
                    touched={touched.contextType}
                    msgText="Please Enter description"
                  />
                </div>

                {/* <div className="mb-3">
                  <FieldTypeCheckbox
                    name="published"
                    checkboxLabel="Published"
                  />{" "}
                  <FieldErrorMessage
                    errors=""
                    touched=""
                    msgText="Please Check required field"
                  />
                </div> */}
                {isSubmitting === false ? (
                  <div className="modal-buttons">
                    <CustomButton
                      type="submit"
                      variant="primary"
                      isSubmitting={isSubmitting}
                      btnText={userobj.id === 0 ? "Submit" : "Update"}
                    />{" "}
                    {userobj.id === 0 && (
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
                    btnText={userobj.id === 0 ? "Submitting..." : "Updating..."}
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
    </React.Fragment>
  );
};

export default AddUserModal;