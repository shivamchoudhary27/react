import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoutes } from './ProtectedRoutes';
import Video from '../../pages/courses/video';
import Startattempt from '../../pages/courses/quiz';
import Attempt from '../../pages/courses/quiz/attempt';
import ActivityPage from '../../pages/courses/activity';
import Dashboard from '../../pages/dashboard';
import LoginForm from '../../pages/loginpage';
import Catalogue from '../../pages/catalogue';
import Cart from '../../pages/cartlist';
import UserContext from '../context/user/user';
import Review from '../../pages/courses/quiz/review';
import Report from '../../pages/courses/video/report';
import Departments from '../../pages/site-adminstration/departments';
import ProgramType from '../../pages/site-adminstration/program-type';
import Discipline from '../../pages/site-adminstration/discipline';
import ManageProgram from '../../pages/site-adminstration/manage-program';
import AddProgram from '../../pages/site-adminstration/addProgram';
import ManageUsers from '../../pages/site-adminstration/manage-users';
import Home from '../../pages/home/Home';
import AuthLogin from '../../pages/authlogin/AuthLogin';
import SiteAdminHome from '../../pages/site-adminstration/siteAdmin';
import ProgramEnrollment from '../../pages/site-adminstration/program-enrollment';
import ManageCategory from '../../pages/site-adminstration/manage-category';
import ManageCourses from '../../pages/site-adminstration/manage-courses';
import ReactBigCalendar from '../../pages/calender';
import Preview from '../../pages/site-adminstration/manage-program/preview';
import StudentDashboard from '../../pages/student-dashboard/dashboard';
import TeacherDashboard from '../../pages/teacher-dashboard/dashboard';
import CalenderConfig from '../../pages/site-adminstration/calender-config';

export default function CustomRoutes() {

  const userCtx = useContext(UserContext);
  const isLoggedIn = userCtx.isLoggedIn;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"element={isLoggedIn === false ? <Home /> : <Navigate to="/dashboard" />} />
        <Route path="/login" element={isLoggedIn === false ? <LoginForm /> : <Navigate to="/dashboard" />} />
        <Route path='/authlogin' element={<AuthLogin />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/siteadmin" element={<SiteAdminHome />} />
          <Route path="/studentdashboard" element={<StudentDashboard />} />
          <Route path="/teacherdashboard" element={<TeacherDashboard />} />
          <Route path="/calenderconfig" element={<CalenderConfig />} />
          <Route path='/preview' element={<Preview />} />
          <Route path="/programenrollment" element={<ProgramEnrollment />} />
          <Route path="/managecategory" element={<ManageCategory />} />
          <Route path="/managecourses" element={<ManageCourses />} />
          <Route path="/department" element={<Departments />} />
          <Route path="/programtype" element={<ProgramType />} />
          <Route path="/discipline" element={<Discipline />} />
          <Route path="/manageprogram" element={<ManageProgram />} />
          <Route path="/addprogram/:id" element={<AddProgram />} />
          <Route path="/manageusers" element={<ManageUsers />} />
          <Route path="/mod/activity/:name/:instance" element={<ActivityPage />} />
          <Route path="/mod/video/report" element={<Report />} />
          <Route path="/mod/quiz/:courseid/:instance" element={<Startattempt />} />
          <Route path="/mod/video/:id/:courseid" element={<Video />} />
          <Route path="/mod/attempt/quiz/:instance/:attemptid/:courseid" element={<Attempt />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/calender" element={<ReactBigCalendar />} />
          <Route path="/mod/quiz/review/:attemptid/:quizid/:courseid" element={<Review />} />
          <Route path="*" element={localStorage.getItem('loggedIn') === 'false' ? <Navigate to="/" /> : <Navigate to="/dashboard" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
