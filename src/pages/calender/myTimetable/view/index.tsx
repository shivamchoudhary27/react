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
  selectedMonth: any;
  coursesStatus: any;
  programFilter: any;
  selectedProgram: any;
  toggleModalShow: any;
  sortedCategories: any;
  setCoursesStatus: any;
  setSelectedMonth: any;
  updateCourseDates: any;
  handleMonthFilter: any;
  setSelectedProgram: any;
  selectedDepartment: any;
  updateFacultyStatus: any;
  updateTimetableDates: any;
  setChangeFilterStatus: any;
  setSelectedDepartment: any;
  editHandlerById: any;
  handleMonthFilter: any;
  setHandleMonthFilter:any;
};

const View = (props: Props) => {
  const commonProps = {
    onHide: props.onHide,
    urlArg: props.urlArg,
    timeslots: props.timeslots,
    apiStatus: props.apiStatus,
    modalShow: props.modalShow,
    courseDates: props.courseDates,
    editHandlerById: props.editHandlerById,
    programFilter: props.programFilter,
    coursesStatus: props.coursesStatus,
    selectedMonth: props.selectedMonth,
    toggleModalShow: props.toggleModalShow,
    selectedProgram: props.selectedProgram,
    sortedCategories: props.sortedCategories,
    setCoursesStatus: props.setCoursesStatus,
    setSelectedMonth: props.setSelectedMonth,
    updateCourseDates: props.updateCourseDates,
    handleMonthFilter: props.handleMonthFilter,
    selectedDepartment: props.selectedDepartment,
    setSelectedProgram: props.setSelectedProgram,
    updateFacultyStatus: props.updateFacultyStatus,
    updateTimetableDates: props.updateTimetableDates,
    setChangeFilterStatus: props.setChangeFilterStatus,
    setSelectedDepartment: props.setSelectedDepartment,
    handleMonthFilter: props.handleMonthFilter,
    setHandleMonthFilter: props.setHandleMonthFilter,
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