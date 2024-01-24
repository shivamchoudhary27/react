import React, {useState} from "react";
import Header from "../../../../newHeader";
import Footer from "../../../../newFooter";
import HeaderTabs from "../../../../headerTabs";
import TeacherAttendanceTable from "../../table";
import TeacherAttendanceFilter from "../../filter";
import { Button, Container } from "react-bootstrap";
import PageTitle from "../../../../../widgets/pageTitle";
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";
import BottomLeftWave from "../../../../../assets/images/background/bg-bottomleft.svg";

type Props = {
  commonProps: {
    getCourseId: any;
    currentUserInfo: any;
    newAttendancePacket: any[];
    apiResponseData: any;
    apiStatus: string;
    attendancedata: any;
    attTableHeader: any;
    courseDetails: any
  };
};

const Browser = (props: Props) => {
  const [buttonText, setButtonText] = useState("")

  const handleNextPrevious = (e: any) => {
    setButtonText(e.target.innerText)
  }

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
            <TeacherAttendanceFilter
              getCourseId={props.commonProps.getCourseId}
              courseDetails={props.commonProps.courseDetails}
              apiResponseData={props.commonProps.apiResponseData}
              attendancedata={props.commonProps.attendancedata}
            />
            <TeacherAttendanceTable
              apiStatus={props.commonProps.apiStatus}
              attendancedata={props.commonProps.attendancedata}
              attTableHeader={props.commonProps.attTableHeader}
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
      <div  className="bottomLeftWave">
        <img src={BottomLeftWave} alt="bottom wave" />
      </div>
    </React.Fragment>
  );
};

export default Browser;
