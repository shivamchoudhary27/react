import React, { useContext } from 'react';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import Video from '../../pages/courses/video';
import Startattempt from '../../pages/courses/quiz';
import Attempt from '../../pages/courses/quiz/attempt';
import ActivityPage from '../../pages/courses/activity';
import Dashboard from '../../pages/dashboard';
import LoginForm from '../../pages/loginpage';
import Catalogue from '../../pages/catalogue';
import UserContext from '../context/user/user';
import Review from '../../pages/courses/quiz/review';

export default function CustomRoutes() {
  const userCtx = useContext(UserContext);
  const isLoggedIn = userCtx.isLoggedIn;
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={isLoggedIn === false ? <LoginForm /> : <Navigate to="/dashboard" />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route
            exact
            path="/courseview/:id/"
            element={<CourseView />}
          /> */}
          <Route path="/mod/activity/:name/:instance" element={<ActivityPage />} />
          <Route path="/mod/quiz/:courseid/:instance" element={<Startattempt />} />
          <Route path="/mod/video/:id/:courseid" element={<Video />} />
          <Route path="/mod/attempt/quiz/:instance/:attemptid/:courseid" element={<Attempt />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/mod/quiz/review/:attemptid/:quizid/:courseid" element ={<Review />} />
          <Route path="*" element={localStorage.getItem('loggedIn') === false ? <Navigate to="/" /> : <Navigate to="/dashboard" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
