import Modal from "react-bootstrap/Modal";
import {
  postData as addDepartmentData,
  putData as putDepartmentData,
} from "../../../adapters/microservices";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FieldLabel from "../../../widgets/formInputFields/labels";
import FieldTypeText from "../../../widgets/formInputFields/formTextField";
import FieldTypeTextarea from "../../../widgets/formInputFields/formTextareaField";
import Custom_Button from "../../../widgets/formInputFields/buttons";
import FieldErrorMessage from "../../../widgets/formInputFields/errorMessage";

// Formik Yup validation === >>>
const departmentSchema = Yup.object({
  name: Yup.string().min(1).required(),
  // description: Yup.string().max(100).required(),
});

const DepartmentModal = ({
  departmentobj,
  togglemodalshow,
  refreshdepartmentdata,
  show,
  onHide,
  currentInstitute
}: any) => {
  // Initial values of react table === >>>
  const initialValues = {
    name: departmentobj.name,
    description: "",
  };

  // custom Obj & handle form data === >>>
  let formTitles = {
    titleHeading: "",
    btnTitle: "",
    description: "",
  };
  if (departmentobj.id === 0) {
    formTitles = {
      titleHeading: "Add Department",
      btnTitle: "Save",
      description: "",
    };
  } else {
    formTitles = {
      titleHeading: "Update Department",
      btnTitle: "Update",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typ....",
    };
  }

  // handle Form CRUD operations === >>>
  const handleFormData = (values: {}, { setSubmitting, resetForm }: any) => {
    let endPoint = `/${currentInstitute}/departments`;
    setSubmitting(true);
    if (departmentobj.id === 0) {
      addDepartmentData(endPoint, values)
        .then((res: any) => {
          if (res.data !== "") {
            togglemodalshow(false);
            refreshdepartmentdata();
            setSubmitting(false);
            resetForm();
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    } else {
      endPoint += `/${departmentobj.id}`;
      putDepartmentData(endPoint, values)
        .then((res: any) => {
          if (res.data !== "" && res.status === 200) {
            togglemodalshow(false);
            refreshdepartmentdata();
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
          validationSchema={departmentSchema}
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
              <div className="modal-buttons">
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
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default DepartmentModal;
