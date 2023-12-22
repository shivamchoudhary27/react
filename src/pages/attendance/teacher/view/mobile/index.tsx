import React from "react";
import { Container } from "react-bootstrap";
import TeacherAttendanceTable from "../../table";
import TeacherAttendanceFilter from "../../filter";
import PageTitle from "../../../../../widgets/pageTitle";
import MobileHeader from "../../../../newHeader/mobileHeader";
import MobileFooter from "../../../../newFooter/mobileFooter";
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";

type Props = {
  commonProps: {
    getCourseId: any;
    currentUserInfo: any;
    newAttendancePacket: any[];
    apiResponseData: any;
    apiStatus: string;
    attendancedata: any
  };
};

const Mobile = (props: Props) => {
  return (
    <React.Fragment>
      <MobileHeader />
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
            <TeacherAttendanceFilter
              getCourseId={props.commonProps.getCourseId}
              apiResponseData={props.commonProps.apiResponseData}
              attendancedata={props.commonProps.attendancedata}
            />
            <TeacherAttendanceTable
              apiStatus={props.commonProps.apiStatus}
              newAttendancePacket={props.commonProps.newAttendancePacket}
              currentUserInfo={props.commonProps.currentUserInfo}
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
