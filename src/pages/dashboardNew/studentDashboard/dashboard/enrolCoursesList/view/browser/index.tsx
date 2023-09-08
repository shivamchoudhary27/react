import React, { useState, useEffect } from "react";
import FilterProgramDropdown from "../../filterDropdown";
import { Container, Row, Col, Card } from "react-bootstrap";
import Errordiv from "../../../../../../../widgets/alert/errordiv";
import gradeIcon from "../../../../../../../assets/images/icons/grade.svg";
import badgesIcon from "../../../../../../../assets/images/icons/badges.svg";
import courseImage from "../../../../../../../assets/images/course-default.jpg";

type Props = {
  coursesList: any;
  enrolCoreCoursesObj: any;
};

const courseStatusOptions = [
  {id: 'inprogress', name: 'In Progress'},
  {id: 'completed', name: 'Completed'},
  {id: 'notstarted', name: 'Not Started'},
];

const Browser = (props: Props) => {
  const [filterStatus, setFilterStatus] = useState({
    selectedValues: {
      // department: 0,
      batchYear: 0,
      program: 0,
      category: 0,
      status: 0
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

  return (
    <React.Fragment>
      <Container fluid>
        <div className="d-flex align-items-center justify-content-between flex-wrap mitcomponet-heading">
          <h3>My Courses</h3>
          <FilterProgramDropdown 
            getCourseStatus={getCourseStatus} 
            coursesList={props.coursesList} 
            updateCourses={updateCourses}
          />
        </div>
        <Row className="g-4 mylearning-card">
          {course.map((item: any, index: number) => (
            <Col sm={6} lg={4} xl={3} key={index}>
              <Card body className="h-100">
                  <a 
                    href={`https://demo.learn.ballisticlearning.com/course/view.php?id=${item.idNumber}`}
                    target="_blank"
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
                <div className="mlcard-info">
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
          ))}
        </Row>
      </Container>
      {/* {coursesList.length === 0 && (
          <TableSkeleton numberOfRows={5} numberOfColumns={4} />
        )} */}
      {props.coursesList.length === 0 && (
        <Errordiv msg="No course available!" cstate className="mt-3" />
      )}
    </React.Fragment>
  );
};

export default Browser;
