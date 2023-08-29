import "./style.scss";
import React from "react";
import Mobile from "../view/mobile";
import Browser from "../view/browser";
import { Container } from "react-bootstrap";
import NewLoader from "../../../../widgets/loader";
import { isMobile, isDesktop } from "react-device-detect";
import useUserinfo from "../../../../features/hooks/userinfo";

type Props = {
  userCoursesData: any;
  enrolCoreCoursesObj: any;
};

const StudentDashboard = (props: Props) => {
  const res = useUserinfo();

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
            userCoursesData={props.userCoursesData}
            enrolCoreCoursesObj={props.enrolCoreCoursesObj}
          />
        </React.Fragment>
      ) : isDesktop ? (
        <React.Fragment>
          <Browser
            userCoursesData={props.userCoursesData}
            enrolCoreCoursesObj={props.enrolCoreCoursesObj}
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Browser
            userCoursesData={props.userCoursesData}
            enrolCoreCoursesObj={props.enrolCoreCoursesObj}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default StudentDashboard;
