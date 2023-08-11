import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Timeline from "../../dashboard/timeline";
import PerformanceOverview from "../../dashboard/performance";
import MyScheduleComp from "../../../teacherDashboard/dashboard/schedule/scheduleComp";
import EnrolCoursesList from "../../dashboard/enrolCoursesList";
import MobileHeader from "../../../newHeader/mobileHeader";
import MobileFooter from "../../../newFooter/mobileFooter";

type Props = {};

const Mobile = (props: Props) => {
  return (
    <React.Fragment>
      <MobileHeader />
      <div className="contentarea-wrapper mb-wraper">
        <div className="dashboard-bottomPanel mt-4 mb-5">
          <EnrolCoursesList />
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
      </div>
      <MobileFooter />
    </React.Fragment>
  );
};

export default Mobile;
