import React from 'react'
import { Route } from 'react-router-dom'
import UserManagement from '../../../pages/site-adminstration/user-management'
import AddUsersForm from '../../../pages/site-adminstration/user-management/form/addUsersForm'

const UserManagementRoute = () => {
  return [
    <Route path='/usermanagement' element={<UserManagement />} />,
    <Route path='/addusersform/:userid' element={<AddUsersForm />} />,
  ]
}

export default UserManagementRoute