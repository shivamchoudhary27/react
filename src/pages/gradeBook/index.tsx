// import Filter from "./filters";
import View from "./view";
import { getData } from "../../adapters";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getData as getCourses } from "../../adapters/microservices";
import "./style.scss";

type Props = {};


const GradeBook = (props: Props) => {
  const dummyData = { tabledata: [] };
  const id = localStorage.getItem("userid");
  const [gradebookData, setGradebookData] = useState<any>(dummyData);
  const [coursesList, setCoursesList] = useState<any>([]);
  const [apiStatus, setApiStatus] = useState("");
  const [courseId, setCourseId] = useState<any>(0);
  const currentUserRole = useSelector(
    (state) => state.globalFilters.currentUserRole
  );
  const [apiData, setApiData] = useState<any>({
    departments: {},
    courses: [],
    programs: [],
  });

  const [statusfilter,setStatusfilter]=useState({
    selectedValues: {
      department: 0,
      batchYear: 0,
      program: 0,
      category: 0,
      status: 0
    },
    
  })


  useEffect(() => {
    let endPoint = `/${currentUserRole.id}/dashboard`;
    getCourses(endPoint, {}).then((res: any) => {
      if (res.data !== "" && res.status === 200) {
        setCoursesList(res.data.courses);
        setApiData(res.data);
        if (res.data.courses.length == 0 && res.status === 200) {
          setCourseId(0)
          setGradebookData(dummyData);
      } 
    } else if (res.status === 500) {
      } 
    });
  }, [currentUserRole.id]);

  useEffect(() => {
    if (courseId === -1) {
      setTimeout(() => {
        setGradebookData(dummyData);
      }, 400);
    }
    if (courseId > 0) {
      const query = {
        wsfunction: "gradereport_user_get_grades_table",
        userid: id,
        courseid: courseId,
      };
      setApiStatus("started");
      getData(query)
        .then((res) => {
          if (res.data !== "" && res.status === 200) {
            setGradebookData(res.data.tables[0]);
          }
          setApiStatus("finished");
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

  return (
    <React.Fragment>
      <View
        apiData={apiData}
        courseId={courseId}
        apiStatus={apiStatus}
        currentUserRole={currentUserRole}
        gradebookData={gradebookData.tabledata}
        getCourseId={getCourseId}
        updateCourses={updateCourses}
        statusfilter={statusfilter}
        setStatusfilter={setStatusfilter}
      />
    </React.Fragment>
  );
};

export default GradeBook;
