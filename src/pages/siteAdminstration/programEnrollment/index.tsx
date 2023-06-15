import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import "./style.scss";
import { Container } from "react-bootstrap";
import ProgramEnrollFilter from "./programEnrollFilter";
import ProgramEnrollTable from "./programEnrollTable";
import Header from "../../newHeader";
import Footer from "../../newFooter";
import HeaderTabs from "../../headerTabs";
import { makeGetDataRequest } from "../../../features/api_calls/getdata";
import { pagination } from "../../../utils/pagination";
import BreadcrumbComponent from "../../../widgets/breadcrumb";
import PageTitle from "../../../widgets/pageTitle";

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
  const [apiStatus, setApiStatus] = useState("");
  const currentInstitute = useSelector(state => state.currentInstitute);

  // get programs API call === >>>
  useEffect(() => {
    if (currentInstitute > 0)
    makeGetDataRequest(`/${currentInstitute}/programs`, filterUpdate, setEnrollmentData, setApiStatus);
  }, [refreshData, filterUpdate, currentInstitute]);

  // to update filters values in the main state filterUpdate
  const updateDepartmentFilter = (departmentId: string) => {
    setFilterUpdate({
      ...filterUpdate,
      departmentId: departmentId,
      pageNumber: 0,
    });
  };

  const updateInputFilters = (inputvalues: any) => {
    if (inputvalues.code !== "") {
      setFilterUpdate({
        ...filterUpdate,
        name: inputvalues.name,
        programCode: inputvalues.code,
        pageNumber: 0,
      });
    } else {
      let updatedState = { ...filterUpdate, pageNumber: 0 };
      updatedState.name = inputvalues.name;
      if (updatedState.programCode) delete updatedState.programCode;
      setFilterUpdate(updatedState);
    }
  };

  return (
    <>
      <Header />
      <HeaderTabs activeTab="siteadmin" />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "Program Enrollment", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3">
        <Container fluid>
          <PageTitle pageTitle="Program Enrollment" gobacklink="/siteadmin" />
          <ProgramEnrollFilter
            updateDepartment={updateDepartmentFilter}
            updateinputfilters={updateInputFilters}
          />
          <ProgramEnrollTable enrollmentData={enrollmentData.items} apiStatus={apiStatus} />
        </Container>
      </div>
      <Footer />
    </>
  );
  
};

export default ProgramEnrollment;
