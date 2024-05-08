import React from "react";
import Filters from "../../filter";
import ModalForm from "../../myChageRequest/form";
import { Container } from "react-bootstrap";
import Header from "../../../../newHeader";
import Footer from "../../../../newFooter";
import HeaderTabs from "../../../../headerTabs";
import PageTitle from "../../../../../widgets/pageTitle";
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";
import MyTimetableDraftTable from "../../table";

type Props = {
  commonProps: {
    urlArg: any;
    onHide: any;
    modalShow: any;
    timeslots: any;
    apiStatus: any;
    courseDates: any;
    editHandlerById: any;
    coursesStatus: any;
    selectedMonth: any;
    programFilter: any;
    selectedProgram: any;
    toggleModalShow: any;
    setSelectedMonth: any;
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
  };


const Browser = (props: Props) => {
  return (
    <React.Fragment>
      <Header />
      <HeaderTabs activeTab="calender" />
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
              pageTitle="My Timetable"
              gobacklink="/mytimetable"
            />
            <Filters
              ids={props.commonProps.urlArg}
              courseDates={props.commonProps.courseDates}
              programFilter={props.commonProps.programFilter}
              selectedProgram={props.commonProps.selectedProgram}
              workloadCourses={props.commonProps.sortedCategories}
              setSelectedMonth={props.commonProps.setSelectedMonth}
              setCoursesStatus={props.commonProps.setCoursesStatus}
              updateCourseDates={props.commonProps.updateCourseDates}
              setSelectedProgram={props.commonProps.setSelectedProgram}
              selectedDepartment={props.commonProps.selectedDepartment}
              updateFacultyStatus={props.commonProps.updateFacultyStatus}
              setSelectedDepartment={props.commonProps.setSelectedDepartment}
              handleMonthFilter={props.commonProps.handleMonthFilter}
              setHandleMonthFilter={props.commonProps.setHandleMonthFilter}
            />
            <ModalForm
              onHide={props.commonProps.onHide}
              modalShow={props.commonProps.modalShow}
              toggleModalShow={props.commonProps.toggleModalShow}
            />

            <MyTimetableDraftTable
              onHide={props.commonProps.onHide}
              SlotData={props.commonProps.timeslots}
              apiStatus={props.commonProps.apiStatus}
              courseDates={props.commonProps.courseDates}
              selectedMonth={props.commonProps.selectedMonth}
              coursesStatus={props.commonProps.coursesStatus}
              toggleModalShow={props.commonProps.toggleModalShow}
              handleMonthFilter={props.commonProps.handleMonthFilter}
              setChangeFilterStatus={props.commonProps.setChangeFilterStatus}
              updateTimetableDates={props.commonProps.updateTimetableDates}
              editHandlerById={props.commonProps.editHandlerById}
            />
            {/* <BuildPagination
              totalpages={props.commonProps.timeslotListPage}
              activepage={props.commonProps.filterUpdate}
              getrequestedpage={props.commonProps.newPageRequest}
            /> */}
          </Container>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Browser;