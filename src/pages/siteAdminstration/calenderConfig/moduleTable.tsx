import React from "react";
import { Table, Container, Row, Col } from "react-bootstrap";

const Module_Table = ({ Field }: any) => {
  return (
    <>
      <Container fluid>
        <Row>
          {event_type.map((el, index) => (
            <CALENDER_MODULES el={el} key={index} Field={Field} />
          ))}
          {module_data.map((el, index) => (
            <CALENDER_MODULES el={el} key={index} Field={Field} />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Module_Table;

const CALENDER_MODULES = ({ el, Field }: any) => (
    <Col md="2">
      <div className="d-flex flex-column align-items-center justify-content-center mb-4 events-color-items">
        <span className={`${el.icon}`}></span> 
        <h5>{el.label}</h5>
        <Field id={el.label} type="color" name={el.label} />
      </div>
    </Col>
);

const event_type = [  
  {
    label: "site",
    icon: "fa-solid fa-file",
  },
  {
    label: "category",
    icon: "fa-solid fa-sitemap",
  },
  {
    label: "course",
    icon: "fa-solid fa-graduation-cap",
  },
  {
    label: "user",
    icon: "fa-solid fa-user",
  },  
];

const module_data = [  
  {
    label: "quiz",
    icon: "fa-solid fa-file",
  },
  {
    label: "assignment",
    icon: "fa-solid fa-file",
  },
  {
    label: "workshop",
    icon: "fa-solid fa-briefcase",
  },
  {
    label: "attendance",
    icon: "fa-solid fa-file",
  },  
  {
    label: "forum",
    icon: "fa-solid fa-file",
  },
  {
    label: "page",
    icon: "fa-solid fa-file",
  },
  {
    label: "book",
    icon: "fa-solid fa-book",
  },
];
