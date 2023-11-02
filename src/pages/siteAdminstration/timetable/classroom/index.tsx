import "./style.scss";
import Filters from "./filters";
import ClassRoomModal from "./form";
import ClassRoomTable from "./table";
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

const ClassRoom = () => {
  const dummyData = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };
  const [classroomApiResponseData, setClassroomApiResponseData] = useState(dummyData);
  const [departmentList, setDepartmentList] = useState(dummyData);
  const [refreshOnDelete, setRefreshOnDelete] = useState(false);
  const [classroomObj, setClassroomObj] = useState({});
  const [refreshData, setRefreshData] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [apiStatus, setApiStatus] = useState("");
  const selectedDepartment = useSelector(
    (state) => state.globalFilters.currentDepartmentFilterId
    );
    const currentInstitute = useSelector(
      (state: any) => state.globalFilters.currentInstitute
    );
  const [filterUpdate, setFilterUpdate] = useState({
    departmentId: selectedDepartment,
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
      let endPoint = `/${currentInstitute}/timetable/classroom`;
      makeGetDataRequest(endPoint, filterUpdate, setClassroomApiResponseData, setApiStatus);
    }
  }, [refreshData, filterUpdate, currentInstitute]);

  // API call on delete === >>>
  useEffect(() => {
    if (currentInstitute > 0) {
      let endPoint = `/${currentInstitute}/timetable/classroom`;
      makeGetDataRequest(endPoint, filterUpdate, setClassroomApiResponseData);
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
    console.log('department update filter', departmentId);
    setFilterUpdate({
      ...filterUpdate,
      departmentId: departmentId,
      pageNumber: 0,
    });
  };

  const updateInputFilters = (inputvalues: any) => {
    setFilterUpdate({ ...filterUpdate, pageNumber: 0 });
  };

  // get id, name from the department table === >>>
  const editHandlerById = ({
    id,
    name,
    type,
    departmentId,
    departmentName,
    seatingCapacity,
  }: any) => {
    setClassroomObj({
      id: id,
      name: name,
      type: type,
      departmentId: departmentId,
      departmentName: departmentName,
      seatingCapacity: seatingCapacity,
    });
  };

  // handle reset Form after SAVE data === >>>
  const resetClassroomForm = () => {
    setClassroomObj({
      id: 0,
      name: "",
      type: "lab", 
      departmentId: filterUpdate.departmentId,
      departmentName: "",
      seatingCapacity: 0,
    });
    // setRefreshData(false);
  };

  // handle modal hide & show functionality === >>>
  const toggleModalShow = (status: boolean) => {
    setModalShow(status);
  };

  const newPageRequest = (pageRequest: number) => {
    setFilterUpdate({ ...filterUpdate, pageNumber: pageRequest });
  };

  const filterHandlerByDepartment = (val: string) => {
    console.log(val)
  }

  const CLASSROOM_TABLE_COMPONENT = (
    <ClassRoomTable
      apiStatus={apiStatus}
      currentInstitute={currentInstitute}
      classroomData={classroomApiResponseData.items}
      editHandlerById={editHandlerById}
      toggleModalShow={toggleModalShow}
      refreshClassroomData={refreshToggle}
      refreshOnDelete={refreshOnDeleteToggle}
    />
  );

  const CLASSROOM_MODAL_COMPONENT = (
    <ClassRoomModal
      show={modalShow}
      classroomObj={classroomObj}
      currentInstitute={currentInstitute}
      departmentList={departmentList.items}
      togglemodalshow={toggleModalShow}
      refreshClassroomData={refreshToggle}
      onHide={() => toggleModalShow(false)}
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
          { name: "Manage Classroom", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle pageTitle="Manage Classroom" gobacklink="/timetable" />
          <Filters
            apiStatus={apiStatus}
            departmentList={departmentList.items}
            toggleModalShow={toggleModalShow}
            refreshClassroomData={refreshToggle}
            updateInputFilters={updateInputFilters}
            resetClassroomForm={resetClassroomForm}
            filterHandlerByDepartment={filterHandlerByDepartment}
            updateClassroomFilter={updateClassroomFilterByDepartment}
          />
          {CLASSROOM_TABLE_COMPONENT}
          <BuildPagination
            totalpages={classroomApiResponseData.pager.totalPages}
            activepage={filterUpdate.pageNumber}
            getrequestedpage={newPageRequest}
          />
          {CLASSROOM_MODAL_COMPONENT}
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default ClassRoom;
