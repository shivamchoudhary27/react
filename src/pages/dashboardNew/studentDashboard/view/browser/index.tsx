import React from "react";
import Header from "../../../../newHeader";
import Footer from "../../../../newFooter";
import HeaderTabs from "../../../../headerTabs";
import Timeline from "../../dashboard/timeline";
import { Container, Row, Col } from "react-bootstrap";
import PerformanceOverview from "../../dashboard/performance";
import EnrolCoursesList from "../../dashboard/enrolCoursesList";
import MyScheduleComp from "../../../teacherDashboard/dashboard/schedule/scheduleComp";
import ScheduleTable from "../../dashboard/schedule";

type Props = {
  userCoursesData: any;
  enrolCoreCoursesObj: any;
};

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
                <ScheduleTable />
              </Col>
            </Row>
          </Container>
        </div>
        <div className="dashboard-bottomPanel mt-4 mb-5">
          <EnrolCoursesList
            userCoursesData={props.userCoursesData}
            enrolCoreCoursesObj={props.enrolCoreCoursesObj}
          />
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Browser;
