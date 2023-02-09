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
      <section className="ai-home-wrapper">
        <Container style={dashStyle} className="ai-home-container">
          <div>
            <div className="ai-logo-wrapper">
              <img className="ai-logo" src={logo} alt="logo" />
            </div>
            <div>
              <h1>
                Welcome to <span>Ballistic Learning Pvt. Ltd</span>
              </h1>
              <p>
                Ballistic Academy is a hybrid learning platform that uses FLIP
                classroom, and social learning (P2P).
              </p>
            </div>
            <a href="http://40.114.33.183:8080/oauth2-service/oauth2/authorize?response_type=code&client_id=moodle&redirect_uri=http://127.0.0.1:3000/authlogin&scope=openid">
              <Button
                variant="warning"
                size="md"
                className="button-link"
              >
                click here to login
              </Button>
            </a>

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
