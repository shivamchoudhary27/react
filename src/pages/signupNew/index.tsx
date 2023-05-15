import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import SignupForm from "./form";
import logo from "../../assets/images/logo.png";

import "./style.scss";

const SignUpNew = () => {
  return (
    <React.Fragment>
      <Container fluid className="signup-container">
        <Row>
          <Col lg={7}>
            <div className="signup-leftImg">
                <span className="visually-hidden">Login Banner</span>
            </div>
          </Col>
          <Col lg={5} className="d-flex align-items-center justify-content-center">
            <div className="signup-rightForm text-center">
              <div className="signup-logo rounded-circle m-auto mb-4">
                  <img className="img-fluid" src={logo} alt="Ballistic Learning Pvt Ltd" />
              </div>
              <h2 className="signup-title">Welcome to Ballistic University</h2>
              <p className="signup-desc mb-4">Please enter your details to Sign up</p>
              <SignupForm />
              <p>Already a member? <Link to={"/"} className="ms-1">Sign in</Link></p>
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default SignUpNew;
