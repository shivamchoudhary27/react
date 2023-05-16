import React from "react";
import { Row, Col } from "react-bootstrap";
import ProgressBarComp from "./progressBarComp";

const Feedback = () => {
  return (
    <React.Fragment>
      <Row>
        <Col md={7} xs={12}>
            <div>
                <h4>Student Feedback</h4>
            </div>
          <div>
            <h1>4.5</h1>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
          </div>
          <div>
            <ProgressBarComp />
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Feedback;
