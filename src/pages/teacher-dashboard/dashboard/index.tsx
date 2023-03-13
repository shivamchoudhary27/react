import React from "react";
import Header from "../../header";
import Sidebar from "../../sidebar";
import DashboardTeacher from "./dashboard";

const TeacherDashboard = () => {
  return (
    <>
      <Header pageHeading="" welcomeIcon={false} />
      <div className='main-content-container'>
        <Sidebar />
        <DashboardTeacher />
      </div>
    </>
  );
};

export default TeacherDashboard;