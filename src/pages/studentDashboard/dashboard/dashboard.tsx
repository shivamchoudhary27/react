import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Timeline from "./timeline/timeline";
import MyScheduleComp from "./schedule/scheduleComp";
import ProgramCertification from "./programCertification";
import PerformanceOverview from "./performance/performance";
import "./style.scss";

const DashboardStudent = () => {
  return (
    <>
    <div className="dashboard-topPanel">
      <Container fluid>
        <Row>
          <Col md={6} lg={4} className="mb-4 mb-lg-0"><Timeline /></Col>
          <Col md={6} lg={4} className="mb-4 mb-lg-0"><PerformanceOverview /></Col>
          <Col md={12} lg={4}><MyScheduleComp /></Col>          
        </Row>
      </Container>
    </div>
    <div className="dashboard-bottomPanel mt-4 mb-5">
      <ProgramCertification />
    </div>
    </>
  );
};

export default DashboardStudent;
