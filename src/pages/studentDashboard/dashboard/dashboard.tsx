import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import FilterDropdown from "./timeline/filterDropdown";
import Timeline from "./timeline/timeline";
import MyScheduleComp from "./schedule/scheduleComp";
import Program_Certification from "./programCertification";
import BreadcrumbComponent from "../../../widgets/breadcrumb";

const DashboardStudent = () => {
  return (
    <>
      <Container fluid>
          <Row>
            <Col md={9}>
            <BreadcrumbComponent routes={[
              { name: "Student Dashboard", path: "/studentdashboard" }
            ]} />
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
