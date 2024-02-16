import axios from "axios";
import { useEffect, useState } from "react";
import { pagination } from "../../utils/pagination";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../assets/images/circlelogo-blue.svg";
import { Container, Col, Row, Image } from "react-bootstrap";
import ProgramInstructors from "./preview/instructors";
import PageTitle from "../../widgets/pageTitle";
import programImage from "../../assets/images/course-default.jpg";
import RatingComp from "./preview/ratings/ratings";
// import Footer from "../newFooter";
import "../newHeader/style.scss";
import ProgramDefaultImg from "../../assets/images/course-default.jpg"
import Curriculum from "./preview/curriculum";
import config from "../../utils/config";
import Footer from "../newFooter";
import "../../pages/siteAdminstration/manageProgram/style.scss";
// import RatingComp from "./ratings/ratings";

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

  return (
    <>
      <div className="landing-wrapper programlist-wrapper h-100">
        <div className="landing-header program-summary">
          <div className="d-flex justify-content-between align-items-center">
            <div className="logo-wrapper">
              <Link to="/">
                <img src={logo} alt="logo" className="img img-fluid" />
              </Link>
            </div>
          </div>
        </div>
        <Container fluid>
          <PageTitle pageTitle={``} gobacklink="/programlist" />
          {currentProgram?.data?.map((el: any) => (
            <div className="program-overview-container" key={el.id}>
              <Row>
                <Col md={3}>
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
                </Col>
                <Col md={9}>
                  <h5 className="program-title">
                    {el.name} <span></span>  {el.discipline.name}
                  </h5>
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
                        Department: <strong>{el.departmentName}</strong>
                      </li>
                      <li>
                        Program Type: <strong>{el.programTypeName}</strong>
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
                <RatingComp programid={Programid} />
                <div className="program-tags mt-5 bg-white">
                    {el.tags.length > 0
                      ? previewTagfields(el.tags)
                      : ""}
                  </div>
              </div>
            </div>
          ))}
        </Container>
      <Footer/>
      </div>
    </>
  );
};

export default ProgramSummary;
