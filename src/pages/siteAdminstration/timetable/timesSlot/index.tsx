// import "./style.scss";
import Filters from "./filters";
import TimesSlotTable from "./table";
import Header from "../../../newHeader";
import Footer from "../../../newFooter";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import HeaderTabs from "../../../headerTabs";
import PageTitle from "../../../../widgets/pageTitle";
import { pagination } from "../../../../utils/pagination";
import { getData } from "../../../../adapters/microservices";
import BuildPagination from "../../../../widgets/pagination";
import BreadcrumbComponent from "../../../../widgets/breadcrumb";

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
  });

  useEffect(() => {
    if (currentInstitute > 0) {
      const endPoint = `/${currentInstitute}/departments`;
      setApiStatus('started')
      getData(endPoint, filterUpdate)
      .then((res: any) => {
        if (res.data !== "" && res.status === 200) {
          setDepartmentList(res.data);
        }
        setApiStatus("finished")
      })
      .catch((err: any) => {
        console.log(err)
        setApiStatus("finished")
      })
    }
  }, [currentInstitute]);

  // to update filters values in the main state filterUpdate
  const updateClassroomFilterByDepartment = (departmentId: string) => {
    setFilterUpdate({
      ...filterUpdate,
      departmentId: departmentId,
      pageNumber: 0,
    });
  };

  const updateInputFilters = (inputvalues: any) => {
    setFilterUpdate({ ...filterUpdate, name: inputvalues, pageNumber: 0 });
  };

  const newPageRequest = (pageRequest: number) => {
    setFilterUpdate({ ...filterUpdate, pageNumber: pageRequest });
  };

  const filterHandlerByDepartment = (val: string) => {
    console.log(val);
  };

  const TIMESLOT_TABLE_COMPONENT = (
    <TimesSlotTable
      apiStatus={apiStatus}
      departmentList={departmentList.items}
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
          { name: "Manage Times Slot", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle pageTitle="Manage Times Slot" gobacklink="/timetable" />
          {TIMESLOT_TABLE_COMPONENT}
          <BuildPagination
            totalpages={departmentList.pager.totalPages}
            activepage={filterUpdate.pageNumber}
            getrequestedpage={newPageRequest}
          />
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default TimesSlot;
