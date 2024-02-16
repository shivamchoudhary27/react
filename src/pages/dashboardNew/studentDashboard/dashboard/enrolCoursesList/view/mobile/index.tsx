import React, { useState, useEffect } from "react";
import FilterProgramDropdown from "../../filterDropdown";
import { Container, Row, Col, Card } from "react-bootstrap";
import Errordiv from "../../../../../../../widgets/alert/errordiv";
import gradeIcon from "../../../../../../../assets/images/icons/grade.svg";
import badgesIcon from "../../../../../../../assets/images/icons/badges.svg";
import courseImage from "../../../../../../../assets/images/course-default.jpg";
import filterIcon from "../../../../../../../assets/images/icons/mb-filterIcon.svg";

import "./mobileStyle.scss";
import config from "../../../../../../../utils/config";

type Props = {
  coursesList: any;
  enrolCoreCoursesObj: any;
  apiStatusCourse: string
};

const courseStatusOptions = [
  { id: "inprogress", name: "In Progress" },
  { id: "completed", name: "Completed" },
  { id: "notstarted", name: "Not Started" },
];

const Mobile: React.FC<Props> = (props) => {
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

  const [filterStatus, setFilterStatus] = useState({
    selectedValues: {
      // department: 0,
      batchYear: 0,
      program: 0,
      category: 0,
      status: 0,
    },
    filterData: {
      // departments: [],
      batchYears: [],
      programs: [],
      categories: [],
      status: courseStatusOptions,
    },
  });
  const [course, setCourses] = useState([]);
  const [courseData, setCourseData] = useState(props.coursesList)


  useEffect(() => {
    setCourseData(props.coursesList)
    if (props.coursesList.courses.length > 0) {
      setCourseData((prevState: { courses: any[]; }) => ({
        ...prevState,
        courses: prevState.courses.map(course => {
          const matchingCourse = props.enrolCoreCoursesObj.find((enrolCourse: { id: any; }) => enrolCourse.id === course.idNumber);
          if (matchingCourse) {
            return {
              ...course,
              completed: matchingCourse.completed,
              progress: matchingCourse.progress
            };
          }
          return course;
        })
      }));
    }
  }, [props.coursesList, props.enrolCoreCoursesObj]);

  useEffect(() => {

    const filterdStatus = (status: any, filterCourses: any) => {

      if (filterCourses.length > 0) {

        if (status == 'inprogress') {
          let updatedCourse = filterCourses.filter((data: any) => {
            return data.progress != null && !data.completed
          })
          setCourses(updatedCourse);
        }
        if (status == 'completed') {
          let updatedCourse = filterCourses.filter((data: any) => {
            return data.completed
          })
          setCourses(updatedCourse);
        }
        if (status == 'notstarted') {
          let updatedCourse = filterCourses.filter((data: any) => {
            return data.progress == null && !data.completed
          })
          setCourses(updatedCourse);
        }
      };
    }

    if (filterStatus.selectedValues.program > 0) {
      if (filterStatus.selectedValues.category > 0) {
        const filteredCourses = courseData.courses.filter(
          (item) =>
            item.programId === filterStatus.selectedValues.program &&
            item.categoryId === filterStatus.selectedValues.category
        );
        setCourses(filteredCourses);
        filterdStatus(filterStatus.selectedValues.status, filteredCourses)
      } else {
        const filteredCourses = courseData.courses.filter(
          (item) => item.programId === filterStatus.selectedValues.program
        );
        setCourses(filteredCourses);
        filterdStatus(filterStatus.selectedValues.status, filteredCourses)
      }
    } else {
      const uniqueProgramIds = new Set();

      filterStatus.filterData.programs.forEach((item) => {
        uniqueProgramIds.add(item.id);
      });

      const filteredData = courseData.courses.filter((item) =>
        uniqueProgramIds.has(item.programId)
      );
      setCourses(filteredData);
      filterdStatus(filterStatus.selectedValues.status, filteredData)
    }
  }, [filterStatus]);

  const updateCourses = (filterValues: any) => {
    setFilterStatus(filterValues);
  };

  const [showFilterDropdown, setShowFilterDropdown] = useState(true);
  const toggleFilterDropdown = () => {
    setShowFilterDropdown(!showFilterDropdown);
  };
  return (
    <React.Fragment>
      <Container fluid>
        <div className="d-flex align-items-center justify-content-between flex-wrap mitcomponet-heading">
          <h3>My Courses</h3>
          <button onClick={toggleFilterDropdown} className="filter-btn">
            <img src={filterIcon} alt="filter-icon" />
          </button>
          <div className={showFilterDropdown ? "FilterProgramDropdown-wrapper" : "FilterProgramDropdown-wrapper hidden"}>
            <FilterProgramDropdown coursesList={props.coursesList} updateCourses={updateCourses} />
          </div>
        </div>
        <Row className="g-4 mylearning-card">
          {course.length > 0 ? (
            course.map((item: any, index: number) => (
              <Col sm={6} lg={4} xl={3} key={index}>
                <Card body className="h-100">
                <a
                    href={`${config.MOODLE_BASE_URL}?id=${item.idNumber}`}
                  >
                  <div className="mlcard-image">
                    <Card.Img src={courseImage} alt={item.shortname} />
                  </div>
                  </a>
                  <div className="mlcard-title">
                    <h5>{item.name}</h5>
                    <span className="my-progress">
                      {getCourseProgress(item.idNumber)}
                    </span>
                  </div>

                  <div className="mlcard-info mb-cardinfo">
                    <div>
                      <img src={gradeIcon} alt="Grade" className="small-icon" />
                      Grade:
                      <span>30%</span>
                    </div>
                    <div>
                      <img src={badgesIcon} alt="Badges" />
                      Badges:
                      <span>1</span>
                    </div>
                  </div>
                </Card>
              </Col>
            ))
          ) : 
          props.apiStatusCourse === "started" && course.length === 0 ? <h3>Loading...</h3> :
          props.apiStatusCourse === "finished" && course.length === 0 &&
          <Errordiv msg="No course available!" cstate className="mt-3" />
          }
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Mobile;
