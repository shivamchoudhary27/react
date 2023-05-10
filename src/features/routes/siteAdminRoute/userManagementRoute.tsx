import React from 'react'
import { Route } from 'react-router-dom'
import UserManagement from '../../../pages/siteAdminstration/userManagement'
import AddUsersForm from '../../../pages/siteAdminstration/userManagement/form/addUsersForm'

const UserManagementRoute = () => {
  return [
    <Route path='/usermanagement' element={<UserManagement />} />,
    <Route path='/addusersform/:userid' element={<AddUsersForm />} />,
  ]
}

export default UserManagementRoute