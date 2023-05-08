import { useEffect, useState } from "react";
import { getData as getProgramData } from "../../../adapters/microservices";
// import Header from "../../header";
// import Sidebar from "../../sidebar";
import Header from "../../newHeader";
import Footer from "../../newFooter";
import HeaderTabs from "../../headerTabs";
import { Container, Button } from "react-bootstrap";
import AddProgramForm from "./form";
import { useNavigate, useParams } from "react-router-dom";
import { initialValues, generateIinitialValues } from "./utils";
import "./style.scss";

const AddProgram = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentProgram, setCurrentProgram] = useState<any>({
    data: {},
    status: false,
    id: id,
  });
  const pagetitle = id > 0 ? "Update program" : "Add program";

  useEffect(() => {
    if (id !== undefined && id > 0) {
      let filter = { Id: id, pageNumber: 0, pageSize: 1 };
      let programsEndPoint = "/programs";
      getProgramData(programsEndPoint, filter).then((res: any) => {
        if (res.data.items !== "" && res.status === 200) {
          let programData = res.data.items.find((obj: any) => obj.id == id);
          if (programData !== undefined) {
            let newSet = generateIinitialValues(programData);
            setCurrentProgram({ data: newSet, status: true, id: id });
          } else {
            setCurrentProgram({ data: initialValues, status: true, id: id });
          }
        }
      });
    } else {
      setCurrentProgram({ data: initialValues, status: true, id: id });
    }
  }, []);

  return (
    <>
      <Header />
      <HeaderTabs />
      <div className="contentarea-wrapper mt-3">
          <Container fluid className="administration-box">
            <div className="contents">
              <ProgramFormHeader navigate={navigate} /> <hr />
              <div className="form-container-wrapper">
                {currentProgram.status === true && (
                  <AddProgramForm
                    initialformvalues={currentProgram.data}
                    programid={currentProgram.id}
                  />
                )}
              </div>
            </div>
          </Container>
        </div>
      <Footer />
    </>
  );
};

export default AddProgram;

const ProgramFormHeader = ({ navigate }: any) => {
  return (
    <>
      <Button
        variant="outline-secondary"
        onClick={() => navigate("/manageprogram")}
      >
        Go back
      </Button>
    </>
  );
};
