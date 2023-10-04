import { Route } from 'react-router-dom'
import SiteAdminHome from "../../../pages/siteAdminstration/siteAdmin";
import ManageUsers from "../../../pages/siteAdminstration/manageUsers";
import Preview from "../../../pages/siteAdminstration/manageProgram/preview";
import EnrolUsers from '../../../pages/siteAdminstration/enrolment/enrolUser'
import ManageGroups from '../../../pages/siteAdminstration/enrolment/manageGroups'
import ProgramEnrollment from '../../../pages/siteAdminstration/programEnrollment'
import ManageProgramEnrollment from '../../../pages/siteAdminstration/manageUsers'
import EnrolUserToProgram from '../../../pages/siteAdminstration/manageUsers/addUsers'
import CourseEnrollment from '../../../pages/siteAdminstration/enrolment/courseenrollment'

const ProgramEnrollmentRoute = () => {
  return [
    <Route path="/preview" key="preview" element={<Preview />} />,
    <Route path="/siteadmin" key="siteadmin" element={<SiteAdminHome />} />,
    <Route path="/manageusers" key="manageusers" element={<ManageUsers />} />,
    <Route path="/enrolusers/:id/:name" key="enrolusers" element={<EnrolUsers />} />,
    <Route path="/programenrollment" key="programenrollment" element={<ProgramEnrollment />} />,
    <Route path="/managegroups/:programid/:name/:courseid/:coursename" key="managegroups" element={<ManageGroups />} />,
    <Route path="/enrolusertoprogram/:programid/:userid/:name" key="enrolusertoprogram" element={<EnrolUserToProgram />} />,
    <Route path="/courseenrollment/:programid/:name/:courseid/:coursename" key="courseenrollment" element={<CourseEnrollment />}/>,
    <Route path="/manageprogramenrollment/:programid/:programname" key="manageprogramenrollment" element={<ManageProgramEnrollment />} />,
  ]
}

export default ProgramEnrollmentRoute