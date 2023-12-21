import { Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { RenderFilterElements } from "./studentDropdown";
import StudentAttendanceFilterDropdown from "./studentDropdown";
import { convertTimestampToDate } from "../../../lib/timestampConverter";

type Props = {
  getCourseId: any;
  apiResponseData: any;
  attendancedata: any;
  allAttendanceSessionRecords: any;
  totalPointAndPercentage: any;
};

const StudentAttendanceFilter = (props: Props) => {
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
        <div className="d-flex align-items-center justify-content-between flex-wrap mitcomponet-heading">
          <div className="row program-filter">
            <StudentAttendanceFilterDropdown
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
        {props.allAttendanceSessionRecords !== "undefined" && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="me-3">
                <>
                  <span style={{ fontSize: "22px", fontWeight: "500" }}>
                    Course Name:{" "}
                  </span>
                  <span style={{ fontSize: "20px" }}>
                    {props.allAttendanceSessionRecords.coursename}
                  </span>
                </>
              
            </div>
            <div className="me-3">
              <span style={{ fontSize: "22px", fontWeight: "500" }}>
                Start Date:{" "}
              </span>
              <span style={{ fontSize: "20px" }}>
                {convertTimestampToDate(
                  props.allAttendanceSessionRecords.startdate
                )}
              </span>
            </div>
            <div>
              <span style={{ fontSize: "22px", fontWeight: "500" }}>
                End Date:{" "}
              </span>
              <span style={{ fontSize: "20px" }}>
                {convertTimestampToDate(
                  props.allAttendanceSessionRecords.enddate
                )}
              </span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="me-3">
              <span style={{ fontSize: "22px", fontWeight: "500" }}>
                Total Points:{" "}
              </span>
              <span style={{ fontSize: "20px" }}>
                {props.totalPointAndPercentage.totalPoints > 0
                  ? props.totalPointAndPercentage.totalPoints
                  : 0}
              </span>
            </div>
            <div className="me-3">
              <span style={{ fontSize: "22px", fontWeight: "500" }}>
                Percentage:{" "}
              </span>
              <span
                style={{ fontSize: "20px" }}
              >{`${props.totalPointAndPercentage.percentage}%`}</span>
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

export default StudentAttendanceFilter;
