import { Route } from 'react-router-dom'
import ManageProgram from '../../../pages/siteAdminstration/manageProgram'
import Departments from '../../../pages/siteAdminstration/departments'
import Discipline from '../../../pages/siteAdminstration/discipline'
import ProgramType from '../../../pages/siteAdminstration/programType'
import Tags from '../../../pages/siteAdminstration/tags'
import AddProgram from '../../../pages/siteAdminstration/manageProgram/addProgram'
import ManageCategory from '../../../pages/siteAdminstration/manageCategory'
import CourseManagment from '../../../pages/siteAdminstration/manageCourse'
import Preview from '../../../pages/siteAdminstration/manageProgram/preview/'

const ProgramManagementRoute = () => {
  return [
    <Route path="/manageprogram" key="manageprogram" element={<ManageProgram />} />,
    <Route path="/department" key="department" element={<Departments />} />,
    <Route path="/discipline" key="discipline" element={<Discipline />} />,
    <Route path="/programtype" key="programtype" element={<ProgramType />} />,
    <Route path="/tags" key="tags" element={<Tags />} />,
    <Route path="/addprogram/:id" key="addprogram" element={<AddProgram />} />,
    <Route path="/managecategory/:id/:name" key="managecategory" element={<ManageCategory />} />,
    <Route path="/managecourses/:id/:name" key="managecourses" element={<CourseManagment />} />,
    <Route path="/programpreview/:id" key="programpreview" element={<Preview />} />,
  ];
};

export default ProgramManagementRoute