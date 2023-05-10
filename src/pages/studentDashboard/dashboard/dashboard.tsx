import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import FilterDropdown from "./timeline/filterDropdown";
import Timeline from "./timeline/timeline";
import MyScheduleComp from "./schedule/scheduleComp";
import Program_Certification from "./programCertification";

const DashboardStudent = () => {
  return (
    <>
      <Container fluid>
          <Row>
            <Col md={9}>
              <FilterDropdown />
              <Timeline />
              <Program_Certification />
            </Col>
            <Col md={3}>
              <MyScheduleComp />
            </Col>
          </Row>
      </Container>
    </>
  );
};

export default DashboardStudent;
