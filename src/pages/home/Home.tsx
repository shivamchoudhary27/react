import React from "react";
import { Container, Button } from "react-bootstrap";
import config from "../../utils/config";
import logo from "../../assets/images/logo.png";
import "./home.scss";

const Home = () => {
  const currentMethod = window.location.protocol;
  const returnUri = (currentMethod === "https:") ? `${window.location.host}/authlogin` : '127.0.0.1:3000/authlogin';
  const redirectUri = `${currentMethod}//${returnUri}`;
  const oAuthUrl = `${config.OAUTH2_URL}/authorize?response_type=code&client_id=moodle&redirect_uri=${redirectUri}&scope=openid`;
  console.log(oAuthUrl);
  
  const dashStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
    textAlign: "center",
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
                Welcome to <span>Ballistic University Premium</span>
              </h1>
              <p>
                Ballistic Academy is a hybrid learning platform that uses FLIP
                classroom, and social learning (P2P).
              </p>
            </div>
            <a href={oAuthUrl}>
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
