import { useState, useEffect } from "react";
import { makeGetDataRequest } from "../../../features/api_calls/getdata";
import { Container } from "react-bootstrap";
import { pagination } from "../../../utils/pagination";
import Header from "../../newHeader";
import Footer from "../../newFooter";
import HeaderTabs from "../../headerTabs";
// import Sidebar from "../../sidebar";
import Filter from "./filter";
import DepartmentTable from "./departmentTable";
import DepartmentModal from "./departmentModal";
import BuildPagination from "../../../widgets/pagination";
import BreadcrumbComponent from "../../../widgets/breadcrumb";
import "./style.scss";

const Departments = () => {
  const dummyData = {items: [], pager: {totalElements: 0, totalPages: 0}}
  const [departmentData, setDepartmentData] = useState<any>(dummyData);
  const [modalShow, setModalShow] = useState(false);
  const [departmentObj, setDepartmentObj] = useState({});
  const [refreshOnDelete, setRefreshOnDelete] = useState<boolean>(false);
  const [refreshData, setRefreshData] = useState(true);
  const [filterUpdate, setFilterUpdate] = useState<any>({
    departmentId: "",
    name: "",
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });

  useEffect(() => {
    if (refreshOnDelete === true) makeGetDataRequest("/departments", filterUpdate, setDepartmentData); 
  }, [refreshOnDelete]);

  // get programs API call === >>>
  useEffect(() => {
    makeGetDataRequest("/departments", filterUpdate, setDepartmentData);
  }, [refreshData, filterUpdate]);

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
      // departmentData={departmentData}
      toggleModalShow={toggleModalShow}
      resetDepartmentForm={resetDepartmentForm}
      // setDepartmentData={setDepartmentData}
      // refreshDepartmentData={refreshToggle}
      updateInputFilters={updateInputFilters}
    />
  );

  const DEPARTMENT_TABLE_COMPONENT = (
    <DepartmentTable
      departmentData={departmentData.items}
      editHandlerById={editHandlerById}
      toggleModalShow={toggleModalShow}
      refreshDepartmentData={refreshToggle}
      refreshOnDelete={refreshOnDeleteToggle}
    />
  );

  const DEPARTMENT_MODAL_COMPONENT = (
    <DepartmentModal
      show={modalShow}
      onHide={() => toggleModalShow(false)}
      departmentobj={departmentObj}
      togglemodalshow={toggleModalShow}
      refreshdepartmentdata={refreshToggle}
    />
  );
  // <<< ==== END COMPONENTS ==== >>>

  return (
    <>
      <Header />
      <HeaderTabs />
      <div className="contentarea-wrapper mt-3">
          <Container fluid className="administration-box">
          <BreadcrumbComponent
            routes={[
              { name: "Site Administration", path: "/siteadmin" },
              { name: "User Management", path: "/manageprogram" },
              { name: "Department", path: "" },
            ]}
          />
            {DEPARTMENT_FILTER_COMPONENT}
            {DEPARTMENT_TABLE_COMPONENT}
            <BuildPagination
              totalpages={departmentData.pager.totalPages}
              activepage={filterUpdate.pageNumber}
              getrequestedpage={newPageRequest}
            />
            {DEPARTMENT_MODAL_COMPONENT}
          </Container>
        </div>
      <Footer />
    </>
  );
};

export default Departments;
