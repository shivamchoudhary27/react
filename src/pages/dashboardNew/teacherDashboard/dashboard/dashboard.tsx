import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import MyScheduleComp from "./schedule/scheduleComp";
import Timeline from "./timeline/timeline";
import MyCourses from "./myCourses/index";

type Props = {
  sessionMode: any;
  eventsPacket: any;
  apiStatus: string;
  showAlert: boolean;
  courseSession: any;
  userCoursesData: any;
  setUserCoursesData: any;
  todaySessionPacket: any;
  enrolCoreCoursesObj: any;
  getFilterSelectValue: any;
  apiStatusCourse: string;
  courseFilterActive: boolean;
  filterTimestampValue: string;
  getSortFilterValue: any;
  filterTimestampSort: string;
};

const DashboardTeacher: React.FC<Props> = (props) => {
  return (
    <React.Fragment>
      <div className="dashboard-topPanel">
        <Container fluid>
          <Row>
            <Col md={6} className="mb-4 mb-md-0">
              <Timeline
                apiStatus={props.apiStatus}
                showAlert={props.showAlert}
                eventsPacket={props.eventsPacket}
                apiStatusCourse={props.apiStatusCourse}
                courseFilterActive={props.courseFilterActive}
                getSortFilterValue={props.getSortFilterValue}
                filterTimestampSort={props.filterTimestampSort}
                getFilterSelectValue={props.getFilterSelectValue}
                filterTimestampValue={props.filterTimestampValue}
              />
            </Col>
            <Col md={6}>
              <MyScheduleComp
                apiStatus={props.apiStatus}
                sessionMode={props.sessionMode}
                courseSession={props.courseSession}
                userCoursesData={props.userCoursesData}
                todaySessionPacket={props.todaySessionPacket}
              />
            </Col>
          </Row>
        </Container>
      </div>
      <div className="dashboard-bottomPanel mt-4 mb-5">
        <MyCourses
          userCoursesData={props.userCoursesData}
          setUserCoursesData={props.setUserCoursesData}
          enrolCoreCoursesObj={props.enrolCoreCoursesObj}
        />
      </div>
    </React.Fragment>
  );
};

export default DashboardTeacher;
