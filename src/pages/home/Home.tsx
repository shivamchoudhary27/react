import React, { useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import config from "../../utils/config";
import logo from "../../assets/images/circlelogo-blue.svg";
import "./home.scss";
import "./mobileStyle.scss";
import { useNavigate } from "react-router-dom";
import SearchIcon from "../../assets/images/icons/searchbold.svg";
import Butext from "../../assets/images/landing-butext.svg";
// import PriceRequestModal from "../../widgets/priceRequestModal/PriceRequestModal";
import DsaImage from "../../assets/images/course-data-structure.svg";
import CloudImage from "../../assets/images/course-cloud-computing.svg";
import MathsImage from "../../assets/images/course-discreate-mathematics.svg";

const Home = () => {
  const navigate = useNavigate();
  const redirectUri = config.REDIRECT_URI;
  const oAuthUrl = `${config.OAUTH2_URL}/authorize?response_type=code&client_id=moodle&redirect_uri=${redirectUri}&scope=openid`;
  console.log("redirect uri " + redirectUri);
  console.log(oAuthUrl);

  // const [showModal, setShowModal] = useState(false);

  // const handleShowModal = () => setShowModal(true);
  // const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <div className="landing-wrapper">
        <div className="landing-header">
          <div className="d-flex justify-content-between align-items-center">
            <div className="logo-wrapper">
              <img src={logo} alt="logo" className="img img-fluid" />
            </div>
                  {/* <button className="search-btn bg-dark">
                    <img src={SearchIcon} alt="logo" className="img img-fluid" />
                  </button> */}
          </div>
        </div>
        <Container fluid>
          <div className="landing-content">
            <img src={Butext} alt="Ballistic University" className="butext" />
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
      {/* onClick={handleShowModal} */}
   {/* <PriceRequestModal show={showModal} handleClose={handleCloseModal}/> */}
     <div className="landing-courses d-flex">
        <div className="title-wrapper">
          <h4>Courses</h4>
          <div>
          Embark on your learning transformation journey with a Ballistic Quickstart, be it online coaching, K12, higher education, medical education, banking or workplace learning. Our expert teams will collaborate closely to guide you through strategy, design, hosting, and ongoing support.
          </div>
        </div>
        <div className="courseswrapper">
          <div className="course-container">
            <div className="course-image">
            <img src={MathsImage} className="img img-fluid" alt="Discrete Mathematics" />
            </div>
            <div className="course-title">Discrete Mathematics</div>
          </div>
          <div className="course-container">
            <div className="course-image">
            <img src={CloudImage} className="img img-fluid" alt="Cloud Computing" />
            </div>
            <div className="course-title">Cloud Computing</div>
          </div>
          <div className="course-container">
            <div className="course-image">
            <img src={DsaImage} className="img img-fluid" alt="Data Structure" />
            </div>
            <div className="course-title">Data Structure</div>
          </div>
          {/* <div className="allcourses-btn">
           <button className="btn"> <i className="fa fa-chevron-right"></i> </button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Home;

