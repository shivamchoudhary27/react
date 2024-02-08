import React, { useEffect, useState } from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import CardComponent from "./cardComp";
import FilterProgramDropdown from "./filterDropdown";
import filterIcon from "../../../../../assets/images/icons/mb-filterIcon.svg";
// import Course_Pagination from "./pagination";
import Errordiv from "../../../../../widgets/alert/errordiv";

type Props = {
  userCoursesData: any;
  enrolCoreCoursesObj: any
  setUserCoursesData:any
};

const courseStatusOptions = [
  {id: 'inprogress', name: 'In Progress'},
  {id: 'completed', name: 'Completed'},
  {id: 'notstarted', name: 'Not Started'},
];

const MyCourses = (props: Props) => {
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

  const [showFilterDropdown, setShowFilterDropdown] = useState(true);
  const toggleFilterDropdown = () => {
    setShowFilterDropdown(!showFilterDropdown);
  };

  const updateCourses = (filterValues: any) => {
    setFilterStatus(filterValues);
  }

  return (
    <>
      <Container fluid>
        <div className="d-flex align-items-center justify-content-between flex-wrap mitcomponet-heading">
          <h3>My Courses</h3>
          <button onClick={toggleFilterDropdown} className="filter-btn">
            <img src={filterIcon} alt="filter-icon" />
          </button>
          <div className={showFilterDropdown ? "FilterProgramDropdown-wrapper" : "FilterProgramDropdown-wrapper hidden"}>
            <FilterProgramDropdown 
              userCoursesData={props.userCoursesData} 
              setUserCoursesData={props.setUserCoursesData}
              updateCourses={updateCourses}
            />
          </div>
        </div>
        <CardComponent 
          courseList={props.userCoursesData} 
          filterStatus={filterStatus}
          enrolCourse={props.enrolCoreCoursesObj}
        />
      </Container>
    </>
  );
};

export default MyCourses;
