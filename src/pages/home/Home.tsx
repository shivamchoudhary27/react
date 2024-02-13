import "./home.scss";
import "./mobileStyle.scss";
import config from "../../utils/config";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { pagination } from "../../utils/pagination";
import logo from "../../assets/images/circlelogo-blue.svg";
import Butext from "../../assets/images/landing-butext.svg";
import { Container, Button, Row, Col } from "react-bootstrap";
import SearchIcon from "../../assets/images/icons/searchbold.svg";
import DsaImage from "../../assets/images/course-data-structure.svg";
import CloudImage from "../../assets/images/course-cloud-computing.svg";
import MathsImage from "../../assets/images/course-discreate-mathematics.svg";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [allPrograms, setAllPrograms] = useState([]);
  const redirectUri = config.REDIRECT_URI;
  const oAuthUrl = `${config.OAUTH2_URL}/authorize?response_type=code&client_id=moodle&redirect_uri=${redirectUri}&scope=openid`;
  console.log("redirect uri " + redirectUri);
  console.log(oAuthUrl);
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });

  useEffect(() => {
    axios
      .get(
        `https://api.microlearning.ballisticlearning.com/learning-service/api/v1/public/programs?pageNumber=${filterUpdate.pageNumber}&pageSize=${filterUpdate.pageSize}`
      )
      .then((result: any) => {
        if (result.data !== "" && result.status === 200) {
          setAllPrograms(result.data.items);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [filterUpdate]);
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
                <Button variant="btn-lg rounded-pill px-4">Login</Button>
              </a>
            </div>
            <div className="demovideo-wrapper">
              <iframe
                src="https://player.vimeo.com/video/898700168"
                title="Ballistic University Admin"
              ></iframe>
            </div>
          </div>
        </Container>
      </div>
      <div className="footer-links">
        <Container fluid>
          <Row>
            <Col xs={12} md={4}>
              Teaching Resources Planner Management{" "}
            </Col>
            <Col xs={12} md={4}>
              NAAC Compliances
            </Col>
            <Col xs={12} md={4}>
              Personal Learning Paths
            </Col>
          </Row>
        </Container>
      </div>
      <div className="landing-courses d-flex">
        <div className="title-wrapper">
          <h4>Courses</h4>
          <div>
            Embark on your learning transformation journey with a Ballistic
            Quickstart, be it online coaching, K12, higher education, medical
            education, banking or workplace learning. Our expert teams will
            collaborate closely to guide you through strategy, design, hosting,
            and ongoing support.
          </div>
        </div>
        <div className="courseswrapper">
          {allPrograms.length > 0 &&
            allPrograms.map((item: any, index: number) => (
              <div className="course-container" key={index}>
                <div className="course-image">
                  <img
                    src={item.files[0].url}
                    className="img img-fluid"
                    alt={item.name}
                    style={{width:"500px"}}
                  />
                </div>
                <div className="course-title">{item.name}</div>
              </div>
            ))}
<button onClick={() => navigate("/programlist")}>VIEW MORE</button>
        </div>
      </div>
    </>
  );
};

export default Home;






