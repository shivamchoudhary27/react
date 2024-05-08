import React from 'react'
import { Route } from 'react-router-dom'

const ReactBigCalendar = React.lazy(() => import('../../../pages/calender'))
const TimeTable = React.lazy(() => import('../../../pages/siteAdminstration/timetable'))  
const CalenderConfig = React.lazy(() => import('../../../pages/siteAdminstration/calenderConfig'))   
const MyCalenderTimetable = React.lazy(() => import('../../../pages/calender/myTimetable'))

const CalenderManagementRoute = () => {
  return [
    <Route path="/timetable" key="timetable" element={<TimeTable />} />,
    <Route path="/calender" key="calender" element={<ReactBigCalendar />} />,
    <Route path="/mytimetable" key="mytimetable" element={<MyCalenderTimetable />} />,
    <Route path="/calenderconfig" key="calenderconfig" element={<CalenderConfig />} />,
  ]
}

export default CalenderManagementRoute