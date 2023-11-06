import React from "react";
import Timeline from "../../dashboard/timeline";
import { Container, Row, Col } from "react-bootstrap";
import MobileHeader from "../../../../newHeader/mobileHeader";
import MobileFooter from "../../../../newFooter/mobileFooter";
import PerformanceOverview from "../../dashboard/performance";
import EnrolCoursesList from "../../dashboard/enrolCoursesList";
import MyScheduleComp from "../../../teacherDashboard/dashboard/schedule/scheduleComp";

type Props = {
  apiStatus: any;
  eventsPacket: any;
  showAlert: boolean;
  courseSession: any;
  userCoursesData: any;
  sessionMode: string[];
  enrolCoreCoursesObj: any;
};

const Mobile = (props: Props) => {
  return (
    <React.Fragment>
      <MobileHeader />
      <div className="contentarea-wrapper mb-wraper">
        <div className="dashboard-bottomPanel mt-4 mb-5">
          <EnrolCoursesList
            userCoursesData={props.userCoursesData}
            enrolCoreCoursesObj={props.enrolCoreCoursesObj}
          />
        </div>
        <div className="dashboard-topPanel">
          <Container fluid>
            <Row>
              <Col md={12} lg={4} className="mb-4 mb-lg-0">
                <MyScheduleComp
                  sessionMode={props.sessionMode}
                  courseSession={props.courseSession}
                  userCoursesData={props.userCoursesData}
                />
              </Col>
              <Col md={6} lg={4} className="mb-4 mb-lg-0">
                <PerformanceOverview />
              </Col>
              <Col md={6} lg={4}>
                <Timeline
                  showAlert={props.showAlert}
                  apiStatus={props.apiStatus}
                  eventsPacket={props.eventsPacket}
                  courseSession={props.courseSession}
                />
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
