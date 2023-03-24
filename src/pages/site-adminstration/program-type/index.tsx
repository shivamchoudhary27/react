import React, { useState, useEffect } from "react";
// import { getData as getProgramData } from "../../../adapters/microservices";
import { makeGetDataRequest } from "../../../features/api_calls/getdata";
import CustomPagination from "../../../widgets/pagination";
// import {getTotalPagesCount} from "../../../utils/administration";
import { Container, Button } from "react-bootstrap";
import Header from "../../header";
import Sidebar from "../../sidebar";
import ProgramTable from "./programTable";
import AddProgramModal from "./modal";
import { useNavigate } from "react-router-dom";

const ProgramType = () => {
  const navigate = useNavigate();
  const dummyData = {items: [], pager: {totalElements: 0, totalPages: 0}};
  const [modalShow, setModalShow] = useState(false);
  const [programTypeData, setProgramTypeData] = useState<any>(dummyData);
  const [programTypeObj, setProgramTypeObj] = useState({});
  const [refreshData, setRefreshData] = useState(true);
  const [refreshOnDelete, setRefreshOnDelete] = useState<boolean>(false);
  const [filterUpdate, setFilterUpdate] = useState<any>({pageNumber: 0, pageSize : 10});
  // const totalPages = getTotalPagesCount(15);

  useEffect(() => {
    if (refreshOnDelete === true) makeGetDataRequest('/program-types', filterUpdate, setProgramTypeData); 
  }, [refreshOnDelete]);

  // get programs API call === >>> 
  useEffect(() => {
    makeGetDataRequest('/program-types', filterUpdate, setProgramTypeData); 
  }, [refreshData, filterUpdate]);

  const refreshToggle = () => {
    let newBool = (refreshData === true) ? false : true;
    setRefreshData(newBool);
  };

  const refreshOnDeleteToggle = (value: boolean) => {
    setRefreshOnDelete(value);
  };

  // get id, name from the department table === >>>
  const editHandlerById = ({ id, name, description, batchYearRequired }: any) => {
    console.log(batchYearRequired)
    setProgramTypeObj({
      id: id,
      name: name,
      description: description,
      batchYearRequired: batchYearRequired,
    });
  };

  // handle modal hide & show functionality === >>>
  const toggleModalShow = (status: boolean) => {
    setModalShow(status);
  };

  // handle refresh react table after SAVE data  === >>>
  const refreshProgramData = (status: boolean) => {
    setRefreshData(status);
  };

  // handle to open Add Discipline modal === >>>
  const openAddProgramType = () => {
    toggleModalShow(true);
    setProgramTypeObj({ id: 0, name: "", description: "", BatchYearRequired: false });
    setRefreshData(false);
  };
  
  const newPageRequest = (pageRequest: number) => {
    setFilterUpdate({ ...filterUpdate, pageNumber: pageRequest });
  };

  // <<< ===== JSX CUSTOM COMPONENTS ===== >>>
  const ADDPROGRAM_MODAL_COMPONENT = (
    <AddProgramModal
      show={modalShow}
      onHide={() => toggleModalShow(false)}
      programtypeobj={programTypeObj}
      togglemodalshow={toggleModalShow}
      refreshprogramdata={refreshToggle}
    />
  );

  const PROGRAM_TYPE_COMPONENT = (
    <ProgramTable
      programTypeData={programTypeData.items}
      editHandlerById={editHandlerById}
      setModalShow={setModalShow}
      toggleModalShow={toggleModalShow}
      refreshProgramData={refreshToggle}
      refreshOnDelete={refreshOnDeleteToggle}
    />
  );

  const PROGRAM_TYPE_BUTTON = (
    <div>
      <Button variant="primary" onClick={openAddProgramType}>
        Add Program Type
      </Button>{" "}
      <Button
        variant="outline-secondary"
        onClick={() => navigate("/manageprogram")}
      >
        Go back
      </Button>
    </div>
  );
  // <<< ==== END COMPONENTS ==== >>>

  return (
    <>
      <Header pageHeading="Program Type" welcomeIcon={false} />
      <div className='main-content-container'>
        <Sidebar />
        <div className="content-area content-area-slider" id="contentareaslider">
          <Container fluid className="administration-wrapper">
            {PROGRAM_TYPE_BUTTON}
            {ADDPROGRAM_MODAL_COMPONENT}
            {PROGRAM_TYPE_COMPONENT}
            <CustomPagination
              totalpages={programTypeData.pager.totalPages}
              activepage={filterUpdate.pageNumber}
              getrequestedpage={newPageRequest}
            />
          </Container>
        </div>
      </div>      
    </>
  );
};

export default ProgramType;
