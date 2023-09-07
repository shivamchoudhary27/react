import "./style.scss";
import Filter from "./filter";
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


const TimeTable = () => {
  const [modalShow, setModalShow] = useState(false);
  const [departmentObj, setDepartmentObj] = useState({});
  const [refreshOnDelete, setRefreshOnDelete] = useState<boolean>(false);
  const [refreshData, setRefreshData] = useState(true);
  const [apiStatus, setApiStatus] = useState("");
  const [filterUpdate, setFilterUpdate] = useState<any>({
    departmentId: "",
    name: "",
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });

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
  const DEPARTMENT_FILTER_COMPONENT = (
    <Filter
      // departmentData={departmentData.items}
      toggleModalShow={toggleModalShow}
      resetDepartmentForm={resetDepartmentForm}
      // setDepartmentData={setDepartmentData}
      // refreshDepartmentData={refreshToggle}
      updateInputFilters={updateInputFilters}
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
          {DEPARTMENT_FILTER_COMPONENT}
          <Errordiv msg="Work in progress..." cstate className="mt-3" />
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
