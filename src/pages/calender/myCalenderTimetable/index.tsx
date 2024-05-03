import View from "./view";
import { format, parse } from "date-fns";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { pagination } from "../../../utils/pagination";
import { getData } from "../../../adapters/microservices";
import {
  getUrlParams,
  getMonthList,
  getTimeslotData,
  getSortedCategories,
  getCourseWorkloadtData,
  getTableRenderTimeSlots,
} from "./local";
import { courseDatesObj } from "./utils";

type Props = {};

const MyCalenderTimetable = (props: Props) => {
  const [role, setRole] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(0);
  const [timeslots, setTimeslots] = useState([]);
  const [courseId, setCourseId] = useState<any>(0);
  const [coursesList, setCoursesList] = useState<any>([]);
  const [apiResponseData, setApiResponseData] = useState<any>({
    departments: {},
    courses: [],
    programs: [],
  });
  const currentUserRole = useSelector(
    (state: any) => state.globalFilters.currentUserRole
  );

  const dummyData = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };
  const location = useLocation();
  const [apiStatus, setApiStatus] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [monthList, setMonthList] = useState<string[]>([]);
  const [coursesStatus, setCoursesStatus] = useState(false);
  const [weekendTimeslots, setWeekendTimeslots] = useState([]);
  const [timetableData, setTimetableData] = useState(dummyData);
  const [sortedCategories, setSortedCategories] = useState<any>([]);
  const [urlArg, setUrlArg] = useState({ dpt: 0, prg: "", prgId: 0 });
  const [courseDates, setCourseDates] = useState<any>(courseDatesObj);
  const [departmentTimeslots, setDepartmentTimeslots] = useState(dummyData);
  const currentInstitute = useSelector(
    (state: any) => state.globalFilters.currentInstitute
  );
  const [filters, setFilters] = useState({
    pageNumber: 0,
    pageSize: pagination.PERPAGE * 10,
    courseId: 0,
    userId: 0,
    startDate: 0,
    endDate: 0,
  });

  // call API to get courses list === >>>
  useEffect(() => {
    let endPoint = `/${currentUserRole.id}/dashboard`;
    getData(endPoint, {}).then((res: any) => {
      if (res.data !== "" && res.status === 200) {
        setApiResponseData(res.data);
        if (res.data.length > 0) setCourseId(res.data.courses[0].id);
      setUrlArg((preValue: any) => ({
          ...preValue,
          dpt: Object.keys(res.data.departments)[0]
        }));
        setUrlArg((preValue: any) => ({
          ...preValue,
          prgId: res.data.programs[0].id
        }));        
      }
    });
  }, [currentUserRole.id]);

  const getCourseId = (courseId: string | number) => {
    setCourseId(courseId);
  };

  useEffect(() => {
    getUrlParams(location, setUrlArg);
  }, []);

  //  passing arguments to get timeslot data === >>
  useEffect(() => {
    if (urlArg.dpt > 0) {
      getTimeslotData(
        currentInstitute,
        urlArg,
        setDepartmentTimeslots,
        setApiStatus
      );
    }
  }, [urlArg.dpt]);

  // passing arguments to get course workload data === >>
  useEffect(() => {
    if (urlArg.prgId > 0) {
      getCourseWorkloadtData(urlArg, setCoursesList);
    }
  }, [urlArg.prgId]);

  //  passing arguments to get course workload data === >>
  useEffect(() => {
    if (coursesList.length > 0) {
      getSortedCategories(coursesList, setSortedCategories);
    }
  }, [coursesList.items]);

  // set filters === >>
  useEffect(() => {
    setFilters((previous: any) => ({
      ...previous,
      courseId: courseDates.courseId,
      userId: 0,
    }));
  }, [courseDates]);

  // Calling Timetable API to set timetable data === >>
  useEffect(() => {
    if (filters.courseId > 0 && filters.userId > 0 && filters) {
      getData(`/${urlArg.prgId}/timetable`, filters)
        .then((result: any) => {
          if (result.data !== "" && result.status === 200) {
            result.data.items.map((item: any, index: number) => {
              const inputDate = parse(
                item.sessionDate,
                "dd-MM-yyyy",
                new Date()
              );
              const dayName = format(inputDate, "EEEE");
              result.data.items[index].dayName = dayName;
            });

            setTimetableData(result.data);
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }, [filters]);
  // calling API to get weekdays === >>
  useEffect(() => {
    if (departmentTimeslots.items.length > 0) {
      getData(`/weekdays/${currentInstitute}`, {})
        .then((res: any) => {
          if (res.data !== "" && res.status === 200) {
            const filteredData = res.data.filter(
              (item: any) =>
                item.departmentId === departmentTimeslots.items[0].departmentId
            );
            if (filteredData[0].weekDays.length > 0) {
              setWeekendTimeslots(filteredData[0].weekDays);
            }
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }, [departmentTimeslots]);

  useEffect(() => {
    if (departmentTimeslots.items.length > 0) {
      getTableRenderTimeSlots(
        departmentTimeslots,
        timetableData,
        setTimeslots,
        weekendTimeslots,
        courseDates,
        filters
      );
    }
  }, [departmentTimeslots, timetableData, filters]);

  const updateCourseDates = (courseDates: any) => {
    setCourseDates(courseDates);
  };

  const updateFacultyStatus = (facultyId: any) => {
    setFilters((previous: any) => ({
      ...previous,
      userId: facultyId,
    }));
  };

  const updateTimetableDates = (weekDates: any) => {
    setFilters((previous: any) => ({
      ...previous,
      startDate: weekDates.startDate,
      endDate: weekDates.endDate,
    }));
  };

  return (
    <View
      apiResponseData={apiResponseData}
      getCourseId={getCourseId}
      timeslots={timeslots}
      apiStatus={apiStatus}
      courseDates={courseDates}
      selectedMonth={selectedMonth}
      updateTimetableDates={updateTimetableDates}
      updateFacultyStatus={updateFacultyStatus}
      updateCourseDates={updateCourseDates}
      setSelectedCourse= {setSelectedCourse}
      selectedCourse={selectedCourse}
      setUrlArg={setUrlArg}
    />
  );
};

export default MyCalenderTimetable;
