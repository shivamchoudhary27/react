import "./style.scss";
import View from "./view";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { pagination } from "../../../../utils/pagination";
import { getData } from "../../../../adapters/microservices";

const TimesSlot = () => {
  const dummyData = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };
  const [departmentList, setDepartmentList] = useState(dummyData);
  const [apiStatus, setApiStatus] = useState("");
  const selectedDepartment = useSelector(
    (state) => state.globalFilters.currentDepartmentFilterId
  );
  const currentInstitute = useSelector(
    (state: any) => state.globalFilters.currentInstitute
  );
  const [filterUpdate, setFilterUpdate] = useState({
    departmentId: selectedDepartment,
    name: "",
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
    sortBy: "",
    sortOrder: "",
  });

  useEffect(() => {
    if (currentInstitute > 0) {
      const endPoint = `/${currentInstitute}/departments`;
      setApiStatus("started");
      getData(endPoint, filterUpdate)
        .then((res: any) => {
          if (res.data !== "" && res.status === 200) {
            setDepartmentList(res.data);
          }
          setApiStatus("finished");
        })
        .catch((err: any) => {
          console.log(err);
          setApiStatus("finished");
        });
    }
  }, [currentInstitute]);

  // to update filters values in the main state filterUpdate               //not in use
  // const updateClassroomFilterByDepartment = (departmentId: string) => {
  //   setFilterUpdate({
  //     ...filterUpdate,
  //     departmentId: departmentId,
  //     pageNumber: 0,
  //   });
  // };

  // const updateInputFilters = (inputvalues: any) => {
  //   setFilterUpdate({ ...filterUpdate, name: inputvalues, pageNumber: 0 });
  // };

  const newPageRequest = (pageRequest: number) => {
    setFilterUpdate({ ...filterUpdate, pageNumber: pageRequest });
  };
                                                            // not in use
  // const filterHandlerByDepartment = (val: string) => {
  //   console.log(val);
  // };

  return (
    <View
      apiStatus={apiStatus}
      filterUpdate={filterUpdate}
      setFilterUpdate={setFilterUpdate}
      departmentList={departmentList.items}
      departmentListPages={departmentList.pager.totalPages}
      newPageRequest={newPageRequest}
    />
  );
};

export default TimesSlot;
