import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { Container } from "react-bootstrap";
import { getData } from "../../../adapters/microservices";
import { pagination } from "../../../utils/pagination";
import BuildPagination from "../../../widgets/pagination";
import Header from "../../newHeader";
import Footer from "../../newFooter";
import HeaderTabs from "../../headerTabs";
import ProgramTable from "./table";
import AddProgramModal from "./form";
import BreadcrumbComponent from "../../../widgets/breadcrumb";
import PageTitle from "../../../widgets/pageTitle";
import Filters from "./filters";

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
  const currentInstitute = useSelector((state : any) => state.currentInstitute);

  const getProgramTypeData = (endPoint : string, filters : any, setData : any, setApiStatus?:any) => {
    setApiStatus("started")
    getData(endPoint, filters)
    .then((result : any) => {
        if (result.data !== "" && result.status === 200) {
            // Merge the programCounts into the items objects
            result.data.items.forEach((item : any) => {
              const index = result.data.programCounts.findIndex((packet : any) => packet.programTypeId === item.id);
              item.totalPrograms = 0;
              if (index > -1) {
                item.totalPrograms = result.data.programCounts[index].totalPrograms;
              }
            });
            setData(result.data);
        }
        setApiStatus("finished")
    })
    .catch((err : any) => {
        console.log(err);
        setApiStatus("finished")
    });
  }

  // get programs API call === >>>
  useEffect(() => {
    if (currentInstitute > 0)
    getProgramTypeData(`/${currentInstitute}/program-types`, filterUpdate, setProgramTypeData, setApiStatus);
  }, [refreshData, filterUpdate, currentInstitute]);

  useEffect(() => {
    if (refreshOnDelete === true && currentInstitute > 0)
    getProgramTypeData(`/${currentInstitute}/program-types`, filterUpdate, setProgramTypeData, setApiStatus);
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
    published
  }: any) => {
    setProgramTypeObj({
      id: id,
      name: name,
      description: description,
      batchYearRequired: batchYearRequired,
      published: published
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
      published: false
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
    setFilterUpdate({ ...filterUpdate, name: inputvalues, pageNumber: 0 });
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
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle pageTitle={`Program Type`} gobacklink="/manageprogram" />          
          <Filters
            openAddProgramType={openAddProgramType}
            updateDepartment={updateDepartmentFilter}
            updateinputfilters={updateInputFilters}
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
