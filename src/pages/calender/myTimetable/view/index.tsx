import React from "react";
import Browser from "./browser";
import Mobile from "./mobile";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  urlArg: any;
  onHide: any;
  modalShow: any;
  timeslots: any;
  apiStatus: any;
  courseDates: any;
  coursesStatus: any;
  programFilter: any;
  selectedProgram: any;
  toggleModalShow: any;
  sortedCategories: any;
  setCoursesStatus: any;
  updateCourseDates: any;
  handleMonthFilter: any;
  setSelectedProgram: any;
  selectedDepartment: any;
  updateFacultyStatus: any;
  setHandleMonthFilter:any;
  updateTimetableDates: any;
  setChangeFilterStatus: any;
  setSelectedDepartment: any;
};

const View = (props: Props) => {
  const commonProps = {
    onHide: props.onHide,
    urlArg: props.urlArg,
    timeslots: props.timeslots,
    apiStatus: props.apiStatus,
    modalShow: props.modalShow,
    courseDates: props.courseDates,
    coursesStatus: props.coursesStatus,
    programFilter: props.programFilter,
    toggleModalShow: props.toggleModalShow,
    selectedProgram: props.selectedProgram,
    sortedCategories: props.sortedCategories,
    setCoursesStatus: props.setCoursesStatus,
    updateCourseDates: props.updateCourseDates,
    handleMonthFilter: props.handleMonthFilter,
    selectedDepartment: props.selectedDepartment,
    setSelectedProgram: props.setSelectedProgram,
    updateFacultyStatus: props.updateFacultyStatus,
    setHandleMonthFilter: props.setHandleMonthFilter,
    updateTimetableDates: props.updateTimetableDates,
    setChangeFilterStatus: props.setChangeFilterStatus,
    setSelectedDepartment: props.setSelectedDepartment,
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