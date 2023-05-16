import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form } from "formik";
import FieldLabel from "../../../../widgets/formInputFields/labels";
import FieldTypeText from "../../../../widgets/formInputFields/formTextField";
import FieldErrorMessage from "../../../../widgets/formInputFields/errorMessage";
import FieldTypeTextarea from "../../../../widgets/formInputFields/formTextareaField";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import * as Yup from "yup";
import { postData, putData } from "../../../../adapters/microservices";

// Formik Yup validation === >>>
const Schema = Yup.object({
  name: Yup.string().min(1).required(),
  // description: Yup.string().max(100).required(),
});

const GroupModal = ({
  show,
  onHide,
  setModalShow,
  courseid,
  groupObj,
  refreshGroupData,
}: any) => {
  // Initial values of react table === >>>
  const initialValues = {
    name: groupObj.name,
    description: groupObj.description,
  };

  // custom Obj & handle form data === >>>
  let formTitleHandle = {
    btnTitle: "",
    titleHeading: "",
  };
  if (groupObj.id === 0) {
    formTitleHandle = {
      btnTitle: "Save",
      titleHeading: "Add Group",
    };
  } else {
    formTitleHandle = {
      btnTitle: "Update",
      titleHeading: "Update Group",
    };
  }

  const handleSubmit = (values: {}, { setSubmitting, resetForm }: any) => {
    let endPoint = `/${courseid}/group`;
    if (groupObj.id === 0) {
      postData(endPoint, values)
        .then((res: any) => {
          if (res.data !== "" && res.status === 201) {
            setModalShow(false);
            refreshGroupData();
            setSubmitting(false);
            resetForm();
          }
        })
        .catch((err: any) => {
          console.log(err);
          if (err.response.status === 404 || err.response.status === 400) {
            if (err.response.data.userEmail !== undefined) {
              window.alert(err.response.data.userEmail);
            } else {
              window.alert(err.response.data.message);
            }
          }
        });
    } else {
      endPoint += `/${groupObj.id}`;
      putData(endPoint, values)
        .then((res: any) => {
          if (res.data !== "" && res.status === 200) {
            setModalShow(false);
            refreshGroupData();
            setSubmitting(false);
          }
        })
        .catch((err: any) => {
          console.log(err);
          if (err.response.status === 404 || err.response.status === 400) {
            if (err.response.data.userEmail !== undefined) {
              window.alert(err.response.data.userEmail);
            } else {
              window.alert(err.response.data.message);
            }
          }
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
            {formTitleHandle.titleHeading}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={Schema}
            onSubmit={(values, action) => {
              handleSubmit(values, action);
            }}
          >
            {({ errors, touched, isSubmitting }) => (
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
                    // star="*"
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
                <div className="text-center">
                  <CustomButton
                    type="submit"
                    variant="primary"
                    //   isSubmitting={isSubmitting}
                    btnText={formTitleHandle.btnTitle}
                  />{" "}
                  {formTitleHandle.btnTitle === "Save" && (
                    <CustomButton
                      type="reset"
                      btnText="Reset"
                      variant="outline-secondary"
                    />
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default GroupModal;
