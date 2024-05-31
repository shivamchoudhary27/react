import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  urlArg: any;
  onHide: any;
  apiStatus: any;
  modalShow: any;
  timeslots: any;
  courseDates: any;
  requestCount:any;
  filteredTime: any;
  modalFormData: any;
  refreshToggle: any;
  selectedCourse: any;
  availableRooms: any;
  toggleModalShow: any;
  requestTimeSlot: any;
  getModalFormData: any;
  sortedCategories: any;
  setCoursesStatus: any;
  setSelectedCourse: any;
  updateCourseDates: any;
  handleMonthFilter: any;
  changeRequestData: any;
  changeFilterStatus: any;
  updateFacultyStatus: any;
  updateTimetableDates: any;
  setHandleMonthFilter: any;
  setChangeFilterStatus: any;
};

const View = (props: Props) => {
  const commonProps = {
    urlArg: props.urlArg,
    onHide: props.onHide,
    apiStatus: props.apiStatus,
    modalShow: props.modalShow,
    timeslots: props.timeslots,
    courseDates: props.courseDates,
    requestCount:props.requestCount,
    filteredTime: props.filteredTime,
    refreshToggle: props.refreshToggle,
    modalFormData: props.modalFormData,
    availableRooms: props.availableRooms,
    selectedCourse: props.selectedCourse,
    requestTimeSlot: props.requestTimeSlot,
    toggleModalShow: props.toggleModalShow,
    getModalFormData: props.getModalFormData,
    setCoursesStatus: props.setCoursesStatus,
    sortedCategories: props.sortedCategories,
    changeRequestData: props.changeRequestData,
    handleMonthFilter: props.handleMonthFilter,
    setSelectedCourse: props.setSelectedCourse,
    updateCourseDates: props.updateCourseDates,
    changeFilterStatus: props.changeFilterStatus,
    updateFacultyStatus: props.updateFacultyStatus,
    setHandleMonthFilter: props.setHandleMonthFilter,
    updateTimetableDates: props.updateTimetableDates,
    setChangeFilterStatus: props.setChangeFilterStatus,
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
