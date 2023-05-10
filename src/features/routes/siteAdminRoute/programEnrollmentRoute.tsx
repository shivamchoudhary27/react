import React from 'react'
import { Route } from 'react-router-dom'
import ProgramEnrollment from '../../../pages/site-adminstration/programEnrollment'
import ManageProgramEnrollment from '../../../pages/site-adminstration/manageUsers'
import EnrolUserToProgram from '../../../pages/site-adminstration/manageUsers/addUsers'
import EnrolUsers from '../../../pages/site-adminstration/enrolment/enrolUser'
import CourseEnrollment from '../../../pages/site-adminstration/enrolment/courseenrollment'
import ManageGroups from '../../../pages/site-adminstration/enrolment/manageGroups'
import SiteAdminHome from "../../../pages/site-adminstration/siteAdmin";
import ManageUsers from "../../../pages/site-adminstration/manageUsers";
import Preview from "../../../pages/site-adminstration/manageProgram/preview";

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