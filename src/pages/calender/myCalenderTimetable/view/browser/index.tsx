import React from "react";
import Header from "../../../../newHeader";
import Footer from "../../../../newFooter";
import { Container } from "react-bootstrap";
import MyTimetableFilter from "../../filter";
import HeaderTabs from "../../../../headerTabs";
import MyTimetableDraftTable from "../../table";
import PageTitle from "../../../../../widgets/pageTitle";
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";

type Props = {
  commonProps: {
    getCourseId: any
    apiResponseData: any;
    timeslots: any;
    apiStatus: any;
    courseDates: any;
    selectedMonth: any;
    updateTimetableDates: any;
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
          { name: "My Timetable", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mb-wraper">
        <div className="contentarea-wrapper mt-3 mb-5">
          <Container fluid>
            <PageTitle pageTitle="My Timetable" gobacklink="/calender" />
            <MyTimetableFilter
              getCourseId={props.commonProps.getCourseId}
              apiResponseData={props.commonProps.apiResponseData}
            />
            <MyTimetableDraftTable
             SlotData={props.commonProps.timeslots}
             apiStatus={props.commonProps.apiStatus}
             courseDates={props.commonProps.courseDates}
             selectedMonth={props.commonProps.selectedMonth}
             updateTimetableDates={props.commonProps.updateTimetableDates}
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
