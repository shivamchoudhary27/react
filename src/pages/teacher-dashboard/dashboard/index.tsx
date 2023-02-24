import React from "react";
import Header from "../../header";
import Sidebar from "../../sidebar";
import DashboardTeacher from "./dashboard";

const TeacherDashboard = () => {
  return (
    <>
      <Header pageHeading="" welcomeIcon={false} />
      <Sidebar />
      <DashboardTeacher />
    </>
  );
};

export default TeacherDashboard;