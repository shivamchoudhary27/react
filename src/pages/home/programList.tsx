import { useEffect, useState } from "react";
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
import Header from "../newHeader";
import BottomWave from "../../assets/images/background/bg-bottom.svg";
import bgLeft from "../../assets/images/background/bg-admin-left.svg";
import { Col, Container, Image, Row } from "react-bootstrap";
import PageTitle from "../../widgets/pageTitle";
// import ProgramDefaultImg from "../../assets/images/course-default.jpg"
import ProgramDefaultImg from "../../assets/images/course-default.jpg"
import config from "../../utils/config";

function ProgramList() {
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });
  const [allPrograms, setAllPrograms] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${config.JAVA_API_URL}/public/programs?pageNumber=${filterUpdate.pageNumber}&pageSize=${filterUpdate.pageSize}`
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
      <div className="landing-wrapper programlist-wrapper">
        <div className="landing-header">
          <div className="d-flex justify-content-between align-items-center">
            <div className="logo-wrapper">
              <Link to="/">
                <img src={logo} alt="logo" className="img img-fluid" />
              </Link>
            </div>
          </div>
          <PageTitle pageTitle={``} gobacklink="/" />
        </div>

        <div className="landing-courses program-catalogue">
          <div className="courseswrapper programlist">
            <Row>
              {allPrograms.map((program: any) => (
                  <Col key={program.id} xl={3} lg={4} sm={6}>
                <div className="course-container">
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
                          <span> {program.departmentName}</span>
                        </div>
                        <div>
                          <img src={CapIcon} alt="program type" />
                          <span> {program.programTypeName}</span>
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
          </div>
        </div>
      </div>
      <Footer />
      <div className="position-relative">
        <img src={bgLeft} className="left-cicle" alt="left-cicle" />
      </div>
      <div className="bottom-bg">
        <img src={BottomWave} alt="bottom wave" />
      </div>
    </>
  );
}

export default ProgramList;
