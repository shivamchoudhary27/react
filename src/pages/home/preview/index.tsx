import React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { pagination } from "../../../utils/pagination";
import { Col, Image, Container, Row } from "react-bootstrap";
import PageTitle from "../../../widgets/pageTitle";
import Footer from "../../newFooter";
import Header from "../../newHeader";
import programImage from "../../../assets/images/course-default.jpg";
import ProgramInstructors from "./instructors";
import RatingComp from "./ratings/ratings";
import Curriculum from "./curriculum";

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
    id: Programid
  });
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });

  useEffect(() => {
    axios.get(`${config.JAVA_API_URL}/public/programs?pageNumber=${filterUpdate.pageNumber}&pageSize=${filterUpdate.pageSize}&Id=${Programid}`).then((res: any) => {
      if(res.data !== "" && res.status === 200){
        setCurrentProgram({ data: res.data.items, status: true, id: Programid });
        setInstructors(res.data.instructors);
      }
    }).catch((err: any) => {
      console.log(err);
    });
  }, [])

  return (
    <React.Fragment>
      {/* <Header /> */}
      <div className="contentarea-wrapper mb-wraper">
        <div className="contentarea-wrapper mt-4 mb-5">
          <Container fluid>
            <PageTitle pageTitle={``} gobacklink="/manageprogram" />
            {currentProgram?.data?.map((el: any) => (
              <div className="program-overview-container" key={el.id}>
                <Row>
                  <Col md={3}>
                    <Image
                      src={el.files.length > 0 ? el.files[0].url : programImage}
                      alt={el.name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={9}>
                    <h5 className="program-title">
                      {el.name} <span></span> {el.disciplineName}
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
                          <strong>
                            {el.fullLifeTimeAccess ? "Yes" : "No"}
                          </strong>
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
                  </div> 

                   {/* Curriculum component */}
                   <Curriculum
                      programId={el.id}
                    />

                  <div className="po-section instructor-step mt-5">
                    <ProgramInstructors
                      instructorsData={instructors}
                    />
                    </div>
                    <RatingComp programid={Programid} />
                  <div className="program-tags mt-5">
                    {/* {el.tags.length > 0
                      ? previewTagfields(el.tags)
                      : ""} */}
                  </div>
                </div>
              </div>
            ))}
          </Container>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};
export default ProgramSummary;
