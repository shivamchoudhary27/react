import React from 'react'
import { Route } from 'react-router-dom'
import UserManagement from '../../../pages/siteAdminstration/userManagement'
import InstituteManagement from '../../../pages/siteAdminstration/institute'
import AddUsersForm from '../../../pages/siteAdminstration/userManagement/form/addUsersForm'

const UserManagementRoute = () => {
  return [
    <Route key="usermanagement" path='/usermanagement' element={<UserManagement />} />,
    <Route key="addusersform" path='/addusersform/:userid' element={<AddUsersForm />} />,
    <Route key="institute" path='/institute' element={<InstituteManagement />} />,
  ]
}

export default UserManagementRoute