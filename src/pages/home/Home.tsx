import React, { useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import config from "../../utils/config";
import logo from "../../assets/images/circlelogo-blue.svg";
import "./home.scss";
import "./mobileStyle.scss";
import { useNavigate } from "react-router-dom";
import SearchIcon from "../../assets/images/icons/searchbold.svg";

const Home = () => {
  const navigate = useNavigate();
  const redirectUri = config.REDIRECT_URI;
  const oAuthUrl = `${config.OAUTH2_URL}/authorize?response_type=code&client_id=moodle&redirect_uri=${redirectUri}&scope=openid`;
  console.log("redirect uri " + redirectUri);
  console.log(oAuthUrl);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const handleSearchClick = () => {
    setShowSearchInput(true);
  };
  return (
    <>
      <div className="landing-wrapper">
        <div className="landing-header">
          <div className="d-flex justify-content-between align-items-center">
            <div className="logo-wrapper">
              <img src={logo} alt="logo" className="img img-fluid" />
            </div>
            <div className="d-flex">
              <div className="position-relative rounded-pill search-expand">
                {showSearchInput ? (
                  <div className="d-flex">
                    <input type="text" placeholder="Search" className="search-input" />
                    <button className="search-btn">
                      <img src={SearchIcon} alt="logo" className="img img-fluid" />
                    </button>
                  </div>
                ) : (
                  <button className="search-btn bg-dark" onClick={handleSearchClick}>
                    <img src={SearchIcon} alt="logo" className="img img-fluid" />
                  </button>
                )}
              </div>
              <Button variant="btn-lg rounded-pill px-4 text-white mx-2" >
                Demo couses
              </Button>
            </div>
          </div>
        </div>
        <Container fluid>
          <div className="landing-content">
            <div className="login-btn mt-5">
              <a href={oAuthUrl}>
                <Button variant="btn-lg rounded-pill px-4">
                 Login
                </Button>
              </a>
            </div>
            <div className="demovideo-wrapper">
            <iframe src="https://player.vimeo.com/video/898700168" title="Ballistic University Admin"></iframe>
            </div>
          </div>
        </Container>
      </div>
      <div className="footer-links">
        <Container fluid>
          <Row>
            <Col xs={12} md={4}>Teaching Resources Planner Management </Col>
            <Col xs={12} md={4}>NAAC Compliances</Col>
            <Col xs={12} md={4}>Personal Learning Paths</Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Home;

