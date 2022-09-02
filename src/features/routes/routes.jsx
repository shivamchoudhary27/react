import React from 'react';
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
import CourseView from '../../pages/courses/courseview';
import Catalogue from '../../pages/catalogue';

export default function CustomRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginForm />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            exact
            path="/courseview/:id/:fullname"
            element={<CourseView />}
          />
          <Route path="/mod/activity/:name/:instance" element={<ActivityPage />} />
          <Route path="/mod/quiz/:name/:instance/:courseid" element={<Startattempt />} />
          <Route path="/mod/video/:id/:courseid" element={<Video />} />
          <Route path="/mod/attempt/quiz/:attemptid/:courseid" element={<Attempt />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="*" element={localStorage.getItem('loggedIn') === false ? <Navigate to="/" /> : <Navigate to="/dashboard" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
