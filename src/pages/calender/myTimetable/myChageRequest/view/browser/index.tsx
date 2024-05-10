import React from "react";
import ModalForm from "../../form";
import ManageFilter from "../../filter";
import { Container } from "react-bootstrap";
import Header from "../../../../../newHeader";
import Footer from "../../../../../newFooter";
import MyChangeRequestTable from "../../table";
import HeaderTabs from "../../../../../headerTabs";
import PageTitle from "../../../../../../widgets/pageTitle";
import BreadcrumbComponent from "../../../../../../widgets/breadcrumb";

type Props = {
  commonProps: {
    urlArg: any;
    onHide: any;
    modalShow: any;
    timeslots: any;
    apiStatus: any;
    courseDates: any;
    coursesStatus: any;
    modalFormData:any;
    selectedMonth: any;
    programFilter: any;
    selectedProgram: any;
    toggleModalShow: any;
    editHandlerById: any;
    setSelectedMonth: any;
    sortedCategories: any;
    setCoursesStatus: any;
    getModalFormData:any
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
              modalShow={props.commonProps.modalShow}
              toggleModalShow={props.commonProps.toggleModalShow}
              urlArg={props.commonProps.urlArg}
              modalFormData={props.commonProps.modalFormData}
            />

            <MyChangeRequestTable
              onHide={props.commonProps.onHide}
              SlotData={props.commonProps.timeslots}
              apiStatus={props.commonProps.apiStatus}
              courseDates={props.commonProps.courseDates}
              selectedMonth={props.commonProps.selectedMonth}
              coursesStatus={props.commonProps.coursesStatus}
              toggleModalShow={props.commonProps.toggleModalShow}
              editHandlerById={props.commonProps.editHandlerById}
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
      <Footer />
    </React.Fragment>
  );
};

export default Browser;
