import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
import {
  IDummyData,
  IDisciplineObj,
  IFilterUpdate,
  ICurrentInstitute,
} from "./types/interface";
import Errordiv from "../../../widgets/alert/errordiv";

const Discipline = () => {
  const dummyData: IDummyData = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [diciplineData, setDiciplineData] = useState<IDummyData>(dummyData);
  const [disciplineObj, setDisciplineObj] = useState<IDisciplineObj>({
    id: 0,
    name: "",
    description: "",
    published: false,
  });
  const [refreshData, setRefreshData] = useState<boolean>(true);
  const [refreshOnDelete, setRefreshOnDelete] = useState<boolean>(false);
  const [filterUpdate, setFilterUpdate] = useState<IFilterUpdate>({
    name: "",
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });
  const [apiStatus, setApiStatus] = useState<string>("");
  const currentInstitute: number = useSelector(
    (state: ICurrentInstitute) => state.globalFilters.currentInstitute
  );
  const userAuthorities = useSelector(
    (state: any) => state.userAuthorities.permissions.discipline
  );

  const getDisciplineData = (
    endPoint: string,
    filters: any,
    setData: any,
    setApiStatus: (params: string) => void
  ) => {
    setApiStatus("started");
    getData(endPoint, filters)
      .then((result: any) => {
        if (result.data !== "" && result.status === 200) {
          // Merge the programCounts into the items objects
          result.data.items.forEach((item: any) => {
            const index = result.data.programCounts.findIndex(
              (packet: any) => packet.disciplineId === item.id
            );
            item.totalPrograms = 0;
            if (index > -1) {
              item.totalPrograms =
                result.data.programCounts[index].totalPrograms;
            }
          });
          setData(result.data);
        }
        setApiStatus("finished");
      })
      .catch((err: any) => {
        console.log(err);
        setApiStatus("finished");
      });
  };

  // get programs API call === >>>
  useEffect(() => {
    if (currentInstitute > 0)
      getDisciplineData(
        `/${currentInstitute}/disciplines`,
        filterUpdate,
        setDiciplineData,
        setApiStatus
      );
  }, [refreshData, filterUpdate, currentInstitute]);

  useEffect(() => {
    if (refreshOnDelete === true && currentInstitute > 0)
      getDisciplineData(
        `/${currentInstitute}/disciplines`,
        filterUpdate,
        setDiciplineData,
        setApiStatus
      );
  }, [refreshOnDelete]);

  const refreshToggle = () => {
    setRefreshData(!refreshData);
  };

  const refreshOnDeleteToggle = (value: boolean) => {
    setRefreshOnDelete(value);
  };

  // get id, name from discipline table === >>>
  const editHandlerById = ({
    id,
    name,
    description,
    published,
  }: IDisciplineObj) => {
    setDisciplineObj({
      id: id,
      name: name,
      description: description,
      published: published,
    });
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
      disciplinePermissions={userAuthorities}
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
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          {/* <PageTitle pageTitle={`${currentInstitueName}: Discipline`} gobacklink="/manageprogram" />           */}
          <PageTitle pageTitle={`Discipline`} gobacklink="/manageprogram" />
          <Filters
            openAddDiscipline={openAddDiscipline}
            updateInputFilters={updateInputFilters}
            disciplinePermissions={userAuthorities}
          />
          {/* {DISCIPLINE_BUTTONS} */}
          {!userAuthorities.canView ? (
            <Errordiv
              msg="You don't have permission to view discipline."
              cstate
              className="mt-3"
            />
          ) : (
            DISCIPLINE_TABLE_COMPONENT
          )}
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
