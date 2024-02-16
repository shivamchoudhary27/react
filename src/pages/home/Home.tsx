import "./home.scss";
import "./mobileStyle.scss";
import config from "../../utils/config";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { pagination } from "../../utils/pagination";
import logo from "../../assets/images/circlelogo-blue.svg";
import Butext from "../../assets/images/landing-butext.svg";
import { Container, Button, Row, Col } from "react-bootstrap";
import SearchIcon from "../../assets/images/icons/searchbold.svg";
import axios from "axios";
import ClockIcon from "../../assets/images/icons/clock-white.svg";
import BuildingIcon from "../../assets/images/icons/building.svg";
import CalenderIcon from "../../assets/images/icons/calender-white.svg";
import BookIcon from "../../assets/images/icons/book-open.svg";
import CapIcon from "../../assets/images/icons/graduation-cap.svg";
import CardIcon from "../../assets/images/icons/card.svg";
import ProgramDefaultImg from "../../assets/images/course-default.jpg"


const Home = () => {
  const navigate = useNavigate();
  const [allPrograms, setAllPrograms] = useState([]);
  const redirectUri = config.REDIRECT_URI;
  const oAuthUrl = `${config.OAUTH2_URL}/authorize?response_type=code&client_id=moodle&redirect_uri=${redirectUri}&scope=openid`;

  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });

  useEffect(() => {
    axios
      .get(
        `${config.JAVA_API_URL}/public/programs?pageNumber=${filterUpdate.pageNumber}&pageSize=${filterUpdate.pageSize}`
      )
      .then((result: any) => {
        if (result.data !== "" && result.status === 200) {
          const firstThreeElements = result.data.items.slice(0, 3);
          setAllPrograms(firstThreeElements);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [filterUpdate]);

  console.log(allPrograms)
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
              <Link to="/signupnew">
                <Button variant="btn-lg rounded-pill px-4 m-3 signup">Sign up</Button>
              </Link>
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
          <h4>Programs</h4>
          <div>
          Embark on Your Academic Journey with Our Comprehensive Array of College Programs, Unleashing Opportunities Across Engineering, Sciences, Arts, and More. Cultivate Your Interests, Ignite Your Ambitions – Your Path to Success Begins Here!
          </div>
        </div>
        <div className="courseswrapper">
          <Row>
          {allPrograms.length > 0 &&
            allPrograms.map((item: any, index: number) => (
              <Col key={item.id} xl={4} lg={4} md={6} sm={12}>
              <Link
                key={item.id}
                to={{ pathname: `/programsummary/${item.id}` }}
              >
              <div className="course-container" key={index}>
                <div className="course-image">
                  <img
                    src={item.files && item.files.length > 0 ? item.files[0].url : ProgramDefaultImg}
                    className="img img-fluid"
                    alt={item.name}
                  />
                  <div className="course-keypoints">
                    <div>
                     <img src={ClockIcon} alt="duration" />
                      <span> {item.durationValue}{" "} {item.durationUnit}</span>
                    </div>
                    <div>
                     <img src={CardIcon} alt="program code" />
                      <span>{item.programCode}</span>
                    </div>
                    <div>
                     <img src={BuildingIcon} alt="department" />
                      <span> {item.departmentName}</span>
                    </div>
                    <div>
                     <img src={CapIcon} alt="program type" />
                      <span> {item.programTypeName}</span>
                    </div>
                    <div>
                     <img src={CalenderIcon} alt="batch year" />
                      <span> {item.batchYear}</span>
                    </div>
                    <div>
                     <img src={BookIcon} alt="study mode" />
                      <span>{item.modeOfStudy}</span>
                    </div>
                  </div>
                </div>
                <div className="course-title">{item.name}</div>
              </div>
              </Link>
              </Col>
            ))}
</Row>
        <div className="allcourses-btn">
          <button onClick={() => navigate("/programlist")}>
            <i className="fa fa-angle-right"></i>
          </button>
        </div>
        </div>
      </div>
    </>
  );
};

export default Home;






