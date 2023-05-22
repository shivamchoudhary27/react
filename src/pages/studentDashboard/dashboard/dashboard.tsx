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
          <Col md={4} className="mb-4 mb-md-0"><Timeline /></Col>
          <Col md={4} className="mb-4 mb-md-0"><PerformanceOverview /></Col>
          <Col md={4}><MyScheduleComp /></Col>          
        </Row>
      </Container>
    </div>
    <div className="dashboard-bottomPanel mt-4">
      <ProgramCertification />
    </div>
    </>
  );
};

export default DashboardStudent;
