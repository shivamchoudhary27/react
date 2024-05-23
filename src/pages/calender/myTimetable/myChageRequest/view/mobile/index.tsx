import React from "react";
import ModalForm from "../../form";
import ManageFilter from "../../filter";
import { Container } from "react-bootstrap";
import MyChangeRequestTable from "../../table";
import PageTitle from "../../../../../../widgets/pageTitle";
import MobileHeader from "../../../../../newHeader/mobileHeader";
import MobileFooter from "../../../../../newFooter/mobileFooter";
import BreadcrumbComponent from "../../../../../../widgets/breadcrumb";

type Props = {
  commonProps: {
    loader:any;
    urlArg: any;
    onHide: any;
    modalShow: any;
    timeslots: any;
    apiStatus: any;
    courseDates: any;
    filteredTime: any;
    modalFormData:any;
    coursesStatus: any;
    selectedMonth: any;
    programFilter: any;
    timetableData: any;
    refreshToggle: any;
    availableRooms: any;
    selectedProgram: any;
    getModalFormData:any;
    toggleModalShow: any;
    editHandlerById: any;
    setSelectedMonth: any;
    sortedCategories: any;
    setCoursesStatus: any;
    availableSlotdata: any;
    changeRequestData: any;
    updateCourseDates: any;
    handleMonthFilter: any;
    setSelectedProgram: any;
    ChangeFilterStatus: any;
    selectedDepartment: any;
    updateFacultyStatus: any;
    setHandleMonthFilter:any;
    updateTimetableDates: any;
    setChangeFilterStatus: any;
    setSelectedDepartment: any;
  };
};

const Mobile = (props: Props) => {
  return (
    <React.Fragment>
      <MobileHeader />
      <BreadcrumbComponent
        routes={[
          { name: "Dashboard", path: "/dashboard" },
          { name: "Calender", path: "/calender" },
          { name: "My Change Request", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mb-wraper">
        <div className="contentarea-wrapper mt-3 mb-5">
          <Container fluid>
            <PageTitle
              pageTitle="My Change Request"
              gobacklink="/mytimetable"
            />
            <ManageFilter
              ids={props.commonProps.urlArg}
              courseDates={props.commonProps.courseDates}
              programFilter={props.commonProps.programFilter}
              selectedProgram={props.commonProps.selectedProgram}
              workloadCourses={props.commonProps.sortedCategories}
              setSelectedMonth={props.commonProps.setSelectedMonth}
              setCoursesStatus={props.commonProps.setCoursesStatus}
              updateCourseDates={props.commonProps.updateCourseDates}
              handleMonthFilter={props.commonProps.handleMonthFilter}
              ChangeFilterStatus={props.commonProps.ChangeFilterStatus}
              setSelectedProgram={props.commonProps.setSelectedProgram}
              selectedDepartment={props.commonProps.selectedDepartment}
              updateFacultyStatus={props.commonProps.updateFacultyStatus}
              setHandleMonthFilter={props.commonProps.setHandleMonthFilter}
              setSelectedDepartment={props.commonProps.setSelectedDepartment}
              setChangeFilterStatus={props.commonProps.setChangeFilterStatus}
            />
            <ModalForm
              onHide={props.commonProps.onHide}
              urlArg={props.commonProps.urlArg}
              modalShow={props.commonProps.modalShow}
              filteredTime={props.commonProps.filteredTime}
              modalFormData={props.commonProps.modalFormData}
              availableRooms={props.commonProps.availableRooms}
              updateAddRefresh={props.commonProps.refreshToggle}
              toggleModalShow={props.commonProps.toggleModalShow}
              availableSlotdata={props.commonProps.availableSlotdata}
              changeRequestData={props.commonProps.changeRequestData}
            />

            <MyChangeRequestTable
              onHide={props.commonProps.onHide}
              loader={props.commonProps.loader}
              SlotData={props.commonProps.timeslots}
              modalShow={props.commonProps.modalShow}
              courseDates={props.commonProps.courseDates}
              selectedMonth={props.commonProps.selectedMonth}
              coursesStatus={props.commonProps.coursesStatus}
              toggleModalShow={props.commonProps.toggleModalShow}
              editHandlerById={props.commonProps.editHandlerById}
              changeRequestStatus={props.commonProps.timetableData}
              getModalFormData={props.commonProps.getModalFormData}
              handleMonthFilter={props.commonProps.handleMonthFilter}
              updateTimetableDates={props.commonProps.updateTimetableDates}
              setChangeFilterStatus={props.commonProps.setChangeFilterStatus}
            />
            {/* <BuildPagination
              totalpages={props.commonProps.timeslotListPage}
              activepage={props.commonProps.filterUpdate}
              getrequestedpage={props.commonProps.newPageRequest}
            /> */}
          </Container>
        </div>
      </div>
      <MobileFooter />
    </React.Fragment>
  );
};

export default Mobile;
