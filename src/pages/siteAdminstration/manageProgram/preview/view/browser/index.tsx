import React from "react";
import Header from "../../../../../newHeader";
import Footer from "../../../../../newFooter";
import HeaderTabs from "../../../../../headerTabs";
import PageTitle from "../../../../../../widgets/pageTitle";
import BreadcrumbComponent from "../../../../../../widgets/breadcrumb";
import { Image, Container, Row, Col } from "react-bootstrap";
import programImage from "../../../../../../assets/images/course-default.jpg";

import RatingComp from "../../ratings/ratings";
import Curriculum from "../../curriculum";
import ProgramInstructors from "../../instructors";

type Props = {
  commonProps: {
    currentProgram: any;
    instructorsData: any;
    previewTagfields: any;
    previewMetafields: any;
  };
};

const Browser = (props: Props) => {
  return (
    <React.Fragment>
      <Header />
      <HeaderTabs activeTab="siteadmin" />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "Manage Program", path: "/manageprogram" },
          { name: "Program Preview", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mb-wraper">
        <div className="contentarea-wrapper mt-4 mb-5">
          <Container fluid>
            <PageTitle pageTitle={``} gobacklink="/manageprogram" />
            {props.commonProps.currentProgram.data.map((el: any) => (
              <div className="program-overview-container" key={el.id}>
                <Row>
                  <Col md={3}>
                    <Image
                      src={el.files.length > 0 ? el.files[0].url : programImage}
                      alt={el.name}
                      fluid
                      rounded
                      className="program-summary-img"
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
                    <div className="po-section objective-step mt-5">
                      <h5 id="po-objective">Objective</h5>
                      <div dangerouslySetInnerHTML={{ __html: el.objective }} />
                      {el.metaFields.length > 0
                        ? props.commonProps.previewMetafields(el.metaFields)
                        : ""}
                    </div>
                    {/* Curriculum component */}
                    <Curriculum
                      programId={props.commonProps.currentProgram.id}
                    />

                    <div className="po-section instructor-step mt-5">
                      <ProgramInstructors
                        instructorsData={props.commonProps.instructorsData}
                      />
                    </div>
                  </div>
                  <RatingComp programid={props.commonProps.currentProgram.id} />
                  <div className="program-tags mt-5">
                    {el.tags.length > 0
                      ? props.commonProps.previewTagfields(el.tags)
                      : ""}
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

export default Browser;
