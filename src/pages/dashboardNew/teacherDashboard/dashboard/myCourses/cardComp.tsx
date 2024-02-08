import "./style.scss";
import { Card, Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Errordiv from "../../../../../widgets/alert/errordiv";
import gradeIcon from "../../../../../assets/images/icons/grade.svg";
import sessionIcon from "../../../../../assets/images/icons/session.svg";
import courseImage from "../../../../../assets/images/course-default.jpg";
import attendanceIcon from "../../../../../assets/images/icons/attendance-black.svg";

type Props = {
  courseList: any;
  filterStatus: any;
  enrolCourse: any;
};

const CardComponent = (props: Props) => {
  const [course, setCourses] = useState([]);
  const [courseData, setCourseData] = useState(props.courseList)

  useEffect(() => {
    setCourseData(props.courseList)
    if (props.courseList.courses.length > 0) {
      setCourseData((prevState: { courses: any[]; }) => ({
        ...prevState,
        courses: prevState.courses.map(course => {
          const matchingCourse = props.enrolCourse.find((enrolCourse: { id: any; }) => enrolCourse.id === course.idNumber);
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
  }, [props.courseList, props.enrolCourse]);

  useEffect(() => {

    const filterStatus = (status: any, filterCourses: any) => {

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
 
    if (props.filterStatus.selectedValues.program > 0) {
      if (props.filterStatus.selectedValues.category > 0) {
        const filteredCourses = courseData.courses.filter(item =>
          item.programId === props.filterStatus.selectedValues.program
          &&
          item.categoryId === props.filterStatus.selectedValues.category
        );
        setCourses(filteredCourses);
        filterStatus(props.filterStatus.selectedValues.status, filteredCourses)
      }
      else {
        const filteredCourses = courseData.courses.filter(item =>
          item.programId === props.filterStatus.selectedValues.program
        );
        setCourses(filteredCourses);
        filterStatus(props.filterStatus.selectedValues.status, filteredCourses)
      }
    } else {
      const uniqueProgramIds = new Set();

      props.filterStatus.filterData.programs.forEach((item) => {
        uniqueProgramIds.add(item.id);
      });

      const filteredData = courseData.courses.filter(item => uniqueProgramIds.has(item.programId));
      setCourses(filteredData);
      filterStatus(props.filterStatus.selectedValues.status, filteredData)
    }
  }, [props.filterStatus]);

  return (
    <React.Fragment>
    <Row className="g-4 myteaching-card">
      {course.length > 0 ? (
        course.map((item: any, index: number) => (
          <Col sm={6} lg={4} xl={3} key={index}>
            <Card body className="h-100">
              <a
                href={`https://demo.learn.ballisticlearning.com/course/view.php?id=${item.idNumber}`}
              >
                <div className="mlcard-image">
                  <Card.Img src={courseImage} alt={item.title} />
                </div>
              </a>
              <div className="mlcard-title">
                <h5>{item.name}</h5>
              </div>
              <div className="mlcard-info">
                <div>
                  <img src={gradeIcon} alt="Grade" />
                  Av Grade
                  <span>{item.grade}</span>
                </div>
                <div>
                  <img src={sessionIcon} alt="Session" />
                  Session
                  <span>{item.session}</span>
                </div>
                <div>
                  <img
                    src={attendanceIcon}
                    alt="Attendance"
                    className="small-icon"
                  />
                  Attendance
                  <span>{item.attendance}</span>
                </div>
              </div>
            </Card>
          </Col>
        ))
      ) :
        props.apiStatusCourse === "started" && course.length === 0 ? <h3>Loading...</h3>
        : props.apiStatusCourse === "finished" && course.length === 0 && 
          <Errordiv msg="No course available!" cstate className="mt-3" />
      }
    </Row>

     {course.length === 0 && (
        <Errordiv msg="No course available!" cstate className="mt-3" />
      )} 
</React.Fragment>

  );
};

export default CardComponent;

const card_Data = [
  {
    title: "Discrete Mathematical Structures",
    grade: "35%",
    session: "36/2/60",
    attendance: "50%",
  },
  {
    title: "Data Structures and Algorithm",
    grade: "50%",
    session: "1/12/25",
    attendance: "55%",
  },
  {
    title: "Database Management System",
    grade: "58%",
    session: "36/24/65",
    attendance: "70%",
  },
  {
    title: "Data Structures and Algorithm Lab",
    grade: "45%",
    session: "10/0/0",
    attendance: "30%",
  },
  {
    title: "Database Application Lab",
    grade: "15%",
    session: "10/10/2",
    attendance: "20%",
  },
  {
    title: "Computer Organization and Architech",
    grade: "80%",
    session: "101/65/23",
    attendance: "90%",
  },
];
