import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { RenderFilterElements } from "./teacherDropdown";
import TeacherAttendanceFilterDropdown from "./teacherDropdown";
import { convertTimestampToDate } from "../../../lib/timestampConverter";
import FilterButtonWrapper from "../../../widgets/filterButtonWrapper";
import calenderStartdate from "../../../assets/images/icons/calender-startdate.svg";
import calenderEnddate from "../../../assets/images/icons/calender-enddate.svg";
type Props = {
  getCourseId: any;
  apiResponseData: any;
  attendancedata: any;
  courseDetails: any;
};

const TeacherAttendanceFilter = (props: Props) => {
  const currentUserRole = useSelector(
    (state: any) => state.globalFilters.currentUserRole
  );
  const [filterStatus, setFilterStatus] = useState({
    selectedValues: {
      department: 0,
      batchYear: 0,
      program: 0,
      category: 0,
    },
    filterData: {
      departments: [],
      batchYears: [],
      programs: [],
      categories: [],
    },
  });
  const [course, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(0);

  useEffect(() => {
    if (filterStatus.selectedValues.program > 0) {
      if (filterStatus.selectedValues.category > 0) {
        const filteredCourses = props.apiResponseData.courses.filter(
          (item: any) =>
            item.programId === filterStatus.selectedValues.program &&
            item.categoryId === filterStatus.selectedValues.category
        );
        setCourses(filteredCourses);
      } else {
        const filteredCourses = props.apiResponseData.courses.filter(
          (item: any) => item.programId === filterStatus.selectedValues.program
        );
        setCourses(filteredCourses);
      }
    } else {
      const uniqueProgramIds = new Set();
      filterStatus.filterData.programs.forEach((item: any) => {
        uniqueProgramIds.add(item.id);
      });
      const filteredData = props.apiResponseData.courses.filter((item: any) =>
        uniqueProgramIds.has(item.programId)
      );
      if (filteredData.length > 0) {
        setSelectedCourse(filteredData[0].idNumber);
      }
      setCourses(filteredData);
    }
  }, [filterStatus]);

  // set selected course === >>>
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

  const getSelectedCourse = (value: any, component: string) => {
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
      <Container fluid>
        <FilterButtonWrapper>
          <div className="filter-wrapper mitcomponet-heading">
            <div className="row program-filter">
              <TeacherAttendanceFilterDropdown
                apiResponseData={props.apiResponseData}
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
            </div>
          </div>
        </FilterButtonWrapper>
        {props.courseDetails !== "undefined" && (
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex filter-data">
              <div>
                <span>Course Name:</span>
                {course.length > 0 &&
                  course.map(
                    (item: any, index: number) =>
                      item.idNumber == selectedCourse && (
                        <span key={index} className="course-name">{item.name}</span>
                      )
                  )}
              </div>
              <div className="d-flex start-end-date">
                <div>
                  <img src={calenderStartdate} alt="startdate" />
                  <span>Start Date:</span>
                  <span>
                    {convertTimestampToDate(props.courseDetails.startdate)}
                  </span>
                </div>
                <div>
                  <img src={calenderEnddate} alt="enddate" />
                  <span>End Date:</span>
                  <span>
                    {convertTimestampToDate(props.courseDetails.enddate)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
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

export default TeacherAttendanceFilter;
