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
  const [refreshData, setRefreshData] = useState<boolean>(true);
  const [filterUpdate, setFilterUpdate] = useState<any>({departmentId: '', name: '', pageNumber: 0, pageSize : 20});

  // get programs API call === >>>
  useEffect(() => {
    // if (refreshData === true) {
      reloadProgramData();
    // }
  }, [refreshData, filterUpdate]);

  const reloadProgramData = () => {
    const endPoint = "/programs";
    // const apiParams = filterUpdate;
    getProgramData(endPoint, filterUpdate)
      .then((result : any) => {
        if (result.data !== "" && result.status === 200) {
          setProgramData(result.data);
        }
      })
      .catch((err : any) => {
        console.log(err);
      });
  }

  const refreshToggle = () => {
    setRefreshData(!refreshData);
  };

  // to update filters values in the main state filterUpdate
  const updateDepartmentFilter = (departmentId : string) => {
    setFilterUpdate({...filterUpdate, departmentId: departmentId})
  }

  const updateInputFilters = (inputvalues : any) => {
    setFilterUpdate({...filterUpdate, name: inputvalues.name})
  }

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
            <ManageFilter updatedepartment={updateDepartmentFilter} updateinputfilters={updateInputFilters}/>
            <ManageTable programData={programData} refreshDepartmentData={refreshToggle}/>
          </Container>
        </div>
      </div>
    </>
  );
};

export default ManageProgram;
