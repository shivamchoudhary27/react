import { useContext } from 'react';
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
import Home from '../../pages/home/Home';
import AuthLogin from '../../pages/authlogin/AuthLogin';
import SignUpNew from '../../pages/signupNew';
import UserManagementRoute from './siteAdminRoute/userManagementRoute';
import ProgramManagementRoute from './siteAdminRoute/programManagementRoute';
import ProgramEnrollmentRoute from './siteAdminRoute/programEnrollmentRoute';
import CalenderManagementRoute from './siteAdminRoute/calenderManagementRoute';
import StudentDashRoutes from './studentDashRoutes';
import TeacherDashRoutes from './teacherDashRoutes';
import ProgramOverview from '../../pages/programOverview';

export default function NewCustomRoutes() {

  const userCtx = useContext(UserContext);
  const isLoggedIn = userCtx.isLoggedIn;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"element={isLoggedIn === false ? <Home /> : <Navigate to="/studentdashboard" />} />
        <Route path="/login" element={isLoggedIn === false ? <LoginForm /> : <Navigate to="/studentdashboard" />} />
        <Route path='/authlogin' element={<AuthLogin />} />
        <Route path="/signupnew" element={<SignUpNew />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {UserManagementRoute()}
          {ProgramManagementRoute()}
          {ProgramEnrollmentRoute()}
          {CalenderManagementRoute()}
          {StudentDashRoutes()}
          {TeacherDashRoutes()}
          <Route path='/programoverview' element={<ProgramOverview />} />
          <Route path="/mod/activity/:name/:instance" element={<ActivityPage />} />
          <Route path="/mod/video/report" element={<Report />} />
          <Route path="/mod/quiz/:courseid/:instance" element={<Startattempt />} />
          <Route path="/mod/video/:id/:courseid" element={<Video />} />
          <Route path="/mod/attempt/quiz/:instance/:attemptid/:courseid" element={<Attempt />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/mod/quiz/review/:attemptid/:quizid/:courseid" element={<Review />} />
          <Route path="*" element={localStorage.getItem('loggedIn') === 'false' ? <Navigate to="/" /> : <Navigate to="/studentdashboard" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
