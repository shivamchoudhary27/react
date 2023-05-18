import React from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.scss";

const TimelineTable = () => {
  return (
    <>
      <div className="mitblock-body">
        <Container fluid>
          {tableData.map((item, index) => (
            <Row key={index}>
              <Col xs={9}>
                <h6>{item.title}</h6>
                <div>{item.subtitle}</div>                
                <span>{item.time}</span>                
              </Col>
              <Col xs={3}><Link to="">{item.link}</Link></Col>
            </Row>
          ))}
        </Container>
      </div>
    </>
  );
};

export default TimelineTable;

const tableData = [
  {
    title: "The Natural Number System",
    subtitle: "Discrete Mathmatical Structures",
    link: "Add submission",
    time: "14 : 30",
  },
  {
    title: "Arrays",
    subtitle: "Data structure & Algorithms",
    link: "Attempt Quiz",
    time: "11 : 15",
  },
];
