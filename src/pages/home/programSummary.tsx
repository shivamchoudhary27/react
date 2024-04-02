import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { pagination } from "../../utils/pagination";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../assets/images/circlelogo-blue.svg";
import { Container, Col, Row, Image, Button } from "react-bootstrap";
import ProgramInstructors from "./preview/instructors";
import PageTitle from "../../widgets/pageTitle";
import RatingComp from "./preview/ratings/ratings";
import "../newHeader/style.scss";
import ProgramDefaultImg from "../../assets/images/course-default.jpg"
import Curriculum from "./preview/curriculum";
import config from "../../utils/config";
import Footer from "../newFooter";
import "../../pages/siteAdminstration/manageProgram/style.scss";
import { BackgroundWaveBottomLeft} from "../../widgets/backgroundElements";
import NewLoader from "../../widgets/loader";
import bgRight from '../../assets/images/background/bg-admin-right.svg';
import Header from "../newHeader";
import UserContext from "../../features/context/user/user";
import { isMobile } from "react-device-detect";
import MobileFooter from "../newFooter/mobileFooter";
import MobileHeader from "../newHeader/mobileHeader";

interface ICurrentProgram {
  data: [];
  status: boolean;
  id: string | undefined;
}

const ProgramSummary = () => {
  const { Programid } = useParams();
  const [instructors, setInstructors] = useState([]);
  const [currentProgram, setCurrentProgram] = useState<ICurrentProgram>({
    data: [],
    status: false,
    id: Programid,
  });
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });

  const redirectUri = config.REDIRECT_URI;
  const oAuthUrl = `${config.OAUTH2_URL}/authorize?response_type=code&client_id=moodle&redirect_uri=${redirectUri}&scope=openid`;

  const userCtx = useContext(UserContext);
  const isLoggedIn = userCtx.isLoggedIn;

  useEffect(() => {
    axios
      .get(
        `${config.JAVA_API_URL}/public/programs?pageNumber=${filterUpdate.pageNumber}&pageSize=${filterUpdate.pageSize}&Id=${Programid}`
      )
      .then((res: any) => {
        if (res.data !== "" && res.status === 200) {
          setCurrentProgram({
            data: res.data.items,
            status: true,
            id: Programid,
          });
          setInstructors(res.data.instructors);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  const previewMetafields = (metaData: Array<any>) => {
    return (
      <>
        {metaData.map((el: any, index: number) => (
          <div className="mt-5" key={index}>
            <h5>{el.title}</h5>
            <div dangerouslySetInnerHTML={{ __html: el.description }} />
          </div>
        ))}
      </>
    );
  };

  const previewTagfields = (metaData: Array<any>) => {
    return (
      <>
        <strong>Tags</strong>
        {metaData.map((el: any, index: number) => (
          <ul key={index}>
            <li>{el.name},</li>
          </ul>
        ))}
      </>
    );
  };

  const loaderStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  if (currentProgram?.data && currentProgram?.data.length === 0) {
    return (
      <Container style={loaderStyle}>
        <NewLoader />
        <br />
      </Container>
    );
  }


  function renderDesktopHeader() {
    return (
      <div className="d-flex justify-content-between align-items-center">
      <div className="logo-wrapper d-flex justify-content-between w-100 align-items-center p-md-4">
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
    )
  }


  return (
    <>
      <div className="landing-wrapper programlist-wrapper h-100">
        <div className="landing-header program-summary">


        {isMobile ? ( isLoggedIn ? <MobileHeader/> : renderDesktopHeader()
            ) : (
              isLoggedIn ?  
              <div className="bg-white">
                <Header />
              </div> : renderDesktopHeader()
            )}


        </div>
        <Container fluid> 
          <PageTitle pageTitle={``} gobacklink="/programlist" />
          {currentProgram?.data?.map((el: any) => (
            <div className="program-overview-container" key={el.id}>
              <Row>
                <Col md={3}>
                  <div className="text-center">
                    <Image
                      // src={el.files.length > 0 ? el.files[0].url : programImage}
                      src={
                        el.files && el.files.length > 0
                          ? el.files[0].url
                          : ProgramDefaultImg
                      }
                      alt={el.name}
                      fluid
                      rounded
                      className="program-summary-img"
                    />
                  </div>
                </Col>
                <Col md={9}>
                  <h5 className="program-title">
                    {el.name} <span></span>  {el.discipline.name}
                  </h5>

                  {/*------------========= description==========-------  */}

                  <div dangerouslySetInnerHTML={{ __html: el.description }} />

                  <div className="key-information">
                    <strong>Key Information</strong>
                    <ul className="bg-white">
                      <li>
                        Duration:{" "}
                        <strong>
                          {el.durationValue} {el.durationUnit}
                        </strong>
                      </li>
                      <li>
                        Program Code: <strong>{el.programCode}</strong>
                      </li>
                      <li>
                        Department: <strong>{el.department.name}</strong>
                      </li>
                      <li>
                        Program Type: <strong>{el.programType.name}</strong>
                      </li>
                      <li>
                        Batch Year: <strong>{el.batchYear}</strong>
                      </li>
                      <li>
                        Mode of Study: <strong>{el.modeOfStudy}</strong>
                      </li>
                      <li>
                        Lifetime Access:{" "}
                        <strong>{el.fullLifeTimeAccess ? "Yes" : "No"}</strong>
                      </li>
                      <li className="d-none">
                        Published:{" "}
                        <strong>{el.published ? "Yes" : "No"}</strong>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
              <div className="po-tab-container mb-3">
                <div
                  id="tabStep-indicator"
                  className="tabStep-indicator sticky-top"
                >
                  <a href="#po-objective" className="step">
                    Objective
                  </a>
                  <a href="#po-curriculum" className="step">
                    Curriculum
                  </a>
                  <a href="#po-instructor" className="step">
                    Instructor
                  </a>
                  <a href="#po-reviewrating" className="step">
                    Review and Rating
                  </a>
                </div>

                <div
                  data-bs-spy="scroll"
                  data-bs-target="#tabStep-indicator"
                  data-bs-offset="0"
                  tabIndex={0}
                ></div>

                <div className="po-section objective-step mt-5">
                  <h5 id="po-objective">Objective</h5>
                  <div dangerouslySetInnerHTML={{ __html: el.objective }} />
                  {el.metaFields.length > 0
                    ? previewMetafields(el.metaFields)
                    : ""}
                </div>
                {/* Curriculum component */}
                <Curriculum
                  programId={el.id}
                />

                <div className="po-section instructor-step mt-5">
                  <ProgramInstructors instructorsData={instructors} />
                </div>
                <div className="mb-5">
                  <RatingComp programid={Programid} />
                </div>
                {/* <div className="program-tags my-5 bg-white">
                    {el.tags.length > 0
                      ? previewTagfields(el.tags)
                      : ""}
                  </div> */}
              </div>
            </div>
          ))}
        </Container>

        {isMobile ? (
          isLoggedIn ? <MobileFooter /> : <Footer />
        ) : (
          isLoggedIn ? <Footer /> : <Footer />
        )}

        <div className="pg-summarybg">
          <div>
            <img src={bgRight} className="bgcourse-right" alt="bg-right" />
          </div>
          <BackgroundWaveBottomLeft />
        </div>
      </div>
    </>
  );
};

export default ProgramSummary;
