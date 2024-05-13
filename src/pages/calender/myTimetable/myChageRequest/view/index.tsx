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
  editHandlerById: any;
  sortedCategories: any;
  setCoursesStatus: any;
  setSelectedMonth: any;
  updateCourseDates: any;
  handleMonthFilter: any;
  setSelectedProgram: any;
  getModalFormData:any;
  modalFormData:any;
  selectedDepartment: any;
  ChangeFilterStatus: any;
  updateFacultyStatus: any;
  setHandleMonthFilter:any;
  updateTimetableDates: any;
  setChangeFilterStatus: any;
  setSelectedDepartment: any;
  availableSlotdata: any;
  availableRooms: any;
  refreshToggle: any;
  changeRequestData: any;
  filteredTime: any;
};

const View = (props: Props) => {
  const commonProps = {
    onHide: props.onHide,
    urlArg: props.urlArg,
    timeslots: props.timeslots,
    apiStatus: props.apiStatus,
    modalShow: props.modalShow,
    courseDates: props.courseDates,
    changeRequestData: props.changeRequestData,
    refreshToggle: props.refreshToggle,
    programFilter: props.programFilter,
    modalFormData:props.modalFormData,
    coursesStatus: props.coursesStatus,
    selectedMonth: props.selectedMonth,
    toggleModalShow: props.toggleModalShow,
    editHandlerById: props.editHandlerById,
    selectedProgram: props.selectedProgram,
    getModalFormData:props.getModalFormData,
    sortedCategories: props.sortedCategories,
    setCoursesStatus: props.setCoursesStatus,
    setSelectedMonth: props.setSelectedMonth,
    updateCourseDates: props.updateCourseDates,
    handleMonthFilter: props.handleMonthFilter,
    ChangeFilterStatus: props.ChangeFilterStatus,
    selectedDepartment: props.selectedDepartment,
    setSelectedProgram: props.setSelectedProgram,
    updateFacultyStatus: props.updateFacultyStatus,
    updateTimetableDates: props.updateTimetableDates,
    setHandleMonthFilter: props.setHandleMonthFilter,
    setChangeFilterStatus: props.setChangeFilterStatus,
    setSelectedDepartment: props.setSelectedDepartment,
    availableSlotdata: props.availableSlotdata,
    availableRooms: props.availableRooms,
    filteredTime: props.filteredTime,
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