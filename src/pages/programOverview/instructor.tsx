import React from "react";
import { Row, Col } from "react-bootstrap";

const Instructor = () => {
  return (
    <React.Fragment>
      <div className="m-3">
        <h4>Instructor</h4>
      </div>
      <Row>
        {Data.map((item, index) => (
          <Col key={index}>
            <i className={item.icon}></i>
            <h6>{item.title}</h6>
            <p>
              {item.profession}
              <br />
              {item.collage}
            </p>
          </Col>
        ))}
      </Row>
    </React.Fragment>
  );
};

export default Instructor;

const Data = [
  {
    icon: "fa-solid fa-circle-user",
    title: "Dr. Aarti Santosh Nayak",
    profession: "Assistant Professor",
    collage: "S K Somaiya College",
  },
  {
    icon: "fa-solid fa-circle-user",
    title: "Dr. Abha Ashish Wankhede",
    profession: "ASSISTANT PROFESSOR (S.G)",
    collage: "K J Somaiya Institute",
  },
  {
    icon: "fa-solid fa-circle-user",
    title: "Mr. Abhijeet Uday Karmarkar",
    profession: "ASSISTANT PROFESSOR (S.G)",
    collage: "K J Somaiya College of Engnr",
  },
];
