import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { makeGetDataRequest } from "../../../features/api_calls/getdata";
import { getData } from "../../../adapters/microservices";
import { pagination } from "../../../utils/pagination";
import "./style.scss";
import {
  TypeDummyData,
  TypeModalShow,
  TypeRefreshOnDelete,
  TypeRefreshData,
  TypeApiStatus,
  CurrentInstitute,
  TypeCurrentInstitute,
  TypeDepartmentObj,
  TypeFilterUpdate,
} from "./types/type";
import View from "./view";

const Departments = () => {
  const dummyData: TypeDummyData = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };
  const [departmentData, setDepartmentData] =
    useState<TypeDummyData>(dummyData);
  const [modalShow, setModalShow] = useState<TypeModalShow>(false);
  const [departmentObj, setDepartmentObj] = useState<TypeDepartmentObj>(
    {} as TypeDepartmentObj
  );
  const [refreshOnDelete, setRefreshOnDelete] =
    useState<TypeRefreshOnDelete>(false);
  const [refreshData, setRefreshData] = useState<TypeRefreshData>(true);
  const [apiStatus, setApiStatus] = useState<TypeApiStatus>("");
  const [filterUpdate, setFilterUpdate] = useState<TypeFilterUpdate>({
    departmentId: "",
    name: "",
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });
  const currentInstitute: CurrentInstitute = useSelector(
    (state: TypeCurrentInstitute) => state.globalFilters.currentInstitute
  );
  // const departmentPermission = useSelector(
  //   (state: any) => state.userAuthorities.permissions.department
  // );

  const getDepartmentData = (
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
              (packet: any) => packet.departmentId === item.id
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

  useEffect(() => {
    if (refreshOnDelete === true && currentInstitute > 0)
      getDepartmentData(
        `/${currentInstitute}/departments`,
        filterUpdate,
        setDepartmentData,
        setApiStatus
      );
  }, [refreshOnDelete]);

  // get programs API call === >>>
  useEffect(() => {
    if (currentInstitute > 0)
      getDepartmentData(
        `/${currentInstitute}/departments`,
        filterUpdate,
        setDepartmentData,
        setApiStatus
      );
  }, [refreshData, filterUpdate, currentInstitute]);

  const refreshToggle = () => {
    setRefreshData(!refreshData);
  };

  const refreshOnDeleteToggle = (value: boolean) => {
    setRefreshOnDelete(value);
  };

  const updateInputFilters = (inputvalues: any) => {
    setFilterUpdate({ ...filterUpdate, name: inputvalues, pageNumber: 0 });
  };

  // get id, name from the department table === >>>
  const editHandlerById = ({ id, name, published }: TypeDepartmentObj) => {
    setDepartmentObj({ id: id, name: name, published: published });
  };

  // handle reset Form after SAVE data === >>>
  const resetDepartmentForm = () => {
    setDepartmentObj({ id: 0, name: "", published: false });
    setRefreshData(false);
  };

  // handle modal hide & show functionality === >>>
  const toggleModalShow = (status: boolean) => {
    setModalShow(status);
  };

  const newPageRequest = (pageRequest: number) => {
    setFilterUpdate({ ...filterUpdate, pageNumber: pageRequest });
  };

  return (
    <>
      <View
        departmentData={departmentData}
        editHandlerById={editHandlerById}
        toggleModalShow={toggleModalShow}
        departmentObj={departmentObj}
        refreshToggle={refreshToggle}
        resetDepartmentForm={resetDepartmentForm}
        refreshOnDeleteToggle={refreshOnDeleteToggle}
        apiStatus={apiStatus}
        currentInstitute={currentInstitute}
        modalShow={modalShow}
        // departmentPermission={departmentPermission}
        updateInputFilters={updateInputFilters}
        filterUpdate={filterUpdate}
        newPageRequest={newPageRequest}
      />
    </>
  );
};

export default Departments;
