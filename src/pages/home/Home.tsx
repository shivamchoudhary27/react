import React from "react";
import { Container, Button } from "react-bootstrap";
import config from "../../utils/config";
import logo from "../../assets/images/logo.png";
import "./home.scss";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const redirectUri = config.REDIRECT_URI;
  const oAuthUrl = `${config.OAUTH2_URL}/authorize?response_type=code&client_id=moodle&redirect_uri=${redirectUri}&scope=openid`;
  console.log("redirect uri " + redirectUri);
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
            <h1 className="mb-5">
              Welcome to <span>Ballistic University Premium</span>
            </h1>
            <a href={oAuthUrl}>
              <Button variant="warning btn-lg" className="button-link">
                Sign in
              </Button>
            </a>{" "}
            <Button variant="dark btn-lg" className="button-link ms-3" onClick={()=>navigate("/signupnew")}>
               Sign up
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
