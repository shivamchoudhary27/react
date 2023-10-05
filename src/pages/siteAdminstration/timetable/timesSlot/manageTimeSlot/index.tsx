// import "./style.scss";
import Filters from "../filters";
import TimeSlotModal from "./form";
import ManageTimesSlotTable from "./table";
import Header from "../../../../newHeader";
import Footer from "../../../../newFooter";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import HeaderTabs from "../../../../headerTabs";
import PageTitle from "../../../../../widgets/pageTitle";
import { pagination } from "../../../../../utils/pagination";
import { getData } from "../../../../../adapters/microservices";
import BuildPagination from "../../../../../widgets/pagination";
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";
import { makeGetDataRequest } from "../../../../../features/apiCalls/getdata";

const ManageTimesSlot = () => {
  const dummyData = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };
  const { departmentId, name } = useParams();
  const [timeslotList, setTimeslotList] = useState(dummyData);
  const [departmentList, setDepartmentList] = useState(dummyData);
  const [refreshOnDelete, setRefreshOnDelete] = useState(false);
  const [timeslotObj, setTimeslotObj] = useState({});
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
    departmentId: departmentId,
    name: name,
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
      let endPoint = `/${currentInstitute}/timetable/timeslot`;
      makeGetDataRequest(endPoint, filterUpdate, setTimeslotList, setApiStatus);
    }
  }, [refreshData, filterUpdate, currentInstitute]);

  // API call on delete === >>>
  useEffect(() => {
    if (currentInstitute > 0) {
      let endPoint = `/${currentInstitute}/timetable/timeslot`;
      makeGetDataRequest(endPoint, filterUpdate, setTimeslotList, setApiStatus);
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
      departmentId: departmentId,
      pageNumber: 0,
    });
  };

  const updateInputFilters = (inputvalues: any) => {
    setFilterUpdate({ ...filterUpdate, name: inputvalues, pageNumber: 0 });
  };

  // get id, name from the department table === >>>
  const editHandlerById = ({
    id,
    startTime,
    endTime,
    type,
    breakTime,
  }: any) => {
    setTimeslotObj({
      id: id,
      startTime: startTime,
      endTime: endTime,
      type: type,
      breakTime: breakTime,
    });
  };

  // handle reset Form after SAVE data === >>>
  const resetClassroomForm = () => {
    setTimeslotObj({
      id: 0,
      startTime: "",
      endTime: "",
      type: "",
      breakTime: "",
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

  const TIMESLOT_TABLE_COMPONENT = (
    <ManageTimesSlotTable
      apiStatus={apiStatus}
      currentInstitute={currentInstitute}
      timeslotList={timeslotList.items}
      departmentList={departmentList.items}
      editHandlerById={editHandlerById}
      toggleModalShow={toggleModalShow}
      refreshTimeslotData={refreshToggle}
      refreshOnDelete={refreshOnDeleteToggle}
    />
  );

  const TIMESLOT_MODAL_COMPONENT = (
    <TimeSlotModal
      show={modalShow}
      timeslotObj={timeslotObj}
      departmentId={departmentId}
      currentInstitute={currentInstitute}
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
          { name: "Manage Times Slot", path: "/timeslot" },
          { name: "View Times Slot", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle pageTitle={`Times Slot: ${name}`} gobacklink="/timeslot" />
          <Filters
            toggleModalShow={toggleModalShow}
            refreshClassroomData={refreshToggle}
            updateInputFilters={updateInputFilters}
            resetClassroomForm={resetClassroomForm}
            filterHandlerByDepartment={filterHandlerByDepartment}
            updateClassroomFilter={updateClassroomFilterByDepartment}
          />
          {TIMESLOT_TABLE_COMPONENT}
          <BuildPagination
            totalpages={timeslotList.pager.totalPages}
            activepage={filterUpdate.pageNumber}
            getrequestedpage={newPageRequest}
          />
          {TIMESLOT_MODAL_COMPONENT}
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default ManageTimesSlot;
