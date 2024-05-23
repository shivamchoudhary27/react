import "../../style.scss"
import View from "./view";
import { format, parse } from "date-fns";
import { useSelector } from "react-redux";
import { courseDatesObj } from "../utils";
import { useLocation} from "react-router-dom";
import React, { useState, useEffect } from "react";
import { pagination } from "../../../../utils/pagination";
import { getData } from "../../../../adapters/microservices";

import {
  getUrlParams,
  getTimeslotData,
  getSortedCategories,
  getCourseWorkloadtData,
  getTableRenderTimeSlots,
} from "../local";
const PublishChangeRequest = () => {
  const dummyData = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };
  const location = useLocation();
  const [loader, setLoader] = useState(false);
  const [timeslots, setTimeslots] = useState([]);
  const [apiStatus, setApiStatus] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [coursesList, setCoursesList] = useState([]);
  const [filteredTime, setFilteredTime] = useState([])
  const [coursesStatus, setCoursesStatus] = useState(false);
  const [weekendTimeslots, setWeekendTimeslots] = useState([]);
  const [changeRequestData, setChangeRequestData] = useState();
  const [handleMonthFilter, setHandleMonthFilter] = useState([])
  const [availableRooms, setAvailableRooms] = useState<any>([]);
  const [timetableData, setTimetableData] = useState(dummyData);
  const [ChangeFilterStatus, setChangeFilterStatus] = useState(0)
  const [refreshData, setRefreshData] = useState<boolean>(false);
  const [availableSlotdata, setAvailableSlots] = useState<any>({});
  const [sortedCategories, setSortedCategories] = useState<any>([]);
  const [selectedProgram, setSelectedProgram] = useState<number>(0);
  const [urlArg, setUrlArg] = useState({ dpt: 0, prg: "", prgId: 0 });
  const [courseDates, setCourseDates] = useState<any>(courseDatesObj);
  const [selectedDepartment, setSelectedDepartment] = useState<number>(0);
  const [departmentTimeslots, setDepartmentTimeslots] = useState(dummyData);
  const [modalFormData, setModalFormData]= useState({
    weekday:"",
    description:"",
    timeSlotId:0,
    sessionDate:"",
    slotDetailId:0,
    changeRequestId:0,
    status:""
  })

  const currentInstitute = useSelector(
    (state: any) => state.globalFilters.currentInstitute
  );

  const currentUserId = useSelector((state: any) => state.userInfo.userInfo);

  const getModalFormData = (weekday: any, description: any,timeSlotId: any,sessionDate: any, slotDetailId:any, changeRequestId:any,status:any) => { 
    setModalFormData({
      weekday:weekday,
      description:description,
      timeSlotId:timeSlotId,
      sessionDate:sessionDate,
      slotDetailId:slotDetailId,
      changeRequestId:changeRequestId,
      status:status
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
    if (currentInstitute > 0) {
      getCourseWorkloadtData(currentInstitute, setCoursesList);
    }
  }, [currentInstitute]);

  //  passing arguments to get course workload data === >>
  useEffect(() => {
    if (coursesList.length > 0) {
      getSortedCategories(urlArg ,coursesList, setSortedCategories);
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
    if (filters.courseId > 0 && filters.userId > 0 && filters.startDate ) {
      setApiStatus("started");
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
          setApiStatus("finished");
        })
        .catch((err: any) => {
          console.log(err);
          setApiStatus("finished");
        });
    }
  }, [filters, modalShow]);

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

  useEffect(()=> {
    if(coursesList.length > 0){
      coursesList.map((courses: any)=> {
        setSelectedDepartment(courses.departmentId)
        setSelectedProgram(courses.programId)
      })
    }
  }, [coursesList])


// ======================================================== >>
useEffect(() => {
  // setApiStatus("started");
  if(modalFormData.timeSlotId > 0 && modalFormData.slotDetailId){ 
    // setLoader(true);
  getData(`${urlArg.prgId}/timetable/availableslots?slotId=${modalFormData.timeSlotId}&sessionDate=${modalFormData.sessionDate}&slotDetailId=${modalFormData.slotDetailId}`,{})
    .then((result: any) => {
      if (result.data !== "" && result.status === 200) {
        setAvailableSlots(result.data);
        // setLoader(false);
      }
    })
    .catch((err: any) => {
      console.log(err);
    })
  }
}, [modalFormData.timeSlotId, modalFormData.slotDetailId,]);

useEffect(() => {
  if(modalFormData.timeSlotId > 0 && modalFormData.slotDetailId){ 
  getData( `/${urlArg.prgId}/timetable/availablerooms?selectedSlotId=${modalFormData.timeSlotId}&sessionDate=${modalFormData.sessionDate}&slotDetailId=${modalFormData.slotDetailId}`,{})
    .then((result: any) => {
      if (result.data !== "" && result.status === 200) {
        setAvailableRooms(result.data);
      }
    })
    .catch((err: any) => {
      console.log(err);
    })
  }
}, [modalFormData.timeSlotId, modalFormData.slotDetailId,modalShow]);

useEffect(() => {
  if(urlArg.dpt > 0){ 
    setLoader(true);
  getData( `/${currentInstitute}/timetable/timeslot?departmentId=${urlArg.dpt}&pageNumber=0&pageSize=50`,{})
    .then((result: any) => {
      if (result.data !== "" && result.status === 200) {
        setLoader(true);
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
}, [currentInstitute, modalFormData.slotDetailId,]);

useEffect(() => {
  if(modalFormData.changeRequestId > 0 && modalShow === true){ 
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
}, [modalFormData.changeRequestId, urlArg.prgId,modalShow ]);

//  ============================================================== >>


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
        loader={loader}
        timeslots={timeslots}
        apiStatus={apiStatus}
        modalShow={modalShow}
        courseDates={courseDates}
        programFilter={coursesList}
        filteredTime={filteredTime}
        coursesStatus={coursesStatus}
        refreshToggle={refreshToggle}
        modalFormData={modalFormData}
        availableRooms={availableRooms}
        selectedProgram={selectedProgram}
        toggleModalShow={toggleModalShow}
        getModalFormData={getModalFormData}
        sortedCategories={sortedCategories}
        setCoursesStatus={setCoursesStatus}
        changeRequestData={changeRequestData}
        availableSlotdata={availableSlotdata}
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
      />
    </React.Fragment>
  );
};

export default PublishChangeRequest;
