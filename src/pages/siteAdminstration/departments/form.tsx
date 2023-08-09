import React, { useState } from "react";
import {
  postData as addDepartmentData,
  putData as putDepartmentData,
} from "../../../adapters/microservices";
import BrowserForm from "./view/browser/form";
import MobileForm from "./view/mobile/form";
import * as Yup from "yup";
import { isMobile, isDesktop } from "react-device-detect";
import {
  TypeDepartmentModal,
  TypeAlertMsg,
  TypeShowAlert,
  TypeEndPoint,
  TypeFormTitles,
} from "./types/type";

type TypeInitilaValues = {
  name: string;
  description: string;
  published: boolean;
};

// Formik Yup validation === >>>
const departmentSchema = Yup.object({
  name: Yup.string().min(1).trim().required("Department name is required"),
  // description: Yup.string().max(100).required(),
});

const DepartmentModal: React.FunctionComponent<TypeDepartmentModal> = ({
  departmentobj,
  togglemodalshow,
  refreshdepartmentdata,
  show,
  onHide,
  currentInstitute,
}: TypeDepartmentModal) => {
  const [showAlert, setShowAlert] = useState<TypeShowAlert>(false);
  const [alertMsg, setAlertMsg] = useState<TypeAlertMsg>({
    message: "",
    alertBoxColor: "",
  });

  // Initial values of react table === >>>
  const initialValues: TypeInitilaValues = {
    name: departmentobj.name,
    description: "",
    published: departmentobj.published,
  };

  // custom Obj & handle form data === >>>
  let formTitles: TypeFormTitles = {
    titleHeading: "",
    btnTitle: "",
    description: "",
  };
  if (departmentobj.id === 0) {
    formTitles = {
      titleHeading: "Add Department",
      btnTitle: "Submit",
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
  const handleFormData = (
    values: TypeInitilaValues,
    { setSubmitting, resetForm }: any
  ) => {
    let endPoint: TypeEndPoint = `/${currentInstitute}/departments`;
    if (departmentobj.id === 0) {
      addDepartmentData(endPoint, values)
        .then((res: any) => {
          if (res.data !== "") {
            togglemodalshow(false);
            setSubmitting(false);
            refreshdepartmentdata();
            resetForm();
          }
        })
        .catch((err: any) => {
          setSubmitting(false);
          setShowAlert(true);
          setAlertMsg({
            message: "Failed to add department! Please try again.",
            alertBoxColor: "danger",
          });
        });
    } else {
      endPoint += `/${departmentobj.id}`;
      setSubmitting(true);
      putDepartmentData(endPoint, values)
        .then((res: any) => {
          if (res.data !== "" && res.status === 200) {
            togglemodalshow(false);
            setSubmitting(false);
            refreshdepartmentdata();
            resetForm();
          }
        })
        .catch((err: any) => {
          setSubmitting(false);
          setShowAlert(true);
          setAlertMsg({
            message: "Failed to update department! Please try again.",
            alertBoxColor: "danger",
          });
        });
    }
  };

  return (
    <React.Fragment>
      {isMobile ? (
        <MobileForm 
          formTitles={formTitles}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
          alertMsg={alertMsg}
          handleFormData={handleFormData}
          initialValues={initialValues}
          departmentSchema={departmentSchema}
          departmentobj={departmentobj}
          show={show}
          onHide={onHide}
        />
      ) : isDesktop ? (
        <BrowserForm
          formTitles={formTitles}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
          alertMsg={alertMsg}
          handleFormData={handleFormData}
          initialValues={initialValues}
          departmentSchema={departmentSchema}
          departmentobj={departmentobj}
          show={show}
          onHide={onHide}
        />
      ) : (
        <BrowserForm
          formTitles={formTitles}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
          alertMsg={alertMsg}
          handleFormData={handleFormData}
          initialValues={initialValues}
          departmentSchema={departmentSchema}
          departmentobj={departmentobj}
          show={show}
          onHide={onHide}
        />
      )}
    </React.Fragment>
  );
};

export default DepartmentModal;
