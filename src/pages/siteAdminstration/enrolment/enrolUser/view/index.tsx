import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  name: any;
  apiStatus: any;
  programid: any;
  modalShow: any;
  totalpages: any;
  refreshToggle: any;
  cleanFormValues: any;
  toggleModalShow: any;
  editHandlerById: any;
  sortedCategories: any;
  maxMinorCoursesObj: any;
  setFormParentValue: any;
  setFormWeightValue: any;
  updateDeleteRefresh: any;
  setEditCategoryValues: any;
};

const View = (props: Props) => {
  const commonProps = {
    name: props.name,
    programid: props.programid,
    modalShow: props.modalShow,
    apiStatus: props.apiStatus,
    refreshToggle: props.refreshToggle,
    toggleModalShow: props.toggleModalShow,
    editHandlerById: props.editHandlerById,
    cleanFormValues: props.cleanFormValues,
    sortedCategories: props.sortedCategories,
    setFormParentValue: props.setFormParentValue,
    setFormWeightValue: props.setFormWeightValue,
    maxMinorCoursesObj: props.maxMinorCoursesObj,
    updateDeleteRefresh: props.updateDeleteRefresh,
    setEditCategoryValues: props.setEditCategoryValues,
  };

  return (
    <React.Fragment>
      {isMobile ? (
        <Mobile commonProps={commonProps} />
      ) : isDesktop ? (
        <Browser commonProps={commonProps} />
      ) : (
        <Browser commonProps={commonProps} />
      )}
    </React.Fragment>
  );
};

export default View;
