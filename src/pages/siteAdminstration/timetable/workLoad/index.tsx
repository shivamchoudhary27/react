import "./style.scss";
import View from "./view";
import WorkLoadModal from "./form";
import WorkLoadTable from "./table";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { pagination } from "../../../../utils/pagination";
import { getData, putData } from "../../../../adapters/microservices";
import { makeGetDataRequest } from "../../../../features/apiCalls/getdata";

const WorkLoad = () => {
  const dummyData = {
    default_workload: 0,
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
    email: "",
    sortBy: "",
    sortOrder: "",
    departmentId: "",
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
    let endPoint = `/${currentInstitute}/timetable/userworkload`;
    if (currentInstitute > 0) {
      setApiStatus("started");
      getData(endPoint, filterUpdate)
        .then((result: any) => {
          if (result.data !== "" && result.status === 200) {
            for (const key in result.data.items) {
              const value = result.data.items[key];
              if (
                value.workLoad === null &&
                workLoadApiResponseData.default_workload > 0
              ) {
                value.workLoad = workLoadApiResponseData.default_workload;
                renderFacultyDefaultWorkLoadValue(value.userId, value.workLoad);
              }
            }
            setWorkLoadApiResponseData(result.data);
          }
          setApiStatus("finished");
        })
        .catch((err: any) => {
          console.log(err);
          setApiStatus("finished");
        });
    }
  }, [refreshData, filterUpdate, currentInstitute]);

  function renderFacultyDefaultWorkLoadValue(id: any, val: any) {
    let endPoint = `/${currentInstitute}/timetable/userworkload/${id}`;
    putData(endPoint, { workLoad: val }).then((res: any) => {});
  }

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
  const updateDepartmentFilter = (departmentId: string) => {
    console.log("updading the department ", departmentId);
    setFilterUpdate({
      ...filterUpdate,
      pageNumber: 0,
      departmentId: departmentId,
    });
  };

  const updateInputFilters = (inputvalues: any, inputEmail: any) => {
    setFilterUpdate({
      ...filterUpdate,
      name: inputvalues,
      email: inputEmail,
      pageNumber: 0,
    });
  };

  // get userid from the work load table === >>>
  const editHandlerById = ({
    id,
    workLoad,
    userFirstName,
    userLastName,
    userEmail,
  }: any) => {
    setClassroomObj({
      id: id,
      workLoad: workLoad,
      userFirstName: userFirstName,
      userLastName: userLastName,
      userEmail: userEmail,
    });
  };

  // handle reset Form after SAVE data === >>>
  const resetClassroomForm = () => {
    setClassroomObj({
      id: 0,
      workLoad: 0,
      userFirstName: "",
      userLastName: "",
      userEmail: "",
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
      workLoadData={workLoadApiResponseData.items}
    />
  );

  const WORKLOAD_MODAL_COMPONENT = (
    <WorkLoadModal
      show={modalShow}
      workLoadObj={classroomObj}
      filterUpdate={filterUpdate}
      currentInstitute={currentInstitute}
      departmentList={departmentList.items}
      workLoadApiResponseData={workLoadApiResponseData}
      togglemodalshow={toggleModalShow}
      refreshClassroomData={refreshToggle}
      onHide={() => toggleModalShow(false)}
    />
  );
  // <<< ==== END COMPONENTS ==== >>>
  return (
    <>
      <View
        modalShow={modalShow}
        apiStatus={apiStatus}
        classroomObj={classroomObj}
        setFilterUpdate={setFilterUpdate}
        currentInstitute={currentInstitute}
        departmentList={departmentList.items}
        filterUpdate={filterUpdate}
        workLoadApiData={workLoadApiResponseData.items}
        workLoadApiResponseData={workLoadApiResponseData}
        workLoadApiResponseDataPage={workLoadApiResponseData.pager.totalPages}
        refreshToggle={refreshToggle}
        newPageRequest={newPageRequest}
        toggleModalShow={toggleModalShow}
        updateInputFilters={updateInputFilters}
        resetClassroomForm={resetClassroomForm}
        updateDepartmentFilter={updateDepartmentFilter}
        filterHandlerByDepartment={filterHandlerByDepartment}
      />
    </>
  );
};

export default WorkLoad;
