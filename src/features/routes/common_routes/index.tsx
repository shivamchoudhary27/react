import React from "react";
import { Route, Navigate } from "react-router-dom";
import Dashboard from "../../../pages/dashboard";
import ReactBigCalendar from "../../../pages/calender";

const CommonRoutes = () => {
  return [
    <Route path="/dashboard" key="dashboard" element={<Dashboard />} />,
    <Route path="/calender" key="calender" element={<ReactBigCalendar />} />,
    <Route
      path="*" key="notfound"
      element={
        localStorage.getItem("loggedIn") === "false" ? (
          <Navigate to="/" />
        ) : (
          <Navigate to="/dashboard" />
        )
      }
    />,
  ];
};

export default CommonRoutes;
