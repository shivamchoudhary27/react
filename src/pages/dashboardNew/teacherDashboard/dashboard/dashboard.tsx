import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import MyScheduleComp from "./schedule/scheduleComp";
import Timeline from "./timeline/timeline";
import MyCourses from "./myCourses/index"

type Props = {
  userCoursesData: any;
  enrolCoreCoursesObj: any;
  setUserCoursesData: any
};

const DashboardTeacher = (props: Props) => {

  return (
    <>
      <div className="dashboard-topPanel">
        <Container fluid>
          <Row>
            <Col md={6} className="mb-4 mb-md-0">
              <Timeline />
            </Col>
            <Col md={6}>
              <MyScheduleComp />
            </Col>
          </Row>
        </Container>
      </div>
      <div className="dashboard-bottomPanel mt-4 mb-5">
        <MyCourses
          userCoursesData={props.userCoursesData}
          enrolCoreCoursesObj={props.enrolCoreCoursesObj}
          setUserCoursesData={props.setUserCoursesData}
        />
      </div>
    </>
  );
};

export default DashboardTeacher;
