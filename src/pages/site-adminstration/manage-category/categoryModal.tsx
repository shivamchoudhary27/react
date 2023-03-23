import * as Yup from "yup";
import { Modal } from "react-bootstrap";
import { Formik, Form } from "formik";
import FieldLabel from "../../../widgets/form_input_fields/labels";
import FieldTypeText from "../../../widgets/form_input_fields/form_text_field";
import FieldTypeTextarea from "../../../widgets/form_input_fields/form_textarea_field";
import FieldErrorMessage from "../../../widgets/form_input_fields/error_message";
import Custom_Button from "../../../widgets/form_input_fields/buttons";
import { postData as addCategoriesData } from "../../../adapters/microservices";
import { useParams } from "react-router-dom";

// Formik Yup validation === >>>
const categorySchema = Yup.object({
  name: Yup.string().min(3).max(25).required(),
  // description: Yup.string().max(100).required(),
});

const CategoryModal = ({ show, onHide, weight, parent, toggleModalShow }: any) => {
  console.log(parent)
  const {id} = useParams();
  const initialValues = {
    name: "",
    description: "",
  };

  // handle Form CRUD operations === >>>
  const handleFormData = (values: {}, { setSubmitting, resetForm }: any) => {
    const endPoint = `${id}/category`;
      let newData = {...values, parent : parent, weight : weight};
      console.log('category newdata', newData)
      addCategoriesData(endPoint, newData).then((res: any)=>{
        if(res.data != "", res.status === 201){
          console.log('success save', res);
          toggleModalShow(false)
        }
      }).catch((err: any)=>{
        console.log(err)
      })
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
                    msgText="Please Enter name"
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
                  <Custom_Button
                    type="submit"
                    variant="primary"
                    isSubmitting={isSubmitting}
                    btnText="Save"
                  />{" "}
                  <Custom_Button
                    type="reset"
                    btnText="Reset"
                    variant="outline-secondary"
                  />
                </div>
              </Form>
            )}
          </Formik>
          <p>Parent: {parent}</p>
          <p>Weight: {weight}</p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CategoryModal;
