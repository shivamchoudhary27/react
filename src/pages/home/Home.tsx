import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Button } from "react-bootstrap";
import logo from "../../assets/images/logo.png";
import "./home.scss";

const Home = () => {
  const navigate = useNavigate();
  const dashStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
    textAlign: "center",
  };

  const handleNavigate = () => {
    navigate("/login");
  };

  return (
    <>
      {/* <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand>Ballistic Academy</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Button
              className="d-flex"
              variant="warning"
              onClick={handleNavigate}
              size="sm"
            >
              click here to login
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}

      <section className="ai-home-wrapper">
        <Container style={dashStyle} className="ai-home-container">
          <div>
            <div className="ai-logo-wrapper">
              <img className="ai-logo" src={logo} alt="logo" />
            </div>
            <div>
              <h1>
                Welcome to <span>Ballistic Academy</span>
              </h1>
              <p>
                Ballistic Academy is a hybrid learning platform that uses FLIP
                classroom, and social learning (P2P).
              </p>
            </div>
            <Button
              variant="warning"
              size="md"
              className="button-link"
              onClick={handleNavigate}
            >
              click here to login
            </Button>
          </div>
        </Container>
        <div>
          <p>© Copyright Ballistic Learning Pvt Ltd. All Rights Reserved.</p>
        </div>
      </section>
    </>
  );
};

export default Home;
