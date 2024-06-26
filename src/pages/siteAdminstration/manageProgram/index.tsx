
import View from "./view";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { pagination } from "../../../utils/pagination";
import { getData } from "../../../adapters/microservices";

const ManageProgram = () => {
  const dummyData = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
    institute: 0,
  };
  // const [filesIds, setFilesIds] = useState([]);     Not in use Now
  const [apiStatus, setApiStatus] = useState("");
  const [refreshData, setRefreshData] = useState<boolean>(true);
  const [programData, setProgramData] = useState<any>(dummyData);
  const [refreshOnDelete, setRefreshOnDelete] = useState<boolean>(false);
  const selectedDepartment = useSelector(
    (state: any) => state.globalFilters.currentDepartmentFilterId
  );
  const [filterUpdate, setFilterUpdate] = useState<any>({
    departmentId: selectedDepartment,
    name: "",
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
    sortBy: "",
    sortOrder: "",
  });
  const currentInstitute = useSelector(
    (state: any) => state.globalFilters.currentInstitute
  );

  const programAuthorities = useSelector(
    (state: any) => state.userAuthorities.permissions
  );

  const getProgramData = (endPoint: string, filters: any) => {
    setApiStatus("started");
    getData(endPoint, filters)
      .then((result: any) => {
        if (result.data !== "" && result.status === 200) {
          for (const key in result.data.items) {
            if (
              typeof result.data.items[key] === "object" &&
              !Array.isArray(result.data.items[key])
            ) {
              result.data.items[key].instituteId = currentInstitute;
            }
          }
          setProgramData(result.data);
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
    if (currentInstitute > 0 || refreshData === true)
      getProgramData(`/${currentInstitute}/programs`, filterUpdate);
  }, [refreshData, filterUpdate, currentInstitute]);

  useEffect(() => {
    if (refreshOnDelete === true && currentInstitute > 0)
      getProgramData(`/${currentInstitute}/programs`, filterUpdate);
  }, [refreshOnDelete]);

  // ================================================================
  //                      Set Files Ids  ||==-- Not in use Now --==||
  // ================================================================
  // useEffect(() => {
  //   if (programData.items.length > 0) {
  //     programData.items.map((item: any) => {
  //       if (item.files.length > 0 && item.files !== undefined) {
  //         item.files.forEach((fileId: any) => {
  //           setFilesIds((prevFilesIds) => [...prevFilesIds, { id: fileId.id }]);
  //         });
  //       }
  //     });
  //   }
  // }, [programData]);

  // useEffect(() => {
  //   if (filesIds.length > 0) {
  //     postData(`/files`, filesIds)
  //       .then((result: any) => {
  //         if (result.data !== "" && result.status === 200) {
  //         }
  //       })
  //       .catch((err: any) => {
  //         console.log(err);
  //       });
  //   }
  // }, [filesIds]);
  // ============================================================
  //                            End
  // ============================================================

  const refreshToggle = () => {
    setRefreshData(!refreshData);
  };

  const refreshOnDeleteToggle = (value: boolean) => {
    setRefreshOnDelete(value);
  };

  // to update filters values in the main state filterUpdate
  const updateDepartmentFilter = (departmentId: string) => {
    setFilterUpdate({
      ...filterUpdate,
      departmentId: departmentId,
      pageNumber: 0,
    });
  };

  const updateInputFilters = (inputvalues: any) => {
    if (inputvalues.reset !== undefined) {
      let updatedState = { ...filterUpdate, pageNumber: 0 };
      delete updatedState.name;
      delete updatedState.programCode;
      delete updatedState.departmentId;
      setFilterUpdate(updatedState);
      return false;
    }
    if (inputvalues.code !== "") {
      setFilterUpdate({
        ...filterUpdate,
        name: inputvalues.name,
        programCode: inputvalues.code,
        pageNumber: 0,
      });
    } else {
      let updatedState = { ...filterUpdate, pageNumber: 0 };
      updatedState.name = inputvalues.name;
      if (updatedState.programCode) delete updatedState.programCode;
      setFilterUpdate(updatedState);
    }
  };

  const newPageRequest = (pageRequest: number) => {
    setFilterUpdate({ ...filterUpdate, pageNumber: pageRequest });
  };

  return (
      <View
        apiStatus={apiStatus}
        filterUpdate={filterUpdate}
        refreshToggle={refreshToggle}
        programData={programData.items}
        newPageRequest={newPageRequest}
        currentInstitute={currentInstitute}
        updateInputFilters={updateInputFilters}
        programAuthorities={programAuthorities}
        totalPages={programData.pager.totalPages}
        refreshOnDeleteToggle={refreshOnDeleteToggle}
        updateDepartmentFilter={updateDepartmentFilter}
        setFilterUpdate={setFilterUpdate}
      />
      );
    };
    export default ManageProgram;
