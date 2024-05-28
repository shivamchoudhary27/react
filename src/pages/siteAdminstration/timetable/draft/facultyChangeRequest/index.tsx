import "./style.scss";
import View from "./view";
import Filters from "./filter";
import Header from "../../../../newHeader";
import Footer from "../../../../newFooter";
import DraftVersionTable from "./table";
import { format, parse } from "date-fns";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import HeaderTabs from "../../../../headerTabs";
import React, { useState, useEffect } from "react";
import PageTitle from "../../../../../widgets/pageTitle";
import Errordiv from "../../../../../widgets/alert/errordiv";
import { pagination } from "../../../../../utils/pagination";
import { useLocation, useNavigate } from "react-router-dom";
import { getData } from "../../../../../adapters/microservices";
import TableSkeleton from "../../../../../widgets/skeleton/table";
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";
import CustomButton from "../../../../../widgets/formInputFields/buttons";
import {
  getUrlParams,
  getMonthList,
  getTimeslotData,
  getSortedCategories,
  getCourseWorkloadtData,
  getTableRenderTimeSlots,
} from "../local";
import { courseDatesObj } from "../utils";
import ModalForm from "./form";

const FacultyChangeRequest = () => {
  const dummyData = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };
  const navigate = useNavigate();
  const location = useLocation();
  const [timeslots, setTimeslots] = useState([]);
  const [apiStatus, setApiStatus] = useState("");
  const [monthList, setMonthList] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [filteredTime, setFilteredTime] = useState([]);
  const [refreshData, setRefreshData] = useState(true);
  const [coursesStatus, setCoursesStatus] = useState(false);
  const [coursesList, setCoursesList] = useState(dummyData);
  const [weekendTimeslots, setWeekendTimeslots] = useState([]);
  const [handleMonthFilter, setHandleMonthFilter] = useState([]);
  const [timetableData, setTimetableData] = useState(dummyData);
  const [availableRooms, setAvailableRooms] = useState<any>([]);
  const [requestTimeSlot, setRequestTimeSlot] = useState([]);
  const [availableSlotdata, setAvailableSlots] = useState<any>({});
  const [changeRequestData, setChangeRequestData] = useState();
  const [sortedCategories, setSortedCategories] = useState<any>([]);
  const [urlArg, setUrlArg] = useState({ dpt: 0, prg: "", prgId: 0 });
  const [courseDates, setCourseDates] = useState<any>(courseDatesObj);
  const [departmentTimeslots, setDepartmentTimeslots] = useState(dummyData);
  const [ChangeFilterStatus, setChangeFilterStatus] = useState(0);
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

  const [modalFormData, setModalFormData] = useState({
    weekday: "",
    description: "",
    timeSlotId: 0,
    sessionDate: "",
    slotDetailId: 0,
    changeRequestId: 0,
    status: "",
  });

  const getModalFormData = (
    weekday: any,
    description: any,
    timeSlotId: any,
    sessionDate: any,
    slotDetailId: any,
    changeRequestId: any,
    status: any
  ) => {
    setModalFormData({
      weekday: weekday,
      description: description,
      timeSlotId: timeSlotId,
      sessionDate: sessionDate,
      slotDetailId: slotDetailId,
      changeRequestId: changeRequestId,
      status: status,
    });
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
    if (coursesList.items.length > 0) {
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

  // =========>> calling API to get weekdays <<========
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

  // =========>> calling API to get availableslots <<========
  useEffect(() => {
    if (modalFormData.timeSlotId > 0 && modalFormData.slotDetailId) {
      getData(
        `${urlArg.prgId}/timetable/availableslots?slotId=${modalFormData.timeSlotId}&sessionDate=${modalFormData.sessionDate}&slotDetailId=${modalFormData.slotDetailId}`,
        {}
      )
        .then((result: any) => {
          if (result.data !== "" && result.status === 200) {
            setAvailableSlots(result.data);
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }, [modalFormData.timeSlotId, modalFormData.slotDetailId]);

  // =========>> calling API to get timeslot <<========
  useEffect(() => {
    if (urlArg.dpt > 0) {
      getData(
        `/${currentInstitute}/timetable/timeslot?departmentId=${urlArg.dpt}&pageNumber=0&pageSize=50`,
        {}
      )
        .then((result: any) => {
          if (result.data !== "" && result.status === 200) {
            const allTime = result.data.items || [];
            // let data = []
            setFilteredTime(
              allTime.filter(
                (timeSlot: any) => modalFormData.timeSlotId === timeSlot.id
              )
            );
            setRequestTimeSlot(
              allTime.filter(
                (timeSlot: any) => changeRequestData?.timeSlotId === timeSlot.id
              )
            );
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }, [currentInstitute, modalFormData.slotDetailId, changeRequestData]);

  // =========>> calling API to get availablerooms <<========
  useEffect(() => {
    if (modalFormData.timeSlotId > 0 && modalFormData.slotDetailId) {
      getData(
        `/${urlArg.prgId}/timetable/availablerooms?selectedSlotId=${modalFormData.timeSlotId}&sessionDate=${modalFormData.sessionDate}&slotDetailId=${modalFormData.slotDetailId}`,
        {}
      )
        .then((result: any) => {
          if (result.data !== "" && result.status === 200) {
            const rooms = result.data;
            setAvailableRooms(
              rooms.filter(
                (availableRoom: any) =>
                  changeRequestData?.classRoomId === availableRoom.id
              )
            );
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }, [modalFormData.timeSlotId, modalFormData.slotDetailId, modalShow, changeRequestData]);

  console.log( changeRequestData)
  console.log(modalFormData)
  // =========>> calling API to get faculty change-request <<========
  useEffect(() => {
    if (modalFormData.changeRequestId > 0 && modalShow === true) {
      getData(
        `/${urlArg.prgId}/timetable/${modalFormData.changeRequestId}/change-request`,
        {}
      )
        .then((result: any) => {
          if (result.data !== "" && result.status === 200) {
            setChangeRequestData(result.data);
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }, [modalFormData.changeRequestId, urlArg.prgId, modalShow]);

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

  // // handle month filter === >>
  // const handleMonthFilterChange = (e: any) => {
  //   if(e.type === "change"){
  //     setHandleMonthFilter([e.target.value])
  //   }
  // }

  // handle modal hide & show functionality === >>>
  const toggleModalShow = (status: boolean) => {
    setModalShow(status);
  };

   // handle to re-rendering  table === >>
   const refreshToggle = () => {
    setRefreshData(!refreshData);
  };

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

         ids={urlArg}
            setCoursesStatus={setCoursesStatus}
            updateFacultyStatus={updateFacultyStatus}
      /> */}

      <Header />
      <HeaderTabs activeTab="siteadmin" />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "Timetable Management", path: "/timetable" },
          {
            name: "Faculty Change Request",
            path: `/draftversiondpt?dpt=${urlArg.dpt}&prgId=${urlArg.prgId}&prg=${urlArg.prg}`,
          },
        ]}
      />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle
            pageTitle={`${urlArg.prg} : Faculty Change Request`}
            gobacklink={`/draftversion?dpt=${urlArg.dpt}&prgId=${urlArg.prgId}&prg=${urlArg.prg}`}
          />
          <Filters
            ids={urlArg}
            courseDates={courseDates}
            workloadCourses={sortedCategories}
            setCoursesStatus={setCoursesStatus}
            updateCourseDates={updateCourseDates}
            updateFacultyStatus={updateFacultyStatus}
          />
          <ModalForm
            urlArg={urlArg}
            modalShow={modalShow}
            filteredTime={filteredTime}
            modalFormData={modalFormData}
            availableRooms={availableRooms}
            toggleModalShow={toggleModalShow}
            requestTimeSlot={requestTimeSlot}
            onHide={() => toggleModalShow(false)}
            changeRequestData={changeRequestData}
            updateAddRefresh={refreshToggle}
          />

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
                  toggleModalShow={toggleModalShow}
                  getModalFormData={getModalFormData}
                  handleMonthFilter={handleMonthFilter}
                  setHandleMonthFilter={setHandleMonthFilter}
                  updateTimetableDates={updateTimetableDates}
                  setChangeFilterStatus={setChangeFilterStatus}
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
                      btnText="Final Publish"
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

export default FacultyChangeRequest;
