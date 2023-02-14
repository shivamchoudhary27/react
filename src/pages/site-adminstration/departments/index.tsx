import React, { useState, useEffect } from "react";
import { getData as getDepartmentsData } from "../../../adapters/microservices";
import { Container } from "react-bootstrap";
import Header from "../../header";
import Sidebar from "../../sidebar";
import Filter from "./filter";
import DepartmentTable from "./departmentTable";
import DepartmentPagination from "./pagination";
import DepartmentModal from "./departmentModal";
import "./style.scss";

const Departments = () => {
  const [departmentData, setDepartmentData] = useState<any>([]);
  const [modalShow, setModalShow] = useState(false);
  const [departmentObj, setDepartmentObj] = useState({});
  const [refreshData, setRefreshData] = useState(true);

  // department API call === >>>
  useEffect(() => {
    if (refreshData === true) {
      const endPoint = "/departments";
      getDepartmentsData(endPoint)
        .then((result) => {
          if (result.data !== "" && result.status === 200) {
            setDepartmentData(result.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [refreshData]);

  // get id, name from the department table === >>>
  const editHandlerById = ({ id, name }: any) => {
    setDepartmentObj({ id: id, name: name });
  };

  // handle reset Form after SAVE data === >>>
  const resetDepartmentForm = () => {
    setDepartmentObj({id: 0, name: ''});
    setRefreshData(false);
  };

  // handle modal hide & show functionality === >>>
  const toggleModalShow = (status: boolean) => {
    setModalShow(status);
  };

  // handle refresh react table after SAVE data  === >>>
  const refreshDepartmentData = (status: boolean) => {
    setRefreshData(status);
  };

  // <<< ===== JSX CUSTOM COMPONENTS ===== >>>
  const DEPARTMENT_FILTER_COMPONENT = (
    <Filter
      departmentData={departmentData}
      toggleModalShow={toggleModalShow}
      resetDepartmentForm={resetDepartmentForm}
      setDepartmentData={setDepartmentData}
      refreshDepartmentData={refreshDepartmentData}
    />
  );

  const DEPARTMENT_TABLE_COMPONENT = (
    <DepartmentTable
      departmentData={departmentData}
      editHandlerById={editHandlerById}
      toggleModalShow={toggleModalShow}
      refreshDepartmentData={refreshDepartmentData}
    />
  );

  const DEPARTMENT_PAGINATION_COMPONENT = <DepartmentPagination />;

  const DEPARTMENT_MODAL_COMPONENT = (
    <DepartmentModal
      show={modalShow}
      onHide={() => toggleModalShow(false)}
      departmentobj={departmentObj}
      togglemodalshow={toggleModalShow}
      refreshdepartmentdata={refreshDepartmentData}
    />
  );
  // <<< ==== END COMPONENTS ==== >>>

  return (
    <>
      <Header pageHeading="" welcomeIcon={false} />
      <Sidebar />
      <Container fluid>
        <div
          className="contents"
          style={{ paddingLeft: "270px", marginTop: "70px" }}
        >
          <div className="container-wrapper">
            <div className="site-heading">
              <h3>Departments</h3>
            </div>
          </div>
          <hr />
          {DEPARTMENT_FILTER_COMPONENT}
          {DEPARTMENT_TABLE_COMPONENT}
          {DEPARTMENT_PAGINATION_COMPONENT}
          {DEPARTMENT_MODAL_COMPONENT}
        </div>
      </Container>
    </>
  );
};

export default Departments;
