import { Route } from 'react-router-dom'
import Permission from '../../../pages/siteAdminstration/roles/permissions'
import AssignRoles from '../../../pages/siteAdminstration/roles/assignRoles'
import UserManagement from '../../../pages/siteAdminstration/userManagement'
import InstituteManagement from '../../../pages/siteAdminstration/institute'
import ManageRoles from '../../../pages/siteAdminstration/roles/manageRoles'
import ManageAuthorities from '../../../pages/siteAdminstration/roles/authorities'
import GuestUsers from '../../../pages/siteAdminstration/userManagement/guestUsers'

const UserManagementRoute = () => {
  return [
    <Route key="guestusers" path='/guestusers' element={<GuestUsers />} />,
    <Route key="manageroles" path='/manageroles' element={<ManageRoles />} />,
    <Route key="assignroles" path="/assignroles" element={<AssignRoles />} />,
    <Route key="institute" path='/institute' element={<InstituteManagement />} />,
    <Route key="assignroles" path="/assignroles/:userId" element={<AssignRoles />} />,
    <Route key="usermanagement" path='/usermanagement' element={<UserManagement />} />,
    <Route key="manageauthorities" path='/manageauthorities' element={<ManageAuthorities />} />,
    <Route key="rolepermissions" path='/rolepermissions/:roleId/:roleName' element={<Permission />} />,
  ]
}

export default UserManagementRoute