
import "../../style.scss"
import View from "./view";
import Filters from "./filter";
import Header from "../../../newHeader";
import Footer from "../../../newFooter";
import { format, parse } from "date-fns";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import HeaderTabs from "../../../headerTabs";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import PageTitle from "../../../../widgets/pageTitle";
import Errordiv from "../../../../widgets/alert/errordiv";
import { pagination } from "../../../../utils/pagination";
import { getData } from "../../../../adapters/microservices";
import TableSkeleton from "../../../../widgets/skeleton/table";
import BreadcrumbComponent from "../../../../widgets/breadcrumb";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import endDateIcon from "../../../../../src/assets/images/icons/calender-enddate.svg";
import startDateIcon from "../../../../../src/assets/images/icons/calender-startdate.svg";
import {
  getUrlParams,
  getMonthList,
  getTimeslotData,
  getSortedCategories,
  getCourseWorkloadtData,
  getTableRenderTimeSlots,
} from "../local";
import { courseDatesObj } from "../utils";
import MyChangeRequestTable from "./table";

const PublishChangeRequest = () => {
    const dummyData = {
        items: [],
        pager: { totalElements: 0, totalPages: 0 },
      };
      const location = useLocation();
      const [timeslots, setTimeslots] = useState([]);
      const [apiStatus, setApiStatus] = useState("");
      const [selectedMonth, setSelectedMonth] = useState("");
      const [monthList, setMonthList] = useState<string[]>([]);
      const [coursesStatus, setCoursesStatus] = useState(false);
      const [coursesList, setCoursesList] = useState(dummyData);
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
        if (coursesList.items.length > 0) {
          getSortedCategories(coursesList, setSortedCategories);
        }
      }, [coursesList.items]);
    
      // set filters === >>
      useEffect(() => {
        // console.log(courseDates.courseId)
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
    
      // get Months between start & end timestamp === >>
      useEffect(() => {
        if (courseDates !== "") {
          const monthListArr = getMonthList(courseDates);
          setMonthList(monthListArr);
        }
      }, [courseDates]);
    
      // handle month filter === >>
      const handleMonthFilterChange = (e: any) => {
        if(e.type === "change"){
          setSelectedMonth(e.target.value)
        }
      }

      return (
        <React.Fragment>
          {/* mobile and browser view component call */}
          {/* <View
            urlArg={urlArg}
            apiStatus={apiStatus}
            timeslots={timeslots}
            courseDates={courseDates}
            sortedCategories={sortedCategories}
            updateCourseDates={updateCourseDates}
          /> */}
    
          <Header />
          <HeaderTabs activeTab="siteadmin" />
          <BreadcrumbComponent
            routes={[
              { name: "Dashboard", path: "/dashboard" },
              { name: "Calender", path: "/calender" },
              { name: "My Change Request", path: "" },
            ]}
          />
          <div className="contentarea-wrapper mt-3 mb-5">
            <Container fluid>
              <PageTitle pageTitle="My Change Request" gobacklink="/mytimetable" />
              <Filters
                workloadCourses={sortedCategories}
                ids={urlArg}
                updateCourseDates={updateCourseDates}
                setCoursesStatus={setCoursesStatus}
                updateFacultyStatus={updateFacultyStatus}
              />
              <div className="d-flex justify-content-between align-items-center mt-4">
                <div className="d-flex gap-4 dates-wrapper">
                  <div>
                    <img src={startDateIcon} alt="start Date" />
                    <b>Start Date:</b> {courseDates.startDate}
                  </div>
                  <div>
                    <img src={endDateIcon} alt="End Date" />
                    <b>End Date: </b> {courseDates.endDate}
                  </div>
                  {/* {courseDates.startDate !== "--/--/----" &&
                    courseDates.endDate !== "--/--/----" && (
                      <div>
                        <label htmlFor="month">Month:</label>
                        <select
                          className="form-select"
                          name="workloadCourse"
                          // value={monthList}
                          onChange={handleMonthFilterChange}
                        >
                          <option value={0}>Select Month</option>
                            {monthList.map((option, index) => (
                            <option value={`${option.month}-${option.year}`} key={index}>
                            {option.month}{" "}{option.year}
                          </option>
                      ))}
                        </select>
                      </div>
                    )} */}
                </div>
                <div className="slot-indicator">
                <div className="me-1"><i className="fa-solid fa-envelope-circle-check"></i> Change Request</div>
                  <div className="me-1 available">Available Slots</div>
                  <div className="me-1 booked">Not Available Slots</div>
                  <div className="me-1 weekend">Break/Weekend/Holiday</div>
                </div>
              </div>
              {coursesStatus !== false && apiStatus === "finished" ? (
                <Errordiv msg="No record available!" cstate className="mt-3" />
              ) : coursesStatus !== false && apiStatus === "started" ? (
                <TableSkeleton numberOfRows={5} numberOfColumns={4} />
              ) : (
                <>
                  {apiStatus === "finished" && timeslots.length > 0 && (
                    <MyChangeRequestTable
                      SlotData={timeslots}
                      apiStatus={apiStatus}
                      courseDates={courseDates}
                      selectedMonth={selectedMonth}
                      updateTimetableDates={updateTimetableDates}
                    />
                  )}
                  {apiStatus === "finished" && timeslots.length === 0 && (
                    <div>
                      <i>No timeslots are available</i>
                    </div>
                  )}
                </>
              )}
            </Container>
          </div>
          <Footer />
        </React.Fragment>
      );
    };

export default PublishChangeRequest;
