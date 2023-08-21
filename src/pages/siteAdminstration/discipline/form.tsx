import React, { useState } from "react";
import MobileDiciplineModal from "./view/mobile/form";
import BrowserDiciplineModal from "./view/browser/form";
import { isMobile, isDesktop } from "react-device-detect";
import { Type_InitialValues, Type_AlertMsg } from "./type/type";
import { Interface_DisciplineCustomObject } from "./type/interface";
import {
  postData as addDisciplineData,
  putData as putDesciplineData,
} from "../../../adapters/microservices";

type props = {
  show: boolean;
  currentInstitute: number;
  disciplineobj: Interface_DisciplineCustomObject;
  onHide: () => void;
  refreshDisciplineData: () => void;
  togglemodalshow: (params: boolean) => void;
};

const DiciplineModal: React.FunctionComponent<props> = ({
  ...props
}: props) => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState<Type_AlertMsg>({
    message: "",
    alertBoxColor: "",
  });

  // Initial values of react table === >>>
  const initialValues: Type_InitialValues = {
    name: props.disciplineobj.name,
    published: props.disciplineobj.published,
    description: props.disciplineobj.description,
  };

  // custom Obj & handle form data === >>>
  let formTitles = {
    btnTitle: "",
    titleHeading: "",
  };
  if (props.disciplineobj.id === 0) {
    formTitles = {
      btnTitle: "Submit",
      titleHeading: "Add Discipline",
    };
  } else {
    formTitles = {
      btnTitle: "Update",
      titleHeading: "Update Discipline",
    };
  }

  // handle Form CRUD operations === >>>
  const handleFormData = (
    values: Type_InitialValues,
    { setSubmitting, resetForm }: any
  ) => {
    setSubmitting(true);
    let endPoint: string = `/${props.currentInstitute}/disciplines`;
    if (props.disciplineobj.id === 0) {
      addDisciplineData(endPoint, values)
        .then((res: any) => {
          if (res.data !== "") {
            props.togglemodalshow(false);
            setSubmitting(false);
            props.refreshDisciplineData();
            resetForm();
          }
        })
        .catch((err: any) => {
          setSubmitting(false);
          setShowAlert(true);
          setAlertMsg({
            message: "Failed to add discipline! Please try again.",
            alertBoxColor: "danger",
          });
        });
    } else {
      endPoint += `/${props.disciplineobj.id}`;
      setSubmitting(true);
      putDesciplineData(endPoint, values)
        .then((res: any) => {
          if (res.data !== "" && res.status === 200) {
            props.togglemodalshow(false);
            setSubmitting(false);
            props.refreshDisciplineData();
          }
        })
        .catch((err: any) => {
          setSubmitting(false);
          setShowAlert(true);
          setAlertMsg({
            message: "Failed to update discipline! Please try again.",
            alertBoxColor: "danger",
          });
        });
    }
  };

  //   common reusable props === >>>
  const commonProps = {
    show: props.show,
    alertMsg: alertMsg,
    showAlert: showAlert,
    formTitles: formTitles,
    initialValues: initialValues,
    disciplineobj: props.disciplineobj,
    onHide: props.onHide,
    setShowAlert: setShowAlert,
    handleFormData: handleFormData,
  };

  return (
    // <Modal
    //   show={props.show}
    //   onHide={props.onHide}
    //   aria-labelledby="contained-modal-title-vcenter"
    //   centered
    // >
    //   <Modal.Header closeButton>
    //     <Modal.Title id="contained-modal-title-vcenter">
    //       {formTitles.titleHeading}
    //     </Modal.Title>
    //   </Modal.Header>
    //   <Modal.Body>
    //     <Formik
    //       initialValues={initialValues}
    //       validationSchema={diciplineSchema}
    //       onSubmit={(values, action) => {
    //         handleFormData(values, action);
    //         action.resetForm();
    //       }}
    //     >
    //       {({ errors, touched, isSubmitting }) => (
    //         <Form>
    //           <div className="mb-3">
    //             <FieldLabel
    //               star="*"
    //               htmlfor="name"
    //               labelText="Name"
    //               required="required"
    //             />
    //             <FieldTypeText name="name" placeholder="Name" />
    //             <FieldErrorMessage
    //               errors={errors.name}
    //               touched={touched.name}
    //               msgText="Name required atleast 1 character"
    //             />
    //           </div>

    //           <div className="mb-3">
    //             <FieldLabel
    //               star="*"
    //               required="required"
    //               htmlfor="description"
    //               labelText="Description"
    //             />
    //             <FieldTypeTextarea
    //               name="description"
    //               component="textarea"
    //               placeholder="Description"
    //             />
    //             <FieldErrorMessage
    //               errors={errors.description}
    //               touched={touched.description}
    //               msgText="Description required atleast 1 character"
    //             />
    //           </div>

    //           <div className="mb-3">
    //             <FieldTypeCheckbox name="published" checkboxLabel="Published" />{" "}
    //             <FieldErrorMessage
    //               errors=""
    //               touched=""
    //               msgText="Please Check required field"
    //             />
    //           </div>

    //           {isSubmitting === false ? (
    //             <div className="modal-buttons">
    //               <CustomButton
    //                 type="submit"
    //                 variant="primary"
    //                 isSubmitting={isSubmitting}
    //                 btnText={formTitles.btnTitle}
    //               />{" "}
    //               {formTitles.btnTitle === "Submit" && (
    //                 <CustomButton
    //                   type="reset"
    //                   btnText="Reset"
    //                   variant="outline-secondary"
    //                 />
    //               )}
    //             </div>
    //           ) : (
    //             <LoadingButton
    //               variant="primary"
    //               btnText={
    //                 props.disciplineobj.id === 0
    //                   ? "Submitting..."
    //                   : "Updating..."
    //               }
    //               className="modal-buttons"
    //             />
    //           )}
    //         </Form>
    //       )}
    //     </Formik>
    //     <TimerAlertBox
    //       className="mt-3"
    //       showAlert={showAlert}
    //       alertMsg={alertMsg.message}
    //       variant={alertMsg.alertBoxColor}
    //       setShowAlert={setShowAlert}
    //     />
    //   </Modal.Body>
    // </Modal>
    <React.Fragment>
      {isMobile ? (
        <MobileDiciplineModal commonProps={commonProps} />
      ) : isDesktop ? (
        <BrowserDiciplineModal commonProps={commonProps} />
      ) : (
        <BrowserDiciplineModal commonProps={commonProps} />
      )}
    </React.Fragment>
  );
};

export default DiciplineModal;
