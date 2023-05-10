import React, { useState, useEffect } from "react";
import "./style.scss";
import { Container } from "react-bootstrap";
import ProgramEnrollFilter from "./programEnrollFilter";
import ProgramEnrollTable from "./programEnrollTable";
import Header from "../../newHeader";
import Footer from "../../newFooter";
import HeaderTabs from "../../headerTabs";
// import Sidebar from "../../sidebar";
import { makeGetDataRequest } from "../../../features/api_calls/getdata";
import { pagination } from "../../../utils/pagination";
import BreadcrumbComponent from "../../../widgets/breadcrumb";

const ProgramEnrollment = () => {
  const dummyData = { items: [], pager: { totalElements: 0, totalPages: 0 } };
  const [enrollmentData, setEnrollmentData] = useState<any>(dummyData);
  const [refreshData, setRefreshData] = useState<boolean>(true);
  const [filterUpdate, setFilterUpdate] = useState<any>({
    departmentId: "",
    name: "",
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });

  // get programs API call === >>>
  useEffect(() => {
    makeGetDataRequest("/programs", filterUpdate, setEnrollmentData);
  }, [refreshData, filterUpdate]);

  // to update filters values in the main state filterUpdate
  const updateDepartmentFilter = (departmentId : string) => {
    setFilterUpdate({...filterUpdate, departmentId: departmentId, pageNumber: 0})
  }

  const updateInputFilters = (inputvalues : any) => {
    if (inputvalues.code !== '') {
      setFilterUpdate({...filterUpdate, name: inputvalues.name, programCode: inputvalues.code, pageNumber: 0})
    } else {
      let updatedState = {...filterUpdate, pageNumber: 0};
      updatedState.name = inputvalues.name;
      if (updatedState.programCode) delete updatedState.programCode;
      setFilterUpdate(updatedState);
    }
  }

  return (
    <>
      <Header />
      <HeaderTabs />
      <div className="contentarea-wrapper mt-3">
          <Container fluid className="administration-box">
          <BreadcrumbComponent
            routes={[
              { name: "Site Administration", path: "/siteadmin" },
              { name: "Program Enrollment", path: "" },
            ]}
          />
          <h3>Programs</h3>
            <ProgramEnrollFilter updateDepartment={updateDepartmentFilter} updateinputfilters={updateInputFilters} />
            <hr />
            <ProgramEnrollTable enrollmentData={enrollmentData.items} />
          </Container>
        </div>
      <Footer />
    </>
  );
};

export default ProgramEnrollment;
