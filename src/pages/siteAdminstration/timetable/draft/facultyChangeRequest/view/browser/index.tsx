import React from "react";
import ModalForm from "../../form";
import ManageFilter from "../../filter";
import { Container } from "react-bootstrap";
import DraftVersionTable from "../../table";
import Header from "../../../../../../newHeader";
import Footer from "../../../../../../newFooter";
import HeaderTabs from "../../../../../../headerTabs";
import PageTitle from "../../../../../../../widgets/pageTitle";
import BreadcrumbComponent from "../../../../../../../widgets/breadcrumb";
import ConfirmationForm from "../../../../../../calender/myTimetable/myChageRequest/confirmationForm";

type Props = {
  commonProps: {
    urlArg: any;
    onHide: any;
    apiStatus: any;
    modalShow: any;
    timeslots: any;
    courseDates: any;
    filteredTime: any;
    modalFormData: any;
    refreshToggle: any;
    availableRooms: any;
    selectedCourse: any;
    toggleModalShow: any;
    requestTimeSlot: any;
    requestCount:any;
    getModalFormData: any;
    setSelectedCourse: any;
    sortedCategories: any;
    setCoursesStatus: any;
    updateCourseDates: any;
    handleMonthFilter: any;
    changeRequestData: any;
    changeFilterStatus: any;
    updateFacultyStatus: any;
    updateTimetableDates: any;
    setHandleMonthFilter: any;
    setChangeFilterStatus: any;
  };
};

const Browser = (props: Props) => {
  return (
    <React.Fragment>
      <Header />
      <HeaderTabs activeTab="siteadmin" />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "Timetable Management", path: "/timetable" },
          {
            name: "Faculty Change Request",
            path: `/draftversiondpt?dpt=${props.commonProps.urlArg.dpt}&prgId=${props.commonProps.urlArg.prgId}&prg=${props.commonProps.urlArg.prg}`,
          },
        ]}
      />
      <div className="contentarea-wrapper mb-wraper">
        <div className="contentarea-wrapper mt-3 mb-5">
          <Container fluid>
            <PageTitle
              pageTitle={`${props.commonProps.urlArg.prg} : Faculty Change Request`}
              gobacklink={`/draftversion?dpt=${props.commonProps.urlArg.dpt}&prgId=${props.commonProps.urlArg.prgId}&prg=${props.commonProps.urlArg.prg}`}
            />
            <ManageFilter
              ids={props.commonProps.urlArg}
              courseDates={props.commonProps.courseDates}
              selectedCourse={props.commonProps.selectedCourse}
              workloadCourses={props.commonProps.sortedCategories}
              setCoursesStatus={props.commonProps.setCoursesStatus}
              updateCourseDates={props.commonProps.updateCourseDates}
              setSelectedCourse={props.commonProps.setSelectedCourse}
              changeFilterStatus={props.commonProps.changeFilterStatus}
              updateFacultyStatus={props.commonProps.updateFacultyStatus}
              requestCount={props.commonProps.requestCount}setHandleMonthFilter={props.commonProps.setHandleMonthFilter}
              setChangeFilterStatus={props.commonProps.setChangeFilterStatus}
            />
            <ModalForm
              urlArg={props.commonProps.urlArg}
              onHide={props.commonProps.onHide}
              modalShow={props.commonProps.modalShow}
              filteredTime={props.commonProps.filteredTime}
              modalFormData={props.commonProps.modalFormData}
              availableRooms={props.commonProps.availableRooms}
              updateAddRefresh={props.commonProps.refreshToggle}
              toggleModalShow={props.commonProps.toggleModalShow}
              requestTimeSlot={props.commonProps.requestTimeSlot}
              changeRequestData={props.commonProps.changeRequestData}
            />
            <DraftVersionTable
              SlotData={props.commonProps.timeslots}
              apiStatus={props.commonProps.apiStatus}
              courseDates={props.commonProps.courseDates}
              toggleModalShow={props.commonProps.toggleModalShow}
              getModalFormData={props.commonProps.getModalFormData}
              handleMonthFilter={props.commonProps.handleMonthFilter}
              setHandleMonthFilter={props.commonProps.setHandleMonthFilter}
              updateTimetableDates={props.commonProps.updateTimetableDates}
              setChangeFilterStatus={props.commonProps.setChangeFilterStatus}
            />
          </Container>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Browser;
