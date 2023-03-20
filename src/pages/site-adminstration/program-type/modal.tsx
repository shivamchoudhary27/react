import Modal from "react-bootstrap/Modal";
import {
  postData as addProgramData,
  putData as putProgramData,
} from "../../../adapters/microservices";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FieldLabel from "../../../widgets/form_input_fields/labels";
import FieldTypeText from "../../../widgets/form_input_fields/form_text_field";
import FieldTypeTextarea from "../../../widgets/form_input_fields/form_textarea_field";
import FieldTypeCheckbox from "../../../widgets/form_input_fields/form_checkbox_field";
import FieldErrorMessage from "../../../widgets/form_input_fields/error_message";
import Custom_Button from "../../../widgets/form_input_fields/buttons";

// Formik Yup validation === >>>
const programTypeSchema = Yup.object({
  name: Yup.string().min(3).max(25).required("Please Enter Name"),
  description: Yup.string().max(100).required("Please Enter Address"),
  // isBatchYearRequired: Yup.bool()
  //   .required("Please Check")
  //   .oneOf([true], "Please Check the required field"),
});

const AddProgramModal = ({
  programtypeobj,
  togglemodalshow,
  refreshprogramdata,
  show,
  onHide,
}: any) => {
  // Initial values of react table === >>>
  const initialValues = {
    name: programtypeobj.name,
    description: programtypeobj.description,
    isBatchYearRequired: programtypeobj.batchYearRequired,
  };

  // custom Obj & handle form data === >>>
  let formTitles = {
    titleHeading: "",
    btnTitle: "",
  };
  if (programtypeobj.id === 0) {
    formTitles = {
      titleHeading: "Add Program Type",
      btnTitle: "Save",
    };
  } else {
    formTitles = {
      titleHeading: "Update Program Type",
      btnTitle: "Update",
    };
  }

  // handle Form CRUD operations === >>>
  const handleFormData = (values: any, { setSubmitting, resetForm }: any) => {
    let endPoint = "/program-types";
    setSubmitting(true);
    if (programtypeobj.id === 0) {
      addProgramData(endPoint, values)
        .then((res: any) => {
          if (res.data !== "") {
            togglemodalshow(false);
            refreshprogramdata();
            setSubmitting(false);
            resetForm();
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    } else {
      endPoint += `/${programtypeobj.id}`;
      putProgramData(endPoint, values)
        .then((res: any) => {
          if (res.data !== "" && res.status === 200) {
            togglemodalshow(false);
            refreshprogramdata();
            setSubmitting(false);
            resetForm();
          }
        })
        .catch((err: any) => {
          console.log(err);
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
          validationSchema={programTypeSchema}
          onSubmit={(values, action) => {
            handleFormData(values, action);
            console.log(values);
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
                  required="required"
                  star="*"
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
                <FieldTypeCheckbox
                  name="isBatchYearRequired"
                  checkboxLabel="Batch Year Required?"
                />{" "}
                <FieldErrorMessage
                  errors={errors.isBatchYearRequired}
                  touched={touched.isBatchYearRequired}
                  msgText="Please Check required field"
                />
              </div>

              <div className="text-center">
                <Custom_Button
                  type="submit"
                  variant="primary"
                  isSubmitting={isSubmitting}
                  btnText={formTitles.btnTitle}
                />{" "}
                {formTitles.btnTitle === "Save" && (
                  <Custom_Button
                    type="reset"
                    btnText="Reset"
                    variant="outline-secondary"
                  />
                )}
              </div>
              <div className="mt-4" style={{ color: "#666" }}>
                <span style={{ fontWeight: "600" }}>Note: </span>If batch year
                is checked then it is available on add program form.
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default AddProgramModal;
