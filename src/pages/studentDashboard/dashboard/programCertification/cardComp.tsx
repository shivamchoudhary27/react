import React from "react";
import { Card, Row, Col, Container, ProgressBar } from "react-bootstrap";
import "./style.scss";
import Image from "../../../../assets/images/course_catalogue_ai_image.jpg";

const Card_Component = () => {
  return (
    <Row className="g-4 mylearning-card">
      {card_Data.map((item, index) => (
        <Col sm={6} lg={4} xl={3} key={index}>
          <Card body className="card shadow h-100">
            <Card.Img src={Image} alt="" />
            <Card.ImgOverlay>
              <h4>{item.title}</h4>
              <span>{`${item.progress}%`}</span>
            </Card.ImgOverlay>
            <Row>
              <Col sm={6}>
                <i className="fa-solid fa-trophy"></i>{" "}
                <span>Grade: </span>
                <span>{item.grade}</span>
              </Col>
              <Col sm={6}>
                <i className="fa-solid fa-certificate"></i>{" "}
                <span>Badges: </span>
                <span>{item.badges}</span>
              </Col>
            </Row>
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
