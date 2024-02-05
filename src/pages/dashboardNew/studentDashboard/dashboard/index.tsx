import "./style.scss";
import React from "react";
import Mobile from "../view/mobile";
import Browser from "../view/browser";
import { Container } from "react-bootstrap";
import NewLoader from "../../../../widgets/loader";
import { isMobile, isDesktop } from "react-device-detect";
import useUserinfo from "../../../../features/hooks/userinfo";

type Props = {
  // apiStatus: any;
  // eventsPacket: any;
  // showAlert: boolean;
  // courseSession: any;
  // userCoursesData: any;
  // todaySessionPacket: any;
  // enrolCoreCoursesObj: any;
  // getFilterSelectValue: any;
  // filterTimestampValue: string;
  // getSortFilterValue: any;
  // filterTimestampSort: string;
  // courseFilterActive: boolean;

  eventsPacket: any;
  apiStatus: string;
  courseSession: any;
  showAlert: boolean;
  userCoursesData: any;
  apiStatusCourse: string;
  sessionApiStatus: string;
  setUserCoursesData: any;
  todaySessionPacket: any;
  getSortFilterValue: any;
  enrolCoreCoursesObj: any;
  getFilterSelectValue: any;
  courseFilterActive: boolean;
  filterTimestampValue: string;
  filterTimestampSort: string;
};

const StudentDashboard: React.FC<Props> = (props) => {
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
      {isMobile ? (
        <React.Fragment>
          <Mobile
            //   sessionMode={sessionMode}
            //   showAlert={props.showAlert}
            //   apiStatus={props.apiStatus}
            //   eventsPacket={props.eventsPacket}
            //   courseSession={props.courseSession}
            //   userCoursesData={props.userCoursesData}
            //   enrolCoreCoursesObj={props.enrolCoreCoursesObj}
            //   getSortFilterValue={props.getSortFilterValue}
            //   filterTimestampSort={props.filterTimestampSort}
            //   courseFilterActive={props.courseFilterActive}
            // filterTimestampValue={props.filterTimestampValue}
            sessionMode={sessionMode}
            showAlert={props.showAlert}
            apiStatus={props.apiStatus}
            eventsPacket={props.eventsPacket}
            courseSession={props.courseSession}
            sessionApiStatus={props.sessionApiStatus}
            apiStatusCourse={props.apiStatusCourse}
            userCoursesData={props.userCoursesData}
            courseFilterActive={props.courseFilterActive}
            todaySessionPacket={props.todaySessionPacket}
            enrolCoreCoursesObj={props.enrolCoreCoursesObj}
            filterTimestampSort={props.filterTimestampSort}
            filterTimestampValue={props.filterTimestampValue}
            setUserCoursesData={props.setUserCoursesData}
            getSortFilterValue={props.getSortFilterValue}
            getFilterSelectValue={props.getFilterSelectValue}
          />
        </React.Fragment>
      ) : isDesktop ? (
        <React.Fragment>
          <Browser
            // showAlert={props.showAlert}
            // apiStatus={props.apiStatus}
            // eventsPacket={props.eventsPacket}
            // courseSession={props.courseSession}
            // userCoursesData={props.userCoursesData}
            // todaySessionPacket={props.todaySessionPacket}
            // enrolCoreCoursesObj={props.enrolCoreCoursesObj}
            // getFilterSelectValue={props.getFilterSelectValue}
            // filterTimestampValue={props.filterTimestampValue}
            // getSortFilterValue={props.getSortFilterValue}
            // filterTimestampSort={props.filterTimestampSort}
            // courseFilterActive={props.courseFilterActive}

            sessionMode={sessionMode}
            showAlert={props.showAlert}
            apiStatus={props.apiStatus}
            eventsPacket={props.eventsPacket}
            courseSession={props.courseSession}
            sessionApiStatus={props.sessionApiStatus}
            apiStatusCourse={props.apiStatusCourse}
            userCoursesData={props.userCoursesData}
            courseFilterActive={props.courseFilterActive}
            todaySessionPacket={props.todaySessionPacket}
            enrolCoreCoursesObj={props.enrolCoreCoursesObj}
            filterTimestampSort={props.filterTimestampSort}
            filterTimestampValue={props.filterTimestampValue}
            setUserCoursesData={props.setUserCoursesData}
            getSortFilterValue={props.getSortFilterValue}
            getFilterSelectValue={props.getFilterSelectValue}
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Browser
            // showAlert={props.showAlert}
            // apiStatus={props.apiStatus}
            // eventsPacket={props.eventsPacket}
            // courseSession={props.courseSession}
            // userCoursesData={props.userCoursesData}
            // todaySessionPacket={props.todaySessionPacket}
            // enrolCoreCoursesObj={props.enrolCoreCoursesObj}
            // getFilterSelectValue={props.getFilterSelectValue}
            // filterTimestampValue={props.filterTimestampValue}
            // getSortFilterValue={props.getSortFilterValue}
            // filterTimestampSort={props.filterTimestampSort}
            // courseFilterActive={props.courseFilterActive}

            sessionMode={sessionMode}
            showAlert={props.showAlert}
            apiStatus={props.apiStatus}
            eventsPacket={props.eventsPacket}
            courseSession={props.courseSession}
            sessionApiStatus={props.sessionApiStatus}
            apiStatusCourse={props.apiStatusCourse}
            userCoursesData={props.userCoursesData}
            courseFilterActive={props.courseFilterActive}
            todaySessionPacket={props.todaySessionPacket}
            enrolCoreCoursesObj={props.enrolCoreCoursesObj}
            filterTimestampSort={props.filterTimestampSort}
            filterTimestampValue={props.filterTimestampValue}
            setUserCoursesData={props.setUserCoursesData}
            getSortFilterValue={props.getSortFilterValue}
            getFilterSelectValue={props.getFilterSelectValue}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default StudentDashboard;
