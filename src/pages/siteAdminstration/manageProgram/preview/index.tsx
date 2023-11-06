import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getData as getProgramData } from "../../../../adapters/microservices";
import Header from "../../../newHeader";
import Footer from "../../../newFooter";
import HeaderTabs from "../../../headerTabs";
import BreadcrumbComponent from "../../../../widgets/breadcrumb";
import PageTitle from "../../../../widgets/pageTitle";
import { Image, Container, Row, Col } from "react-bootstrap";
import programImage from "../../../../assets/images/course-default.jpg";
import RatingComp from "./ratings/ratings";
import Curriculum from "./curriculum";
import ProgramInstructors from "./instructors";

interface ICurrentProgram {
  data: [];
  status: boolean;
  id: string | undefined;
}

interface IApiParams {
  pageNumber: number;
  pageSize: number;
  Id: string | undefined;
}

const Preview = () => {
  const { id } = useParams();
  const [currentProgram, setCurrentProgram] = useState<ICurrentProgram>({
    data: [],
    status: false,
    id: id,
  });
  const [instructors, setInstructors] = useState([]);
  const instituteId = useSelector((state: any) => state.globalFilters.currentInstitute);

  useEffect(() => {
    if (
      instituteId !== undefined && instituteId > 0 && id !== undefined && id > 0
    ) {
      let programsEndPoint: string = `${instituteId}/programs`;
      const apiParams: IApiParams = {
        pageNumber: 0,
        pageSize: 5,
        Id: id,
      };
      getProgramData(programsEndPoint, apiParams).then((res: any) => {
        if (res.data !== "" && res.status === 200) {
          setCurrentProgram({ data: res.data.items, status: true, id: id });
          setInstructors(res.data.instructors);
        }
      });
    }
  }, [instituteId]);
  
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
      <Header />
      <HeaderTabs activeTab="siteadmin" />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "Manage Program", path: "/manageprogram" },
          { name: "Program Preview", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-4 mb-5">
        <Container fluid>
          <PageTitle pageTitle={``} gobacklink="/manageprogram" />
          {currentProgram.data.map((el: any) => (
            <div className="program-overview-container" key={el.id}>
              <Row>
                <Col md={3}>
                  <Image 
                    src={el.files.length > 0 ? el.files[0].url : programImage} 
                    alt={el.name} 
                    fluid rounded 
                  />
                </Col>
                <Col md={9}>
                  <h5 className="program-title">
                    {el.name} <span></span> {el.discipline.name}
                  </h5>
                  <div dangerouslySetInnerHTML={{ __html: el.description }} />
                  <div className="key-information">
                    <strong>Key Information</strong>
                    <ul>
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
              <div className="po-tab-container">
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
                >
                  <div className="po-section objective-step mt-5">
                    <h5 id="po-objective">Objective</h5>
                    <div dangerouslySetInnerHTML={{ __html: el.objective }} />
                    {el.metaFields.length > 0
                      ? previewMetafields(el.metaFields)
                      : ""}
                  </div>
                  {/* Curriculum component */}
                  <Curriculum programId={id}/>

                  <div className="po-section instructor-step mt-5">
                    <ProgramInstructors instructorsData={instructors}/>
                  </div>
                </div>
                <RatingComp programid={id} />
                <div className="program-tags mt-5">
                  {el.tags.length > 0 ? previewTagfields(el.tags) : ""}
                </div>
              </div>
            </div>
          ))}
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Preview;
