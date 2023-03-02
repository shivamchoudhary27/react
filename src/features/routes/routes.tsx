import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthenticationRoutes from "./authentication_routes";
import {ProtectedRoutes, ProtectedAdminRoutes} from "./ProtectedRoutes";
import UserContext from "../context/user/user";
import SiteAdminRoute from "./site_admin_route";
import StudentDashRoutes from "./student_dash_routes";
import TeacherDashRoutes from "./teacher_dash_routes";
import CoursesRoutes from "./courses_routes";
import CommonRoutes from "./common_routes";

export default function CustomRoutes() {
  const userCtx = useContext(UserContext);
  const isLoggedIn = userCtx.isLoggedIn;
  return (
    <BrowserRouter>
      <Routes>
        {AuthenticationRoutes(isLoggedIn)}
        <Route element={<ProtectedRoutes />}>
          {StudentDashRoutes()}
          {TeacherDashRoutes()}
          {CoursesRoutes()}
          {CommonRoutes()}
        </Route>
        <Route element={<ProtectedAdminRoutes />}>
          {SiteAdminRoute()}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
