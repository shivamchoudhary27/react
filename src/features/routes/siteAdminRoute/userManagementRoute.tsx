import React from 'react'
import { Route } from 'react-router-dom'
import UserManagement from '../../../pages/site-adminstration/userManagement'
import AddUsersForm from '../../../pages/site-adminstration/userManagement/form/addUsersForm'

const UserManagementRoute = () => {
  return [
    <Route path='/usermanagement' element={<UserManagement />} />,
    <Route path='/addusersform/:userid' element={<AddUsersForm />} />,
  ]
}

export default UserManagementRoute