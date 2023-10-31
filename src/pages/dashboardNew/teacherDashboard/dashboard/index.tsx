import Header from "../../../newHeader";
import Footer from "../../../newFooter";
import DashboardTeacher from "./dashboard";
import { Container } from "react-bootstrap";
import HeaderTabs from "../../../headerTabs";
import { getData } from "../../../../adapters";
import NewLoader from "../../../../widgets/loader";
import React, { useState, useEffect } from "react";
import useUserinfo from "../../../../features/hooks/userinfo";

type Props = {
  userCoursesData: any;
  enrolCoreCoursesObj: any;
  setUserCoursesData: any;
};

const TeacherDashboard = (props: Props) => {
  const dummyData = {
    info: "",
    status: "",
  };
  const res = useUserinfo();
  const currentDate = new Date();
  const id = localStorage.getItem("userid");
  const [apiStatus, setApiStatus] = useState("");
  const [blTimeline, setBlTimeline] = useState(dummyData);
  const [courseSession, setCourseSession] = useState([]);
  const sessionMode = ["", "offline", "online", "lab", "hybrid"];
  const timestamp = Math.floor(currentDate.getTime() / 1000);

  // API call to getting today sessions === >>>
  useEffect(() => {
    const query = {
      wsfunction: "mod_attendance_get_courses_with_today_sessions",
      userid: id,
      date: timestamp,
    };

    getData(query)
      .then((res) => {
        if (res.status === 200 && res.data !== "") {
          setCourseSession(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // API call to get timeline calender events === >>>
  useEffect(() => {
    const query = {
      wsfunction: "block_bltimeline_get_calendarevent_sortbydate",
    };
    setApiStatus("started");
    getData(query)
      .then((res) => {
        if (res.status === 200 && res.data !== "") {
          setBlTimeline(res.data);
        }
        setApiStatus("finished");
      })
      .catch((err) => {
        console.log(err);
        setApiStatus("finished");
      });
  }, []);

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
          apiStatus={apiStatus}
          blTimeline={blTimeline}
          sessionMode={sessionMode}
          courseSession={courseSession}
          userCoursesData={props.userCoursesData}
          setUserCoursesData={props.setUserCoursesData}
          enrolCoreCoursesObj={props.enrolCoreCoursesObj}
        />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default TeacherDashboard;
