import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
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
import PageTitle from "../../../widgets/pageTitle";
import Errordiv from "../../../widgets/alert/errordiv";

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
      <form>
        <Row className="align-items-center gx-3">
          <Col className="col-auto">
            <input type="text" className="form-control" placeholder="Name" />
          </Col>
          <Col className="col-auto">
            <Button variant="primary" className="me-2">
              Filter
            </Button>{" "}
            <Button variant="outline-secondary">Reset</Button>
          </Col>
        </Row>
      </form>
      <Button variant="primary" onClick={openAddProgramType}>
        Add Program Type
      </Button>
    </div>
  );
  // <<< ==== END COMPONENTS ==== >>>

  return (
    <>
      <Header />
      <HeaderTabs activeTab="siteadmin" />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "Manage Program", path: "/manageprogram" },
          { name: "Program Type", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3">
        <Container fluid>
          <PageTitle pageTitle="Program Type" gobacklink="/manageprogram" />
          {PROGRAM_TYPE_BUTTON}
          {ADDPROGRAM_MODAL_COMPONENT}
          {programTypeData.items !== "" ? (
            PROGRAM_TYPE_COMPONENT
          ) : (
            <Errordiv msg="No record found!" cstate />
          )}
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
