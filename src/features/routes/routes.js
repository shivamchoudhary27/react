import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "../LoginForm";
import Dashboard from "../Dashboard";
import MyCourse from "../MyCourse";
import CourseView from "../CourseView";
import ProtectedRoutes from "./ProtectedRoutes";
import ActivityPage from "../ActivityPage";
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
          <Route exact path="/mod/:id" element={<ActivityPage />} />
          <Route path="/video" element={<Video />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
