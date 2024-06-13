import React, { Suspense, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoutes } from './ProtectedRoutes';
import Video from '../../pages/courses/video';
import Startattempt from '../../pages/courses/quiz';
import Attempt from '../../pages/courses/quiz/attempt';
import ActivityPage from '../../pages/courses/activity';
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
import HelpdeskManagementRoute from './siteAdminRoute/helpdeskManagementRoute';
import Performance from '../../pages/siteAdminstration/performance';
import PageNotFound from '../../pages/404';
import TeacherGradebook from '../../pages/teacherDashboard/gradebook/teacherGradebook';
// import SelectedStudentGrade from '../../pages/teacherDashboard/gradebook/selectedStudent';    not in use
// import { Navigate, Outlet } from 'react-router-dom';
import MinorCourse from '../../pages/minorCourses';
import RouterLadyLoader from '../../globals/globalLazyLoader/routerLadyLoader';
import Logout from '../../pages/logout';

import ProgramSummary from "../../pages/home/programSummary";
// import ProgramSummary from '../../pages/home/preview/index';  
import ProgramList from "../../pages/home/programList"
// import UserWaitlistData from '../../pages/minorCourses/userWaitlistData'; //krishna
import MailTempelateConfiguration from '../../pages/mailTempelateConfiguration';
import UserWaitlist from '../../pages/siteAdminstration/enrolment/enrolUser/userWaitlist';
import GradeTable from '../../pages/gradeBook/teacherGradeBook/studentViewGradebook/index';

const GradeBook = React.lazy(() => import('../../pages/gradeBook/mainIndex'))
const Attendance = React.lazy(() => import('../../pages/attendance'))
const UserProfile = React.lazy(() => import('../../pages/user/profile'))
const DashboardNew = React.lazy(() => import('../../pages/dashboardNew'))
const ProgramOverview = React.lazy(() => import('../../pages/programOverview'))
const EditProfile = React.lazy(() => import('../../pages/user/profile/forms/editProfile'))

export default function NewCustomRoutes() {
  const userCtx = useContext(UserContext);
  const isLoggedIn = userCtx.isLoggedIn;
  return (
    <BrowserRouter>
    <Suspense fallback={<RouterLadyLoader />}>
      <Routes>
        {/* <Route element={<><Outlet /><MitGlobalAlert /></>}> 
         * create a new component for global imports
        */}  

          <Route path="/"element={isLoggedIn === false ? <Home /> : <Navigate to="/dashboard" />} />
          <Route path="/login" element={isLoggedIn === false ? <LoginForm /> : <Navigate to="/dashboard" />} />
          <Route path="/logout" element={<Logout />} />
          <Route path='/authlogin' element={<AuthLogin />} />
          <Route path="/signupnew" element={<SignUpNew />} />

          {/* Home page */}
          <Route path="/programlist" key="programlist" element={<ProgramList />} />
          <Route path="/programsummary/:Programid" key="programummary" element={<ProgramSummary />} />

          <Route path='/mailtempelateconfiguration' element={<MailTempelateConfiguration />} />

          <Route element={<ProtectedRoutes />}>
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            {UserManagementRoute()}
            {ProgramManagementRoute()}
            {ProgramEnrollmentRoute()}
            {CalenderManagementRoute()}
            {CoPoManagementRoute()}
            {TimetableManagementRoute()}
            {HelpdeskManagementRoute()}
          

          <Route path='/programoverview' element={<ProgramOverview />} />
          <Route path="/profile" key="profile" element={<UserProfile />} />
          <Route path="/dashboard" key="dashboard" element={<DashboardNew />} />
          <Route path="/attendance" key="attendance" element={<Attendance />} />
          <Route path="/editprofile" key="editprofile" element={<EditProfile />} />
          <Route path="/performance" key="performance" element={<Performance />} />

            {/* {StudentDashRoutes()} */}
            {/* {TeacherDashRoutes()} */}
            <Route path="/minorcourse" element={<MinorCourse />} />
            <Route path="/userwaitlist/:programid/:name/:courseid/:coursename" element={<UserWaitlist />} />
            <Route path='/gradebook' element={<GradeBook />} />
            <Route path='/teachergradebook' element={<TeacherGradebook />} />
            <Route path='/studentgradeview/:courseId/:userId/:courseName' element={<GradeTable />} />
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
    </Suspense>
    </BrowserRouter>
  );
}