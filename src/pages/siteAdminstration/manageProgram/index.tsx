import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { makeGetDataRequest } from "../../../features/api_calls/getdata";
import { pagination } from "../../../utils/pagination";
import BuildPagination from "../../../widgets/pagination";
import Header from "../../newHeader";
import Footer from "../../newFooter";
import HeaderTabs from "../../headerTabs";
// import Sidebar from "../../sidebar";
import ManageFilter from "./manageFilter";
import ManageTable from "./manageTable";
import BreadcrumbComponent from "../../../widgets/breadcrumb";
import PageTitle from "../../../widgets/pageTitle";

const ManageProgram = () => {
  const navigate = useNavigate();
  const dummyData = { items: [], pager: { totalElements: 0, totalPages: 0 } };
  const [programData, setProgramData] = useState<any>(dummyData);
  const [refreshData, setRefreshData] = useState<boolean>(true);
  const [refreshOnDelete, setRefreshOnDelete] = useState<boolean>(false);
  const [apiStatus, setApiStatus] = useState("");
  const [filterUpdate, setFilterUpdate] = useState<any>({
    departmentId: "",
    name: "",
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });
  // const totalPages = getTotalPagesCount(15);

  // get programs API call === >>>
  useEffect(() => {
    makeGetDataRequest("/programs", filterUpdate, setProgramData, setApiStatus);
  }, [refreshData, filterUpdate]);

  useEffect(() => {
    if (refreshOnDelete === true)
      makeGetDataRequest("/programs", filterUpdate, setProgramData, setApiStatus);
  }, [refreshOnDelete]);

  const refreshToggle = () => {
    setRefreshData(!refreshData);
  };

  const refreshOnDeleteToggle = (value: boolean) => {
    setRefreshOnDelete(value);
  };

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

  const newPageRequest = (pageRequest: number) => {
    setFilterUpdate({ ...filterUpdate, pageNumber: pageRequest });
  };

  return (
    <>
      <Header />
      <HeaderTabs activeTab="siteadmin" />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "Manage Program", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3">
        <Container fluid>
          <PageTitle pageTitle="Program Management" gobacklink="/siteadmin" />
          <div className="site-button-group mb-3">
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate("/department")}
            >
              Department
            </Button>{" "}
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate("/programtype")}
            >
              Program Type
            </Button>{" "}
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate("/discipline")}
            >
              Discipline
            </Button>{" "}
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate("/tags")}
            >
              Add Tags
            </Button>
          </div>
          <ManageFilter
            updatedepartment={updateDepartmentFilter}
            updateinputfilters={updateInputFilters}
          />
            <ManageTable
              programData={programData.items}
              refreshDepartmentData={refreshToggle}
              refreshOnDelete={refreshOnDeleteToggle}
              apiStatus={apiStatus}
            />

          <BuildPagination
            totalpages={programData.pager.totalPages}
            activepage={filterUpdate.pageNumber}
            getrequestedpage={newPageRequest}
          />
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default ManageProgram;
