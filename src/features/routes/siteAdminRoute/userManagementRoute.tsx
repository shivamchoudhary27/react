import React from 'react'
import { Route } from 'react-router-dom'

const Permission = React.lazy(() => import("../../../pages/siteAdminstration/roles/permissions"))
const InstituteManagement = React.lazy(() => import("../../../pages/siteAdminstration/institute"))
const UserManagement = React.lazy(() => import("../../../pages/siteAdminstration/userManagement"))
const AssignRoles = React.lazy(() => import("../../../pages/siteAdminstration/roles/assignRoles"))
const ManageRoles = React.lazy(() => import("../../../pages/siteAdminstration/roles/manageRoles"))
const ManageAuthorities = React.lazy(() => import("../../../pages/siteAdminstration/roles/authorities"))
const GuestUsers = React.lazy(() => import("../../../pages/siteAdminstration/userManagement/guestUsers"))
const ViewUserProfile = React.lazy(() => import("../../../pages/siteAdminstration/userManagement/profile"))
const EditUserProfile = React.lazy(()=> import("../../../pages/siteAdminstration/userManagement/profile/forms/editProfile/index"))

const UserManagementRoute = () => {
  return [
    <Route key="guestusers" path='/guestusers' element={<GuestUsers />} />,
    <Route key="manageroles" path='/manageroles' element={<ManageRoles />} />,
    <Route key="assignroles" path="/assignroles" element={<AssignRoles />} />,
    <Route key="institute" path='/institute' element={<InstituteManagement />} />,
    <Route key="assignroles" path="/assignroles/:userId" element={<AssignRoles />} />,
    <Route key="usermanagement" path='/usermanagement' element={<UserManagement />} />,
    <Route key="userprofile" path='/userprofile/:userid' element={<ViewUserProfile />} />,
    <Route key="edituserprofile" path='/edituserprofile/:userid' element={<EditUserProfile />} />,
    <Route key="manageauthorities" path='/manageauthorities' element={<ManageAuthorities />} />,
    <Route key="rolepermissions" path='/rolepermissions/:roleId/:roleName' element={<Permission />} />,
  ]
}

export default UserManagementRoute