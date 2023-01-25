import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
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

export default function CustomRoutes() {
  console.log(localStorage.getItem('loggedIn'));
  const userCtx = useContext(UserContext);
  const isLoggedIn = userCtx.isLoggedIn;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLoggedIn === false ? <LoginForm /> : <Navigate to="/dashboard" />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/department" element={<Departments />} />
          <Route path="/programtype" element={<ProgramType />} />
          <Route path="/discipline" element={<Discipline />} />
          <Route path="/manageprogram" element={<ManageProgram />} />
          <Route path="/addprogram" element={<AddProgram />} />
          <Route path="/manageusers" element={<ManageUsers />} />
          <Route path="/mod/activity/:name/:instance" element={<ActivityPage />} />
          <Route path="/mod/video/report" element={<Report />} />
          <Route path="/mod/quiz/:courseid/:instance" element={<Startattempt />} />
          <Route path="/mod/video/:id/:courseid" element={<Video />} />
          <Route path="/mod/attempt/quiz/:instance/:attemptid/:courseid" element={<Attempt />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/mod/quiz/review/:attemptid/:quizid/:courseid" element={<Review />} />
          <Route path="*" element={localStorage.getItem('loggedIn') === 'false' ? <Navigate to="/" /> : <Navigate to="/dashboard" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
