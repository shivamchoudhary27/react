import "../style.scss";
import View from "./view";
import { courseDatesObj } from "./utils";
import { format, parse } from "date-fns";
import { useSelector } from "react-redux";
import { useLocation} from "react-router-dom";
import React, { useState, useEffect } from "react";
import { pagination } from "../../../utils/pagination";
import { getData } from "../../../adapters/microservices";
import {
  getUrlParams,
  getTimeslotData,
  getSortedCategories,
  getCourseWorkloadtData,
  getTableRenderTimeSlots,
} from "./local";
const MyCalenderTimetable = () => {
  const dummyData = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };
  const location = useLocation();
  const [timeslots, setTimeslots] = useState([]);
  const [apiStatus, setApiStatus] = useState("");
  const [coursesList, setCoursesList] = useState([]);
  const [monthList, setMonthList] = useState<string[]>([]);
  const [coursesStatus, setCoursesStatus] = useState(false);
  const [weekendTimeslots, setWeekendTimeslots] = useState([]);
  const [timetableData, setTimetableData] = useState(dummyData);
  const [handleMonthFilter, setHandleMonthFilter] = useState([]);
  const [sortedCategories, setSortedCategories] = useState<any>([]);
  const [urlArg, setUrlArg] = useState({ dpt: 0, prg: "", prgId: 0 });
  const [courseDates, setCourseDates] = useState<any>(courseDatesObj);
  const [departmentTimeslots, setDepartmentTimeslots] = useState(dummyData);
  // const [programFilter, setProgramFilter] = useState({
  //   programs: [],
  //   departments: [],
  // });
  const [selectedProgram, setSelectedProgram] = useState<number>(0);
  const [selectedDepartment, setSelectedDepartment] = useState<number>(0);
  const [ChangeFilterStatus, setChangeFilterStatus] = useState(0);
  const [modalShow, setModalShow] = useState(false);

  const currentInstitute = useSelector(
    (state: any) => state.globalFilters.currentInstitute
  );

  const currentUserId = useSelector((state: any) => state.userInfo.userInfo);

  const [filters, setFilters] = useState({
    pageNumber: 0,
    pageSize: pagination.PERPAGE * 10,
    courseId: 0,
    startDate: 0,
    endDate: 0,
    userId: 0,
  });
  
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

  useEffect(() => {
    setUrlArg((prevValue) => ({
      ...prevValue, // Spread the previous state
      prgId: selectedProgram,
      dpt: selectedDepartment,
    }));
  }, [selectedProgram, selectedDepartment]);

  //  passing arguments to get course workload data === >>
  useEffect(() => {
    if (coursesList.length > 0) {
      getSortedCategories(urlArg, coursesList, setSortedCategories);
    }
  }, [coursesList]);

  // set filters === >>
  useEffect(() => {
    setFilters((previous: any) => ({
      ...previous,
      courseId: courseDates.courseId,
      userId: currentUserId.uid,
    }));
  }, [courseDates]);

  // Calling Timetable API to set timetable data === >>
  useEffect(() => {
    if (filters.courseId > 0 && filters.userId > 0 && filters) {
      getData(`/${urlArg.prgId}/timetable/userslots`, filters)
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

  useEffect(() => {
    if (coursesList.length > 0) {
      coursesList.map((courses: any) => {
        setSelectedDepartment(courses.departmentId);
        setSelectedProgram(courses.programId);
      });
    }
  }, [coursesList]);

  const updateFacultyStatus = (facultyId: any) => {
    setFilters((previous: any) => ({
      ...previous,
      // userId: facultyId,
      userId: currentUserId.uid,
    }));
  };

  const updateTimetableDates = (weekDates: any) => {
    setFilters((previous: any) => ({
      ...previous,
      startDate: weekDates.startDate,
      endDate: weekDates.endDate,
    }));
  };
  useEffect(() => {
    setUrlArg((prevValue) => ({
      ...prevValue, // Spread the previous state
      prgId: selectedProgram,
      dpt: selectedDepartment,
    }));
  }, [selectedProgram, selectedDepartment]);

  // passing arguments to get course workload data === >>
  useEffect(() => {
    if (currentInstitute > 0) {
      getCourseWorkloadtData(currentInstitute, setCoursesList);
    }
  }, [currentInstitute]);

  //  passing arguments to get course workload data === >>
  useEffect(() => {
    if (coursesList.length > 0) {
      getSortedCategories(urlArg, coursesList, setSortedCategories);
    }
  }, [coursesList, urlArg]);

  // set filters === >>
  useEffect(() => {
    setFilters((previous: any) => ({
      ...previous,
      courseId: courseDates.courseId,
      userId: currentUserId.uid,
    }));
  }, [courseDates]);

  // Calling Timetable API to set timetable data === >>
  useEffect(() => {
    if (filters.courseId > 0 && filters.userId > 0 && filters) {
      getData(`/${urlArg.prgId}/timetable/userslots`, filters)
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

  // handle modal hide & show functionality === >>>
  const toggleModalShow = (status: boolean) => {
    setModalShow(status);
  };
  return (
    <React.Fragment>
      {/* mobile and browser view component call */}
      <View
        urlArg={urlArg}
        timeslots={timeslots}
        apiStatus={apiStatus}
        modalShow={modalShow}
        courseDates={courseDates}
        coursesStatus={coursesStatus}
        programFilter={coursesList}
        // selectedMonth={selectedMonth}
        // editHandlerById={editHandlerById}
        selectedProgram={selectedProgram}
        toggleModalShow={toggleModalShow}
        // setSelectedMonth={setSelectedMonth}
        sortedCategories={sortedCategories}
        setCoursesStatus={setCoursesStatus}
        updateCourseDates={updateCourseDates}
        onHide={() => toggleModalShow(false)}
        handleMonthFilter={handleMonthFilter}
        setSelectedProgram={setSelectedProgram}
        selectedDepartment={selectedDepartment}
        updateFacultyStatus={updateFacultyStatus}
        updateTimetableDates={updateTimetableDates}
        setChangeFilterStatus={setChangeFilterStatus}
        setSelectedDepartment={setSelectedDepartment}
        // handleMonthFilter={handleMonthFilter}
        setHandleMonthFilter={setHandleMonthFilter}
      />
    </React.Fragment>
  );
};

export default MyCalenderTimetable;
