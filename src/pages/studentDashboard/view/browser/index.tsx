import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Timeline from "../../dashboard/timeline";
import PerformanceOverview from "../../dashboard/performance";
import MyScheduleComp from "../../../teacherDashboard/dashboard/schedule/scheduleComp";
import EnrolCoursesList from "../../dashboard/enrolCoursesList";
import Header from "../../../newHeader";
import HeaderTabs from "../../../headerTabs";
import Footer from "../../../newFooter";

type Props = {};

const Browser = (props: Props) => {
  return (
    <React.Fragment>
      <Header />
      <HeaderTabs activeTab="studentdashboard" />
      <div className="contentarea-wrapper">
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
          <EnrolCoursesList />
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Browser;
