import React from "react";
import Header from "../../../newHeader";
import Footer from "../../../newFooter";
import DashboardTeacher from "./dashboard";
import { Container } from "react-bootstrap";
import HeaderTabs from "../../../headerTabs";
import NewLoader from "../../../../widgets/loader";
import useUserinfo from "../../../../features/hooks/userinfo";

type Props = {
  apiStatus: string;
  eventsPacket: any;
  showAlert: boolean;
  courseSession: any;
  userCoursesData: any;
  setUserCoursesData: any;
  getSortFilterValue: any;
  todaySessionPacket: any;
  apiStatusCourse: string;
  enrolCoreCoursesObj: any;
  sessionApiStatus: string;
  getFilterSelectValue: any;
  courseFilterActive: boolean;
  filterTimestampSort: string;
  filterTimestampValue: string;
};

const TeacherDashboard: React.FC<Props> = (props) => {
  const res = useUserinfo();
  const sessionMode = ["", "offline", "online", "lab", "hybrid"];

  const loaderStyle = {
    display: "flex",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
  };

  if (res === "loading") {
    return (
      <Container style={loaderStyle}>
        <NewLoader />
        <br />
      </Container>
    );
  }

  return (
    <React.Fragment>
      <Header />
      <HeaderTabs activeTab="teacherdashboard" />
      <div className="contentarea-wrapper">
        <DashboardTeacher
          sessionMode={sessionMode}
          apiStatus={props.apiStatus}
          showAlert={props.showAlert}
          eventsPacket={props.eventsPacket}
          courseSession={props.courseSession}
          userCoursesData={props.userCoursesData}
          apiStatusCourse={props.apiStatusCourse}
          sessionApiStatus={props.sessionApiStatus}
          getSortFilterValue={props.getSortFilterValue}
          setUserCoursesData={props.setUserCoursesData}
          todaySessionPacket={props.todaySessionPacket}
          courseFilterActive={props.courseFilterActive}
          filterTimestampSort={props.filterTimestampSort}
          enrolCoreCoursesObj={props.enrolCoreCoursesObj}
          getFilterSelectValue={props.getFilterSelectValue}
          filterTimestampValue={props.filterTimestampValue}
        />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default TeacherDashboard;
