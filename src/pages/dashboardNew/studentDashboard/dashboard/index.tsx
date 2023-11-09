import "./style.scss";
import React from "react";
import Mobile from "../view/mobile";
import Browser from "../view/browser";
import { Container } from "react-bootstrap";
import NewLoader from "../../../../widgets/loader";
import { isMobile, isDesktop } from "react-device-detect";
import useUserinfo from "../../../../features/hooks/userinfo";

type Props = {
  apiStatus: any;
  eventsPacket: any;
  showAlert: boolean;
  courseSession: any;
  userCoursesData: any;
  todaySessionPacket: any;
  enrolCoreCoursesObj: any;
  getFilterSelectValue: any
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
            sessionMode={sessionMode}
            showAlert={props.showAlert}
            apiStatus={props.apiStatus}
            eventsPacket={props.eventsPacket}
            courseSession={props.courseSession}
            userCoursesData={props.userCoursesData}
            enrolCoreCoursesObj={props.enrolCoreCoursesObj}
          />
        </React.Fragment>
      ) : isDesktop ? (
        <React.Fragment>
          <Browser
            showAlert={props.showAlert}
            apiStatus={props.apiStatus}
            eventsPacket={props.eventsPacket}
            courseSession={props.courseSession}
            userCoursesData={props.userCoursesData}
            todaySessionPacket={props.todaySessionPacket}
            enrolCoreCoursesObj={props.enrolCoreCoursesObj}
            getFilterSelectValue={props.getFilterSelectValue}
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Browser
            showAlert={props.showAlert}
            apiStatus={props.apiStatus}
            eventsPacket={props.eventsPacket}
            courseSession={props.courseSession}
            userCoursesData={props.userCoursesData}
            todaySessionPacket={props.todaySessionPacket}
            enrolCoreCoursesObj={props.enrolCoreCoursesObj}
            getFilterSelectValue={props.getFilterSelectValue}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default StudentDashboard;
