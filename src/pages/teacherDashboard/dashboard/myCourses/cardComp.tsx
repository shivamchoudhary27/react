import React from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import "./style.scss";
import Image from "../../../../assets/images/course_catalogue_ai_image.jpg";

const Card_Component = () => {
  return (
    <>
      <Container>
        <Row>
          {card_Data.map((item, index) => (
            <Col md={4} key={index} className="gy-3">
              <Card body>
                <Card.Img variant="top" src={Image} height="120px" />
                <Card.Title className="pt-2">
                  <small className="text-muted">{item.title}</small>
                </Card.Title>
                <Card.Text>
                  <Row>
                    <Col sm={4}>
                      <i className="fa-solid fa-trophy d-block"></i>{" "}
                      <span className="d-block">Grade</span>
                      <span>{item.grade}</span>
                    </Col>
                    <Col sm={4}>
                      <i className="fa-solid fa-certificate d-block"></i>{" "}
                      <span className="d-block">Sessions</span>
                      <span>{item.badges}</span>
                    </Col>
                    <Col sm={4}>
                      <i className="fa-solid fa-certificate d-block"></i>{" "}
                      <span className="d-block">Attendance</span>
                      <span>{item.badges}</span>
                    </Col>
                  </Row>
                </Card.Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Card_Component;

const card_Data = [
  {
    title: "Discrete Mathematical Structures",
    grade: "35%",
    badges: "36/2/60",
    progress: 50,
  },
  {
    title: "Data Structures and Algorithm",
    grade: "50%",
    badges: "10/2/60",
    progress: 55,
  },
  {
    title: "Database Management System",
    grade: "58%",
    badges: "41/2/60",
    progress: 70,
  },
  {
    title: "Data Structures and Algorithm Lab",
    grade: "45%",
    badges: "10/2/60",
    progress: 30,
  },
  {
    title: "Database Application Lab",
    grade: "15%",
    badges: "10/2/60",
    progress: 20,
  },
  {
    title: "Computer Organization and Architech",
    grade: "80%",
    badges: "10/2/60",
    progress: 90,
  },
];
