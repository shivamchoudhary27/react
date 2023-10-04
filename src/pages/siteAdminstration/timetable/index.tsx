import "./style.scss";
import Filters from "./filters";
import Header from "../../newHeader";
import Footer from "../../newFooter";
import HeaderTabs from "../../headerTabs";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import PageTitle from "../../../widgets/pageTitle";
import { pagination } from "../../../utils/pagination";
import Errordiv from "../../../widgets/alert/errordiv";
import BuildPagination from "../../../widgets/pagination";
import BreadcrumbComponent from "../../../widgets/breadcrumb";
import { useSelector } from "react-redux";
import { getData } from "../../../adapters/microservices";
import TimetableTable from "./table";

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

  // <<< ===== JSX CUSTOM COMPONENTS ===== >>>
  const TIMETABLE_FILTER_COMPONENT = (
    <Filters updateInputFilters={updateInputFilters} apiStatus={apiStatus} />
  );

  const TIMETABLE_TABLE_COMPONENT = (
    <TimetableTable
      apiStatus={apiStatus}
      currentInstitute={currentInstitute}
      timeTableData={timeTableData.items}
      editHandlerById={editHandlerById}
      refreshOnDelete={refreshOnDeleteToggle}
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
          { name: "Timetable Management", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle pageTitle="Timetable Management" gobacklink="/siteadmin" />
          {TIMETABLE_FILTER_COMPONENT}
          {TIMETABLE_TABLE_COMPONENT}
          {/* <Errordiv msg="Work in progress..." cstate className="mt-3" /> */}
          <BuildPagination
            totalpages=""
            activepage={filterUpdate.pageNumber}
            getrequestedpage={newPageRequest}
          />
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default TimeTable;
