import React, { Suspense } from "react";
import Header from "../../../../newHeader";
import Footer from "../../../../newFooter";
import HeaderTabs from "../../../../headerTabs";
import MyCourses from "../../dashboard/myCourses";
import { Container, Row, Col } from "react-bootstrap";
import Timeline from "../../dashboard/timeline/timeline";
import MyScheduleComp from "../../dashboard/schedule/scheduleComp";
import BottomWave from "../../../../../assets/images/background/bg-bottom.svg";

type Props = {
  commonProps: {
    sessionMode: any;
    apiStatus: string;
    eventsPacket: any;
    showAlert: boolean;
    courseSession: any;
    userCoursesData: any;
    setUserCoursesData: any;
    getSortFilterValue: any;
    todaySessionPacket: any;
    apiStatusCourse: string;
    enrolCoreCoursesObj: any;
    sessionApiStatus: string;
    getFilterSelectValue: any;
    courseFilterActive: boolean;
    filterTimestampSort: string;
    filterTimestampValue: string;
  };
};

const Browser = (props: Props) => {
  return (
    <React.Fragment>
      <Header />
      <HeaderTabs />
      <div className="dashboard-topPanel">
        <Container fluid>
          <Row>
            <Col md={6} className="mb-4 mb-md-0">
              <Timeline
                apiStatus={props.commonProps.apiStatus}
                showAlert={props.commonProps.showAlert}
                eventsPacket={props.commonProps.eventsPacket}
                apiStatusCourse={props.commonProps.apiStatusCourse}
                courseFilterActive={props.commonProps.courseFilterActive}
                getSortFilterValue={props.commonProps.getSortFilterValue}
                filterTimestampSort={props.commonProps.filterTimestampSort}
                getFilterSelectValue={props.commonProps.getFilterSelectValue}
                filterTimestampValue={props.commonProps.filterTimestampValue}
              />
            </Col>
            <Col md={6}>
              <MyScheduleComp
                sessionMode={props.commonProps.sessionMode}
                courseSession={props.commonProps.courseSession}
                userCoursesData={props.commonProps.userCoursesData}
                sessionApiStatus={props.commonProps.sessionApiStatus}
                todaySessionPacket={props.commonProps.todaySessionPacket}
              />
            </Col>
          </Row>
        </Container>
      </div>
      <div className="dashboard-bottomPanel mt-4 mb-5">
        <MyCourses
          apiStatusCourse={props.commonProps.apiStatusCourse}
          userCoursesData={props.commonProps.userCoursesData}
          setUserCoursesData={props.commonProps.setUserCoursesData}
          enrolCoreCoursesObj={props.commonProps.enrolCoreCoursesObj}
        />
      </div>
      <Footer />
      <div className="bottom-bg">
        <img src={BottomWave} alt="bottom wave" />
      </div>
    </React.Fragment>
  );
};

export default Browser;
