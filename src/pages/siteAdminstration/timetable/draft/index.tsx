import "./style.scss";
import View from "./view";
import Filters from "./filter";
import Header from "../../../newHeader";
import Footer from "../../../newFooter";
import DraftVersionTable from "./table";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import HeaderTabs from "../../../headerTabs";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import PageTitle from "../../../../widgets/pageTitle";
import Errordiv from "../../../../widgets/alert/errordiv";
import TableSkeleton from "../../../../widgets/skeleton/table";
import BreadcrumbComponent from "../../../../widgets/breadcrumb";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import endDateIcon from "../../../../../src/assets/images/icons/calender-enddate.svg";
import startDateIcon from "../../../../../src/assets/images/icons/calender-startdate.svg";
import { getData } from "../../../../adapters/microservices";
import { pagination } from "../../../../utils/pagination";
import { format, parse } from "date-fns";

import { 
  getTimeslotData, getCourseWorkloadtData, getUrlParams, 
  getSortedCategories, getTableRenderTimeSlots 
} from "./local";

import { courseDatesObj } from "./utils";

const WeeklyDraftVersion = () => {
  const location = useLocation();
  const dummyData = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };
  const [urlArg, setUrlArg] = useState({ dpt: 0, prg: "", prgId: 0 });
  const [departmentTimeslots, setDepartmentTimeslots] = useState(dummyData);
  const [coursesList, setCoursesList] = useState(dummyData);
  const currentInstitute = useSelector(
    (state: any) => state.globalFilters.currentInstitute
  );
  const [timeslots, setTimeslots] = useState([]);
  const [apiStatus, setApiStatus] = useState("");
  const [sortedCategories, setSortedCategories] = useState<any>([]);
  const [courseDates, setCourseDates] = useState<any>(courseDatesObj);
  const [coursesStatus, setCoursesStatus] = useState(false);
  const [filters, setFilters] = useState({
    pageNumber: 0,
    pageSize: pagination.PERPAGE * 10,
    courseId: 0,
    userId: 0,
    startDate: 0,
    endDate: 0,
  });
  const [timetableData, setTimetableData] = useState(dummyData);

  useEffect(() => {
    getUrlParams(location, setUrlArg);
  }, []);

  useEffect(() => {
    if (urlArg.dpt > 0) {
      getTimeslotData(currentInstitute, urlArg, setDepartmentTimeslots, setApiStatus);
    }
  }, [urlArg.dpt]);

  useEffect(() => {
    if (urlArg.prgId > 0) {
      getCourseWorkloadtData(urlArg, setCoursesList);
    } 
  }, [urlArg.prgId]);

  useEffect(() => {
    if (coursesList.items.length > 0) {
      getSortedCategories(coursesList, setSortedCategories);
    }
  }, [coursesList.items]);

  useEffect(() => {
    setFilters((previous: any) => ({
        ...previous,
        courseId: courseDates.courseId,
        userId: 0,
    }))
  }, [courseDates]);

  useEffect(() => {
    if (filters.courseId > 0 && filters.userId > 0 && filters) {
      getData(`/${urlArg.prgId}/timetable`, filters)
      .then((result: any) => {
        if (result.data !== "" && result.status === 200) {

          result.data.items.map((item: any, index: number) => {
             const inputDate = parse(item.sessionDate, 'yyyy-MM-dd', new Date());
             const dayName = format(inputDate, 'EEEE');
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
      getTableRenderTimeSlots(departmentTimeslots, timetableData, setTimeslots);
    }
  }, [departmentTimeslots, timetableData]);

  const updateCourseDates = (courseDates: any) => {
    setCourseDates(courseDates);
  };

  const updateFacultyStatus = (facultyId: any) => {
    setFilters((previous: any) => ({
      ...previous,
      userId: facultyId,
    }))
  }

  const updateTimetableDates = (weekDates: any) => {
    setFilters((previous: any) => ({
      ...previous,
      startDate: weekDates.startDate,
      endDate: weekDates.endDate,
    }))
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
          { name: "Site Administration", path: "/siteadmin" },
          { name: "Timetable Management", path: "/timetable" },
          { name: "Draft Version", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle
            pageTitle={`${urlArg.prg} : Draft Version`}
            gobacklink="/timetable"
          />
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
            </div>
            <div className="slot-indicator">
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
                <DraftVersionTable
                  SlotData={timeslots}
                  apiStatus={apiStatus}
                  courseDates={courseDates}
                  updateTimetableDates={updateTimetableDates}
                />
              )}
              {apiStatus === "finished" && timeslots.length === 0 && (
                <div>
                  <i>No timeslots are available</i>
                </div>
              )}
              <div style={{ textAlign: "right" }}>
                <CustomButton
                  type="submit"
                  btnText="Publish for change request"
                  variant="primary"
                  // disabled={isSubmitting}
                />
              </div>
              <div className="modal-buttons">
                <CustomButton
                  type="submit"
                  btnText="Submit Changes"
                  variant="primary"
                  // disabled={isSubmitting}
                />
                <CustomButton
                  type="reset"
                  btnText="Reset"
                  variant="outline-secondary"
                />
              </div>
            </>
          )}
        </Container>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default WeeklyDraftVersion;
