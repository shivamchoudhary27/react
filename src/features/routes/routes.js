import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import LoginForm from "../../pages/login/";
import Dashboard from "../../pages/dashboard/";
import MyCourse from "../../pages/courses/mycourses";
import CourseView from "../../pages/courses/courseview";
import Video from "../../pages/courses/video";
import Startattempt from "../../pages/courses/quiz";
import Attempt from "../../pages/courses/quiz/attempt";

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
          <Route path="/mod/view/:name/:instance" element={<Startattempt />} />
          <Route path="/mod/video/:id/:courseid" element={<Video />} />
          <Route path="/mod/attempt/quiz/:attemptid" element={<Attempt />} />
          <Route path="*" element={localStorage.getItem("loggedIn") == false ? <Navigate to="/" /> : <Navigate to="/dashboard" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
