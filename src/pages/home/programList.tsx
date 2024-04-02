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
import { Button, Col, Container, Image, Row, Form } from "react-bootstrap";
import PageTitle from "../../widgets/pageTitle";
import ProgramDefaultImg from "../../assets/images/course-default.jpg";
import config from "../../utils/config";
import NewLoader from "../../widgets/loader";
import UserContext from "../../features/context/user/user";
import Header from "../newHeader";
import BuildPagination from "../../widgets/pagination";
import Filter from "./Filter";
import Errordiv from "../../widgets/alert/errordiv";
import { isMobile } from "react-device-detect";
import MobileFooter from "../newFooter/mobileFooter";
import MobileHeader from "../newHeader/mobileHeader";

function ProgramList() {

  const [allPrograms, setAllPrograms] = useState([]);

  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });

  const [dataFilter, setDataFilter] = useState<any>({
    departments: [],
    programTypes: [],
    disciplines: [],
    tags: [],
    Institutes: "",
  });

  const newPageRequest = (pageRequest: number) => {
    setFilterUpdate({ ...filterUpdate, pageNumber: pageRequest });
  };

  const totalPages = Math.ceil(allPrograms.length / 6);

  const currentPosts = allPrograms.slice(
    filterUpdate.pageNumber * 6,
    filterUpdate.pageNumber * 6 + 6
  );


  useEffect(() => {
    console.log(filterUpdate)
    if (allPrograms.length < 6 && allPrograms.length > 0) {
      setFilterUpdate(prevValue => ({
        ...prevValue,
        pageNumber: 0
      }));
    }
  }, [allPrograms.length]);

  const [apiStatus, setApiStatus] = useState(true)


  const redirectUri = config.REDIRECT_URI;
  const oAuthUrl = `${config.OAUTH2_URL}/authorize?response_type=code&client_id=moodle&redirect_uri=${redirectUri}&scope=openid`;
  const userCtx = useContext(UserContext);
  const isLoggedIn = userCtx.isLoggedIn;

  const handleDataFilterChange = (newDataFilter: any) => {
    setDataFilter(newDataFilter);
  };

  const setInstituteId = (id: number) => {
    setInstituteId(id);
  };

  // =================----------Style For loader--------------================
  const loaderStyle = {
    display: "flex",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
  };

  // ------------------"Comma-separated values for the hit API filter."--------------

  const filterprogram = dataFilter.programTypes.join(",");
  const filterdepartments = dataFilter.departments.join(",");
  const filterdisciplines = dataFilter.disciplines.join(",");
  const filtertags = dataFilter.tags.join(",");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (dataFilter.Institutes) {
      setApiStatus(true)
      axios
        .get(
          `${config.JAVA_API_URL}/public/programs?instituteid=${dataFilter.Institutes
          }&programTypeIds=${filterprogram}&departmentIds=${filterdepartments}&disciplineIds=${filterdisciplines}&tagsIds=${filtertags}&pageNumber=${0}&pageSize=${filterUpdate.pageSize
          }`
        )
        .then((result: any) => {
          if (result.data !== "" && result.status === 200) {
            setAllPrograms(result.data.items);
            setApiStatus(false)
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }, [filterUpdate, dataFilter]);

  function renderDesktopHeader() {
    return (<div className="d-flex justify-content-between align-items-center">
    <div className="logo-wrapper">
      <Link to="/">
        <img src={logo} alt="logo" className="img img-fluid" />
      </Link>
      <div className="login-btn programheader-login">
        <a href={oAuthUrl}>
          <Button variant="btn-lg rounded-pill px-4">Login</Button>
        </a>
        <Link to="/signupnew">
          <Button variant="btn-lg rounded-pill px-4 m-3 signup">
            Sign up
          </Button>
        </Link>
      </div>
    </div>
  </div>
    )
  }


  return (
    <>
      <div className="programcataloguepage">
        <div className="landing-wrapper programlist-wrapper">
          <div className={`landing-header h-auto ${isLoggedIn ? "p-0" : ""}`}>
            {isMobile ? ( isLoggedIn ? <MobileHeader/> : renderDesktopHeader()
            ) : (
              isLoggedIn ?  
              <div className="bg-white">
                <Header />
              </div> : renderDesktopHeader()
            )}
            <div className={`${isLoggedIn ? "my-md-4 px-md-5" : "mt-5"} programlist-title`}>
              <PageTitle pageTitle={`Programs`} gobacklink="/" />
            </div>
          </div>
          <div className="landing-courses program-catalogue">
            <div className="courseswrapper programlist">
              <Row>

                {/* ==================----------filter Component-----------=========== */}

                <Filter
                  allPrograms={allPrograms}
                  onDataFilterChange={handleDataFilterChange}
                  setInstituteId={setInstituteId}
                />

                <Col md={9}>


                  {apiStatus === true ? (

                    <Container style={loaderStyle}>
                      <NewLoader />
                      <br />
                    </Container>
                  ) : (
                  <>
                    {allPrograms && allPrograms?.length === 0 ? (
                      <>
                        <Errordiv
                          msg="No record found!"
                          cstate
                          className="mt-2"
                        />
                      </>
                    ) : (
                      // Condition when allPrograms is either undefined or has a length greater than 0
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
                    <img src={CalenderIcon} alt="batch year" />
                      <span> {program.batchYear}</span>
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
                    <img src={BookIcon} alt="study mode" />
                      <span>{program.modeOfStudy}</span>
                    </div>
                    <div>
                    <img src={CapIcon} alt="program type" />
                      <span> {program.programType.name}</span>
                    </div>
                    <div>
                    <img src={ClockIcon} alt="duration" />
                      <span> {program.durationValue}{" "} {program.durationUnit}</span>
                    </div>
                  </div>
                                </div>
                                <div className="course-title">{program.name}</div>
                              </Link>
                            </div>
                          </Col>
                        ))}
                      </Row>
                    )}
                  </>)}
                </Col>
              </Row>
            </div>
          </div>
        </div>
      <div className="programlist-pagination">
      <BuildPagination
          totalpages={totalPages}
          getrequestedpage={newPageRequest}
          activepage={filterUpdate.pageNumber}
          service="core"
        />
      </div>

          {isMobile ? (
          isLoggedIn ? <MobileFooter/> : <Footer/>
        ) : (
          isLoggedIn ? <Footer/> : <Footer/>
        )}
        {/* <div className="position-relative">
          <img src={bgLeft} className="left-cicle" alt="left-cicle" />
        </div> */}
        <div className="bottom-bg">
          <img src={BottomWave} alt="bottom wave" />
        </div>
      </div>
    </>
  );
}

export default ProgramList;








