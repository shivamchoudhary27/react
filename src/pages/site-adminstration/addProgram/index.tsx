import { useEffect, useState } from "react";
import { getData as getProgramData } from "../../../adapters/microservices";
import Header from "../../header";
import Sidebar from "../../sidebar";
import { Container, Button } from "react-bootstrap";
import AddProgramForm from "./form";
import { useNavigate, useParams } from "react-router-dom";
import { initialValues, generateIinitialValues } from './utils';
import "./style.scss";

const AddProgram = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentProgram, setCurrentProgram] = useState<any>({data : {}, status: false, id: id});

  useEffect(() => {
    if (id > 0) {
      let programsEndPoint = "/programs";
      getProgramData(programsEndPoint).then((res : any) => {
        if (res.data !== "" && res.status === 200) {
          let programData = res.data.find((obj : any) => obj.id == id);          
          if (programData !== undefined) {
            let newSet = generateIinitialValues(programData);
            setCurrentProgram({ data : newSet, status : true, id : id })
          } else {
            setCurrentProgram({ data : initialValues, status : true, id : id })
          }
        }
      });
    }
  }, []);

  return (
    <>
      <Header pageHeading="" welcomeIcon={false} />
      <div className='main-content-container'>
      <Sidebar />
      <div className="content-area content-area-slider" id="contentareaslider">
      <Container fluid className="administration-wrapper">
          <div className="contents">
            <ProgramFormHeader navigate={navigate} />{" "}
            <hr />
            <div className="form-container-wrapper">
            { 
              currentProgram.status === true &&
              <AddProgramForm initialformvalues={currentProgram.data} programid={currentProgram.id}/>
            }
            </div>
          </div>
        </Container>
      </div>
      </div>
    </>
  );
};

export default AddProgram;

const ProgramFormHeader = ({ navigate }: any) => {
  return (
    <>
      <div className="site-heading">
        <h3>Add Program</h3>
      </div>
      <Button
        variant="outline-secondary"
        onClick={() => navigate("/manageprogram")}
      >
        Go back
      </Button>
    </>
  );
};
