// import "./style.scss";
import Filters from "./filters";
import HolidaysModal from "./form";
import HolidaysTable from "./table";
import Header from "../../../newHeader";
import Footer from "../../../newFooter";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import HeaderTabs from "../../../headerTabs";
import PageTitle from "../../../../widgets/pageTitle";
import { pagination } from "../../../../utils/pagination";
import BuildPagination from "../../../../widgets/pagination";
import BreadcrumbComponent from "../../../../widgets/breadcrumb";
import { makeGetDataRequest } from "../../../../features/apiCalls/getdata";
import { getCurrentBatchYear, generateAcademicYears } from "./utils";

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
      year: "",
      holidayDate: "",
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

  const CLASSROOM_TABLE_COMPONENT = (
    <HolidaysTable
      apiStatus={apiStatus}
      currentInstitute={currentInstitute}
      holidaysData={holidaysApiResponseData.items}
      editHandlerById={editHandlerById}
      toggleModalShow={toggleModalShow}
      refreshHolidaysData={refreshToggle}
      refreshOnDelete={refreshOnDeleteToggle}
    />
  );

  const CLASSROOM_MODAL_COMPONENT = (
    <HolidaysModal
      show={modalShow}
      holidaysObj={holidaysObj}
      yearOptions={yearOptions}
      currentInstitute={currentInstitute}
      togglemodalshow={toggleModalShow}
      refreshHolidaysData={refreshToggle}
      onHide={() => toggleModalShow(false)}
      getCurrentBatchYear={getCurrentBatchYear}
    />
  );
  // <<< ==== END COMPONENTS ==== >>>
  return (
    <>
      <Header />
      <HeaderTabs activeTab="siteadmin" />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "Timetable Management", path: "/timetable" },
          { name: "Manage Holidays", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle pageTitle="Manage Holidays" gobacklink="/timetable" />
          <Filters
            apiStatus={apiStatus}
            yearOptions={yearOptions}
            toggleModalShow={toggleModalShow}
            refreshHolidaysData={refreshToggle}
            updateInputFilters={updateInputFilters}
            resetHolidaysForm={resetHolidaysForm}
            updateHolidaysFilter={updateHolidaysFilterByYear}
            filterHandlerByDepartment={filterHandlerByDepartment}
          />
          {CLASSROOM_TABLE_COMPONENT}
          <BuildPagination
            totalpages={holidaysApiResponseData.pager.totalPages}
            activepage={filterUpdate.pageNumber}
            getrequestedpage={newPageRequest}
          />
          {CLASSROOM_MODAL_COMPONENT}
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Holidays;
