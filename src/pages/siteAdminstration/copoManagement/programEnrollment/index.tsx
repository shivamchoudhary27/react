import View from "./view";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { pagination } from "../../../../utils/pagination";
import { makeGetDataRequest } from "../../../../features/apiCalls/getdata";
const ProgramEnrollment = () => {
  const dummyData = { items: [], pager: { totalElements: 0, totalPages: 0 } };
  const [refreshData, setRefreshData] = useState<boolean>(true);
  const [enrollmentData, setEnrollmentData] = useState<any>(dummyData);
  const [filterUpdate, setFilterUpdate] = useState<any>({
    departmentId: "",
    name: "",
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
    sortBy: "",
    sortOrder: "",
    // published: true
  });
  const [apiStatus, setApiStatus] = useState("");
  const currentInstitute = useSelector(
    (state) => state.globalFilters.currentInstitute
  );
  // get programs API call === >>>
  useEffect(() => {
    if (currentInstitute > 0)
      makeGetDataRequest(
        `/${currentInstitute}/programs`,
        filterUpdate,
        setEnrollmentData,
        setApiStatus
      );
  }, [refreshData, filterUpdate, currentInstitute]);

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
      setFilterUpdate={setFilterUpdate}
      newPageRequest={newPageRequest}
      currentInstitute={currentInstitute}
      enrollmentData={enrollmentData.items}
      updateinputfilters={updateInputFilters}
      updateDepartment={updateDepartmentFilter}
      totalpages={enrollmentData.pager.totalPages}
    />
  );
};
export default ProgramEnrollment;
