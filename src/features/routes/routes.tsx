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
import Departments from '../../pages/siteAdminstration/departments';
import ProgramType from '../../pages/siteAdminstration/programType';
import Discipline from '../../pages/siteAdminstration/discipline';
import ManageProgram from '../../pages/siteAdminstration/manageProgram';
import AddProgram from '../../pages/siteAdminstration/manageProgram/addProgram';
import ManageProgramEnrollment from '../../pages/siteAdminstration/manageUsers';
import Home from '../../pages/home/Home';
import AuthLogin from '../../pages/authlogin/AuthLogin';
import SiteAdminHome from '../../pages/siteAdminstration/siteAdmin';
import ProgramEnrollment from '../../pages/siteAdminstration/programEnrollment';
import ManageCategory from '../../pages/siteAdminstration/manageCategory';
import CourseManagment from '../../pages/siteAdminstration/manageCourse';
import ReactBigCalendar from '../../pages/calender';
import Preview from '../../pages/siteAdminstration/manageProgram/preview';
import StudentDashboard from '../../pages/studentDashboard/dashboard';
import TeacherDashboard from '../../pages/teacherDashboard/dashboard';
import CalenderConfig from '../../pages/siteAdminstration/calenderConfig';
import Tags from '../../pages/siteAdminstration/tags';
import EnrolUserToProgram from '../../pages/siteAdminstration/manageUsers/addUsers';
import UserManagement from '../../pages/siteAdminstration/userManagement';
import SignUpNew from '../../pages/signupNew';
import EnrolUsers from '../../pages/siteAdminstration/enrolment/enrolUser';
import CourseEnrollment from '../../pages/siteAdminstration/enrolment/courseenrollment';
import ManageGroups from '../../pages/siteAdminstration/enrolment/manageGroups';

export default function CustomRoutes() {

  const userCtx = useContext(UserContext);
  const isLoggedIn = userCtx.isLoggedIn;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"element={isLoggedIn === false ? <Home /> : <Navigate to="/dashboard" />} />
        <Route path="/login" element={isLoggedIn === false ? <LoginForm /> : <Navigate to="/dashboard" />} />
        <Route path='/authlogin' element={<AuthLogin />} />
        <Route path="/signupnew" element={<SignUpNew />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/siteadmin" element={<SiteAdminHome />} />
          <Route path="/studentdashboard" element={<StudentDashboard />} />
          <Route path="/teacherdashboard" element={<TeacherDashboard />} />
          <Route path="/calenderconfig" element={<CalenderConfig />} />
          <Route path='/preview' element={<Preview />} />
          <Route path='/usermanagement' element={<UserManagement />} />
          <Route path="/programenrollment" element={<ProgramEnrollment />} />
          <Route path="/managegroups/:programid/:courseid/:coursename" element={<ManageGroups />} />
          <Route path="/enrolusertoprogram/:programid/:userid/:name" element={<EnrolUserToProgram />} />
          <Route path="/managecategory/:id/:name" element={<ManageCategory />} />
          <Route path="/managecourses/:id/:name" element={<CourseManagment />} />
          <Route path="/enrolusers/:id/:name" element={<EnrolUsers />} />
          <Route path="/courseenrollment/:programid/:courseid/:coursename" element={<CourseEnrollment />}/>
          <Route path="/department" element={<Departments />} />
          <Route path="/programtype" element={<ProgramType />} />
          <Route path="/discipline" element={<Discipline />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/manageprogram" element={<ManageProgram />} />
          <Route path="/programpreview/:id" element={<Preview />} />
          <Route path="/addprogram/:id" element={<AddProgram />} />
          <Route path="/manageprogramenrollment/:programid/:programname" element={<ManageProgramEnrollment />} />
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
