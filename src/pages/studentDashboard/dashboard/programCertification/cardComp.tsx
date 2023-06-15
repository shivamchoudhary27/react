import React, { useEffect, useState } from "react";
import { Card, Row, Col, Container, ProgressBar } from "react-bootstrap";
import "./style.scss";
import courseImage from "../../../../assets/images/course-default.jpg";
import gradeIcon from "../../../../assets/images/icons/grade.svg";
import badgesIcon from "../../../../assets/images/icons/badges.svg";
import axios from "axios";
import Errordiv from "../../../../widgets/alert/errordiv";


const CourseListComp = () => {
  const [coursesList, setCoursesList] = useState([]);
  const id = localStorage.getItem("userid");
  const url = `https://demo.learn.ballisticlearning.com/webservice/rest/server.php?wstoken=7243942b15e0ffe89c1cf7c432863232&wsfunction=core_enrol_get_users_courses &moodlewsrestformat=json&userid=${id}`;

  useEffect(() => {
    axios
      .get(url)
      .then((res: any) => {
        console.log(res.data);
        setCoursesList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(coursesList);

  return (
    <React.Fragment>
      <Row className="g-4 mylearning-card">
        {coursesList.map((item: any, index) => (
          <Col sm={6} lg={4} xl={3} key={index}>
            <Card body className="h-100">
              <div className="mlcard-image">
                <Card.Img src={courseImage} alt={item.shortname} />
              </div>
              <div className="mlcard-title">
                <h5>{item.fullname}</h5>
                <span className="my-progress">{`${item.progress}%`}</span>
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
      {/* {coursesList.length === 0 && (
          <TableSkeleton numberOfRows={5} numberOfColumns={4} />
        )} */}
        {coursesList.length === 0 && (
          <Errordiv msg="No course available!" cstate className="mt-3" />
        )}
    </React.Fragment>
  );
};

export default CourseListComp;

const card_Data = [
  {
    title: "Discrete Mathematical Structures",
    grade: "35%",
    badges: "0",
    progress: 50,
  },
  {
    title: "Data Structures and Algorithm",
    grade: "50%",
    badges: "1",
    progress: 55,
  },
  {
    title: "Database Management System",
    grade: "58%",
    badges: "1",
    progress: 70,
  },
  {
    title: "Data Structures and Algorithm Lab",
    grade: "45%",
    badges: "0",
    progress: 30,
  },
  {
    title: "Database Application Lab",
    grade: "15%",
    badges: "0",
    progress: 20,
  },
  {
    title: "Computer Organization and Architech",
    grade: "80%",
    badges: "1",
    progress: 90,
  },
];
