
import "../style.scss"
import Filters from "./filter";
import Header from "../../newHeader";
import Footer from "../../newFooter";
import { format, parse } from "date-fns";
import { useSelector } from "react-redux";
import { Button, Container } from "react-bootstrap";
import HeaderTabs from "../../headerTabs";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import PageTitle from "../../../widgets/pageTitle";
import Errordiv from "../../../widgets/alert/errordiv";
import { pagination } from "../../../utils/pagination";
import { getData } from "../../../adapters/microservices";
import TableSkeleton from "../../../widgets/skeleton/table";
import BreadcrumbComponent from "../../../widgets/breadcrumb";
import endDateIcon from "../../../../src/assets/images/icons/calender-enddate.svg";
import startDateIcon from "../../../../src/assets/images/icons/calender-startdate.svg";
import {
  getUrlParams,
  getMonthList,
  getTimeslotData,
  getSortedCategories,
  getCourseWorkloadtData,
  getTableRenderTimeSlots,
} from "./local";
import { courseDatesObj } from "./utils";
import MyChangeRequestTable from "./table";
// import ModalForm from "./form";
import View from "./view";
const MyCalenderTimetable = () => {
  const dummyData = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };
  const location = useLocation();
  const [timeslots, setTimeslots] = useState([]);
  const [apiStatus, setApiStatus] = useState("");
  const [handleMonthFilter, setHandleMonthFilter] = useState([])
  const [monthList, setMonthList] = useState<string[]>([]);
  const [coursesStatus, setCoursesStatus] = useState(false);
  const [coursesList, setCoursesList] = useState(dummyData);
  const [weekendTimeslots, setWeekendTimeslots] = useState([]);
  const [timetableData, setTimetableData] = useState(dummyData);
  const [sortedCategories, setSortedCategories] = useState<any>([]);
  const [urlArg, setUrlArg] = useState({ dpt: 0, prg: "", prgId: 0 });
  const [courseDates, setCourseDates] = useState<any>(courseDatesObj);
  const [departmentTimeslots, setDepartmentTimeslots] = useState(dummyData);
  const [programFilter, setProgramFilter] = useState({ programs: [], departments: {} });
  const [selectedProgram, setSelectedProgram] = useState<number>(0);
  const [selectedDepartment, setSelectedDepartment] = useState<number>(0);
  const [ChangeFilterStatus, setChangeFilterStatus] = useState(0)
  const [modalShow, setModalShow] = useState(false);

  const currentInstitute = useSelector(
    (state: any) => state.globalFilters.currentInstitute
  );

  const currentUserRole = useSelector(
    (state) => state.globalFilters.currentUserRole
  );
  const navigate = useNavigate();

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
      dpt: selectedDepartment
    }));
  }, [selectedProgram, selectedDepartment])

  // passing arguments to get course workload data === >>
  useEffect(() => {
    if (urlArg.prgId > 0) {
      getCourseWorkloadtData(urlArg, setCoursesList);
    }
  }, [urlArg.prgId]);

  //  passing arguments to get course workload data === >>
  useEffect(() => {
    if (coursesList.items.length > 0) {
      getSortedCategories(coursesList, setSortedCategories);
    }
  }, [coursesList.items]);

  // set filters === >>
  useEffect(() => {
    setFilters((previous: any) => ({
      ...previous,
      courseId: courseDates.courseId,
      userId: currentUserId.uid,
    }));
  }, [courseDates]);

  // call API to get courses list === >>>
  useEffect(() => {
    let endPoint = `/${currentUserRole.id}/dashboard`;
    getData(endPoint, {}).then((res: any) => {
      if (res.data !== "" && res.status === 200) {
        setProgramFilter(prevState => ({
          ...prevState,
          programs: res.data.programs,
          departments: res.data.departments
        }));
        setSelectedProgram(res.data.programs[0].id)
        setSelectedDepartment(Object.keys(res.data.departments)[0]);
      }
    });
  }, [currentUserRole.id]);

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
        programFilter={programFilter}
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
        handleMonthFilter={handleMonthFilter}
        setHandleMonthFilter={setHandleMonthFilter}
      />
    </React.Fragment>
  );
};

export default MyCalenderTimetable;
