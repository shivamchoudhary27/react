import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { makeGetDataRequest } from "../../../features/api_calls/getdata";
import { pagination } from "../../../utils/pagination";
import BuildPagination from "../../../widgets/pagination";
import Header from "../../newHeader";
import Footer from "../../newFooter";
import HeaderTabs from "../../headerTabs";
import ProgramTable from "./programTable";
import AddProgramModal from "./modal";
import BreadcrumbComponent from "../../../widgets/breadcrumb";
import PageTitle from "../../../widgets/pageTitle";
import Filters from "./filters";
import InstituteFilter from "../institute/instituteGlobalFilter";

const ProgramType = () => {
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
  const [apiStatus, setApiStatus] = useState("");
  const [currentInstitute, setCurrentInstitute] = useState<any>(0);

  const updateCurrentInstitute = (instituteId : number) => {
    setCurrentInstitute(instituteId);
  }

  // get programs API call === >>>
  useEffect(() => {
    if (currentInstitute > 0)
    makeGetDataRequest(`/${currentInstitute}/program-types`, filterUpdate, setProgramTypeData, setApiStatus);
  }, [refreshData, filterUpdate, currentInstitute]);

  useEffect(() => {
    if (refreshOnDelete === true && currentInstitute > 0)
      makeGetDataRequest(`/${currentInstitute}/program-types`, filterUpdate, setProgramTypeData, setApiStatus);
  }, [refreshOnDelete]);


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

  // to update filters values in the main state filterUpdate
  const updateDepartmentFilter = (departmentId: string) => {
    setFilterUpdate({
      ...filterUpdate,
      departmentId: departmentId,
      pageNumber: 0,
    });
  };

  const updateInputFilters = (inputvalues: any) => {
    if (inputvalues.code !== "") {
      setFilterUpdate({
        ...filterUpdate,
        name: inputvalues.name,
        programCode: inputvalues.code,
        pageNumber: 0,
      });
    } else {
      let updatedState = { ...filterUpdate, pageNumber: 0 };
      updatedState.name = inputvalues.name;
      if (updatedState.programCode) delete updatedState.programCode;
      setFilterUpdate(updatedState);
    }
  };
  // <<< ===== JSX CUSTOM COMPONENTS ===== >>>
  const ADDPROGRAM_MODAL_COMPONENT = (
    <AddProgramModal
      show={modalShow}
      onHide={() => toggleModalShow(false)}
      programtypeobj={programTypeObj}
      togglemodalshow={toggleModalShow}
      refreshprogramdata={refreshToggle}
      currentInstitute={currentInstitute}
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
      apiStatus={apiStatus}
      currentInstitute={currentInstitute}
    />
  );

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
          <div className="row gx-2 mb-3 align-items-center justify-content-center">
            <div className="col-auto">
              <label className="col-form-label">Institute</label>
            </div>
            <div className="col-auto">
              <InstituteFilter updateCurrentInstitute={updateCurrentInstitute}/>
            </div>
          </div>
          <Filters
            openAddProgramType={openAddProgramType}
            updateDepartment={updateDepartmentFilter}
            updateinputfilters={updateInputFilters}
            updateCurrentInstitute={updateCurrentInstitute}
          />
          {/* {PROGRAM_TYPE_BUTTON} */}
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
