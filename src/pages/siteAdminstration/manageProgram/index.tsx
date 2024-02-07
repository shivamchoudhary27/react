
import View from "./view";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { pagination } from "../../../utils/pagination";
import { getData, postData } from "../../../adapters/microservices";

const ManageProgram = () => {
  const dummyData = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
    institute: 0,
  };
  const [programData, setProgramData] = useState<any>(dummyData);
  const [filesIds, setFilesIds] = useState([]);
  const [refreshData, setRefreshData] = useState<boolean>(true);
  const [refreshOnDelete, setRefreshOnDelete] = useState<boolean>(false);
  const [apiStatus, setApiStatus] = useState("");
  const selectedDepartment = useSelector(
    (state: any) => state.globalFilters.currentDepartmentFilterId
  );
  const [filterUpdate, setFilterUpdate] = useState<any>({
    departmentId: selectedDepartment,
    name: "",
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
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
    if (currentInstitute > 0)
      getProgramData(`/${currentInstitute}/programs`, filterUpdate);
  }, [refreshData, filterUpdate, currentInstitute]);

  useEffect(() => {
    if (refreshOnDelete === true && currentInstitute > 0)
      getProgramData(`/${currentInstitute}/programs`, filterUpdate);
  }, [refreshOnDelete]);

  // ============================================================
  //                      Set Files Ids
  // ============================================================
  useEffect(() => {
    if (programData.items.length > 0) {
      programData.items.map((item: any) => {
        if (item.files.length > 0) {
          item.files.forEach((fileId: any) => {
            setFilesIds((prevFilesIds) => [...prevFilesIds, { id: fileId.id }]);
          });
        }
      });
    }
  }, [programData]);

  useEffect(() => {
    if (filesIds.length > 0) {
      postData(`/files`, filesIds)
        .then((result: any) => {
          if (result.data !== "" && result.status === 200) {
            console.log(result.data);
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }, [filesIds]);
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
      // console.log("reseting all input filters", inputvalues);

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
        currentInstitute={currentInstitute}
        programPermissions={programAuthorities.program}
        updateInputFilters={updateInputFilters}
        updateDepartmentFilter={updateDepartmentFilter}
        programData={programData.items}
        filterUpdate={filterUpdate.pageNumber}
        programAuthorities={programAuthorities}
        programDataPager={programData.pager.totalPages}
        refreshToggle={refreshToggle}
        newPageRequest={newPageRequest}
        refreshOnDeleteToggle={refreshOnDeleteToggle}
      />
      );
    };
    export default ManageProgram;
