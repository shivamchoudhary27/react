import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { makeGetDataRequest } from "../../../features/api_calls/getdata";
import { pagination } from "../../../utils/pagination";
import BuildPagination from "../../../widgets/pagination";
import Header from "../../newHeader";
import Footer from "../../newFooter";
import HeaderTabs from "../../headerTabs";
// import Sidebar from "../../sidebar";
import ProgramTable from "./programTable";
import AddProgramModal from "./modal";
import BreadcrumbComponent from "../../../widgets/breadcrumb";

const ProgramType = () => {
  const navigate = useNavigate();
  const dummyData = { items: [], pager: { totalElements: 0, totalPages: 0 } };
  const [modalShow, setModalShow] = useState(false);
  const [programTypeData, setProgramTypeData] = useState<any>(dummyData);
  const [programTypeObj, setProgramTypeObj] = useState({});
  const [refreshData, setRefreshData] = useState(true);
  const [refreshOnDelete, setRefreshOnDelete] = useState<boolean>(false);
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });

  useEffect(() => {
    if (refreshOnDelete === true)
      makeGetDataRequest("/program-types", filterUpdate, setProgramTypeData);
  }, [refreshOnDelete]);

  // get programs API call === >>>
  useEffect(() => {
    makeGetDataRequest("/program-types", filterUpdate, setProgramTypeData);
  }, [refreshData, filterUpdate]);

  const refreshToggle = () => {
    let newBool = refreshData === true ? false : true;
    setRefreshData(newBool);
  };

  const refreshOnDeleteToggle = (value: boolean) => {
    setRefreshOnDelete(value);
  };

  // get id, name from the department table === >>>
  const editHandlerById = ({
    id,
    name,
    description,
    batchYearRequired,
  }: any) => {
    console.log(batchYearRequired);
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
    setProgramTypeObj({
      id: 0,
      name: "",
      description: "",
      BatchYearRequired: false,
    });
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
    <div className="filter-wrapper">
      <div className="filter-form">
        <form>
          <div className="row g-3 align-items-center">
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                // onChange={(e) => setSearchValue(e.target.value)}
                // value={searchValue}
              />
            </div>
            <div className="col-auto">
              <Button variant="outline-secondary">Filter</Button>{" "}
              <Button
                variant="outline-secondary"
                // onClick={() => resetHandler()}
              >
                Reset
              </Button>
            </div>
          </div>
        </form>
      </div>
      <div className="mt-2">
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
    </div>
  );
  // <<< ==== END COMPONENTS ==== >>>

  return (
    <>
      <Header />
      <HeaderTabs />
      <BreadcrumbComponent
            routes={[
              { name: "Site Administration", path: "/siteadmin" },
              { name: "Manage Program", path: "/manageprogram" },
              { name: "Program Type", path: "" },
            ]}
          />
      <div className="contentarea-wrapper mt-5">
          <Container fluid>          
            {PROGRAM_TYPE_BUTTON}
            {ADDPROGRAM_MODAL_COMPONENT}
            {PROGRAM_TYPE_COMPONENT}
            <BuildPagination
              totalpages={programTypeData.pager.totalPages}
              activepage={filterUpdate.pageNumber}
              getrequestedpage={newPageRequest}
            />
          </Container>
        </div>
      <Footer />
    </>
  );
};

export default ProgramType;
