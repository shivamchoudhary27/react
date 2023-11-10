import React from "react";
import Header from "../../../newHeader";
import Footer from "../../../newFooter";
import DashboardTeacher from "./dashboard";
import { Container } from "react-bootstrap";
import HeaderTabs from "../../../headerTabs";
import NewLoader from "../../../../widgets/loader";
import useUserinfo from "../../../../features/hooks/userinfo";

type Props = {
  eventsPacket: any;
  apiStatus: string;
  courseSession: any;
  showAlert: boolean;
  userCoursesData: any;
  apiStatusCourse: string;
  setUserCoursesData: any;
  todaySessionPacket: any;
  enrolCoreCoursesObj: any;
  getFilterSelectValue: any;
  courseFilterActive: boolean;
  filterTimestampValue: string;
  getSortFilterValue: any;
  filterTimestampSort: string;
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
          setUserCoursesData={props.setUserCoursesData}
          todaySessionPacket={props.todaySessionPacket}
          enrolCoreCoursesObj={props.enrolCoreCoursesObj}
          getFilterSelectValue={props.getFilterSelectValue}
          courseFilterActive={props.courseFilterActive}
          filterTimestampValue={props.filterTimestampValue}
          getSortFilterValue={props.getSortFilterValue}
          filterTimestampSort={props.filterTimestampSort}
        />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default TeacherDashboard;
