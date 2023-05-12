import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../../newHeader";
import Footer from "../../newFooter";
import HeaderTabs from "../../headerTabs";
import DashboardTeacher from "./dashboard";

const TeacherDashboard = () => {
  return (
    <>
      <Header />
      <HeaderTabs />
      <div className="contentarea-wrapper">
        <DashboardTeacher />
      </div>
      <Footer />
    </>
  );
};

export default TeacherDashboard;
