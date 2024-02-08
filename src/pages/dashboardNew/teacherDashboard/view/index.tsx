import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { Container } from "react-bootstrap";
import NewLoader from "../../../../widgets/loader";
import { isMobile, isDesktop } from "react-device-detect";
import useUserinfo from "../../../../features/hooks/userinfo";
import "./style.scss";
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

const View: React.FC<Props> = (props) => {
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

  const commonProps = {
    sessionMode: sessionMode,
    apiStatus: props.apiStatus,
    showAlert: props.showAlert,
    eventsPacket: props.eventsPacket,
    courseSession: props.courseSession,
    userCoursesData: props.userCoursesData,
    apiStatusCourse: props.apiStatusCourse,
    sessionApiStatus: props.sessionApiStatus,
    getSortFilterValue: props.getSortFilterValue,
    setUserCoursesData: props.setUserCoursesData,
    todaySessionPacket: props.todaySessionPacket,
    courseFilterActive: props.courseFilterActive,
    filterTimestampSort: props.filterTimestampSort,
    enrolCoreCoursesObj: props.enrolCoreCoursesObj,
    getFilterSelectValue: props.getFilterSelectValue,
    filterTimestampValue: props.filterTimestampValue,
  };

  return (
    <React.Fragment>
      {isMobile ? (
        <Mobile commonProps={commonProps} />
      ) : isDesktop ? (
        <Browser commonProps={commonProps} />
      ) : (
        <Browser commonProps={commonProps} />
      )}
      {/* <DashboardTeacher
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
      /> */}
    </React.Fragment>
  );
};

export default View;
