import React, { useEffect, useState } from "react";
import StudentDashboard from "../studentDashboard/dashboard";
import TeacherDashboard from "../teacherDashboard/dashboard";
import { makeGetDataRequest } from "../../features/apiCalls/getdata";
import { useSelector } from "react-redux";

type Props = {};

const DashboardNew = (props: Props) => {
  const dummyData = {
    courses: [],
    departments: {},
    programs: [],
  };
  const [apiResponse, setApiResponse] = useState(dummyData);
  const [role, setRole] = useState("");

  const currentUserInfo = useSelector(
    (state: any) => state.userInfo
  );
  const currentUserRole = useSelector(
    (state: any) => state.globalFilters.currentUserRole
  ); 
  
  console.log(currentUserInfo)

  useEffect(() => {
    if (currentUserInfo && currentUserInfo.userInfo.roles['1'] !== undefined) {
      currentUserInfo.userInfo.roles['1'].map((item: any) => {
        setRole(item);
      });
    }
  }, [currentUserInfo]);

  useEffect(() => {
    if (currentUserRole !== '') {
      let endPoint = `/${currentUserRole.id}/dashboard`;
      makeGetDataRequest(endPoint, {}, setApiResponse);
    }
  }, [currentUserRole]);

  return (
    <React.Fragment>
      {currentUserRole !== undefined && currentUserRole.shortName === "student" ? (
        <StudentDashboard />
      ) : (
        <TeacherDashboard apiResponse={apiResponse} />
      )}
    </React.Fragment>
  );
};

export default DashboardNew;
