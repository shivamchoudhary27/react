import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import FilterDropdown from "./timeline/filterDropdown";
import Timeline from "./timeline/timeline";
import MyScheduleComp from "./schedule/scheduleComp";
import MyCourses from "./my-courses";
// import Program_Certification from "./program_certification";

const DashboardTeacher = () => {
  return (
    <>
      <Container fluid>
        <div
          className="contents"
          style={{ paddingLeft: "270px", marginTop: "70px" }}
        >
          <Row>
            <Col md={9}>
              <FilterDropdown />
              <Timeline />
              <MyCourses />
            </Col>
            <Col md={3}>
              <MyScheduleComp />
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default DashboardTeacher;