import React from "react";
import { Container } from "react-bootstrap";
import Header from "../../newHeader";
import Footer from "../../newFooter";
import HeaderTabs from "../../headerTabs";
// import DashboardTeacher from "./dashboard";
import useUserinfo from "../../../features/hooks/userinfo";
import NewLoader from "../../../widgets/loader";
import { Row, Col } from "react-bootstrap";
import Timeline from "./timeline/timeline";
import MyScheduleComp from "./schedule/scheduleComp";
import MyCourses from "./myCourses";

type Props = {
  apiResponse: any
};

const TeacherDashboard: React.FunctionComponent<Props> = ({
  ...props
}: Props) => {
  const res = useUserinfo();

  const loaderStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  if (res === "loading") {
    return (
      <Container style={loaderStyle}>
        <NewLoader />
        <br />
      </Container>
    );
  }
  return (
    <React.Fragment>
      <Header />
      <HeaderTabs activeTab="teacherdashboard" />
      <div className="contentarea-wrapper">
        {/* <DashboardTeacher /> */}
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
          <MyCourses apiResponse={props.apiResponse} />
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default TeacherDashboard;
