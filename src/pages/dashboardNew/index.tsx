import { getData } from "../../adapters";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import StudentDashboard from "./studentDashboard/dashboard";
import TeacherDashboard from "./teacherDashboard/dashboard";
import { makeGetDataRequest } from "../../features/apiCalls/getdata";

type Props = {};

const DashboardNew: React.FC<Props> = (props) => {
  const [userCoursesData, setUserCoursesData] = useState({
    departments: {},
    courses: [],
    programs: [],
  });
  const currentUserRole = useSelector(
    (state: any) => state.globalFilters.currentUserRole
  );
  const currentDate = new Date();
  const userId = localStorage.getItem("userid");
  const [apiStatus, setApiStatus] = useState("");
  const [courseSession, setCourseSession] = useState([]);
  const [coursesIds, setCoursesIds] = useState<any[]>([]);
  const timestamp = Math.floor(currentDate.getTime() / 1000);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [eventsPacket, setEventsPacket] = useState<any[]>([]);
  const [enrolCoreCoursesObj, setEnrolCoreCoursesObj] = useState([]);
  const [todaySessionPacket, setTodaySessionPacket] = useState<any[]>([]);

  // dashboard API call to get courses data === >>>
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

  useEffect(() => {
    const accumulatedCourseId: any[] = [];
    userCoursesData.courses.map((item: any) => {
      accumulatedCourseId.push(item.idNumber);
    });
    setCoursesIds(accumulatedCourseId);
  }, [userCoursesData]);

  // API call to getting today sessions === >>>
  useEffect(() => {
    const query = {
      wsfunction: "mod_attendance_get_courses_with_today_sessions",
      userid: userId,
      date: timestamp,
    };
    const accumulatedData: any[] | ((prevState: never[]) => never[]) = [];
    setApiStatus("started");
    getData(query)
      .then((res) => {
        if (res.status === 200 && res.data !== "") {
          if (res.data.errorcode === undefined) {
            res.data.map((item: any) => {
              item.attendance_instances.map((el: any) => {
                el.today_sessions.map((session: any) => {
                  accumulatedData.push(session);
                });
              });
            });
            setTodaySessionPacket(accumulatedData);
            setCourseSession(res.data);
            setApiStatus("finished");
          } else {
            setTodaySessionPacket([]);
            setShowAlert(true);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setApiStatus("finished");
      });
  }, [userId, userCoursesData]);

  // API call to get timeline calender events according to role === >>>
  // useEffect(() => {
  //   if (currentUserRole.id > 0) {
  //     const query = {
  //       wsfunction: "local_blapi_course_bltimeline_api",
  //       userid: userId,
  //       role: currentUserRole.shortName,
  //     };
  //     setApiStatus("started");
  //     const accumulatedData: any[] | ((prevState: never[]) => never[]) = [];
  //     getData(query)
  //       .then((res) => {
  //         if (res.status === 200 && res.data !== "") {
  //           if (res.data.errorcode === undefined) {
  //             res.data.groupedbycourse.map((item: any) => {
  //               item.events.map((event: any) => {
  //                 accumulatedData.push(event);
  //               });
  //             });
  //           } else {
  //             setEventsPacket([]);
  //             setShowAlert(true);
  //           }
  //         }
  //         setEventsPacket(accumulatedData);
  //         setApiStatus("finished");
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         setApiStatus("finished");
  //       });
  //   }
  // }, [currentUserRole, userId, userCoursesData]);

  useEffect(() => {
    const query = {
      wsfunction: "block_bltimeline_get_action_events_by_timesort",
      userid: userId,
      courseids: JSON.stringify(coursesIds),
    };
    setApiStatus("started");
    getData(query)
      .then((res) => {
        if (res.status === 200 && res.data !== "") {
          console.log(res.data);
          setEventsPacket(res.data.events);
        }
        setApiStatus("finished");
      })
      .catch((err) => {
        console.log(err);
        setApiStatus("finished");
      });
  }, [currentUserRole, userId, coursesIds]);

  useEffect(() => {
    // inprogress ... to merge the course status, grade, badges information
  }, [enrolCoreCoursesObj, userCoursesData]);

  return (
    <React.Fragment>
      {/* Render component according to user current role */}
      {currentUserRole !== undefined &&
      currentUserRole.shortName === "student" ? (
        <StudentDashboard // student dashboard component === >>>
          showAlert={showAlert}
          apiStatus={apiStatus}
          eventsPacket={eventsPacket}
          courseSession={courseSession}
          userCoursesData={userCoursesData}
          todaySessionPacket={todaySessionPacket}
          enrolCoreCoursesObj={enrolCoreCoursesObj}
        />
      ) : (
        <TeacherDashboard // teacher dashboard componment === >>>
          showAlert={showAlert}
          apiStatus={apiStatus}
          eventsPacket={eventsPacket}
          courseSession={courseSession}
          userCoursesData={userCoursesData}
          todaySessionPacket={todaySessionPacket}
          enrolCoreCoursesObj={enrolCoreCoursesObj}
          setUserCoursesData={setUserCoursesData}
        />
      )}
    </React.Fragment>
  );
};

export default DashboardNew;
