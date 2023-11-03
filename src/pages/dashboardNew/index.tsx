import { getData } from "../../adapters";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import StudentDashboard from "./studentDashboard/dashboard";
import TeacherDashboard from "./teacherDashboard/dashboard";
import { makeGetDataRequest } from "../../features/apiCalls/getdata";

type Props = {};

const DashboardNew = (props: Props) => {
  const dummyData = {
    groupedbycourse: [],
  };
  const currentDate = new Date();
  const userId = localStorage.getItem("userid");
  const [userCoursesData, setUserCoursesData] = useState({
    departments: {},
    courses: [],
    programs: [],
  });
  const [enrolCoreCoursesObj, setEnrolCoreCoursesObj] = useState([]);
  const [courseSession, setCourseSession] = useState([]);
  const timestamp = Math.floor(currentDate.getTime() / 1000);
  const [apiStatus, setApiStatus] = useState("");
  const [blTimelineEvent, setBlTimelineEvent] = useState(dummyData);
  const currentUserRole = useSelector(
    (state: any) => state.globalFilters.currentUserRole
  );

  useEffect(() => {
    if (
      currentUserRole.id !== undefined &&
      currentUserRole.id > 0 &&
      userId !== undefined
    ) {
      let endPoint = `/${currentUserRole.id}/dashboard`;
      makeGetDataRequest(endPoint, {}, setUserCoursesData);

      // get moodle enrole courses data for course status
      const query = {
        wsfunction: "core_enrol_get_users_courses",
        userid: userId,
      };
      getData(query)
        .then((res) => {
          if (res.data !== "" && res.status === 200) {
            setEnrolCoreCoursesObj(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currentUserRole, userId]);

  // API call to getting today sessions === >>>
  useEffect(() => {
    const query = {
      wsfunction: "mod_attendance_get_courses_with_today_sessions",
      userid: userId,
      date: timestamp,
    };
    getData(query)
      .then((res) => {
        if (res.status === 200 && res.data !== "") {
          if (res.data.errorcode === undefined) {
            setCourseSession(res.data);
          } else {
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId, userCoursesData]);

  // API call to get timeline calender events according to role === >>>
  useEffect(() => {
    if (currentUserRole.id > 0) {
      const query = {
        wsfunction: "local_blapi_course_bltimeline_api",
        userid: userId,
        role: currentUserRole.shortName,
      };
      setApiStatus("started");
      getData(query)
        .then((res) => {
          if (res.status === 200 && res.data !== "") {
            if (res.data.errorcode === undefined) {
              setBlTimelineEvent(res.data);
            } else {
            }
          }
          setApiStatus("finished");
        })
        .catch((err) => {
          console.log(err);
          setApiStatus("finished");
        });
    }
  }, [currentUserRole, userId, userCoursesData]);

  useEffect(() => {
    // inprogress ... to merge the course status, grade, badges information
  }, [enrolCoreCoursesObj, userCoursesData]);

  return (
    <React.Fragment>
      {currentUserRole !== undefined &&
      currentUserRole.shortName === "student" ? (
        <StudentDashboard
          apiStatus={apiStatus}
          courseSession={courseSession}
          userCoursesData={userCoursesData}
          enrolCoreCoursesObj={enrolCoreCoursesObj}
          blTimelineEvent={blTimelineEvent.groupedbycourse}
        />
      ) : (
        <TeacherDashboard
          apiStatus={apiStatus}
          courseSession={courseSession}
          userCoursesData={userCoursesData}
          enrolCoreCoursesObj={enrolCoreCoursesObj}
          blTimelineEvent={blTimelineEvent.groupedbycourse}
          setUserCoursesData={setUserCoursesData}
        />
      )}
    </React.Fragment>
  );
};

export default DashboardNew;
