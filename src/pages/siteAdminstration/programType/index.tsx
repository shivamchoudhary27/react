import View from "./view";
import { useSelector } from "react-redux";
import { pagination } from "../../../utils/pagination";
import { getData } from "../../../adapters/microservices";
import { useState, useEffect, FunctionComponent } from "react";
import {
  Type_ApiResponse,
  Type_FilterUpdate,
  ICurrentInstitute,
  Type_ProgramTypeObject,
} from "./type/types";

const ProgramType: FunctionComponent = () => {
  const dummyData: Type_ApiResponse = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };
  const [programTypeObj, setProgramTypeObj] = useState<Type_ProgramTypeObject>({
    id: 0,
    name: "",
    description: "",
    batchYearRequired: false,
    published: false,
  });
  const [filterUpdate, setFilterUpdate] = useState<Type_FilterUpdate>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [programTypeData, setProgramTypeData] = useState<Type_ApiResponse>(dummyData);
  const [refreshData, setRefreshData] = useState<boolean>(true);
  const [refreshOnDelete, setRefreshOnDelete] = useState<boolean>(false);
  const [apiStatus, setApiStatus] = useState<string>("");
  const currentInstitute: number = useSelector(
    (state: ICurrentInstitute) => state.globalFilters.currentInstitute
  );

  const getProgramTypeData = (
    endPoint: string,
    filters: Type_FilterUpdate,
    setData: React.Dispatch<React.SetStateAction<Type_ApiResponse>>,
    setApiStatus: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setApiStatus("started");
    getData(endPoint, filters)
      .then((result: any) => {
        if (result.data !== "" && result.status === 200) {
          // Merge the programCounts into the items objects
          result.data.items.forEach((item: any) => {
            const index = result.data.programCounts.findIndex(
              (packet: any) => packet.programTypeId === item.id
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
      getProgramTypeData(
        `/${currentInstitute}/program-types`,
        filterUpdate,
        setProgramTypeData,
        setApiStatus
      );
  }, [refreshData, filterUpdate, currentInstitute]);

  useEffect(() => {
    if (refreshOnDelete === true && currentInstitute > 0)
      getProgramTypeData(
        `/${currentInstitute}/program-types`,
        filterUpdate,
        setProgramTypeData,
        setApiStatus
      );
  }, [refreshOnDelete]);

  const refreshToggle = () => {
    let newBool: boolean = refreshData === true ? false : true;
    setRefreshData(newBool);
  };

  const refreshOnDeleteToggle = (value: boolean) => {
    setRefreshOnDelete(value);
  };

  // get id, name from the department table === >>>
  const editHandlerById = ({ ...getEditHandlerValue }: Type_ProgramTypeObject) => {
    setProgramTypeObj({
      id: getEditHandlerValue.id,
      name: getEditHandlerValue.name,
      published: getEditHandlerValue.published,
      description: getEditHandlerValue.description,
      batchYearRequired: getEditHandlerValue.batchYearRequired,
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
      published: false,
      batchYearRequired: false,
    });
    setRefreshData(false);
  };

  const newPageRequest = (pageRequest: number) => {
    setFilterUpdate({ ...filterUpdate, pageNumber: pageRequest });
  };

  // to update filters values in the main state filterUpdate === >>>
  const updateDepartmentFilter = (departmentId: string) => {
    setFilterUpdate({
      ...filterUpdate,
      departmentId: departmentId,
      pageNumber: 0,
    });
  };

  const updateInputFilters = (inputvalues: string) => {
    setFilterUpdate({ ...filterUpdate, name: inputvalues, pageNumber: 0 });
  };

  return (
    <View
      apiStatus={apiStatus}
      modalShow={modalShow}
      filterUpdate={filterUpdate}
      programTypeObj={programTypeObj}
      programTypeData={programTypeData}
      currentInstitute={currentInstitute}
      setModalShow={setModalShow}
      refreshToggle={refreshToggle}
      newPageRequest={newPageRequest}
      editHandlerById={editHandlerById}
      toggleModalShow={toggleModalShow}
      updateInputFilters={updateInputFilters}
      openAddProgramType={openAddProgramType}
      refreshProgramData={refreshProgramData}
      refreshOnDelete={refreshOnDeleteToggle}
      updateDepartmentFilter={updateDepartmentFilter}
    />
  );
};

export default ProgramType;
