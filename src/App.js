import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./components/components.css";
import LoginForm from "./features/LoginForm";
import Dashboard from "./features/Dashboard";
import MyCourse from "./features/MyCourse";
import CourseView from "./features/CourseView";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginForm />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/mycourse" element={<MyCourse />} />
        <Route exact path="/courseview" element={<CourseView />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
