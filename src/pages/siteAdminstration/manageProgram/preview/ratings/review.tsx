import React from "react";
import { Row, Table, Container, Col } from "react-bootstrap";
import StarRating from "../../../../../widgets/rating";

type Props = {};

const Review = (props: Props) => {
  return (
    <React.Fragment>
      {data.map((elem, index) => (
        <Row className="mt-3 d-none" key={index}>
          <Col className="col-auto d-flex">
            <div className={elem.icon} style={{ fontSize: "50px", marginRight: "10px"}}></div>
            <div>
              <small>{elem.time}</small>
              <h6>{elem.title}</h6>
            </div>
          </Col>
          <Col>
            <StarRating totalStars="5" />
            <p>{elem.description}</p>
          </Col>
        </Row>
      ))}
    </React.Fragment>
  );
};

export default Review;

const data = [
  {
    icon: "fa-solid fa-circle-user",
    time: "a week ago",
    title: "Gautam Das",
    rating: "4.5",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    icon: "fa-solid fa-circle-user",
    time: "a week ago",
    title: "Vishal Jain",
    rating: "4.0",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
];
