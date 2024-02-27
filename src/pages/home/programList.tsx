import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { pagination } from "../../utils/pagination";
import ClockIcon from "../../assets/images/icons/clock-white.svg";
import BuildingIcon from "../../assets/images/icons/building.svg";
import CalenderIcon from "../../assets/images/icons/calender-white.svg";
import BookIcon from "../../assets/images/icons/book-open.svg";
import CapIcon from "../../assets/images/icons/graduation-cap.svg";
import CardIcon from "../../assets/images/icons/card.svg";
import logo from "../../assets/images/circlelogo-blue.svg";
import Footer from "../newFooter";
import BottomWave from "../../assets/images/background/bg-bottom.svg";
import bgLeft from "../../assets/images/background/bg-admin-left.svg";
import { Button, Col, Container, Image, Row, Form  } from "react-bootstrap";
import PageTitle from "../../widgets/pageTitle";
// import ProgramDefaultImg from "../../assets/images/course-default.jpg"
import ProgramDefaultImg from "../../assets/images/course-default.jpg"
import config from "../../utils/config";
import NewLoader from "../../widgets/loader";
import UserContext from "../../features/context/user/user";
import Header from "../newHeader";
import BuildPagination from "../../widgets/pagination";

function ProgramList() {
  const [allPrograms, setAllPrograms] = useState([]);
  
  
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });

  const newPageRequest = (pageRequest: number) => {
    setFilterUpdate({ ...filterUpdate, pageNumber: pageRequest });
  };

  const totalPages  = Math.ceil(allPrograms.length / 8)
  const currentPosts = allPrograms.slice( filterUpdate.pageNumber * 8, filterUpdate.pageNumber * 8 + 8 );
  

  // ------------------login page--------------

  const redirectUri = config.REDIRECT_URI;
  const oAuthUrl = `${config.OAUTH2_URL}/authorize?response_type=code&client_id=moodle&redirect_uri=${redirectUri}&scope=openid`;

  const userCtx = useContext(UserContext);
  const isLoggedIn = userCtx.isLoggedIn;




  useEffect(() => {
    axios
      .get(
        `${config.JAVA_API_URL}/public/programs?pageNumber=${0}&pageSize=${filterUpdate.pageSize}`
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

  const loaderStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  if(allPrograms && allPrograms?.length === 0) {
    return (
      <Container style={loaderStyle}>
        <NewLoader />
        <br />
      </Container>
    );
  }
  
  return (
    <>
   <div className="programcataloguepage">
   <div className="landing-wrapper programlist-wrapper">
   <div className={`landing-header h-auto ${isLoggedIn ? 'p-0' : ''}`}>
        {isLoggedIn ? (
<div className="bg-white">
<Header />
</div>
) : (
  <div className="d-flex justify-content-between align-items-center">
    <div className="logo-wrapper">
      <Link to="/">
        <img src={logo} alt="logo" className="img img-fluid" />
      </Link>
      <div className="login-btn programheader-login">
        <a href={oAuthUrl}>
          <Button variant="btn-lg rounded-pill px-4">Login</Button>
        </a>
        <Link to="/signupnew">
          <Button variant="btn-lg rounded-pill px-4 m-3 signup">Sign up</Button>
        </Link>
      </div>
    </div>
  </div>
)}
         <div className={`${isLoggedIn ? 'my-4 px-5' : 'mt-5'}`}>
         <PageTitle pageTitle={`Programs`} gobacklink="/" />
         </div>
        </div>
        <div className="landing-courses program-catalogue">
            <div className="courseswrapper programlist">
              <Row>
                {/* Filters Section */}
                <Col md={3}>
                  <div className="programlist-filters">
                    <h4>List By Filters</h4>
                    <hr />
                    {/* Institute Filter */}
                    <Form.Group controlId="formGridInstitute" className="mb-3">
                      <Form.Label>Institute</Form.Label>
                      <Form.Control as="select" defaultValue="Choose...">
                        <option>Choose1...</option>
                        <option>Choose2...</option>
                        <option>Choose3...</option>
                      </Form.Control>
                    </Form.Group>

                    {/* Program Type Filter */}
                    <Form.Group className="mb-3">
                      <Form.Label>Program Type</Form.Label>
                      <Form.Check type="checkbox" label="Certificate & Diploma" />
                      <Form.Check type="checkbox" label="Under Graduate" />
                      <Form.Check type="checkbox" label="Post Graduate" />
                      <Form.Check type="checkbox" label="Ph.D." />
                    </Form.Group>

                    {/* Department Filter */}
                    <Form.Group className="mb-3">
                      <Form.Label>Department</Form.Label>
                      <Form.Check type="checkbox" label="Management" />
                      <Form.Check type="checkbox" label="Engineering" />
                      <Form.Check type="checkbox" label="Education" />
                    </Form.Group>

                    {/* Discipline Filter */}
                    <Form.Group controlId="formGridDiscipline" className="mb-3">
                      <Form.Label>Discipline</Form.Label>
                      <Form.Control as="select" defaultValue="Computer Application">
                      </Form.Control>
                    </Form.Group>

                    {/* Tags Filter */}
                    <Form.Group controlId="formGridTags" className="mb-3">
                      <Form.Label>Tags</Form.Label>
                      <Form.Control as="select" defaultValue="Computer Application">
                      </Form.Control>
                    </Form.Group>

                    {/* Clear All Filters Button */}
                    <Button variant="link" onClick={() => { /* Clear filter logic */ }}>
                      Clear All Filters
                    </Button>
                  </div>
                </Col>
                {/* Filters Section End*/}

                <Col md={9}>
                  <Row>
                    {currentPosts.map((program: any) => (
                      <Col key={program.id} xl={4} lg={4} sm={6}>
                        <div className="course-container mb-4">
                          <Link
                            key={program.id}
                            to={{ pathname: `/programsummary/${program.id}` }}
                          >
                            <div className="course-image">
                              <Image
                                src={
                                  program.files && program.files.length > 0
                                    ? program.files[0].url
                                    : ProgramDefaultImg
                                }
                                alt={program.name}
                                fluid
                                rounded
                              />
                              <div className="course-keypoints">
                                <div>
                                  <img src={ClockIcon} alt="duration" />
                                  <span>
                                    {program.durationValue} {program.durationUnit}
                                  </span>
                                </div>
                                <div>
                                  <img src={CardIcon} alt="program code" />
                                  <span>{program.programCode}</span>
                                </div>
                                <div>
                                  <img src={BuildingIcon} alt="department" />
                                  <span> {program.department.name}</span>
                                </div>
                                <div>
                                  <img src={CapIcon} alt="program type" />
                                  <span> {program.programType.name}</span>
                                </div>
                                <div>
                                  <img src={CalenderIcon} alt="batch year" />
                                  <span> {program.batchYear}</span>
                                </div>
                                <div>
                                  <img src={BookIcon} alt="study mode" />
                                  <span>{program.modeOfStudy}</span>
                                </div>
                              </div>
                            </div>
                            <div className="course-title">{program.name}</div>
                          </Link>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            </div>
        </div>

        </div>
        <BuildPagination
              totalpages={totalPages}
              getrequestedpage={newPageRequest}
              activepage={filterUpdate.pageNumber}
              service ="core"
            />

      <Footer />
      <div className="position-relative">
        <img src={bgLeft} className="left-cicle" alt="left-cicle" />
      </div>
      <div className="bottom-bg">
        <img src={BottomWave} alt="bottom wave" />
      </div>
   </div>
    </>
  );
}

export default ProgramList;
