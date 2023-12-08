import { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
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
import CoPoManagementRoute from './siteAdminRoute/copoManagement';
import UserManagementRoute from './siteAdminRoute/userManagementRoute';
import TimetableManagementRoute from './siteAdminRoute/timetableManagement';
import ProgramManagementRoute from './siteAdminRoute/programManagementRoute';
import ProgramEnrollmentRoute from './siteAdminRoute/programEnrollmentRoute';
import CalenderManagementRoute from './siteAdminRoute/calenderManagementRoute';
import StudentDashRoutes from './studentDashRoutes';
import TeacherDashRoutes from './teacherDashRoutes';
import ProgramOverview from '../../pages/programOverview';
import PageNotFound from '../../pages/404';
import GradeBook from '../../pages/gradeBook';
import TeacherGradebook from '../../pages/teacherDashboard/gradebook/teacherGradebook';
import SelectedStudentGrade from '../../pages/teacherDashboard/gradebook/selectedStudent';
// import { Navigate, Outlet } from 'react-router-dom';
import DashboardNew from '../../pages/dashboardNew';
import ClassRoom from '../../pages/siteAdminstration/timetable/classroom';
import WorkLoad from '../../pages/siteAdminstration/timetable/workLoad';
import Holidays from '../../pages/siteAdminstration/timetable/holidays';
import ManageCoursesWorkLoad from '../../pages/siteAdminstration/timetable/manageCoursesWorkLoad';
import TimesSlot from '../../pages/siteAdminstration/timetable/timesSlot';
import UserProfile from '../../pages/user/profile';
import EditProfile from '../../pages/user/profile/forms/editProfile';
import Attendance from '../../pages/attendance';
import Helpdesk from '../../pages/helpdesk';

export default function NewCustomRoutes() {
  const userCtx = useContext(UserContext);
  const isLoggedIn = userCtx.isLoggedIn;
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route element={<><Outlet /><MitGlobalAlert /></>}> 
         * create a new component for global imports
        */}  
          <Route path="/"element={isLoggedIn === false ? <Home /> : <Navigate to="/dashboard" />} />
          <Route path="/login" element={isLoggedIn === false ? <LoginForm /> : <Navigate to="/dashboard" />} />
          <Route path='/authlogin' element={<AuthLogin />} />
          <Route path="/signupnew" element={<SignUpNew />} />
          <Route element={<ProtectedRoutes />}>
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            {UserManagementRoute()}
            {ProgramManagementRoute()}
            {ProgramEnrollmentRoute()}
            {CalenderManagementRoute()}
            {CoPoManagementRoute()}
            {TimetableManagementRoute()}
          
          <Route path="/profile" key="profile" element={<UserProfile />} />
          <Route path="/editprofile" key="editprofile" element={<EditProfile />} />
          <Route path="/dashboard" key="dashboard" element={<DashboardNew />} />

            {/* {StudentDashRoutes()} */}
            {/* {TeacherDashRoutes()} */}
            <Route path="/attendance" key="attendance" element={<Attendance />} />
            <Route path="/helpdesk" key="helpdesk" element={<Helpdesk />} />
            <Route path='/gradebook' element={<GradeBook />} />
            <Route path='/teachergradebook' element={<TeacherGradebook />} />
            <Route path='/studentgradeview' element={<SelectedStudentGrade />} />
            <Route path='/programoverview' element={<ProgramOverview />} />
            <Route path="/mod/activity/:name/:instance" element={<ActivityPage />} />
            <Route path="/mod/video/report" element={<Report />} />
            <Route path="/mod/quiz/:courseid/:instance" element={<Startattempt />} />
            <Route path="/mod/video/:id/:courseid" element={<Video />} />
            <Route path="/mod/attempt/quiz/:instance/:attemptid/:courseid" element={<Attempt />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/mod/quiz/review/:attemptid/:quizid/:courseid" element={<Review />} />
            {/* <Route path="*" element={localStorage.getItem('loggedIn') === 'false' ? <Navigate to="/" /> : <Navigate to="/studentdashboard" />} /> */}
            <Route path='*' element={<PageNotFound />} />
          </Route>
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}