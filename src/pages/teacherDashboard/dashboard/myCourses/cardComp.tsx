import React from "react";
import { Card, Row, Col, Container, ProgressBar } from "react-bootstrap";
import "./style.scss";
import courseImage from "../../../../assets/images/course-default.jpg";
import gradeIcon from "../../../../assets/images/icons/grade.svg"
import sessionIcon from "../../../../assets/images/icons/session.svg"
import attendanceIcon from "../../../../assets/images/icons/attendance-black.svg"

const Card_Component = () => {
  return (
    <Row className="g-4 myteaching-card">
    {card_Data.map((item, index) => (
      <Col sm={6} lg={4} xl={3} key={index}>
        <Card body className="h-100">
          <div className="mlcard-image">
            <Card.Img src={courseImage} alt={item.title} />
          </div>
          <div className="mlcard-title">
            <h5>{item.title}</h5>
          </div>
          <div className="mlcard-info">
            <div>                
              <img src={gradeIcon} alt="Grade" />Av Grade
              <span>{item.grade}</span>
            </div>
            <div>
              <img src={sessionIcon} alt="Session" />Session
              <span>{item.session}</span>
            </div>
            <div>
              <img src={attendanceIcon} alt="Attendance" className="small-icon" />Attendance
              <span>{item.attendance}</span>
            </div>
          </div>
        </Card>
      </Col>
    ))}
    </Row>
  );
};

export default Card_Component;

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
