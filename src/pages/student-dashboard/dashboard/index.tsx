import React from "react";
import Header from "../../header";
import Sidebar from "../../sidebar";
import DashboardStudent from "./dashboard";

const StudentDashboard = () => {
  return (
    <>
      <Header pageHeading="" welcomeIcon={false} />
      <Sidebar />
      <DashboardStudent />
    </>
  );
};

export default StudentDashboard;
