
import React from "react";
import ModalForm from "../../form";
import ManageFilter from "../../filter";
import { Container } from "react-bootstrap";
import DraftVersionTable from "../../table";
import PageTitle from "../../../../../../widgets/pageTitle";
import MobileHeader from "../../../../../newHeader/mobileHeader";
import MobileFooter from "../../../../../newFooter/mobileFooter";
import BreadcrumbComponent from "../../../../../../widgets/breadcrumb";

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
    toggleModalShow: any;
    requestTimeSlot: any;
    getModalFormData: any;
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

const Mobile = (props: Props) => {
  return (
    <React.Fragment>
      <MobileHeader />
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
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle
            pageTitle={`${props.commonProps.urlArg.prg} : Faculty Change Request`}
            gobacklink={`/draftversion?dpt=${props.commonProps.urlArg.dpt}&prgId=${props.commonProps.urlArg.prgId}&prg=${props.commonProps.urlArg.prg}`}
          />
          <ManageFilter
            ids={props.commonProps.urlArg}
            courseDates={props.commonProps.courseDates}
            workloadCourses={props.commonProps.sortedCategories}
            setCoursesStatus={props.commonProps.setCoursesStatus}
            updateCourseDates={props.commonProps.updateCourseDates}
            changeFilterStatus={props.commonProps.changeFilterStatus}
            updateFacultyStatus={props.commonProps.updateFacultyStatus}
            setHandleMonthFilter={props.commonProps.setHandleMonthFilter}
            setChangeFilterStatus={props.commonProps.setChangeFilterStatus}
          />
          <ModalForm
            urlArg={props.commonProps.urlArg}
            onHide={props.commonProps.onHide}
            modalShow={props.commonProps.modalShow}
            filteredTime={props.commonProps.filteredTime}
            modalFormData={props.commonProps.modalFormData}
            availableRooms={props.commonProps.availableRooms}
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
      <MobileFooter />
    </React.Fragment>
  );
};

export default Mobile;
