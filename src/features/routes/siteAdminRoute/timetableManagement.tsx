import { Route } from "react-router-dom";
import WorkLoad from "../../../pages/siteAdminstration/timetable/workLoad";
import Holidays from "../../../pages/siteAdminstration/timetable/holidays";
import ClassRoom from "../../../pages/siteAdminstration/timetable/classroom";
import TimesSlot from "../../../pages/siteAdminstration/timetable/timesSlot";
import InstituteTimeSlot from "../../../pages/siteAdminstration/timetable/timesSlot/instituteTimeslot";
import ManageWorkLoad from "../../../pages/siteAdminstration/timetable/workLoad/manageWorkLoad";
import ManageTimesSlot from "../../../pages/siteAdminstration/timetable/timesSlot/manageTimeSlot";
import ManageCoursesWorkLoad from "../../../pages/siteAdminstration/timetable/manageCoursesWorkLoad";
import WeeklyDraftVersion from "../../../pages/siteAdminstration/timetable/draft";

const TimetableManagementRoute = () => {
  return [
    <Route path="/workload" key="workload" element={<WorkLoad />} />,
    <Route path="/holidays" key="holidays" element={<Holidays />} />,
    <Route path="/classroom" key="classroom" element={<ClassRoom />} />,
    <Route path="/timeslot" key="timeslot" element={<TimesSlot />} />,
    <Route path="/institutetimeslot" key="institutetimeslot" element={<InstituteTimeSlot />} />,
    <Route path="/manageworkload/:userId" key="manageworkload" element={<ManageWorkLoad />} />,
    <Route path="/managetimeslot/:departmentId/:name" key="managetimeslot" element={<ManageTimesSlot />} />,
    <Route
      path="/managecoursesworkload/:id/:name"
      key="managecoursesworkload"
      element={<ManageCoursesWorkLoad />}
    />,
    <Route path="/draftversion" key="draftversion" element={<WeeklyDraftVersion />} />,
  ];
};

export default TimetableManagementRoute;
