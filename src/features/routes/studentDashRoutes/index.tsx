import React from 'react'
import { Route } from 'react-router-dom';
import StudentDashboard from '../../../pages/studentDashboard/dashboard';

const StudentDashRoutes = () => {
  return [
    <Route path="/studentdashboard" key="studentdashboard" element={<StudentDashboard />} />
  ]
}

export default StudentDashRoutes;