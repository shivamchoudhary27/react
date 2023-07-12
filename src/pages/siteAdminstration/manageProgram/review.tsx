import React from "react";
import { Row, Table, Container, Col } from "react-bootstrap";
import StarRating from "../../../widgets/rating";

type Props = {};

const Review = (props: Props) => {
  return (
    <React.Fragment>
      <div>
        <Container>
          {data.map((elem, index) => (
            <Row key={index}>
              <Col md={3}>
                <div
                  className={elem.icon}
                  style={{ fontSize: "50px", display: "inline-block" }}
                ></div>
                <div style={{ display: "inline-block" }}>
                  <p>{elem.time}</p>
                  <h5>{elem.title}</h5>
                </div>
              </Col>
              <Col md={9}>
                <div style={{ display: "inline-block" }}>
                  {/* {elem.rating} */}
                  <StarRating totalStars="5" />
                  <p>{elem.description}</p>
                </div>
              </Col>
              <hr />
            </Row>
          ))}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Review;

const data = [
  {
    icon: "fa-solid fa-circle-user",
    time: "a week ago",
    title: "Paul N",
    rating: "4.5",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    icon: "fa-solid fa-circle-user",
    time: "a week ago",
    title: "Paul N",
    rating: "4.5",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
];
