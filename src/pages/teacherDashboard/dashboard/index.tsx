import React from "react";
import { Container } from "react-bootstrap";
import Header from "../../newHeader";
import Footer from "../../newFooter";
import HeaderTabs from "../../headerTabs";
import DashboardTeacher from "./dashboard";
import useUserinfo from "../../../features/hooks/userinfo";
import NewLoader from "../../../widgets/loader";

const TeacherDashboard = () => {
  const res = useUserinfo();

  const loaderStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };
  
  if (res === 'loading') {
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
      <HeaderTabs activeTab="teacherdashboard"/>
      <div className="contentarea-wrapper">
        <DashboardTeacher />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default TeacherDashboard;
