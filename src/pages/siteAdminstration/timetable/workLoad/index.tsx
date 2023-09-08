import "./style.scss";
import Filters from "./filters";
import WorkLoadModal from "./form";
import WorkLoadTable from "./table";
import Header from "../../../newHeader";
import Footer from "../../../newFooter";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import HeaderTabs from "../../../headerTabs";
import PageTitle from "../../../../widgets/pageTitle";
import { pagination } from "../../../../utils/pagination";
import BuildPagination from "../../../../widgets/pagination";
import { getData } from "../../../../adapters/microservices";
import BreadcrumbComponent from "../../../../widgets/breadcrumb";
import { makeGetDataRequest } from "../../../../features/apiCalls/getdata";

const WorkLoad = () => {
  const dummyData = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };
  const [workLoadApiResponseData, setWorkLoadApiResponseData] =
    useState(dummyData);
  const [departmentList, setDepartmentList] = useState(dummyData);
  const [refreshOnDelete, setRefreshOnDelete] = useState(false);
  const [classroomObj, setClassroomObj] = useState({});
  const [refreshData, setRefreshData] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [apiStatus, setApiStatus] = useState("");
  const currentInstitute = useSelector(
    (state: any) => state.globalFilters.currentInstitute
  );
  const [filterUpdate, setFilterUpdate] = useState({
    name: "",
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });

  useEffect(() => {
    if (currentInstitute > 0) {
      const endPoint = `/${currentInstitute}/departments`;
      getData(endPoint, filterUpdate).then((res: any) => {
        if (res.data !== "" && res.status === 200) {
          setDepartmentList(res.data);
        }
      });
    }
  }, [currentInstitute]);

  useEffect(() => {
    if (currentInstitute > 0) {
      let endPoint = `/${currentInstitute}/timetable/userworkload`;
      makeGetDataRequest(
        endPoint,
        filterUpdate,
        setWorkLoadApiResponseData,
        setApiStatus
      );
    }
  }, [refreshData, filterUpdate, currentInstitute]);

  // API call on delete === >>>
  useEffect(() => {
    if (currentInstitute > 0) {
      let endPoint = `/${currentInstitute}/timetable/userworkload`;
      makeGetDataRequest(endPoint, filterUpdate, setWorkLoadApiResponseData);
    }
  }, [refreshOnDelete]);

  const refreshToggle = () => {
    setRefreshData(!refreshData);
  };

  const refreshOnDeleteToggle = (value: boolean) => {
    setRefreshOnDelete(value);
  };

  // to update filters values in the main state filterUpdate
  const updateClassroomFilterByDepartment = (departmentId: string) => {
    setFilterUpdate({
      ...filterUpdate,
      pageNumber: 0,
    });
  };

  const updateInputFilters = (inputvalues: any) => {
    setFilterUpdate({ ...filterUpdate, name: inputvalues, pageNumber: 0 });
  };

  // get userid from the work load table === >>>
  const editHandlerById = ({ id, workLoad }: any) => {
    setClassroomObj({
      id: id,
      workLoad: workLoad
    });
  };

  // handle reset Form after SAVE data === >>>
  const resetClassroomForm = () => {
    setClassroomObj({
      id: 0,
      workLoad: 0
    });
    setRefreshData(false);
  };

  // handle modal hide & show functionality === >>>
  const toggleModalShow = (status: boolean) => {
    setModalShow(status);
  };

  const newPageRequest = (pageRequest: number) => {
    setFilterUpdate({ ...filterUpdate, pageNumber: pageRequest });
  };

  const filterHandlerByDepartment = (val: string) => {
    console.log(val);
  };

  const WORKLOAD_TABLE_COMPONENT = (
    <WorkLoadTable
      apiStatus={apiStatus}
      currentInstitute={currentInstitute}
      workLoadData={workLoadApiResponseData.items}
      editHandlerById={editHandlerById}
      toggleModalShow={toggleModalShow}
      refreshClassroomData={refreshToggle}
      refreshOnDelete={refreshOnDeleteToggle}
    />
  );

  const WORKLOAD_MODAL_COMPONENT = (
    <WorkLoadModal
      show={modalShow}
      workLoadObj={classroomObj}
      currentInstitute={currentInstitute}
      departmentList={departmentList.items}
      togglemodalshow={toggleModalShow}
      refreshClassroomData={refreshToggle}
      onHide={() => toggleModalShow(false)}
      filterUpdate={filterUpdate}
    />
  );
  // <<< ==== END COMPONENTS ==== >>>
  return (
    <>
      <Header />
      <HeaderTabs activeTab="siteadmin" />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "Timetable Management", path: "/timetable" },
          { name: "Faculty Work Load", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle pageTitle="Faculty Work Load" gobacklink="/timetable" />
          <Filters
            toggleModalShow={toggleModalShow}
            refreshClassroomData={refreshToggle}
            updateInputFilters={updateInputFilters}
            resetClassroomForm={resetClassroomForm}
            filterHandlerByDepartment={filterHandlerByDepartment}
            updateClassroomFilter={updateClassroomFilterByDepartment}
          />
          {WORKLOAD_TABLE_COMPONENT}
          <BuildPagination
            totalpages={workLoadApiResponseData.pager.totalPages}
            activepage={filterUpdate.pageNumber}
            getrequestedpage={newPageRequest}
          />
          {WORKLOAD_MODAL_COMPONENT}
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default WorkLoad;