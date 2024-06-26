import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import FilterProgramDropdown from "./filterDropdown";
import { Container, Row, Col, Card } from "react-bootstrap";
import { RenderFilterElements } from "./filterDropdown";
import FilterProgramDropdownStudent from "./filterDropdownStudent";

type Props = {
  coursesList: any;
  enrolCoreCoursesObj: any;
};

const courseStatusOptions = [
  {id: 'inprogress', name: 'In Progress'},
  {id: 'completed', name: 'Completed'},
  {id: 'notstarted', name: 'Not Started'},
];

const HeirarchyFilter = (props: Props) => {
  const currentUserRole = useSelector(
    (state: any) => state.globalFilters.currentUserRole
  );
  const [filterStatus, setFilterStatus] = useState({
    selectedValues: {
      department: 0,
      batchYear: 0,
      program: 0,
      category: 0,
      status: 0
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
          const filteredCourses =  props.coursesList.courses.filter(item => 
            item.programId === filterStatus.selectedValues.program 
            && 
            item.categoryId === filterStatus.selectedValues.category
          );
          setCourses(filteredCourses);
        } else {
          const filteredCourses =  props.coursesList.courses.filter(item => 
            item.programId === filterStatus.selectedValues.program 
          );
          setCourses(filteredCourses);
        }
    } else {
      const uniqueProgramIds = new Set();

      filterStatus.filterData.programs.forEach((item) => {
        uniqueProgramIds.add(item.id);
      });

      const filteredData = props.coursesList.courses.filter(item => uniqueProgramIds.has(item.programId));
      setCourses(filteredData);
    }

  }, [filterStatus]);

  const updateCourses = (filterValues: any) => {
    setFilterStatus(filterValues);
  }

  const getCourseProgress = (id: number) => {
    const foundObject: any = props.enrolCoreCoursesObj.find(
      (item: any) => item.idNumber === id
    );
    if (foundObject) {
      return foundObject.progress !== null
        ? `${foundObject.progress}%`
        : 0 + "%";
    }
    return "0%";
  };

  const getCourseStatus = (val: string) => {
    const currentDate = new Date();
    const unixTimestampInSeconds = Math.floor(currentDate.getTime() / 1000);
    props.enrolCoreCoursesObj.map((item: any) => {
      console.log(item);
    });

    if (val === "progress") {
      console.log("progress");
    } else if (val === "notStarted") {
      console.log("notStarted");
    } else {
      console.log("completed");
    }
  };

  const getSelectedCourse = (value, component) => {
    setSelectedCourse(value);
    props.getCourseId(value);
  }

  return (
    <React.Fragment>
      <Container fluid>
        <div className="d-flex align-items-center justify-content-between flex-wrap mitcomponet-heading">
          <div className="row program-filter">
          {currentUserRole !== undefined &&
           currentUserRole.shortName === "student" ? (
             <FilterProgramDropdownStudent 
              getCourseStatus={getCourseStatus} 
              coursesList={props.coursesList} 
              updateCourses={updateCourses}
              />
             ) : (
             <FilterProgramDropdown 
               getCourseStatus={getCourseStatus} 
               userCoursesData={props.coursesList} 
               updateCourses={updateCourses}
               />
           )}
            <RenderFilterElements
              component={"Course"}
              filterPacket={course}
              packetKeys={["idNumber", "name"]}
              getFilterChange={getSelectedCourse}
              currentValue={selectedCourse}
              filterDisable={false}
            />
          </div>
        </div>
      </Container>
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
