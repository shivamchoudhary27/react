import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { getData as getProgramData } from "../../../adapters/microservices";
import Header from "../../newHeader";
import Footer from "../../newFooter";
import HeaderTabs from "../../headerTabs";
import BreadcrumbComponent from "../../../widgets/breadcrumb";
import PageTitle from "../../../widgets/pageTitle";
import { Table, Button, Image, Container, Row, Col } from "react-bootstrap";
import programImage from "../../../assets/images/course-default.jpg";
import userPixDefault from "../../../assets/images/user-pix.svg";
import positionIcon from "../../../assets/images/icons/degree.svg";
import campusIcon from "../../../assets/images/icons/campus.svg";

const Preview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation().search;
  const [currentProgram, setCurrentProgram] = useState<any>({data : [], status: false, id: id});
  const [instituteId, setInstituteId] = useState<number | string | null>(0);

  useEffect(() => {
    const urlParams = new URLSearchParams(location);
    let instituteParam = parseInt(urlParams.get("institute"))
    setInstituteId(instituteParam);
  }, [location]);

  useEffect(() => {
    if (instituteId !== undefined && instituteId > 0 && id !== undefined &&  id > 0) {
      let programsEndPoint = `${instituteId}/programs`;
      const apiParams = {
        pageNumber : 0,
        pageSize : 5,
        Id: id
      }
      getProgramData(programsEndPoint, apiParams).then((res : any) => {
        if (res.data !== "" && res.status === 200) {
          setCurrentProgram({ data : res.data.items, status : true, id : id })
        }
      });
    }
  }, [instituteId]);

  const previewMetafields = (metaData : Array<any>) => {
    return (
      <>
        {metaData.map((el: any, index: number) => (
          <div className="mt-5">
            <h5>{el.title}</h5>
            <div dangerouslySetInnerHTML={{ __html: el.description }} />
          </div>
        ))}
      </>
    )
  }

  const previewTagfields = (metaData : Array<any>) => {
    return (
      <>
        <strong>Tags</strong>
        {metaData.map((el: any, index: number) => (          
          <ul key={index}>
            <li>
              {el.name},
            </li>
          </ul>
        ))}
      </>
    )
  }

  return (
    <>
      <Header />
      <HeaderTabs activeTab="siteadmin"/>
      <BreadcrumbComponent
            routes={[
              { name: "Site Administration", path: "/siteadmin" },
              { name: "Manage Program", path: "/manageprogram" },
              { name: "Program Preview", path: "" },       
            ]}
          />
      <div className="contentarea-wrapper mt-4">
        <Container fluid>
          <PageTitle pageTitle={``} gobacklink="/manageprogram" />          
            {currentProgram.data.map((el : any) => (
              <div className="program-overview-container" key={el.id}>
                <Row>
                  <Col md={3}>
                    <Image src={programImage} alt={el.name} fluid rounded />
                  </Col>
                  <Col md={9}>
                    <h5 className="program-title">{el.name} <span></span> {el.discipline.name}</h5>
                    <div dangerouslySetInnerHTML={{ __html: el.description }} />
                    <div className="key-information">
                      <strong>Key Information</strong>
                      <ul>
                        <li>Duration: <strong>{el.durationValue} {el.durationUnit}</strong></li>
                        <li>Program Code: <strong>{el.programCode}</strong></li>
                        <li>Department: <strong>{el.department.name}</strong></li>                     
                        <li>Program Type: <strong>{el.programType.name}</strong></li>
                        <li>Batch Year: <strong>{el.batchYear}</strong></li>
                        <li>Mode of Study: <strong>{el.modeOfStudy}</strong></li>                     
                        <li>Lifetime Access: <strong>{el.fullLifeTimeAccess ? 'Yes' : 'No'}</strong></li>
                        <li className="d-none">Published: <strong>{el.published ? 'Yes' : 'No'}</strong></li>
                      </ul>
                    </div>
                  </Col>
                </Row>
                <div className="po-tab-container">
                  <div id="tabStep-indicator" className="tabStep-indicator sticky-top">
                    <a href="#po-objective" className="step">Objective</a>
                    <a href="#po-curriculum" className="step">Curriculum</a>
                    <a href="#po-instructor" className="step">Instructor</a>
                    <a href="#po-studentfeedback" className="step">Student Feedback</a>
                  </div>
                  <div data-bs-spy="scroll" data-bs-target="#tabStep-indicator" data-bs-offset="0" tabindex="0">                  
                    <div className="po-section objective-step mt-5">
                      <h5 id="po-objective">Objective</h5>
                      <div dangerouslySetInnerHTML={{ __html: el.objective }} />
                      {(el.metaFields.length > 0) ? previewMetafields(el.metaFields) : ''}
                    </div>
                    <div className="po-section curriculum-step mt-5">
                      <h5 id="po-curriculum">
                        Curriculum
                        <select className="form-select">
                          <option>Semester 1</option>
                          <option>Semester 2</option>
                        </select>
                      </h5>
                      <div className="table-responsive">
                        <Table borderless striped>
                          <thead>
                            <tr>
                              <th>Semester 1</th>
                              <th>Semester 2</th>
                            </tr>                          
                          </thead>
                          <tbody>
                            <tr>
                              <td>Course 1</td>
                              <td>Course 3</td>
                            </tr>                          
                            <tr>
                              <td>Course 2</td>
                              <td>Course 4</td>
                            </tr>                          
                          </tbody>
                        </Table>
                      </div>
                    </div>
                    <div className="po-section instructor-step mt-5">
                      <h5 id="po-instructor">Instructor</h5>
                      <Row>
                        <Col md={3} className="instructor-list">
                          <Image src={userPixDefault} alt="Full Name" roundedCircle />
                          <div className="ms-3">
                            <h6>Dr. Aarti Santosh Nayak</h6>
                            <p><Image src={positionIcon} alt="Position" /> Assistant Professor</p>
                            <p><Image src={campusIcon} alt="Campus" className="campus-icon" /> Lorem ipsum dolor</p>
                          </div>
                        </Col>
                        <Col md={3} className="instructor-list">
                          <Image src={userPixDefault} alt="Full Name" roundedCircle />
                          <div className="ms-3">
                            <h6>Dr. Abha Ashish Wankhede</h6>
                            <p><Image src={positionIcon} alt="Position" /> Assistant Professor</p>
                            <p><Image src={campusIcon} alt="Campus" className="campus-icon" /> Lorem ipsum dolor</p>
                          </div>
                        </Col>
                        <Col md={3} className="instructor-list">
                          <Image src={userPixDefault} alt="Full Name" roundedCircle />
                          <div className="ms-3">
                            <h6>Mr. Abhijeet Uday Karmarkar</h6>
                            <p><Image src={positionIcon} alt="Position" /> Assistant Professor</p>
                            <p><Image src={campusIcon} alt="Campus" className="campus-icon" /> Lorem ipsum dolor</p>
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div className="po-section studentfeedback-step mt-5">
                      <h5 id="po-studentfeedback">Student Feedback</h5>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum fuga
        inventore unde deleniti nostrum nihil ducimus quod reprehenderit?
        Laboriosam aperiam vel fugit natus nam libero quos facilis eligendi harum,
        ab beatae voluptate accusamus provident quam explicabo, fugiat officiis
        tenetur sint. Ad, itaque! Culpa perferendis blanditiis sint vel, cumque
        consectetur commodi!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum fuga
        inventore unde deleniti nostrum nihil ducimus quod reprehenderit?</p>
                    </div>
                  </div>
                  <div className="program-tags mt-5">
                    {(el.tags.length > 0) ? previewTagfields(el.tags) : ''}
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
