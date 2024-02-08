
import { getData } from "../../adapters";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import StudentDashboard from "./studentDashboard/dashboard";
import TeacherDashboard from "./teacherDashboard/dashboard";
import { makeGetDataRequest } from "../../features/apiCalls/getdata";
import {
  next7DaysTimestamp,
  next30DaysTimestamp,
  overdueTimestamp,
} from "./utils";

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
  const [apiStatusCourse, setApiStatusCourse] = useState("");
  const [sessionApiStatus, setSessionApiStatus] = useState("");
  const [courseSession, setCourseSession] = useState([]);
  const [coursesIds, setCoursesIds] = useState<any[]>([]);
  const timestamp = Math.floor(currentDate.getTime() / 1000);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [eventsPacket, setEventsPacket] = useState<any[]>([]);
  const [enrolCoreCoursesObj, setEnrolCoreCoursesObj] = useState([]);
  const [courseFilterActive, setCourseFilterActive] = useState(false);
  const [todaySessionPacket, setTodaySessionPacket] = useState<any[]>([]);
  const [filterTimestampValue, setTimestampFilterValue] = useState("7days");
  const [filterTimestampSort, setTimestampFilterSort] =
    useState("date");
  const next7Days = next7DaysTimestamp(timestamp);
  const next30Days = next30DaysTimestamp(timestamp);
  const overdueDays = overdueTimestamp(timestamp);

  // === >>>
  const setDaysTimeSortTo = () => {
    if (filterTimestampValue !== "") {
      if (filterTimestampValue === "all") {
        return ;
      } else if (filterTimestampValue === "7days") {
        return next7Days;
      } else if (filterTimestampValue === "30days") {
        return next30Days;
      } else if (filterTimestampValue === "overdue") {
        return timestamp;
      }
    }
  };

  // const setSortByTimeSortTo = () => {
  //   if (filterTimestampSort !== "") {
  //     if (filterTimestampSort === "course") {
  //       return null;
  //     }
  //   }
  // };

  // dashboard API call to get courses data === >>>
  useEffect(() => {
    setUserCoursesData({
      departments: {},
      courses: [],
      programs: [],
    })
    if (
      currentUserRole.id !== undefined &&
      currentUserRole.id > 0 &&
      userId !== undefined
    ) {
      let endPoint = `/${currentUserRole.id}/dashboard`;
      makeGetDataRequest(endPoint, {}, setUserCoursesData, setApiStatusCourse);

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

  useEffect(() => {
    setEventsPacket([]);
    setTodaySessionPacket([]);
    setCourseSession([]);
  }, [currentUserRole]);

  // API call to get timeline calender event === >>>
  useEffect(() => {
    if (coursesIds.length > 0) {
      const query = {
        wsfunction: "block_bltimeline_get_action_events_by_timesort",
        userid: userId,
        timesortfrom:
          filterTimestampValue === "all" ? null : filterTimestampValue === "overdue" ? overdueDays : timestamp,
        timesortto:
          filterTimestampValue !== "" ? setDaysTimeSortTo() : next7Days,
        limitnum: 20,
        courseids: JSON.stringify(coursesIds),
      };
      setApiStatus("started");
      getData(query)
        .then((res) => {
          if (res.status === 200 && res.data !== "") {
            // console.log("timeslot data------", res.data)
            setEventsPacket(res.data.events);
            setCourseFilterActive(false);
          }
          setApiStatus("finished");
        })
        .catch((err) => {
          console.log(err);
          setApiStatus("finished");
        });
    } else {
      setEventsPacket([]);
    }
  }, [coursesIds, filterTimestampValue]);

  // console.log(eventsPacket)

  // API call for filter by course === >>>                      //-----------comment made by Akshay.
  // useEffect(() => {
  //   if (filterTimestampSort === "course" && coursesIds.length > 0) {
  //     const query = {
  //       wsfunction: "block_bltimeline_get_action_events_by_courses",
  //       userid: userId,
  //       timesortfrom: timestamp,
  //       timesortto: setSortByTimeSortTo(),
  //       limitnum: 20,
  //       courseids: JSON.stringify(coursesIds),
  //     };
  //     setApiStatusCourse("started");
  //     getData(query)
  //       .then((res) => {
  //         if (res.status === 200 && res.data !== "") {
  //           res.data.groupedbycourse.map((item: any) => {
  //             setEventsPacket(item.events);
  //             setCourseFilterActive(true);
  //           });
  //         }
  //         setApiStatusCourse("finished");
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         setApiStatusCourse("finished");
  //         setCourseFilterActive(false);
  //       });
  //   }
  // }, [coursesIds, filterTimestampSort]);

  const getFilterSelectValue = (val: string) => {
    setTimestampFilterValue(val);
  };

  const getSortFilterValue = (val: string) => {
    setTimestampFilterSort(val);
    if (val === "date") {
      setTimestampFilterSort("");
    }
  };

  // API call to getting today sessions === >>>
  useEffect(() => {
    if (coursesIds.length > 0) {
      const query = {
        wsfunction: "mod_attendance_get_courses_with_today_sessions",
        userid: userId,
        // date: timestamp,
        courseids: JSON.stringify(coursesIds),
      };
      const accumulatedData: any[] | ((prevState: never[]) => never[]) = [];
      setSessionApiStatus("started");
      getData(query)
        .then((res) => {
          if (res.status === 200 && res.data !== "") {
            if (res.data.errorcode === undefined) {
              res.data.map((item: any) => {
                item.attendance_instances.map((el: any) => {
                  el.today_sessions.map((session: any) => {
                    session["courseName"] = el.name
                    accumulatedData.push(session);
                  });
                });
              });
              setTodaySessionPacket(accumulatedData);
              setCourseSession(res.data);
              setSessionApiStatus("finished");
            } else {
              setTodaySessionPacket([]);
              setShowAlert(true);
              setSessionApiStatus("finished");
            }
          }
        })
        .catch((err) => {
          console.log(err);
          setSessionApiStatus("finished");
        });
    } else {
      setTodaySessionPacket([]);
    }
  }, [coursesIds]);

  useEffect(() => {
    // inprogress ... to merge the course status, grade, badges information
  }, [enrolCoreCoursesObj, userCoursesData]);

  return (
    <React.Fragment>
      {/* Render component according to user current role */}
      {currentUserRole !== undefined &&
      currentUserRole.shortName === "student" ? (
        <StudentDashboard
          // student dashboard component === >>>
          // showAlert={showAlert}
          // apiStatus={apiStatus}
          // eventsPacket={eventsPacket}
          // courseSession={courseSession}
          // userCoursesData={userCoursesData}
          // todaySessionPacket={todaySessionPacket}
          // enrolCoreCoursesObj={enrolCoreCoursesObj}
          // courseFilterActive={courseFilterActive}
          // getFilterSelectValue={getFilterSelectValue}
          // filterTimestampValue={filterTimestampValue}
          // getSortFilterValue={getSortFilterValue}
          // filterTimestampSort={filterTimestampSort}

          showAlert={showAlert}
          apiStatus={apiStatus}
          eventsPacket={eventsPacket}
          courseSession={courseSession}
          apiStatusCourse={apiStatusCourse}
          userCoursesData={userCoursesData}
          sessionApiStatus={sessionApiStatus}
          courseFilterActive={courseFilterActive}
          todaySessionPacket={todaySessionPacket}
          enrolCoreCoursesObj={enrolCoreCoursesObj}
          filterTimestampSort={filterTimestampSort}
          filterTimestampValue={filterTimestampValue}
          setUserCoursesData={setUserCoursesData}
          getSortFilterValue={getSortFilterValue}
          getFilterSelectValue={getFilterSelectValue}
        />
      ) : (
        <TeacherDashboard // teacher dashboard componment === >>>
          showAlert={showAlert}
          apiStatus={apiStatus}
          eventsPacket={eventsPacket}
          courseSession={courseSession}
          apiStatusCourse={apiStatusCourse}
          userCoursesData={userCoursesData}
          sessionApiStatus={sessionApiStatus}
          courseFilterActive={courseFilterActive}
          todaySessionPacket={todaySessionPacket}
          enrolCoreCoursesObj={enrolCoreCoursesObj}
          filterTimestampSort={filterTimestampSort}
          filterTimestampValue={filterTimestampValue}
          setUserCoursesData={setUserCoursesData}
          getSortFilterValue={getSortFilterValue}
          getFilterSelectValue={getFilterSelectValue}
        />
      )}
    </React.Fragment>
  );
};

export default DashboardNew;

