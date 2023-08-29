import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import StudentDashboard from "./studentDashboard/dashboard";
import TeacherDashboard from "./teacherDashboard/dashboard";
import { makeGetDataRequest } from "../../features/apiCalls/getdata";
import { getData } from "../../adapters";

type Props = {};

const DashboardNew = (props: Props) => {
  const dummyData = {
    courses: [],
    departments: {},
    programs: [],
  };
  const id = localStorage.getItem("userid");
  const [userCoursesData, setUserCoursesData] = useState(dummyData);
  const [enrolCoreCoursesObj, setEnrolCoreCoursesObj] = useState([]);
  const currentUserRole = useSelector(
    (state: any) => state.globalFilters.currentUserRole
  );

  useEffect(() => {
    if (currentUserRole.id !== undefined && currentUserRole.id > 0) {
      let endPoint = `/${currentUserRole.id}/dashboard`;
      makeGetDataRequest(endPoint, {}, setUserCoursesData);
    }
  }, [currentUserRole]);

  useEffect(() => {
    const query = {
      wsfunction: "core_enrol_get_users_courses",
      userid: id,
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
  }, [id]);

  return (
    <React.Fragment>
      {currentUserRole !== undefined &&
      currentUserRole.shortName === "student" ? (
        <StudentDashboard
          userCoursesData={userCoursesData}
          enrolCoreCoursesObj={enrolCoreCoursesObj}
        />
      ) : (
        <TeacherDashboard
          userCoursesData={userCoursesData}
          enrolCoreCoursesObj={enrolCoreCoursesObj}
        />
      )}
    </React.Fragment>
  );
};

export default DashboardNew;
