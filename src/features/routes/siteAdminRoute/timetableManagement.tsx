import { Route } from "react-router-dom";
import WorkLoad from "../../../pages/siteAdminstration/timetable/workLoad";
import Holidays from "../../../pages/siteAdminstration/timetable/holidays";
import TimesSlot from "../../../pages/siteAdminstration/timetable/timesSlot";
import ClassRoom from "../../../pages/siteAdminstration/timetable/classroom";
import ManageCoursesWorkLoad from "../../../pages/siteAdminstration/timetable/manageCoursesWorkLoad";

const TimetableManagementRoute = () => {
  return [
    <Route path="/workload" key="workload" element={<WorkLoad />} />,
    <Route path="/holidays" key="holidays" element={<Holidays />} />,
    <Route path="/timesslot" key="timesslot" element={<TimesSlot />} />,
    <Route path="/classroom" key="classroom" element={<ClassRoom />} />,
    <Route
      path="/managecoursesworkload/:id/:name"
      key="managecoursesworkload"
      element={<ManageCoursesWorkLoad />}
    />,
  ];
};

export default TimetableManagementRoute;
