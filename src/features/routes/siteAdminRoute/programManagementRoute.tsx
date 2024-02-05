import React from 'react'
import { Route } from 'react-router-dom'

const Tags = React.lazy(() => import('../../../pages/siteAdminstration/tags'))
const Discipline = React.lazy(() => import('../../../pages/siteAdminstration/discipline')) 
const Departments = React.lazy(() => import  ('../../../pages/siteAdminstration/departments'))
const ProgramType = React.lazy(() => import('../../../pages/siteAdminstration/programType')) 
const ManageProgram = React.lazy(() => import('../../../pages/siteAdminstration/manageProgram')) 
const CourseManagment = React.lazy(() => import('../../../pages/siteAdminstration/manageCourse')) 
const ManageCategory = React.lazy(() => import('../../../pages/siteAdminstration/manageCategory')) 
const Preview = React.lazy(() => import('../../../pages/siteAdminstration/manageProgram/preview/')) 
const AddProgram = React.lazy(() => import('../../../pages/siteAdminstration/manageProgram/addProgram'))

const ProgramManagementRoute = () => {
  return [
    <Route path="/tags" key="tags" element={<Tags />} />,
    <Route path="/discipline" key="discipline" element={<Discipline />} />,
    <Route path="/department" key="department" element={<Departments />} />,
    <Route path="/programtype" key="programtype" element={<ProgramType />} />,
    <Route path="/addprogram/:id" key="addprogram" element={<AddProgram />} />,
    <Route path="/manageprogram" key="manageprogram" element={<ManageProgram />} />,
    <Route path="/programpreview/:id" key="programpreview" element={<Preview />} />,
    <Route path="/managecourses/:id/:name" key="managecourses" element={<CourseManagment />} />,
    <Route path="/managecategory/:id/:name" key="managecategory" element={<ManageCategory />} />,
  ];
};

export default ProgramManagementRoute