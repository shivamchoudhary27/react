// import "./style.scss";
import View from "./view";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { pagination } from "../../../../../utils/pagination";
import { postData, getData } from "../../../../../adapters/microservices";
import { makeGetDataRequest } from "../../../../../features/apiCalls/getdata";

const ManageTimesSlot = () => {
  const dummyData = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };
  const { departmentId, name } = useParams();
  const [timeslotList, setTimeslotList] = useState(dummyData);
  const [departmentList, setDepartmentList] = useState(dummyData);
  const [instituteSlotList, setInstituteSlotList] = useState([]);
  const [refreshOnDelete, setRefreshOnDelete] = useState(false);
  const [timeslotObj, setTimeslotObj] = useState({});
  const [refreshData, setRefreshData] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [apiStatus, setApiStatus] = useState("");
  const currentInstitute = useSelector(
    (state: any) => state.globalFilters.currentInstitute
  );
  const [filterUpdate, setFilterUpdate] = useState({
    departmentId: departmentId,
    name: name,
    sortBy: "",
    sortOrder: "",
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

  // get Institute slot action === >>>
  const getInstituteSlotAction = (action: string) => {
    if (action === "click") {
      let endPoint = `/${currentInstitute}/timetable/timeslot/copy/institute/template/${departmentId}`;
      postData(endPoint, {})
        .then((result: any) => {
          refreshToggle();
          setApiStatus("finished");
        })
        .catch((err: any) => {
          console.log(err);
          refreshToggle();
          setApiStatus("finished");
        });
    }
  };

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
      type: "lunch",
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

  const filterHandlerByDepartment = (val: string) => {};

  return (
    <View
      nameParams={name}
      modalShow={modalShow}
      apiStatus={apiStatus}
      timeslotObj={timeslotObj}
      departmentId={departmentId}
      timeslotList={timeslotList.items}
      currentInstitute={currentInstitute}
      departmentList={departmentList.items}
      timeslotListPage={timeslotList.pager.totalPages}
      refreshToggle={refreshToggle}
      newPageRequest={newPageRequest}
      editHandlerById={editHandlerById}
      toggleModalShow={toggleModalShow}
      filterUpdate={filterUpdate}
      setFilterUpdate={setFilterUpdate}
      updateInputFilters={updateInputFilters}
      resetClassroomForm={resetClassroomForm}
      refreshOnDeleteToggle={refreshOnDeleteToggle}
      getInstituteSlotAction={getInstituteSlotAction}
      filterHandlerByDepartment={filterHandlerByDepartment}
      updateClassroomFilterByDepartment={updateClassroomFilterByDepartment}
    />
  );
};

export default ManageTimesSlot;
