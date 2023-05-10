import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../../newHeader";
import Footer from "../../newFooter";
import HeaderTabs from "../../headerTabs";
import DashboardStudent from "./dashboard";

const StudentDashboard = () => {
  return (
    <>
      <Header />
      <HeaderTabs />
      <div className="contentarea-wrapper">        
        <DashboardStudent />
      </div>
      <Footer />
    </>
  );
};

export default StudentDashboard;
