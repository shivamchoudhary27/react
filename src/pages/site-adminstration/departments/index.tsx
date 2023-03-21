import { useState, useEffect } from "react";
import { makeGetDataRequest } from "../../../features/api_calls/getdata";
import { Container } from "react-bootstrap";
import Header from "../../header";
import Sidebar from "../../sidebar";
import Filter from "./filter";
import DepartmentTable from "./departmentTable";
import DepartmentModal from "./departmentModal";
import CustomPagination from "../../../widgets/pagination";
import {getTotalPagesCount} from "../../../utils/administration";
import "./style.scss"; 

const Departments = () => {
  const [departmentData, setDepartmentData] = useState<any>([]);
  const [modalShow, setModalShow] = useState(false);
  const [departmentObj, setDepartmentObj] = useState({});
  const [refreshData, setRefreshData] = useState(true);
  const [filterUpdate, setFilterUpdate] = useState<any>({
    departmentId: "",
    name: "",
    pageNumber: 0,
    pageSize: 20,
  });
  const totalPages = getTotalPagesCount(15);

  // get programs API call === >>>
  useEffect(() => {
    makeGetDataRequest("/departments", filterUpdate, setDepartmentData);
  }, [refreshData, filterUpdate]);

  const refreshToggle = () => {
    setRefreshData(!refreshData);
  };

  const updateInputFilters = (inputvalues: any) => {
    setFilterUpdate({ ...filterUpdate, name: inputvalues });
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
      departmentData={departmentData}
      toggleModalShow={toggleModalShow}
      resetDepartmentForm={resetDepartmentForm}
      setDepartmentData={setDepartmentData}
      refreshDepartmentData={refreshToggle}
      updateInputFilters={updateInputFilters}
    />
  );

  const DEPARTMENT_TABLE_COMPONENT = (
    <DepartmentTable
      departmentData={departmentData}
      editHandlerById={editHandlerById}
      toggleModalShow={toggleModalShow}
      refreshDepartmentData={refreshToggle}
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
      <Header pageHeading="Departments" welcomeIcon={false} />
      <div className="main-content-container">
        <Sidebar />
        <div
          className="content-area content-area-slider"
          id="contentareaslider"
        >
          <Container fluid className="administration-wrapper">
            {DEPARTMENT_FILTER_COMPONENT}
            {DEPARTMENT_TABLE_COMPONENT}
            <CustomPagination
              totalpages={totalPages}
              activepage={filterUpdate.pageNumber}
              getrequestedpage={newPageRequest}
            />
            {DEPARTMENT_MODAL_COMPONENT}
          </Container>
        </div>
      </div>
    </>
  );
};

export default Departments;
