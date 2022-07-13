import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./components/components.css";
import LoginForm from "./features/LoginForm";
import Dashboard from "./features/Dashboard";
import MyCourse from "./features/MyCourse";
import CourseView from "./features/CourseView";
import ProtectedRoutes from "./features/ProtectedRoutes";
import ActivityPage from "./features/ActivityPage";

const App = () => {
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
