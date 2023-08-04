import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Header from "../../newHeader";
import Footer from "../../newFooter";
import MobileHeader from "../../newHeader/mobileHeader";
import MobileFooter from "../../newFooter/mobileFooter";
import HeaderTabs from "../../headerTabs";
import DashboardStudent from "./dashboard";
import useUserinfo from "../../../features/hooks/userinfo";
import NewLoader from "../../../widgets/loader";
import { isMobile, isDesktop } from "react-device-detect";

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
        <MobileHeader />
      ) : isDesktop ? (
        <React.Fragment>
          <Header />
          <HeaderTabs activeTab="studentdashboard" />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Header />
          <HeaderTabs activeTab="studentdashboard" />
        </React.Fragment>
      )}
      <div className="contentarea-wrapper">
        <DashboardStudent />
      </div>
      {isMobile ? <MobileFooter /> : isDesktop ? <Footer /> : <Footer />}
    </React.Fragment>
  );
};

export default StudentDashboard;
