import "./style.scss";
import React from "react";
import Mobile from "../view/mobile";
import Browser from "../view/browser";
import { Container } from "react-bootstrap";
import NewLoader from "../../../widgets/loader";
import { isMobile, isDesktop } from "react-device-detect";
import useUserinfo from "../../../features/hooks/userinfo";
// import Header from "../../newHeader";
// import HeaderTabs from "../../headerTabs";
// import Footer from "../../newFooter";
// import MobileHeader from "../../newHeader/mobileHeader";
// import MobileFooter from "../../newFooter/mobileFooter";

type Props = {
  userCoursesData: any;
};

const StudentDashboard = ({ ...props }: Props) => {
  const res = useUserinfo();

  const loaderStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
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
          <Mobile userCoursesData={props.userCoursesData} />
        </React.Fragment>
      ) : isDesktop ? (
        <React.Fragment>
          <Browser userCoursesData={props.userCoursesData} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Browser userCoursesData={props.userCoursesData} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default StudentDashboard;
