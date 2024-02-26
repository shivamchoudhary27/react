import React from "react";
import "../../style.scss";
import Header from "../../../../newHeader";
import Footer from "../../../../newFooter";
import { Container } from "react-bootstrap";
import HeaderTabs from "../../../../headerTabs";
import StudentAttendanceTable from "../../table";
import StudentAttendanceFilter from "../../filter";
import PageTitle from "../../../../../widgets/pageTitle";
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";
import BuildPagination from "../../../../../widgets/pagination";
import BottomLeftWave from "../../../../../assets/images/background/bg-bottomleft.svg";
type Props = {
  commonProps: {
    getCourseId: any;
    currentUserInfo: any;
    attendancedata: any[];
    apiResponseData: any;
    apiStatus: string;
    allAttendanceSessionRecords: any;
    totalPointAndPercentage: any;
    filterUpdate: any;
    totalPages: any;
    newPageRequest: any;
  };
};

const Browser = (props: Props) => {
  return (
    <React.Fragment>
      <Header />
      <HeaderTabs activeTab="attendance" />
      <BreadcrumbComponent
        routes={[
          { name: "Dashboard", path: "/dashboard" },
          { name: "Attendance", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mb-wraper">
        <div className="contentarea-wrapper mt-3 mb-5">
          <Container fluid>
            <PageTitle pageTitle="Attendance" gobacklink="/dashboard" />
            <StudentAttendanceFilter
              getCourseId={props.commonProps.getCourseId}
              apiResponseData={props.commonProps.apiResponseData}
              attendancedata={props.commonProps.attendancedata}
              totalPointAndPercentage={props.commonProps.totalPointAndPercentage}
              allAttendanceSessionRecords={props.commonProps.allAttendanceSessionRecords}
            />
            <StudentAttendanceTable
              attendancedata={props.commonProps.attendancedata}
              currentUserInfo={props.commonProps.currentUserInfo}
              apiStatus={props.commonProps.apiStatus}
            />
            <BuildPagination
              totalpages={props.commonProps.totalPages}
              getrequestedpage={props.commonProps.newPageRequest}
              activepage={props.commonProps.filterUpdate.pageNumber}
            />
          </Container>
        </div>
      </div>
      <Footer />
      <div className="bottomLeftWave">
        <img src={BottomLeftWave} alt="bottom wave" />
      </div>
    </React.Fragment>
  );
};

export default Browser;
