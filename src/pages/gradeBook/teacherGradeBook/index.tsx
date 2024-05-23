// import Filter from "./filters";
import View from "./view";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getData } from "../../../adapters";
import { getData as getCourses } from "../../../adapters/microservices";
import "./style.scss";
import { pagination } from "../../../utils/pagination";

type Props = {};

const GradeBook = (props: Props) => {
  const id = localStorage.getItem("userid");
  const dummyData = { tabledata: [] };
  const [gradebookData, setGradebookData] = useState<any>(dummyData);
  const [coursesList, setCoursesList] = useState<any>([]);
  const [courseName, setCourseName] = useState<any>("");
  const [apiStatus, setApiStatus] = useState("");
  const [courseId, setCourseId] = useState<any>(0);
  const [StudentData, setStudentData] = useState([]);
  const [studentId, setStudentId] = useState<number>(0);
  const currentUserRole = useSelector(
    (state) => state.globalFilters.currentUserRole
  );
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });
  const [apiData, setApiData] = useState<any>({
    departments: {},
    courses: [],
    programs: [],
  });
  const [statusfilter, setStatusfilter] = useState({
    selectedValues: {
      department: 0,
      batchYear: 0,
      program: 0,
      category: 0,
      status: 0,
    },
  });

  useEffect(() => {
    if (currentUserRole.id !== undefined && currentUserRole.id > 0) {
      let endPoint = `/${currentUserRole.id}/dashboard`;
      getCourses(endPoint, {}).then((res: any) => {
        if (res.data !== "" && res.status === 200) {
          setCoursesList(res.data.courses);
          setApiData(res.data);
          if (res.data.courses.length === 0 && res.status === 200) {
            setCourseId(0);
            setGradebookData(dummyData);
          }
        }
      });
    }
  }, [currentUserRole.id]);

  useEffect(() => {
    if (courseId === -1) {
      setTimeout(() => {
        setStudentData([]);
      }, 400);
    }
    setStudentId(0);
    if (courseId > 0) {
      const query = {
        wsfunction: "local_blapi_teacher_grade_report",
        courseid: courseId,
      };
      setApiStatus("started");
      getData(query)
        .then((res) => {
          if (res.data !== "" && res.status === 200) {
            setStudentData(res.data);
            setApiStatus("finished");
          }
        })
        .catch((err) => {
          console.log(err);
          setApiStatus("finished");
        });
    }
  }, [courseId]);

  const getCourseId = (courseId: string | number) => {
    setCourseId(courseId);
  };

  const updateCourses = (filterValues: any) => {
    setFilterStatus(filterValues);
  };

  useEffect(() => {
    if (courseId > 0) {
      let course = coursesList?.filter(
        (courseData: any) => courseData.idNumber === parseInt(courseId)
      );
      if (course.length > 0) {
        setCourseName(course[0]?.name);
      }
    }
  }, [courseId]);

  // pagination
  const newPageRequest = (pageRequest: number) => {
    setFilterUpdate({ ...filterUpdate, pageNumber: pageRequest });
  };

  const totalPages = Math.ceil(StudentData.length / filterUpdate.pageSize);

  const currentUser = StudentData.slice(
    filterUpdate.pageNumber * filterUpdate.pageSize,
    filterUpdate.pageNumber * filterUpdate.pageSize + filterUpdate.pageSize
  );

  return (
    <React.Fragment>
      <View
        apiData={apiData}
        courseId={courseId}
        apiStatus={apiStatus}
        currentUserRole={currentUserRole}
        gradebookData={gradebookData.tabledata}
        setApiStatus={setApiStatus}
        getCourseId={getCourseId}
        courseName={courseName}
        updateCourses={updateCourses}
        statusfilter={statusfilter}
        setStatusfilter={setStatusfilter}
        setStudentId={setStudentId}
        newPageRequest={newPageRequest}
        totalPages={totalPages}
        filterUpdate={filterUpdate}
        studentId={studentId}
        StudentData={currentUser}
      />
    </React.Fragment>
  );
};

export default GradeBook;
