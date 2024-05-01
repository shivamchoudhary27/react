import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { RenderFilterElements } from "./filterDropdown";
import MyTimelineFilterDropdown from "./filterDropdown";
import { useNavigate } from "react-router-dom";

type Props = {
  getCourseId: any;
  apiResponseData: any;
  dpt: any;
  prg: any;
  prgId: any;
};

const MyTimetableFilter = (props: Props) => {
  const navigate = useNavigate();
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
  console.log(selectedCourse, 'selectedCourse')

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
            <MyTimelineFilterDropdown
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
          <div>
            <Button variant="primary">Slot Preferences</Button>{" "}
            <Button
              variant="primary"
              onClick={() =>
                navigate(
                  `/myChangeRequest?dpt=${props.dpt}&prg=${props.prg}&prgId=${props.prgId}`
                )
              }
            >
              My Change Request
            </Button>
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

export default MyTimetableFilter;
