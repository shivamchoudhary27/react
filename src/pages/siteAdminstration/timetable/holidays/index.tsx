// import "./style.scss";
import View from "./view";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { pagination } from "../../../../utils/pagination";
import { getCurrentBatchYear, generateAcademicYears } from "./utils";
import { makeGetDataRequest } from "../../../../features/apiCalls/getdata";

const Holidays = () => {
  const dummyData = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };
  const [holidaysApiResponseData, setHolidaysApiResponseData] =
    useState(dummyData);
  //   const [departmentList, setDepartmentList] = useState(dummyData);
  const [refreshOnDelete, setRefreshOnDelete] = useState(false);
  const [holidaysObj, setHolidaysObj] = useState({});
  const [refreshData, setRefreshData] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [apiStatus, setApiStatus] = useState("");
  const yearOptions = generateAcademicYears();
  const selectedYear = useSelector(
    (state) => state.globalFilters.currentDepartmentFilterId
  );
  const currentInstitute = useSelector(
    (state: any) => state.globalFilters.currentInstitute
  );
  const [filterUpdate, setFilterUpdate] = useState({
    year: selectedYear,
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
    sortBy: "",
    sortOrder: "",
  });

  useEffect(() => {
    if (currentInstitute > 0) {
      let endPoint = `/${currentInstitute}/timetable/holiday`;
      makeGetDataRequest(
        endPoint,
        filterUpdate,
        setHolidaysApiResponseData,
        setApiStatus
      );
    }
  }, [refreshData, filterUpdate, currentInstitute]);

  // API call on delete === >>>
  useEffect(() => {
    if (currentInstitute > 0) {
      let endPoint = `/${currentInstitute}/timetable/holiday`;
      makeGetDataRequest(endPoint, filterUpdate, setHolidaysApiResponseData);
    }
  }, [refreshOnDelete]);

  const refreshToggle = () => {
    setRefreshData(!refreshData);
  };

  const refreshOnDeleteToggle = (value: boolean) => {
    setRefreshOnDelete(value);
  };

  // to update filters values in the main state filterUpdate
  const updateHolidaysFilterByYear = (year: string) => {
    setFilterUpdate({
      ...filterUpdate,
      year: year,
      pageNumber: 0,
    });
  };

  const updateInputFilters = (inputvalues: any) => {
    setFilterUpdate({ ...filterUpdate, year: inputvalues, pageNumber: 0 });
  };

  // get id, name from the department table === >>>
  const editHandlerById = ({ id, name, year, holidayDate }: any) => {
    setHolidaysObj({
      id: id,
      name: name,
      year: year,
      holidayDate: holidayDate,
    });
  };

  // handle reset Form after SAVE data === >>>
  const resetHolidaysForm = () => {
    setHolidaysObj({
      id: 0,
      name: "",
      year: filterUpdate.year,
      holidayDate: "",
    });
    // setRefreshData(false);
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

  return (
    <>
      <View
        modalShow={modalShow}
        apiStatus={apiStatus}
        holidaysObj={holidaysObj}
        yearOptions={yearOptions}
        currentInstitute={currentInstitute}
        filterUpdate={filterUpdate}
        holidaysData={holidaysApiResponseData.items}
        holidaysApiResponseData={holidaysApiResponseData.pager.totalPages}
        refreshToggle={refreshToggle}
        newPageRequest={newPageRequest}
        toggleModalShow={toggleModalShow}
        setFilterUpdate={setFilterUpdate}
        editHandlerById={editHandlerById}
        resetHolidaysForm={resetHolidaysForm}
        updateInputFilters={updateInputFilters}
        getCurrentBatchYear={getCurrentBatchYear}
        refreshOnDeleteToggle={refreshOnDeleteToggle}
        filterHandlerByDepartment={filterHandlerByDepartment}
        updateHolidaysFilterByYear={updateHolidaysFilterByYear}
      />
    </>
  );
};

export default Holidays;
