import React from "react";
import Header from "../../../newHeader";
import Footer from "../../../newFooter";
import DashboardTeacher from "./dashboard";
import { Container } from "react-bootstrap";
import HeaderTabs from "../../../headerTabs";
import NewLoader from "../../../../widgets/loader";
import useUserinfo from "../../../../features/hooks/userinfo";

type Props = {
  userCoursesData: any;
  enrolCoreCoursesObj: any;
};

const TeacherDashboard = (props: Props) => {
  const res = useUserinfo();

  const loaderStyle = {
    display: "flex",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
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
        <DashboardTeacher
          userCoursesData={props.userCoursesData}
          enrolCoreCoursesObj={props.enrolCoreCoursesObj}
        />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default TeacherDashboard;
