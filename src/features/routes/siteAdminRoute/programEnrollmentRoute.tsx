import React from 'react';
import { Route } from 'react-router-dom'

const SiteAdminHome = React.lazy(() => import("../../../pages/siteAdminstration/siteAdmin"))
const ManageUsers = React.lazy(() => import("../../../pages/siteAdminstration/manageUsers"))   
const Preview = React.lazy(() => import("../../../pages/siteAdminstration/manageProgram/preview"))   
const EnrolUsers = React.lazy(() => import('../../../pages/siteAdminstration/enrolment/enrolUser'))   
const ManageGroups = React.lazy(() => import('../../../pages/siteAdminstration/enrolment/manageGroups'))   
const ProgramEnrollment = React.lazy(() => import('../../../pages/siteAdminstration/programEnrollment'))   
const ManageProgramEnrollment = React.lazy(() => import('../../../pages/siteAdminstration/manageUsers'))   
const EnrolUserToProgram = React.lazy(() => import('../../../pages/siteAdminstration/manageUsers/addUsers'))   
const CourseEnrollment = React.lazy(() => import('../../../pages/siteAdminstration/enrolment/courseenrollment'))

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