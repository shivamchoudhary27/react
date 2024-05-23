import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import FilterProgramDropdown from "./filterDropdown";
import { RenderFilterElements } from "./filterDropdown";
import FilterProgramDropdownStudent from "./filterDropdownStudent";

type Props = {
  coursesList: any;
  enrolCoreCoursesObj: any;
  setStatusfilter: any;
  StudentData: any;
  setStudentId: any;
};

const courseStatusOptions = [
  { id: "inprogress", name: "In Progress" },
  { id: "completed", name: "Completed" },
  { id: "notstarted", name: "Not Started" },
];

const HeirarchyFilter = (props: Props) => {

  const [filterStatus, setFilterStatus] = useState({
    selectedValues: {
      department: 0,
      batchYear: 0,
      program: 0,
      category: 0,
      status: 0,
    },
    filterData: {
      departments: [],
      batchYears: [],
      programs: [],
      categories: [],
      status: courseStatusOptions,
    },
  });
  const [course, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(0);
  useEffect(() => {
    if (filterStatus.selectedValues.program > 0) {
      if (filterStatus.selectedValues.category > 0) {
        const filteredCourses = props.coursesList.courses.filter(
          (item) =>
            item.programId === filterStatus.selectedValues.program &&
            item.categoryId === filterStatus.selectedValues.category
        );
        setCourses(filteredCourses);
      } else {
        const filteredCourses = props.coursesList.courses.filter(
          (item) => item.programId === filterStatus.selectedValues.program
        );
        setCourses(filteredCourses);
      }
    } else {
      const uniqueProgramIds = new Set();

      filterStatus.filterData.programs.forEach((item) => {
        uniqueProgramIds.add(item.id);
      });

      const filteredData = props.coursesList.courses.filter((item) =>
        uniqueProgramIds.has(item.programId)
      );
      if (filteredData.length > 0) {
        setSelectedCourse(filteredData[0].idNumber);
      }
      setCourses(filteredData);
    }
    props.setStatusfilter(filterStatus);
  }, [filterStatus]);

  useEffect(() => {
    if (course.length > 0) {
      if (course[0].idNumber !== null) {
        setSelectedCourse(course[0].idNumber);
        props.getCourseId(course[0].idNumber);
      } else {
        setSelectedCourse(-1);
        props.getCourseId(-1);
      }
    }
  }, [course]);

  const updateCourses = (filterValues: any) => {
    setFilterStatus(filterValues);
  };

  // const getCourseProgress = (id: number) => {
  //   const foundObject: any = props.enrolCoreCoursesObj.find(
  //     (item: any) => item.idNumber === id
  //   );
  //   if (foundObject) {
  //     return foundObject.progress !== null
  //       ? `${foundObject.progress}%`
  //       : 0 + "%";
  //   }
  //   return "0%";
  // };

  const getCourseStatus = (val: string) => {
    const currentDate = new Date();
    const unixTimestampInSeconds = Math.floor(currentDate.getTime() / 1000);
    props.enrolCoreCoursesObj.map((item: any) => {});

    if (val === "progress") {
    } else if (val === "notStarted") {
    } else {
    }
  };

  const getSelectedCourse = (value, component) => {
    if (value == -1) {
      setSelectedCourse(-1);
      props.getCourseId(-1);
      return "";
    }

    setSelectedCourse(value);
    props.getCourseId(value);
  };
  return (
    <React.Fragment>
      <div className="mitcomponet-heading filter-wrapper">
        <div className="row program-filter">
          <FilterProgramDropdown
            getCourseStatus={getCourseStatus}
            userCoursesData={props.coursesList}
            updateCourses={updateCourses}
          />

          <RenderFilterElements
            component={"Course"}
            filterPacket={course}
            packetKeys={["idNumber", "name"]}
            getFilterChange={getSelectedCourse}
            currentValue={selectedCourse}
            filterDisable={false}
            addAllOption={false}
          />
          <FilterProgramDropdownStudent
            getCourseStatus={getCourseStatus}
            coursesList={props.coursesList}
            updateCourses={updateCourses}
            StudentData={props.StudentData}
            setStudentId={props.setStudentId}
          />
        </div>
      </div>
      {/* {coursesList.length === 0 && (
          <TableSkeleton numberOfRows={5} numberOfColumns={4} />
        )} */}
      {/* {props.coursesList.length === 0 && (
        <Errordiv msg="No course available!" cstate className="mt-3" />
      )} */}
    </React.Fragment>
  );
};

export default HeirarchyFilter;
