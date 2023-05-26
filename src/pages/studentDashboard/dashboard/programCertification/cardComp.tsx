import React from "react";
import { Card, Row, Col, Container, ProgressBar } from "react-bootstrap";
import "./style.scss";
import courseImage from "../../../../assets/images/course-default.jpg";
import gradeIcon from "../../../../assets/images/icons/grade.svg"
import badgesIcon from "../../../../assets/images/icons/badges.svg"

const Card_Component = () => {
  return (
    <Row className="g-4 mylearning-card">
      {card_Data.map((item, index) => (
        <Col sm={6} lg={4} xl={3} key={index}>
          <Card body className="h-100">
            <div className="mlcard-image">
              <Card.Img src={courseImage} alt={item.title} />
            </div>
            <div className="mlcard-title">
              <h5>{item.title}</h5>
              <span className="my-progress">{`${item.progress}%`}</span>
            </div>
            <div className="mlcard-info">
              <div>                
                <img src={gradeIcon} alt="Grade" className="small-icon" />Grade:
                <span>{item.grade}</span>
              </div>
              <div>
                <img src={badgesIcon} alt="Badges" />Badges: 
                <span>{item.badges}</span>
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
