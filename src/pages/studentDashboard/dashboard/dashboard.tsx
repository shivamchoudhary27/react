import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Timeline from "./timeline/timeline";
import MyScheduleComp from "./schedule/scheduleComp";
import ProgramCertification from "./programCertification";
import PerformanceOverview from "./performance/performance";
import { isMobile, isDesktop } from "react-device-detect";
import "./style.scss";

const DashboardStudent = () => {
  const DashboardComponent = () => {
    return (
      <React.Fragment>
        <div className="dashboard-topPanel">
          <Container fluid>
            <Row>
              <Col md={6} lg={4} className="mb-4 mb-lg-0">
                <Timeline />
              </Col>
              <Col md={6} lg={4} className="mb-4 mb-lg-0">
                <PerformanceOverview />
              </Col>
              <Col md={12} lg={4}>
                <MyScheduleComp />
              </Col>
            </Row>
          </Container>
        </div>
        <div className="dashboard-bottomPanel mt-4 mb-5">
          <ProgramCertification />
        </div>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      {isMobile ? (
        <React.Fragment>
          <div className="dashboard-bottomPanel mt-4 mb-5">
            <ProgramCertification />
          </div>
          <div className="dashboard-topPanel">
            <Container fluid>
              <Row>
                <Col md={12} lg={4} className="mb-4 mb-lg-0">
                  <MyScheduleComp />
                </Col>
                <Col md={6} lg={4} className="mb-4 mb-lg-0">
                  <PerformanceOverview />
                </Col>
                <Col md={6} lg={4}>
                  <Timeline />
                </Col>
              </Row>
            </Container>
          </div>
        </React.Fragment>
      ) : isDesktop ? (
        <DashboardComponent />
      ) : (
        <DashboardComponent />
      )}
    </React.Fragment>
  );
};

export default DashboardStudent;
