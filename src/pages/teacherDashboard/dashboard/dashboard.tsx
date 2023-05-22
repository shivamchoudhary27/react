import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import MyScheduleComp from "./schedule/scheduleComp";
import Timeline from "./timeline/timeline";
// import PerformanceOverview from "./performance/performance";
import MyCourses from "./myCourses";

const DashboardTeacher = () => {
  return (
    <>
      <div className="dashboard-topPanel">
        <Container fluid>
          <Row>
            <Col md={6} className="mb-4 mb-md-0"><Timeline /></Col>
            {/* <Col md={4} className="mb-4 mb-md-0"><PerformanceOverview /></Col> */}
            <Col md={6}><MyScheduleComp /></Col>          
          </Row>
        </Container>
      </div>
      <div className="dashboard-bottomPanel mt-4">
        <MyCourses />
      </div>
    </>
  );
};

export default DashboardTeacher;
