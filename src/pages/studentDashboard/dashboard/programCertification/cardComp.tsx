import React from "react";
import { Card, Row, Col, Container, ProgressBar } from "react-bootstrap";
import "./style.scss";
import Image from "../../../../assets/images/course_catalogue_ai_image.jpg";

const Card_Component = () => {
  return (
    <>
      <Container fluid>
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
                    <Col sm={6} className="program-innerleft-column">
                      <i className="fa-solid fa-trophy"></i>{" "}
                      <span>Grade : </span>
                      <span>{item.grade}</span>
                    </Col>
                    <Col sm={6}>
                      <i className="fa-solid fa-certificate"></i>{" "}
                      <span>Badges : </span>
                      <span>{item.badges}</span>
                    </Col>
                  </Row>

                  <ProgressBar
                    now={item.progress}
                    label={`${item.progress}%`}
                    variant={
                      item.progress < 50
                        ? "danger"
                        : item.progress >= 50 && item.progress < 70
                        ? "warning"
                        : "success"
                    }
                    className="mt-2"
                  />
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
