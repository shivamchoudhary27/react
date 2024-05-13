import "../../style.scss"
import { format, parse } from "date-fns";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { pagination } from "../../../../utils/pagination";
import { useLocation} from "react-router-dom";
import { getData } from "../../../../adapters/microservices";

import {
  getUrlParams,
  getTimeslotData,
  getSortedCategories,
  getCourseWorkloadtData,
  getTableRenderTimeSlots,
} from "../local";
import { courseDatesObj } from "../utils";
// import ModalForm from "./form";
import View from "./view";
const PublishChangeRequest = () => {
  const dummyData = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };
  const location = useLocation();
  const [timeslots, setTimeslots] = useState([]);
  const [apiStatus, setApiStatus] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [handleMonthFilter, setHandleMonthFilter] = useState([])
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
  const [availableSlotdata, setAvailableSlots] = useState<any>({});
  const [availableRooms, setAvailableRooms] = useState<any>([]);
  const [changeRequestData, setChangeRequestData] = useState()
  const [refreshData, setRefreshData] = useState<boolean>(false);
  const [filteredTime, setFilteredTime] = useState([])
  const [modalFormData, setModalFormData]= useState({
    weekday:"",
    description:"",
    timeSlotId:0,
    sessionDate:"",
    slotDetailId:0,
    changeRequestId:0,
  })
  const currentInstitute = useSelector(
    (state: any) => state.globalFilters.currentInstitute
  );

  const currentUserRole = useSelector(
    (state) => state.globalFilters.currentUserRole
  );

  const currentUserId = useSelector((state: any) => state.userInfo.userInfo);

  const getModalFormData = (weekday: any, description: any,timeSlotId: any,sessionDate: any, slotDetailId:any, changeRequestId:any) => { 
    setModalFormData({
      weekday:weekday,
      description:description,
      timeSlotId:timeSlotId,
      sessionDate:sessionDate,
      slotDetailId:slotDetailId,
      changeRequestId:changeRequestId,
    })
   }

  const [filters, setFilters] = useState({
    pageNumber: 0,
    pageSize: pagination.PERPAGE * 10,
    courseId: 0,
    startDate: 0,
    endDate: 0,
    userId: currentUserId.uid,
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


// ========================================================
useEffect(() => {
  // setApiStatus("started");
  if(modalFormData.timeSlotId > 0 && modalFormData.slotDetailId){ 
  getData(`${urlArg.prgId}/timetable/availableslots?slotId=${modalFormData.timeSlotId}&sessionDate=${modalFormData.sessionDate}&slotDetailId=${modalFormData.slotDetailId}`,{})
    .then((result: any) => {
      if (result.data !== "" && result.status === 200) {
        // console.log(result.data)
        setAvailableSlots(result.data);
      }
    })
    .catch((err: any) => {
      console.log(err);
    })
  }
}, [modalFormData.timeSlotId, modalFormData.slotDetailId]);

useEffect(() => {
  // setApiStatus("started");
  if(modalFormData.timeSlotId > 0 && modalFormData.slotDetailId){ 
  getData( `/${urlArg.prgId}/timetable/availablerooms?selectedSlotId=${modalFormData.timeSlotId}&sessionDate=${modalFormData.sessionDate}&slotDetailId=${modalFormData.slotDetailId}`,{})
    .then((result: any) => {
      if (result.data !== "" && result.status === 200) {
        // console.log(result.data)
        setAvailableRooms(result.data);
      }
    })
    .catch((err: any) => {
      console.log(err);
    })
  }
}, [modalFormData.timeSlotId, modalFormData.slotDetailId]);

useEffect(() => {
  // setApiStatus("started");
  if(urlArg.dpt > 0){ 
  getData( `/${currentInstitute}/timetable/timeslot?departmentId=${urlArg.dpt}&pageNumber=0&pageSize=50`,{})
    .then((result: any) => {
      if (result.data !== "" && result.status === 200) {
        // console.log(result.data, "=========timetable")
        const allTime = result.data.items || [];
        setFilteredTime(
          allTime.filter((timeSlot: any) => modalFormData.timeSlotId === timeSlot.id)
        );

      }
    })
    .catch((err: any) => {
      console.log(err);
    })
  }
}, [currentInstitute, modalFormData.slotDetailId,  modalShow]);

useEffect(() => {
  // setApiStatus("started");
  if(modalFormData.changeRequestId > 0 ){ 
  getData( `/${urlArg.prgId}/timetable/${modalFormData.changeRequestId}/change-request`,{})
    .then((result: any) => {
      if (result.data !== "" && result.status === 200) {
        setChangeRequestData(result.data);
      }
    })
    .catch((err: any) => {
      console.log(err);
    })
  }
}, [modalFormData.changeRequestId, urlArg.prgId, modalShow===true]);

//  ==============================================================


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

  // handle modal hide & show functionality === >>>
  const toggleModalShow = (status: boolean) => {
    setModalShow(status);
  };

   // handle to re-rendering  table === >>
   const refreshToggle = (status: boolean) => {
    setRefreshData(!refreshData);
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
        changeRequestData={changeRequestData}
        // selectedMonth={selectedMonth}
        // editHandlerById={editHandlerById}
        refreshToggle={refreshToggle}
        selectedProgram={selectedProgram}
        getModalFormData={getModalFormData}
        modalFormData={modalFormData}
        toggleModalShow={toggleModalShow}
        // setSelectedMonth={setSelectedMonth}
        sortedCategories={sortedCategories}
        setCoursesStatus={setCoursesStatus}
        updateCourseDates={updateCourseDates}
        onHide={() => toggleModalShow(false)}
        handleMonthFilter={handleMonthFilter}
        ChangeFilterStatus={ChangeFilterStatus}
        setSelectedProgram={setSelectedProgram}
        selectedDepartment={selectedDepartment}
        updateFacultyStatus={updateFacultyStatus}
        setHandleMonthFilter={setHandleMonthFilter}
        updateTimetableDates={updateTimetableDates}
        setChangeFilterStatus={setChangeFilterStatus}
        setSelectedDepartment={setSelectedDepartment}
        availableSlotdata={availableSlotdata}
        availableRooms={availableRooms}
        filteredTime={filteredTime}
      />
    </React.Fragment>
  );
};

export default PublishChangeRequest;
