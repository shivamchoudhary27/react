import React from "react";
import MyCourses from "../../dashboard/myCourses";
import { Container, Row, Col } from "react-bootstrap";
import Timeline from "../../dashboard/timeline/timeline";
import MobileHeader from "../../../../newHeader/mobileHeader";
import MobileFooter from "../../../../newFooter/mobileFooter";
import MyScheduleComp from "../../dashboard/schedule/scheduleComp";
import "./mobileStyle.scss";

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

const Mobile = (props: Props) => {
  return (
    <React.Fragment>
      <MobileHeader />
      <div className="contentarea-wrapper mb-wraper">
      <div className="dashboard-topPanel">
          <Container fluid>
            <Row>
              <Col md={6} className="mb-4 mb-md-0">
                <MyScheduleComp
                  sessionMode={props.commonProps.sessionMode}
                  courseSession={props.commonProps.courseSession}
                  userCoursesData={props.commonProps.userCoursesData}
                  sessionApiStatus={props.commonProps.sessionApiStatus}
                  todaySessionPacket={props.commonProps.todaySessionPacket}
                />
              </Col>
              <Col md={6}>
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
            </Row>
          </Container>
        </div>
        <div className="dashboard-bottomPanel mt-4 mb-5">
          <MyCourses
            userCoursesData={props.commonProps.userCoursesData}
            setUserCoursesData={props.commonProps.setUserCoursesData}
            enrolCoreCoursesObj={props.commonProps.enrolCoreCoursesObj}
          />
        </div>
     
      </div>
      <MobileFooter />
    </React.Fragment>
  );
};

export default Mobile;
