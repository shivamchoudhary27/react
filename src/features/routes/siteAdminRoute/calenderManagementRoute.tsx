import React from 'react'
import { Route } from 'react-router-dom'
import CalenderConfig from '../../../pages/siteAdminstration/calenderConfig'
import ReactBigCalendar from '../../../pages/calender'

const CalenderManagementRoute = () => {
  return [
    <Route path="/calenderconfig" key="calenderconfig" element={<CalenderConfig />} />,
    <Route path="/calender" element={<ReactBigCalendar />} />,
  ]
}

export default CalenderManagementRoute