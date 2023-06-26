import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { getData as getProgramData } from "../../../adapters/microservices";
import Header from "../../newHeader";
import Footer from "../../newFooter";
import HeaderTabs from "../../headerTabs";
import BreadcrumbComponent from "../../../widgets/breadcrumb";
import PageTitle from "../../../widgets/pageTitle";
import { Button, Container, Row, Col } from "react-bootstrap";

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

  console.log(currentProgram)

  const previewMetafields = (metaData : Array<any>) => {
    return (
      <ul>
        {metaData.map((el: any, index: number) => (
          <li className="mb-3">
            <div>
              <strong>Title</strong> : {el.title}
            </div>
           <strong>Description</strong> : <div dangerouslySetInnerHTML={{ __html: el.description }}/>
          </li>
        ))}
      </ul>
    )
  }

  const previewTagfields = (metaData : Array<any>) => {
    return (
      <ul>
        {metaData.map((el: any, index: number) => (
          <li className="mb-3" key={index}>
             {el.name},
          </li>
        ))}
      </ul>
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
          <PageTitle pageTitle={`Program Preview`} gobacklink="/manageprogram" />
          <div>
            {currentProgram.data.map((el : any) => (
                <div key={el.id}>
                    <ul>
                     <li key={Math.random()}><strong>Name</strong> : {el.name} </li>
                     <li key={Math.random()}><strong>Discipline</strong> : {el.discipline.name} </li>
                     <li key={Math.random()}><strong>Description</strong> : <div dangerouslySetInnerHTML={{ __html: el.description }}/> </li>
                     <li key={Math.random()}><strong>Duration</strong> : {el.durationValue} </li>
                     <li key={Math.random()}><strong>Duration Unit</strong> : {el.durationUnit} </li>
                     <li key={Math.random()}><strong>Program Code</strong> : {el.programCode} </li>
                     <li key={Math.random()}><strong>Department</strong> : {el.department.name} </li>                     
                     <li key={Math.random()}><strong>Program Type</strong> : {el.programType.name} </li>
                     <li key={Math.random()}><strong>Batch Year</strong> : {el.batchYear} </li>
                     <li key={Math.random()}><strong>Mode of Study</strong> : {el.modeOfStudy} </li>                     
                     <li key={Math.random()}><strong>Full lifetime access</strong> : {el.fullLifeTimeAccess ? 'Yes' : 'No'} </li>
                     <li key={Math.random()}><strong>Published</strong> : {el.published ? 'Yes' : 'No'} </li>
                     <li key={Math.random()}><strong>Objective</strong> : <div dangerouslySetInnerHTML={{ __html: el.objective }}/> </li>                     
                     <li key={Math.random()}><strong>Metafields</strong> : 
                        {(el.metaFields.length > 0) ? previewMetafields(el.metaFields) : '--'} 
                     </li>
                     <li key={Math.random()}><strong>Tags</strong> : 
                        {(el.tags.length > 0) ? previewTagfields(el.tags) : '--'} 
                     </li>
                    </ul>
                </div>
            ))}
          </div>
        </Container>      
      </div>
      <Footer />   
    </>
  );
};

export default Preview;
