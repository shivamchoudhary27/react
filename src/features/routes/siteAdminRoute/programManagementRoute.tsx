import { Route } from 'react-router-dom'
import ManageProgram from '../../../pages/site-adminstration/manage-program'
import Departments from '../../../pages/site-adminstration/departments'
import Discipline from '../../../pages/site-adminstration/discipline'
import ProgramType from '../../../pages/site-adminstration/program-type'
import Tags from '../../../pages/site-adminstration/tags'
import AddProgram from '../../../pages/site-adminstration/addProgram'
import ManageCategory from '../../../pages/site-adminstration/manage-category'
import CourseManagment from '../../../pages/site-adminstration/managecourse'
import AddCourseForm from '../../../pages/site-adminstration/managecourse/form'
import Preview from '../../../pages/site-adminstration/manage-program/preview'

const ProgramManagementRoute = () => {
  return [
    <Route path="/manageprogram" key="manageprogram" element={<ManageProgram />} />,
    <Route path="/department" key="department" element={<Departments />} />,
    <Route path="/discipline" key="discipline" element={<Discipline />} />,
    <Route path="/programtype" key="programtype" element={<ProgramType />} />,
    <Route path="/tags" element={<Tags />} />,
    <Route path="/addprogram/:id" key="addprogram" element={<AddProgram />} />,
    <Route path="/managecategory/:id/:name" key="managecategory" element={<ManageCategory />} />,
    <Route path="/managecourses/:id/:name" key="managecourses" element={<CourseManagment />} />,
    <Route path="/courseform/:progid/:catid/:courseid" element={<AddCourseForm />} />,
    <Route path="/programpreview/:id" element={<Preview />} />,
  ];
};

export default ProgramManagementRoute