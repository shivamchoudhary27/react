import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getData as getProgramData } from "../../../adapters/microservices";
import Header from "../../header";
import Sidebar from "../../sidebar";
import { Button, Container } from "react-bootstrap";

const Preview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentProgram, setCurrentProgram] = useState<any>({data : [], status: false, id: id});

  useEffect(() => {
    if (id !== undefined &&  id > 0) {
      let programsEndPoint = "/programs";
      const apiParams = {
        pageNumber : 0,
        pageSize : 1,
        id
      }
      getProgramData(programsEndPoint, apiParams).then((res : any) => {
        if (res.data !== "" && res.status === 200) {
          setCurrentProgram({ data : res.data, status : true, id : id })
        }
      });
    } else {
      window.alert('Program info not found');
      navigate('/manageprogram');
    }
  }, []);

  return (
    <>
      <Header pageHeading="Program Preview" welcomeIcon={false} />
      <div className='main-content-container'>
        <Sidebar />
        <div className="content-area content-area-slider" id="contentareaslider">
        <Container fluid className="administration-wrapper">
          <div className="site-heading">
            {/* <h3>Program Preview</h3>{" "} */}
            <Button variant="outline-secondary" onClick={()=> navigate('/manageprogram')}>Go back</Button>
          </div>
          <hr />
          <div>
            {currentProgram.data.map((el : any) => (
                <div key={el.id}>
                    <ul>
                     <li key={Math.random()}><strong>Name</strong> : {el.name} </li>
                     <li key={Math.random()}><strong>Program code</strong> : {el.programCode} </li>
                     <li key={Math.random()}><strong>Department</strong> : {el.department.name} </li>
                     <li key={Math.random()}><strong>Discipline</strong> : {el.discipline.name} </li>
                     <li key={Math.random()}><strong>Programtype</strong> : {el.programType.name} </li>
                     <li key={Math.random()}><strong>Batch year</strong> : {el.batchYear} </li>
                     <li key={Math.random()}><strong>Mode of study</strong> : {el.modeOfStudy} </li>
                     <li key={Math.random()}><strong>Description</strong> : <div dangerouslySetInnerHTML={{ __html: el.description }}/> </li>
                     <li key={Math.random()}><strong>Learning outcome</strong> : <div dangerouslySetInnerHTML={{ __html: el.objective }}/> </li>
                     <li key={Math.random()}><strong>Duration</strong> : {el.duration} </li>
                     <li key={Math.random()}><strong>full lifetime access</strong> : {el.fullLifeTimeAccess ? 'Yes' : 'No'} </li>
                     <li key={Math.random()}><strong>Published</strong> : {el.published ? 'Yes' : 'No'} </li>
                    </ul>
                </div>
            ))}
          </div>
        </Container>
        </div>        
      </div>      
    </>
  );
};

export default Preview;
