import "./style.scss";
import View from "./view";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { pagination } from "../../../utils/pagination";
import { getData } from "../../../adapters/microservices";
// import { makeGetDataRequest } from "../../../features/api_calls/getdata";
import {
  Type_ApiResponse,
  Type_FilterUpdate,
  Type_DepartmentObj,
  TypeCurrentInstitute,
} from "./type/type";

const Departments: React.FunctionComponent = () => {
  const dummyData: Type_ApiResponse = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };
  const [departmentData, setDepartmentData] =
    useState<Type_ApiResponse>(dummyData);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [departmentObj, setDepartmentObj] = useState<Type_DepartmentObj>(
    {} as Type_DepartmentObj
  );
  const [refreshOnDelete, setRefreshOnDelete] = useState<boolean>(false);
  const [refreshData, setRefreshData] = useState<boolean>(true);
  const [apiStatus, setApiStatus] = useState<string>("");
  const [filterUpdate, setFilterUpdate] = useState<Type_FilterUpdate>({
    name: "",
    pageNumber: 0,
    departmentId: "",
    pageSize: pagination.PERPAGE,
  });
  const currentInstitute: number = useSelector(
    (state: TypeCurrentInstitute) => state.globalFilters.currentInstitute
  );
  // const departmentPermission = useSelector(
  //   (state: any) => state.userAuthorities.permissions.department
  // );

  const getDepartmentData = (
    endPoint: string,
    filters: Type_FilterUpdate,
    setData: React.Dispatch<React.SetStateAction<Type_ApiResponse>>,
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
  const editHandlerById = ({ ...getEditHandlerValue }: Type_DepartmentObj) => {
    setDepartmentObj({
      id: getEditHandlerValue.id,
      name: getEditHandlerValue.name,
      published: getEditHandlerValue.published,
    });
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
        // departmentPermission={departmentPermission}
        apiStatus={apiStatus}
        modalShow={modalShow}
        filterUpdate={filterUpdate}
        departmentObj={departmentObj}
        departmentData={departmentData}
        currentInstitute={currentInstitute}
        refreshToggle={refreshToggle}
        newPageRequest={newPageRequest}
        editHandlerById={editHandlerById}
        toggleModalShow={toggleModalShow}
        updateInputFilters={updateInputFilters}
        resetDepartmentForm={resetDepartmentForm}
        refreshOnDeleteToggle={refreshOnDeleteToggle}
      />
    </>
  );
};

export default Departments;
