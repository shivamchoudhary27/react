import * as Yup from "yup";
import React, { useState } from "react";
import MobileForm from "./view/mobile/form";
import BrowserForm from "./view/browser/form";
import { isMobile, isDesktop } from "react-device-detect";
import {
  postData as addDepartmentData,
  putData as putDepartmentData,
} from "../../../adapters/microservices";
import {
  Type_AlertMsg,
  Type_FormTitles,
  Type_DepartmentObj,
} from "./types/type";

type Props = {
  show: boolean;
  currentInstitute: number;
  departmentobj: Type_DepartmentObj;
  onHide: () => void;
  refreshdepartmentdata: () => void;
  togglemodalshow: (params: boolean) => void;
}

type Type_InitilaValues = {
  name: string;
  published: boolean;
  description: string;
};

// Formik Yup validation === >>>
const departmentSchema = Yup.object({
  name: Yup.string().min(1).trim().required("Department name is required"),
  // description: Yup.string().max(100).required(),
});

const DepartmentModal: React.FunctionComponent<Props> = ({ ...props }: Props) => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState<Type_AlertMsg>({
    message: "",
    alertBoxColor: "",
  });

  // Initial values of react table === >>>
  const initialValues: Type_InitilaValues = {
    description: "",
    name: props.departmentobj.name,
    published: props.departmentobj.published,
  };

  // custom Obj & handle form data === >>>
  let formTitles: Type_FormTitles = {
    titleHeading: "",
    btnTitle: "",
    description: "",
  };
  if (props.departmentobj.id === 0) {
    formTitles = {
      description: "",
      btnTitle: "Submit",
      titleHeading: "Add Department",
    };
  } else {
    formTitles = {
      btnTitle: "Update",
      titleHeading: "Update Department",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typ....",
    };
  }

  // handle Form CRUD operations === >>>
  const handleFormData = (
    values: Type_InitilaValues,
    { setSubmitting, resetForm }: any
  ) => {
    let endPoint: string = `/${props.currentInstitute}/departments`;
    if (props.departmentobj.id === 0) {
      addDepartmentData(endPoint, values)
        .then((res: any) => {
          if (res.data !== "") {
            props.togglemodalshow(false);
            setSubmitting(false);
            props.refreshdepartmentdata();
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
      endPoint += `/${props.departmentobj.id}`;
      setSubmitting(true);
      putDepartmentData(endPoint, values)
        .then((res: any) => {
          if (res.data !== "" && res.status === 200) {
            props.togglemodalshow(false);
            setSubmitting(false);
            props.refreshdepartmentdata();
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

  // form reusable props ===>>>
  const commonProps = {
    show: props.show,
    alertMsg: alertMsg,
    showAlert: showAlert,
    formTitles: formTitles,
    initialValues: initialValues,
    departmentSchema: departmentSchema,
    departmentobj: props.departmentobj,
    onHide: props.onHide,
    setShowAlert: setShowAlert,
    handleFormData: handleFormData,
  };

  return (
    <React.Fragment>
      {isMobile ? (
        <MobileForm
          commonProps={commonProps}
        />
      ) : isDesktop ? (
        <BrowserForm
          commonProps={commonProps}
        />
      ) : (
        <BrowserForm
          commonProps={commonProps}
        />
      )}
    </React.Fragment>
  );
};

export default DepartmentModal;
