import React from 'react'
import { Route } from 'react-router-dom'
import TeacherDashboard from '../../../pages/teacherDashboard/dashboard'

const TeacherDashRoutes = () => {
  return [
    <Route path="/teacherdashboard" key="teacherdashboard" element={<TeacherDashboard />} />
  ]
}

export default TeacherDashRoutes