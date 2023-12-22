import React from "react";
import { Container } from "react-bootstrap";
import MyTimetableFilter from "../../filter";
import MyTimetableDraftTable from "../../table";
import PageTitle from "../../../../../widgets/pageTitle";
import MobileHeader from "../../../../newHeader/mobileHeader";
import MobileFooter from "../../../../newFooter/mobileFooter";
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";

type Props = {
  commonProps: {
    getCourseId: any
    apiResponseData: any;
  };
};

const Browser = (props: Props) => {
  return (
    <React.Fragment>
      <MobileHeader />
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
            {/* <MyTimetableDraftTable /> */}
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

export default Browser;
