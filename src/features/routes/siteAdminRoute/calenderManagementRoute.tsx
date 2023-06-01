import React from 'react'
import { Route } from 'react-router-dom'
import TimeTable from '../../../pages/siteAdminstration/timetable'
import CalenderConfig from '../../../pages/siteAdminstration/calenderConfig'
import ReactBigCalendar from '../../../pages/calender'

const CalenderManagementRoute = () => {
  return [
    <Route path="/timetable" key="timetable" element={<TimeTable />} />,
    <Route path="/calenderconfig" key="calenderconfig" element={<CalenderConfig />} />,
    <Route path="/calender" key="calender" element={<ReactBigCalendar />} />,
  ]
}

export default CalenderManagementRoute