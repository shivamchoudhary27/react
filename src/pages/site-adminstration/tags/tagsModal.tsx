import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form } from "formik";
import FieldTypeText from "../../../widgets/form_input_fields/form_text_field";
import CustomButton from "../../../widgets/form_input_fields/buttons";
import FieldLabel from "../../../widgets/form_input_fields/labels";
import FieldErrorMessage from "../../../widgets/form_input_fields/error_message";
import * as Yup from "yup";
import { postData as addTagsData, putData as updateTagsData } from "../../../adapters/microservices";

// Formik Yup validation === >>>
const tagsSchema = Yup.object({
  name: Yup.string().min(1).required(),
  // description: Yup.string().max(100).required(),
});

const TagsModal = ({
  show,
  onHide,
  togglemodalshow,
  updateAddRefresh,
  tagObj
}: any) => {

  const initialValues = {
    name: tagObj.name,
  };

  const handleFormData = (values: {}, { setSubmitting, resetForm }: any) => {
    if(tagObj.id === 0){
      const endPoint = "/tags";
      setSubmitting(true);
      addTagsData(endPoint, values)
        .then((res: any) => {
          if (res.data != "") {
            resetForm();
            updateAddRefresh();
            togglemodalshow(false);
            setSubmitting(false);
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    }else{
      const endPoint = `/tags/${tagObj.id}`;
      updateTagsData(endPoint, values).then((res: any)=>{
        updateAddRefresh();
        togglemodalshow(false);
      })
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
            {/* {formTitles.titleHeading} */}
            Add Tags
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={tagsSchema}
            onSubmit={(values, action) => {
              handleFormData(values, action);
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <FieldLabel
                    htmlfor="name"
                    labelText="Tag Name"
                    required="required"
                    star="*"
                  />
                  <FieldTypeText name="name" placeholder="Name" />
                  <FieldErrorMessage
                    errors={errors.name}
                    touched={touched.name}
                    msgText="Tag Name required atleast 1 character"
                  />
                </div>

                <div className="text-center">
                  <CustomButton
                    type="submit"
                    variant="primary"
                    btnText="Add"
                    //   isSubmitting={isSubmitting}
                    //   btnText={formTitles.btnTitle}
                  />{" "}
                  {/* {formTitles.btnTitle === "Save" && ( */}
                  <CustomButton
                    type="reset"
                    btnText="Reset"
                    variant="outline-secondary"
                  />
                  {/* )} */}
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default TagsModal;
