import "./style.scss";
import View from "./view";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { pagination } from "../../../utils/pagination";
import { getData } from "../../../adapters/microservices";

const TimeTable = () => {
  const dummyData = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };
  const [timeTableData, setTimeTableData] = useState(dummyData);
  const [refreshOnDelete, setRefreshOnDelete] = useState(false);
  const [departmentObj, setDepartmentObj] = useState({});
  const [refreshData, setRefreshData] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [apiStatus, setApiStatus] = useState("");
  const [filterUpdate, setFilterUpdate] = useState<any>({
    departmentId: "",
    name: "",
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
    sortBy: "",
    sortOrder: "",
  });
  const currentInstitute = useSelector(
    (state) => state.globalFilters.currentInstitute
  );

  // timetable call back function === >>>
  const getTimeTableData = (endPoint: string, filters: any) => {
    setApiStatus("started");
    getData(endPoint, filters)
      .then((result: any) => {
        if (result.data !== "" && result.status === 200) {
          // for (const key in result.data.items) {
          //   if (
          //     typeof result.data.items[key] === "object" &&
          //     !Array.isArray(result.data.items[key])
          //   ) {
          //     result.data.items[key].instituteId = currentInstitute;
          //   }
          // }
          setTimeTableData(result.data);
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
      getTimeTableData(`/${currentInstitute}/programs`, filterUpdate);
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
  const editHandlerById = ({ id, name }: any) => {
    setDepartmentObj({ id: id, name: name });
  };

  // handle reset Form after SAVE data === >>>
  const resetDepartmentForm = () => {
    setDepartmentObj({ id: 0, name: "" });
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
    <React.Fragment>
      <View
        apiStatus={apiStatus}
        filterUpdate={filterUpdate}
        currentInstitute={currentInstitute}
        timeTableData={timeTableData.items}
        totalPages={timeTableData.pager.totalPages}
        newPageRequest={newPageRequest}
        editHandlerById={editHandlerById}
        updateInputFilters={updateInputFilters}
        refreshOnDeleteToggle={refreshOnDeleteToggle}
        setFilterUpdate={setFilterUpdate}
      />
    </React.Fragment>
  );
};

export default TimeTable;
