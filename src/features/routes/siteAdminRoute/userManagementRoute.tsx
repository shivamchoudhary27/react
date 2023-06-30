import React from 'react'
import { Route } from 'react-router-dom'
import UserManagement from '../../../pages/siteAdminstration/userManagement'
import InstituteManagement from '../../../pages/siteAdminstration/institute'
import ManageRoles from '../../../pages/siteAdminstration/roles/manageRoles'
import Permission from '../../../pages/siteAdminstration/roles/permissions'
import AssignRoles from '../../../pages/siteAdminstration/roles/assignRoles'
import ManageAuthorities from '../../../pages/siteAdminstration/roles/authorities'

const UserManagementRoute = () => {
  return [
    <Route key="usermanagement" path='/usermanagement' element={<UserManagement />} />,
    <Route key="manageroles" path='/manageroles' element={<ManageRoles />} />,
    <Route key="rolepermissions" path='/rolepermissions/:roleId/:roleName' element={<Permission />} />,
    <Route key="assignroles" path='/assignroles' element={<AssignRoles />} />,
    <Route key="manageauthorities" path='/manageauthorities' element={<ManageAuthorities />} />,
    <Route key="institute" path='/institute' element={<InstituteManagement />} />,
  ]
}

export default UserManagementRoute