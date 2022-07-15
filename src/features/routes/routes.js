import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "../LoginForm";
import Dashboard from "../Dashboard";
import MyCourse from "../MyCourse";
import CourseView from "../CourseView";
import ProtectedRoutes from "./ProtectedRoutes";
import ActivityPage from "../mod/index";
import Video from "../mod/video/video";

export default function CustomRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginForm />} />
        <Route element={<ProtectedRoutes />}>
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/mycourse" element={<MyCourse />} />
          <Route
            exact
            path="/courseview/:id/:fullname"
            element={<CourseView />}
          />
          <Route exact path="/mod/view/:id" element={<ActivityPage />} />
          <Route path="/mod/video/:id" element={<Video />} />
          <Route path="*" element={localStorage.getItem("loggedIn") == false ? <Navigate to="/" /> : <Navigate to="/dashboard" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
