import Modal from "react-bootstrap/Modal";
import { Formik, Form } from "formik";
import {
  postData as addDisciplineData,
  putData as putDesciplineData,
} from "../../../adapters/microservices";
import * as Yup from "yup";
import FieldLabel from "../../../widgets/formInputFields/labels";
import FieldTypeText from "../../../widgets/formInputFields/formTextField";
import FieldTypeTextarea from "../../../widgets/formInputFields/formTextareaField";
import Custom_Button from "../../../widgets/formInputFields/buttons";
import FieldErrorMessage from "../../../widgets/formInputFields/errorMessage";

// Formik Yup Validation === >>>
const diciplineSchema = Yup.object({
  name: Yup.string().min(1).required(),
  description: Yup.string().min(1).required(),
});

const DiciplineModal = ({
  disciplineobj,
  togglemodalshow,
  refreshDisciplineData,
  show,
  onHide,
}: any) => {
  // Initial values of react table === >>>
  const initialValues = {
    name: disciplineobj.name,
    description: disciplineobj.description,
  };

  // custom Obj & handle form data === >>>
  let formTitles = {
    btnTitle: "",
    titleHeading: "",
  };
  if (disciplineobj.id === 0) {
    formTitles = {
      btnTitle: "Save",
      titleHeading: "Add Discipline",
    };
  } else {
    formTitles = {
      btnTitle: "Update",
      titleHeading: "Update Discipline",
    };
  }

  // handle Form CRUD operations === >>>
  const handleFormData = (values: {}, { setSubmitting, resetForm }: any) => {
    let endPoint = "/disciplines";
    setSubmitting(true);
    if (disciplineobj.id === 0) {
      addDisciplineData(endPoint, values)
        .then((res: any) => {
          if (res.data !== "") {
            togglemodalshow(false);
            refreshDisciplineData();
            setSubmitting(false);
            resetForm();
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    } else {
      endPoint += `/${disciplineobj.id}`;
      putDesciplineData(endPoint, values)
        .then((res: any) => {
          console.log(values, res);
          if (res.data !== "" && res.status === 200) {
            togglemodalshow(false);
            refreshDisciplineData();
            setSubmitting(false);
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
          validationSchema={diciplineSchema}
          onSubmit={(values, action) => {
            handleFormData(values, action);
            action.resetForm();
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
                  msgText="Description required atleast 1 character"
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

export default DiciplineModal;
