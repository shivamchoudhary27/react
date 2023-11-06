import React from "react";
import Header from "../../../../newHeader";
import Footer from "../../../../newFooter";
import HeaderTabs from "../../../../headerTabs";
import Timeline from "../../dashboard/timeline";
import ScheduleTable from "../../dashboard/schedule";
import { Container, Row, Col } from "react-bootstrap";
import PerformanceOverview from "../../dashboard/performance";
import EnrolCoursesList from "../../dashboard/enrolCoursesList";
import MyScheduleComp from "../../../teacherDashboard/dashboard/schedule/scheduleComp";

type Props = {
  apiStatus: any;
  eventsPacket: any;
  showAlert: boolean;
  courseSession: any;
  userCoursesData: any;
  todaySessionPacket: any;
  enrolCoreCoursesObj: any;
};

const Browser: React.FC<Props> = (props) => {
  const sessionMode = ["", "offline", "online", "lab", "hybrid"];
  return (
    <React.Fragment>
      <Header />
      <HeaderTabs activeTab="studentdashboard" />
      <div className="contentarea-wrapper">
        <div className="dashboard-topPanel">
          <Container fluid>
            <Row>
              <Col md={6} lg={4} className="mb-4 mb-lg-0">
                <Timeline
                  showAlert={props.showAlert}
                  apiStatus={props.apiStatus}
                  eventsPacket={props.eventsPacket}
                  courseSession={props.courseSession}
                />
              </Col>
              <Col md={6} lg={4} className="mb-4 mb-lg-0">
                <PerformanceOverview />
              </Col>
              <Col md={12} lg={4}>
                <ScheduleTable
                  sessionMode={sessionMode}
                  apiStatus={props.apiStatus}
                  courseSession={props.courseSession}
                  todaySessionPacket={props.todaySessionPacket}
                  userCoursesData={props.userCoursesData.courses}
                />
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
