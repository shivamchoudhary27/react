import { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getData as getProgramData } from "../../../adapters/microservices";
import Header from "../../header";
import Sidebar from "../../sidebar";
import ManageFilter from "./manageFilter";
import ManageTable from "./manageTable";

const ManageProgram = () => {
  const navigate = useNavigate();
  const [programData, setProgramData] = useState<any>([]);
  const [refreshData, setRefreshData] = useState(true);

  // get programs API call === >>>
  useEffect(() => {
    if(refreshData === true){
      const endPoint = "/programs";
      getProgramData(endPoint)
        .then((result : any) => {
          if (result.data !== "" && result.status === 200) {
            setProgramData(result.data);
          }
        })
        .catch((err : any) => {
          console.log(err);
        });
    }
  }, []);

   // handle refresh react table after SAVE data  === >>>
   const refreshDepartmentData = (status: boolean) => {
    setRefreshData(status);
  };

  return (
    <>
      <Header pageHeading="Manage Programs" welcomeIcon={false} />
      <div className='main-content-container'>
        <Sidebar />
        <div className="content-area content-area-slider" id="contentareaslider">
          <Container fluid className="administration-wrapper">        
            <div className="site-button-group">
              <Button
                variant="primary"
                onClick={() => navigate("/department")}
              >
                Department
              </Button>{" "}
              <Button
                variant="primary"
                onClick={() => navigate("/programtype")}
              >
                Program Type
              </Button>{" "}
              <Button variant="primary" onClick={() => navigate("/discipline")}>
                Disciplines
              </Button>
            </div>
            <hr />
            <ManageFilter />
            <ManageTable programData={programData} refreshDepartmentData={refreshDepartmentData}/>
          </Container>
        </div>
      </div>
    </>
  );
};

export default ManageProgram;
