import React from "react";
import Filters from "../../filter";
import Header from "../../../../newHeader";
import Footer from "../../../../newFooter";
import { Container } from "react-bootstrap";
import HeaderTabs from "../../../../headerTabs";
import MyTimetableDraftTable from "../../table";
import PageTitle from "../../../../../widgets/pageTitle";
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";

type Props = {
  commonProps: {
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
              gobacklink="/calender"
            />
            <Filters
              ids={props.commonProps.urlArg}
              courseDates={props.commonProps.courseDates}
              programFilter={props.commonProps.programFilter}
              selectedProgram={props.commonProps.selectedProgram}
              workloadCourses={props.commonProps.sortedCategories}
              setCoursesStatus={props.commonProps.setCoursesStatus}
              updateCourseDates={props.commonProps.updateCourseDates}
              handleMonthFilter={props.commonProps.handleMonthFilter}
              setSelectedProgram={props.commonProps.setSelectedProgram}
              selectedDepartment={props.commonProps.selectedDepartment}
              updateFacultyStatus={props.commonProps.updateFacultyStatus}
              setHandleMonthFilter={props.commonProps.setHandleMonthFilter}
              setSelectedDepartment={props.commonProps.setSelectedDepartment}
            />
            <MyTimetableDraftTable
              onHide={props.commonProps.onHide}
              SlotData={props.commonProps.timeslots}
              apiStatus={props.commonProps.apiStatus}
              courseDates={props.commonProps.courseDates}
              coursesStatus={props.commonProps.coursesStatus}
              toggleModalShow={props.commonProps.toggleModalShow}
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
      <Footer />
    </React.Fragment>
  );
};

export default Browser;