import { Route } from 'react-router-dom'
import ReactBigCalendar from '../../../pages/calender'
import TimeTable from '../../../pages/siteAdminstration/timetable'
import CalenderConfig from '../../../pages/siteAdminstration/calenderConfig'

const CalenderManagementRoute = () => {
  return [
    <Route path="/timetable" key="timetable" element={<TimeTable />} />,
    <Route path="/calender" key="calender" element={<ReactBigCalendar />} />,
    <Route path="/calenderconfig" key="calenderconfig" element={<CalenderConfig />} />,
  ]
}

export default CalenderManagementRoute