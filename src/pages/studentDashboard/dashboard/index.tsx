import React from "react";
import { Container } from "react-bootstrap";
import Header from "../../newHeader";
import Footer from "../../newFooter";
import HeaderTabs from "../../headerTabs";
import DashboardStudent from "./dashboard";
import useUserinfo from "../../../features/hooks/userinfo";
import Loader from "../../../widgets/loader/loader";

const StudentDashboard = () => {
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
        <Loader />
        <br />
        Loading...
      </Container>
    );
  }

  return (
    <React.Fragment>
      <Header />
      <HeaderTabs />
      <div className="contentarea-wrapper">        
        <DashboardStudent />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default StudentDashboard;
