import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  programId: any;
  modalShow: any;
  apiStatus: any;
  courseObj: any;
  totalPages: any;
  filterUpdate: any;
  refreshToggle: any;
  newPageRequest: any;
  addCourseModal: any;
  editHandlerById: any;
  cleanFormValues: any;
  toggleModalShow: any;
  sortedCategories: any;
  coursePermission: any;
  toggleCourseModal: any;
  setFormWeightValue: any;
  setFormParentValue: any;
  updateDeleteRefresh: any;
  setEditCategoryValues: any;
};

const View = (props: Props) => {
  const commonProps = {
    programId: props.programId,
    modalShow: props.modalShow,
    apiStatus: props.apiStatus,
    courseObj: props.courseObj,
    totalPages: props.totalPages,
    filterUpdate: props.filterUpdate,
    refreshToggle: props.refreshToggle,
    newPageRequest: props.newPageRequest,
    addCourseModal: props.addCourseModal,
    cleanFormValues: props.cleanFormValues,
    editHandlerById: props.editHandlerById,
    toggleModalShow: props.toggleModalShow,
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
