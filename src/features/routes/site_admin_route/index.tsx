import React from "react";
import { Route } from "react-router-dom";
import SiteAdminHome from "../../../pages/site-adminstration/siteAdmin";
import Departments from "../../../pages/site-adminstration/departments";
import Discipline from "../../../pages/site-adminstration/discipline";
import ProgramType from "../../../pages/site-adminstration/program-type";
import ManageProgram from "../../../pages/site-adminstration/manage-program";
import ManageCourses from "../../../pages/site-adminstration/manage-courses";
import ManageCategory from "../../../pages/site-adminstration/manage-category";
import ManageUsers from "../../../pages/site-adminstration/manage-users";
import AddProgram from "../../../pages/site-adminstration/addProgram";
import Preview from "../../../pages/site-adminstration/manage-program/preview";
import ProgramEnrollment from "../../../pages/site-adminstration/program-enrollment";
import CalenderConfig from "../../../pages/site-adminstration/calender-config";

const SiteAdminRoute = () => {
  return [
    <Route path="/siteadmin" key="siteadmin" element={<SiteAdminHome />} />,
    <Route path="/department" key="department" element={<Departments />} />,
    <Route path="/discipline" key="discipline" element={<Discipline />} />,
    <Route path="/programtype" key="programtype" element={<ProgramType />} />,
    <Route path="/manageprogram" key="manageprogram" element={<ManageProgram />} />,
    <Route path="/managecourses" key="managecourses" element={<ManageCourses />} />,
    <Route path="/managecategory" key="managecategory" element={<ManageCategory />} />,
    <Route path="/preview" key="preview" element={<Preview />} />,
    <Route path="/addprogram" key="addprogram" element={<AddProgram />} />,
    <Route path="/manageusers" key="manageusers" element={<ManageUsers />} />,
    <Route path="/programenrollment" key="programenrollment" element={<ProgramEnrollment />} />,
    <Route path="/calenderconfig" key="calenderconfig" element={<CalenderConfig />} />,
  ];
};

export default SiteAdminRoute;
