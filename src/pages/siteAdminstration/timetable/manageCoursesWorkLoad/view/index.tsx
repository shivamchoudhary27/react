import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  programId: any;
  apiStatus: any;
  modalShow: any;
  courseObj: any;
  programName: any;
  refreshToggle: any;
  addCourseModal: any;
  toggleModalShow: any;
  cleanFormValues: any;
  editHandlerById: any;
  currentInstitute: any;
  sortedCategories: any;
  coursePermission: any;
  toggleCourseModal: any;
  setFormParentValue: any;
  setFormWeightValue: any;
  updateDeleteRefresh: any;
  setEditCategoryValues: any;
};

const View = (props: Props) => {
  const commonProps = {
    programId: props.programId,
    apiStatus: props.apiStatus,
    modalShow: props.modalShow,
    courseObj: props.courseObj,
    programName: props.programName,
    refreshToggle: props.refreshToggle,
    addCourseModal: props.addCourseModal,
    toggleModalShow: props.toggleModalShow,
    cleanFormValues: props.cleanFormValues,
    editHandlerById: props.editHandlerById,
    currentInstitute: props.currentInstitute,
    sortedCategories: props.sortedCategories,
    coursePermission: props.coursePermission,
    toggleCourseModal: props.toggleCourseModal,
    setFormParentValue: props.setFormParentValue,
    setFormWeightValue: props.setFormWeightValue,
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
