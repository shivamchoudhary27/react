import React from "react";
import { Card, Row, Col, Container, ProgressBar } from "react-bootstrap";
import "./style.scss";
import Image from "../../../../assets/images/course_catalogue_ai_image.jpg";

const Card_Component = () => {
  return (
    <Row className="g-4">
      {card_Data.map((item, index) => (
        <Col sm={6} lg={4} xl={3} key={index}>
          <Card body className="card shadow h-100">
            <Card.Img src={Image} alt="" />
            <Card.ImgOverlay>
              <h4>{item.title}</h4>
              {/* <span>{`${item.progress}%`}</span> */}
            </Card.ImgOverlay>
            <Row>
              <Col sm={4} className="program-innerleft-column">
                <i className="fa-solid fa-trophy"></i>{" "}
                <span>Grade : </span>
                <span>{item.grade}</span>
              </Col>
              <Col sm={4}>
                <i className="fa-solid fa-certificate"></i>{" "}
                <span>Session : </span>
                <span>{item.session}</span>
              </Col>
              <Col sm={4}>
                <i className="fa-solid fa-certificate"></i>{" "}
                <span>Attendence : </span>
                <span>{item.attendence}</span>
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
    session: "36/2/60",
    attendence: "50%",
  },
  {
    title: "Data Structures and Algorithm",
    grade: "50%",
    session: "1/12/25",
    attendence: "55%",
  },
  {
    title: "Database Management System",
    grade: "58%",
    session: "36/24/65",
    attendence: "70%",
  },
  {
    title: "Data Structures and Algorithm Lab",
    grade: "45%",
    session: "10/0/0",
    attendence: "30%",
  },
  {
    title: "Database Application Lab",
    grade: "15%",
    session: "10/10/2",
    attendence: "20%",
  },
  {
    title: "Computer Organization and Architech",
    grade: "80%",
    session: "101/65/23",
    attendence: "90%",
  },
];
