import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import SignupForm from "./form";
import SignupImg from "../../assets/images/signup.jpg";

import "./style.scss";

const SignUpNew = () => {
  return (
    <React.Fragment>
      <Container fluid className="signup-container">
        <Row>
          <Col lg={6} md={6} sm={12} className="img-column-wrapper">
            <div className="image-wrapper">
              <div className="info">
                Ballistic Academy is a hybrid learning platform that uses FLIP
                classroom, and social learning (P2P).
              </div>
              <img src={SignupImg} className="image-style" alt="Banner Image" />
              <div className="copyright-info">
                © Copyright Ballistic Learning Pvt Ltd. All Rights Reserved.
              </div>
            </div>
          </Col>
          <Col lg={6} md={6} sm={12} className="form-column-wrapper">
            <div className="form-wrapper">
              <SignupForm />
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default SignUpNew;
