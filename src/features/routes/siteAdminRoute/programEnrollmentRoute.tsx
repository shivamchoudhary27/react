import React from 'react'
import { Route } from 'react-router-dom'
import ProgramEnrollment from '../../../pages/siteAdminstration/programEnrollment'
import ManageProgramEnrollment from '../../../pages/siteAdminstration/manageUsers'
import EnrolUserToProgram from '../../../pages/siteAdminstration/manageUsers/addUsers'
import EnrolUsers from '../../../pages/siteAdminstration/enrolment/enrolUser'
import CourseEnrollment from '../../../pages/siteAdminstration/enrolment/courseenrollment'
import ManageGroups from '../../../pages/siteAdminstration/enrolment/manageGroups'
import SiteAdminHome from "../../../pages/siteAdminstration/siteAdmin";
import ManageUsers from "../../../pages/siteAdminstration/manageUsers";
import Preview from "../../../pages/siteAdminstration/manageProgram/preview";

const ProgramEnrollmentRoute = () => {
  return [
    <Route path="/siteadmin" key="siteadmin" element={<SiteAdminHome />} />,
    <Route path="/preview" key="preview" element={<Preview />} />,
    <Route path="/manageusers" key="manageusers" element={<ManageUsers />} />,

    <Route path="/programenrollment" key="programenrollment" element={<ProgramEnrollment />} />,
    <Route path="/manageprogramenrollment/:programid/:programname" element={<ManageProgramEnrollment />} />,
    <Route path="/enrolusertoprogram/:programid/:userid/:name" element={<EnrolUserToProgram />} />,
    <Route path="/enrolusers/:id/:name" element={<EnrolUsers />} />,
    <Route path="/courseenrollment/:programid/:courseid/:coursename" element={<CourseEnrollment />}/>,
    <Route path="/managegroups/:programid/:courseid/:coursename" element={<ManageGroups />} />,

  ]
}

export default ProgramEnrollmentRoute