import { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { makeGetDataRequest } from "../../../features/api_calls/getdata";
import CustomPagination from "../../../widgets/pagination";
// import {getTotalPagesCount} from "../../../utils/administration";
import Header from "../../header";
import Sidebar from "../../sidebar";
import ManageFilter from "./manageFilter";
import ManageTable from "./manageTable";

const ManageProgram = () => {
  const navigate = useNavigate();
  const dummyData = {items: [], pager: {totalElements: 0, totalPages: 0}}
  const [programData, setProgramData] = useState<any>(dummyData);
  const [refreshData, setRefreshData] = useState<boolean>(true);
  const [refreshOnDelete, setRefreshOnDelete] = useState<boolean>(false);
  const [filterUpdate, setFilterUpdate] = useState<any>({departmentId: '', name: '', pageNumber: 0, pageSize : 10});
  // const totalPages = getTotalPagesCount(15);

  // get programs API call === >>>
  useEffect(() => {
    makeGetDataRequest('/programs', filterUpdate, setProgramData); 
  }, [refreshData, filterUpdate]);

  useEffect(() => {
    if (refreshOnDelete === true) makeGetDataRequest('/programs', filterUpdate, setProgramData); 
  }, [refreshOnDelete]);

  const refreshToggle = () => {
    setRefreshData(!refreshData);
  };

  const refreshOnDeleteToggle = (value: boolean) => {
    setRefreshOnDelete(value);
  };

  // to update filters values in the main state filterUpdate
  const updateDepartmentFilter = (departmentId : string) => {
    setFilterUpdate({...filterUpdate, departmentId: departmentId, pageNumber: 0})
  }

  const updateInputFilters = (inputvalues : any) => {
    if (inputvalues.code !== '') {
      setFilterUpdate({...filterUpdate, name: inputvalues.name, programCode: inputvalues.code, pageNumber: 0})
    } else {
      let updatedState = {...filterUpdate, pageNumber: 0};
      updatedState.name = inputvalues.name;
      if (updatedState.programCode) delete updatedState.programCode;
      setFilterUpdate(updatedState);
    }
  }

  const newPageRequest = (pageRequest: number) => {
    setFilterUpdate({ ...filterUpdate, pageNumber: pageRequest });
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
            <ManageFilter updatedepartment={updateDepartmentFilter} updateinputfilters={updateInputFilters}/>
            <ManageTable
              programData={programData.items} 
              refreshDepartmentData={refreshToggle}
              refreshOnDelete={refreshOnDeleteToggle}
            />
            <CustomPagination
                totalpages={programData.pager.totalPages}
                activepage={filterUpdate.pageNumber}
                getrequestedpage={newPageRequest}
              />
          </Container>
        </div>
      </div>
    </>
  );
};

export default ManageProgram;
