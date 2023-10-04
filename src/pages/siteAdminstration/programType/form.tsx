import React, { useState } from "react";
import MobileProgramModal from "./view/mobile/form";
import BrowserProgramModal from "./view/browser/form";
import { isMobile, isDesktop } from "react-device-detect";
import {
  Type_AlertMsg,
  Type_FormTitles,
  Type_ProgramTypeObject,
} from "./type/types";
import {
  putData as putProgramData,
  postData as addProgramData,
} from "../../../adapters/microservices";

type Props = {
  show: boolean;
  currentInstitute: number;
  programtypeobj: Type_ProgramTypeObject;
  onHide: () => void;
  refreshprogramdata: () => void;
  togglemodalshow: (params: boolean) => void;
};

type Type_InitialValues = {
  name: string;
  published: boolean;
  description: string;
  isBatchYearRequired: boolean;
};

const AddProgramModal: React.FunctionComponent<Props> = ({
  ...props
}: Props) => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState<Type_AlertMsg>({
    message: "",
    alertBoxColor: "",
  });

  // Initial values of react table === >>>
  const initialValues: Type_InitialValues = {
    name: props.programtypeobj.name,
    published: props.programtypeobj.published,
    description: props.programtypeobj.description,
    isBatchYearRequired: props.programtypeobj.batchYearRequired,
  };

  // custom Obj & handle form data === >>>
  let formTitles: Type_FormTitles = {
    titleHeading: "",
    btnTitle: "",
  };
  if (props.programtypeobj.id === 0) {
    formTitles = {
      titleHeading: "Add Program Type",
      btnTitle: "Submit",
    };
  } else {
    formTitles = {
      titleHeading: "Update Program Type",
      btnTitle: "Update",
    };
  }

  // handle Form CRUD operations === >>>
  const handleFormData = (values: any, { setSubmitting, resetForm }: any) => {
    setSubmitting(true);
    let endPoint = `/${props.currentInstitute}/program-types`;
    if (props.programtypeobj.id === 0) {
      addProgramData(endPoint, values)
        .then((res: any) => {
          if (res.data !== "") {
            props.togglemodalshow(false);
            setSubmitting(false);
            props.refreshprogramdata();
            resetForm();
          }
        })
        .catch((err: any) => {
          setSubmitting(false);
          setShowAlert(true);
          setAlertMsg({
            message: "Failed to add program! Please try again.",
            alertBoxColor: "danger",
          });
        });
    } else {
      endPoint += `/${props.programtypeobj.id}`;
      setSubmitting(true);
      putProgramData(endPoint, values)
        .then((res: any) => {
          if (res.data !== "" && res.status === 200) {
            props.togglemodalshow(false);
            setSubmitting(false);
            props.refreshprogramdata();
            resetForm();
          }
        })
        .catch((err: any) => {
          setSubmitting(false);
          setShowAlert(true);
          setAlertMsg({
            message: "Failed to update program! Please try again.",
            alertBoxColor: "danger",
          });
        });
    }
  };

  // common reusable props === >>>
  const CommonProps = {
    show: props.show,
    alertMsg: alertMsg,
    showAlert: showAlert,
    formTitles: formTitles,
    initialValues: initialValues,
    programtypeobj: props.programtypeobj,
    onHide: props.onHide,
    setShowAlert: setShowAlert,
    handleFormData: handleFormData,
  };

  return (
    <React.Fragment>
      {isMobile ? (
        <MobileProgramModal CommonProps={CommonProps} />
      ) : isDesktop ? (
        <BrowserProgramModal CommonProps={CommonProps} />
      ) : (
        <BrowserProgramModal CommonProps={CommonProps} />
      )}
    </React.Fragment>
  );
};

export default AddProgramModal;
