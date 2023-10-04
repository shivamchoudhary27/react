import { Route } from 'react-router-dom'
import Tags from '../../../pages/siteAdminstration/tags'
import Discipline from '../../../pages/siteAdminstration/discipline'
import Departments from '../../../pages/siteAdminstration/departments'
import ProgramType from '../../../pages/siteAdminstration/programType'
import ManageProgram from '../../../pages/siteAdminstration/manageProgram'
import CourseManagment from '../../../pages/siteAdminstration/manageCourse'
import ManageCategory from '../../../pages/siteAdminstration/manageCategory'
import Preview from '../../../pages/siteAdminstration/manageProgram/preview/'
import AddProgram from '../../../pages/siteAdminstration/manageProgram/addProgram'

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