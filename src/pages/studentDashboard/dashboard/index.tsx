import React from "react";
import "./style.scss";
import Browser from "../view/browser";
import Mobile from "../view/mobile";
import Header from "../../newHeader";
import HeaderTabs from "../../headerTabs";
import Footer from "../../newFooter";
import MobileHeader from "../../newHeader/mobileHeader";
import MobileFooter from "../../newFooter/mobileFooter";
import { isMobile, isDesktop } from "react-device-detect";
import { Container } from "react-bootstrap";
import NewLoader from "../../../widgets/loader";
import useUserinfo from "../../../features/hooks/userinfo";

const StudentDashboard = () => {
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
          <MobileHeader />
          <div className="contentarea-wrapper">
            <Mobile />
          </div>
          <MobileFooter />
        </React.Fragment>
      ) : isDesktop ? (
        <React.Fragment>
          <Header />
          <HeaderTabs activeTab="studentdashboard" />
          <div className="contentarea-wrapper">
            <Browser />
          </div>
          <Footer />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Header />
          <HeaderTabs activeTab="studentdashboard" />
          <div className="contentarea-wrapper">
            <Browser />
          </div>
          <Footer />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default StudentDashboard;
