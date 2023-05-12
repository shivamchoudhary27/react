import React from "react";
import { Col, Row, Card } from "react-bootstrap";
import Image from "../../assets/images/course_catalogue_ai_image.jpg";

const TrendingCourses = () => {
  return (
    <React.Fragment>
      <h3 className="mt-4">Trending Course</h3>
      <Row>
        {card_Data.map((item, index) => (
          <Col md={3} xs={12} key={index} className="gy-3">
            <Card body>
              <Card.Img variant="top" src={Image} height="120px" />
              <Card.Title className="pt-2">
                <small className="text-muted">{item.title}</small>
              </Card.Title>
              <Card.Text>
                <Row>
                  <Col sm={4}>
                    <i className="fa-solid fa-trophy d-block"></i>{" "}
                    <span>{item.duration}</span>
                  </Col>
                  <Col sm={4}>
                    <i className="fa-solid fa-certificate d-block"></i>{" "}
                    <span>{item.rating}</span>
                  </Col>
                  <Col sm={4}>
                    <i className="fa-solid fa-certificate d-block"></i>{" "}
                    <span>{item.price}</span>
                  </Col>
                </Row>
              </Card.Text>
            </Card>
          </Col>
        ))}
      </Row>
    </React.Fragment>
  );
};

export default TrendingCourses;

const card_Data = [
  {
    title: "Discrete Mathematical Structures",
    category: "category here",
    duration: "6 months",
    rating: "3 Rating",
    price: 50000,
  },
  {
    title: "Data Structures and Algorithm",
    category: "category here",
    duration: "6 months",
    rating: "3 Rating",
    price: 50000,
  },
  {
    title: "Database Management System",
    category: "category here",
    duration: "6 months",
    rating: "3 Rating",
    price: 50000,
  },
  {
    title: "Data Structures and Algorithm Lab",
    category: "category here",
    duration: "6 months",
    rating: "3 Rating",
    price: 50000,
  },
];
