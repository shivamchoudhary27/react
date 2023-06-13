import React, { useState } from "react";
import * as Yup from "yup";
import { Modal } from "react-bootstrap";
import { Formik, Form } from "formik";
import FieldLabel from "../../../widgets/formInputFields/labels";
import FieldTypeText from "../../../widgets/formInputFields/formTextField";
import FieldTypeTextarea from "../../../widgets/formInputFields/formTextareaField";
import FieldErrorMessage from "../../../widgets/formInputFields/errorMessage";
import CustomButton from "../../../widgets/formInputFields/buttons";
import {
  postData as addCategoriesData,
  putData,
} from "../../../adapters/microservices";
import { useParams } from "react-router-dom";
import FieldTypeSelect from "../../../widgets/formInputFields/formSelectField";
import { LoadingButton } from "../../../widgets/formInputFields/buttons";
import TimerAlertBox from "../../../widgets/alert/timerAlert";

// Formik Yup validation === >>>
const categorySchema = Yup.object({
  name: Yup.string().min(1).required(),
  // description: Yup.string().max(100).required(),
});

const CategoryModal = ({
  show,
  onHide,
  weight,
  parent,
  toggleModalShow,
  refreshcategories,
  editCategory,
}: any) => {
  const { id } = useParams();
  const initialValues = {
    name: editCategory.name,
    description: "",
  };
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });

  // handle Form CRUD operations === >>>
  const handleFormData = (values: {}, { setSubmitting, resetForm }: any) => {
    setSubmitting(true);
    if (editCategory.id === 0) {
      const endPoint = `${id}/category`;
      let newData = { ...values, parent: parent, weight: weight, level: -1 };
      addCategoriesData(endPoint, newData)
        .then((res: any) => {
          if ((res.data != "" && res.status === 201)) {
            toggleModalShow(false);
            setSubmitting(false);
            refreshcategories();
          }
        })
        .catch((err: any) => {
          console.log(err);
          setSubmitting(false);
          if(err.response.status === 500){
            setShowAlert(true);
            setAlertMsg({
              message: `${err.message}`,
              alertBoxColor: "danger",
            });  
          }else{
            setShowAlert(true);
            setAlertMsg({
              message: "Failed to add category! Please try again.",
              alertBoxColor: "danger",
            });
          }
        });
    } else {
      const endPoint = `${id}/category/${editCategory.id}`;
      let updateValue = {
        ...values,
        parent: editCategory.parent,
        weight: editCategory.weight,
        level: -1,
      };
      setSubmitting(true);
      putData(endPoint, updateValue)
        .then((res: any) => {
          toggleModalShow(false);
          setSubmitting(false);
          refreshcategories();
        })
        .catch((err: any) => {
          setSubmitting(false);
          setShowAlert(true);
          setAlertMsg({
            message: "Failed to update category! Please try again.",
            alertBoxColor: "danger",
          });
        });
    }
    resetForm();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {parent > 0 ? "Add Sub-Category" : "Add Category"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={categorySchema}
            onSubmit={(values, action) => {
              handleFormData(values, action);
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
                {/* {editCategory.id != 0 && (
                  <div>
                    <FieldLabel htmlfor="parent" labelText="Parent" />
                    <select className="form-control mb-3">
                      <option>0</option>
                      <option>1</option>
                      <option>2</option>
                    </select>
                  </div>
                )} */}
                {isSubmitting === false ? (
                  <div className="modal-buttons">
                    <CustomButton
                      type="submit"
                      variant="primary"
                      isSubmitting={isSubmitting}
                      btnText="Submit"
                    />{" "}
                    <CustomButton
                      type="reset"
                      btnText="Reset"
                      variant="outline-secondary"
                    />
                  </div>
                ) : (
                  <LoadingButton
                    variant="primary"
                    btnText="Submitting..."
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
          {/* <p>Parent: {parent === 0 ? "Top" : editCategory.name}</p> */}
          {/* <p>Weight: {weight}</p> */}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CategoryModal;
