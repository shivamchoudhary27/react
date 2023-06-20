import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
// import { makeGetDataRequest } from "../../../features/api_calls/getdata";
import { getData } from "../../../adapters/microservices";
import { pagination } from "../../../utils/pagination";
import { Row, Col, Container, Button } from "react-bootstrap";
import Header from "../../newHeader";
import Footer from "../../newFooter";
import HeaderTabs from "../../headerTabs";
import DiciplineTable from "./table";
import DiciplineModal from "./form";
import BuildPagination from "../../../widgets/pagination";
import BreadcrumbComponent from "../../../widgets/breadcrumb";
import PageTitle from "../../../widgets/pageTitle";
import "./style.scss";
import Filters from "./filters";

const Discipline = () => {
  const dummyData = { items: [], pager: { totalElements: 0, totalPages: 0 } };
  const [modalShow, setModalShow] = useState(false);
  const [diciplineData, setDiciplineData] = useState<any>(dummyData);
  const [disciplineObj, setDisciplineObj] = useState({
    name: "",
    description: "",
    published: false
  });
  const [refreshData, setRefreshData] = useState(true);
  const [refreshOnDelete, setRefreshOnDelete] = useState<boolean>(false);
  const [filterUpdate, setFilterUpdate] = useState<any>({
    departmentId: "",
    name: "",
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });
  const [apiStatus, setApiStatus] = useState("");
  const currentInstitute = useSelector(state => state.currentInstitute);

  const getDisciplineData = (endPoint : string, filters : any, setData : any, setApiStatus?:any) => {
    setApiStatus("started")
    getData(endPoint, filters)
    .then((result : any) => {
        if (result.data !== "" && result.status === 200) {
            // Merge the programCounts into the items objects
            result.data.items.forEach((item : any) => {
              const index = result.data.programCounts.findIndex((packet : any) => packet.disciplineId === item.id);
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
    getDisciplineData(`/${currentInstitute}/disciplines`, filterUpdate, setDiciplineData, setApiStatus);
  }, [refreshData, filterUpdate, currentInstitute]);

  useEffect(() => {
    if (refreshOnDelete === true && currentInstitute > 0)
    getDisciplineData(`/${currentInstitute}/disciplines`, filterUpdate, setDiciplineData, setApiStatus);
  }, [refreshOnDelete]);

  const refreshToggle = () => {
    setRefreshData(!refreshData);
  };

  const refreshOnDeleteToggle = (value: boolean) => {
    setRefreshOnDelete(value);
  };

  // get id, name from discipline table === >>>
  const editHandlerById = ({ id, name, description, published }: any) => {
    setDisciplineObj({ id: id, name: name, description: description, published: published });
  };

  // handle modal hide & show functionality === >>>
  const toggleModalShow = (status: boolean) => {
    setModalShow(status);
  };

  // handle to open Add Discipline modal === >>>
  const openAddDiscipline = () => {
    toggleModalShow(true);
    setDisciplineObj({ id: 0, name: "", description: "", published: false });
    setRefreshData(false);
  };

  const newPageRequest = (pageRequest: number) => {
    setFilterUpdate({ ...filterUpdate, pageNumber: pageRequest });
  };

  const updateInputFilters = (inputvalues: any) => {
    setFilterUpdate({ ...filterUpdate, name: inputvalues, pageNumber: 0 });
  };

  // <<< ===== JSX CUSTOM COMPONENTS ===== >>>
  const DISCIPLINE_TABLE_COMPONENT = (
    <DiciplineTable
      diciplineData={diciplineData.items}
      editHandlerById={editHandlerById}
      toggleModalShow={toggleModalShow}
      refreshDisciplineData={refreshToggle}
      refreshOnDelete={refreshOnDeleteToggle}
      apiStatus={apiStatus}
      currentInstitute={currentInstitute}
    />
  );

  const DISCIPLINE_MODAL_COMPONENT = (
    <DiciplineModal
      show={modalShow}
      onHide={() => setModalShow(false)}
      togglemodalshow={toggleModalShow}
      disciplineobj={disciplineObj}
      refreshDisciplineData={refreshToggle}
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
          { name: "Discipline", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3">
        <Container fluid>
          {/* <PageTitle pageTitle={`${currentInstitueName}: Discipline`} gobacklink="/manageprogram" />           */}
          <PageTitle pageTitle={`Discipline`} gobacklink="/manageprogram" />          
          <Filters
            openAddDiscipline={openAddDiscipline}
            updateInputFilters={updateInputFilters}
          />
          {/* {DISCIPLINE_BUTTONS} */}
          {DISCIPLINE_TABLE_COMPONENT}
          <BuildPagination
            totalpages={diciplineData.pager.totalPages}
            activepage={filterUpdate.pageNumber}
            getrequestedpage={newPageRequest}
          />
          {DISCIPLINE_MODAL_COMPONENT}
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Discipline;
