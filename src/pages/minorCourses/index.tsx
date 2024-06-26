
import "./style.scss";
import View from "./view";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getData } from "../../adapters/microservices";

type Props = {};

const MinorCourse = (props: Props) => {
 const dummyData = {
   items: [],
   pager: { totalElements: 0, totalPages: 0 },
 };
 const [apiStatus, setApiStatus] = useState("");
 const [modalShow, setModalShow] = useState(false);
 const [refreshData, setRefreshData] = useState(true);
 const [enrolled_courses, setEnrolled_courses] = useState([])
 const [waitlisted_courses, setWaitlisted_courses] = useState([])
 const [minorCourseData, setMinorCourseData] = useState<any>(dummyData);


 const [minorcourseObj, setminorcourseObj] = useState({
   id: 0,
   name: "",
   remainingSeats:null,
   enrollmentCapacity: null,
   enrolmentStatus: "enrolment_close",
   roll : ""
 });
 const [filterUpdate, setFilterUpdate] = useState<any>({
   pageNumber: 0,
   pageSize: 300,
 });

 const currentInstitute = useSelector(
   (state: any) => state.globalFilters.currentInstitute
 );
  // Get minorCourses Data from API === >>
 useEffect(() => {
   setApiStatus("started");
   getData(`/${currentInstitute}/user/minor/courses`, filterUpdate)
     .then((result: any) => {
       if (result.data !== "" && result.status === 200) {
         setMinorCourseData(result.data);
         setEnrolled_courses(result.data.enrolled_courses)
         setWaitlisted_courses(result.data.waitlisted_courses)
       }
       setApiStatus("finished");
     })
     .catch((err: any) => {
       console.log(err);
       setApiStatus("finished");
     });
 }, [currentInstitute, filterUpdate, refreshData]);


 // handle modal hide & show functionality === >>>
 const toggleModalShow = (status: boolean) => {
   setModalShow(status);
 };


 const refreshToggle = () => {
   setRefreshData(!refreshData);
 };


 const newPageRequest = (pageRequest: number) => {
   setFilterUpdate({ ...filterUpdate, pageNumber: pageRequest });
 };


 // get id, name from table === >>>
 const editHandlerById = (
   id: number,
   name: string,
   remainingSeats: number,
   enrollmentCapacity: number,
   enrolmentStatus: string,
   roll: string
 ) => {
   setminorcourseObj({
     id: id,
     name: name,
     remainingSeats: remainingSeats,
     enrollmentCapacity: enrollmentCapacity,
     enrolmentStatus: enrolmentStatus,
     roll 
   });
 };


 const isEnrolled = (courseId: any) => {
   const enrollCourse = enrolled_courses.some((item: any) => {
     return item === courseId;
   });
   return enrollCourse;
 };

 const isWaitlisted = (courseId: any) => {
   const waitlistCourse = waitlisted_courses.some((item: any) => {
     return item === courseId;
   });
   return waitlistCourse;
 };
 return (
   <React.Fragment>
     <View
       apiStatus={apiStatus}
       modalShow={modalShow}
       isEnrolled={isEnrolled}
       isWaitlisted={isWaitlisted}
       refreshToggle={refreshToggle}
       newPageRequest={newPageRequest}
       minorcourseObj={minorcourseObj}
       editHandlerById={editHandlerById}
       toggleModalShow={toggleModalShow}
       onHide={() => toggleModalShow(false)}
       filterUpdate={filterUpdate.pageNumber}
       minorCourseData={minorCourseData.items}
       totalPages={minorCourseData.pager.totalPages}
      
     />
   </React.Fragment>
 );
};


export default MinorCourse;

