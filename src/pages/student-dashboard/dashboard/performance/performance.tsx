import React from "react";
import { Card, Row, Col } from "react-bootstrap";

const PerformanceOverview = () => {
  return (
    <>
      <Card body className="mt-2">
        <div className="mb-2">
          <h6>PERFORMANCE OVERVIEW</h6>
        </div>
        <Row>
          {data.map((item) => (
            <Col md={6}>
              <i className={item.icon}></i>
              <p>{item.title}</p>
            </Col>
          ))}
        </Row>
      </Card>
    </>
  );
};

export default PerformanceOverview;

const data = [
  {
    icon: "fa-solid fa-thumbs-up",
    title: "Av. Grade",
    value: "85%",
  },
  {
    icon: "fa-solid fa-certificate",
    title: "Badges",
    value: "3/4",
  },
  {
    icon: "fa-solid fa-certificate",
    title: "Certificates",
    value: "2",
  },
  {
    icon: "fa-solid fa-check",
    title: "Credits",
    value: "55",
  },
];
