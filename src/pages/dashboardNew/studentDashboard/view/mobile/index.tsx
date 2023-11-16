import React from "react";
import Timeline from "../../dashboard/timeline";
import { Container, Row, Col } from "react-bootstrap";
import MobileHeader from "../../../../newHeader/mobileHeader";
import MobileFooter from "../../../../newFooter/mobileFooter";
import PerformanceOverview from "../../dashboard/performance";
import EnrolCoursesList from "../../dashboard/enrolCoursesList";
import MyScheduleComp from "../../../teacherDashboard/dashboard/schedule/scheduleComp";

type Props = {
  sessionMode: any;
  eventsPacket: any;
  apiStatus: string;
  courseSession: any;
  showAlert: boolean;
  userCoursesData: any;
  apiStatusCourse: string;
  setUserCoursesData: any;
  todaySessionPacket: any;
  getSortFilterValue: any;
  enrolCoreCoursesObj: any;
  getFilterSelectValue: any;
  filterTimestampSort: string;
  courseFilterActive: boolean;
  filterTimestampValue: string;
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
                  sessionApiStatus={props.apiStatus}
                  courseSession={props.courseSession}
                  userCoursesData={props.userCoursesData}
                  todaySessionPacket={props.todaySessionPacket}
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
                  apiStatusCourse={props.apiStatusCourse}
                  courseFilterActive={props.courseFilterActive}
                  getSortFilterValue={props.getSortFilterValue}
                  filterTimestampSort={props.filterTimestampSort}
                  getFilterSelectValue={props.getFilterSelectValue}
                  filterTimestampValue={props.filterTimestampValue}
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
