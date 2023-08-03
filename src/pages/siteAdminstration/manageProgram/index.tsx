import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getData } from "../../../adapters/microservices";
import { pagination } from "../../../utils/pagination";
import BuildPagination from "../../../widgets/pagination";
import Header from "../../newHeader";
import Footer from "../../newFooter";
import HeaderTabs from "../../headerTabs";
import ManageFilter from "./filter";
import ManageTable from "./table";
import BreadcrumbComponent from "../../../widgets/breadcrumb";
import PageTitle from "../../../widgets/pageTitle";
import Errordiv from "../../../widgets/alert/errordiv";

const ManageProgram = () => {
  const navigate = useNavigate();
  const dummyData = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
    institute: 0,
  };
  const [programData, setProgramData] = useState<any>(dummyData);
  const [refreshData, setRefreshData] = useState<boolean>(true);
  const [refreshOnDelete, setRefreshOnDelete] = useState<boolean>(false);
  const [apiStatus, setApiStatus] = useState("");
  const selectedDepartment = useSelector(
    (state) => state.globalFilters.currentDepartmentFilterId
  );
  const [filterUpdate, setFilterUpdate] = useState<any>({
    departmentId: selectedDepartment,
    name: "",
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });
  const currentInstitute = useSelector(
    (state) => state.globalFilters.currentInstitute
  );
  const programAuthorities = useSelector(
    (state: any) => state.userAuthorities.permissions
  );

  const getProgramData = (endPoint: string, filters: any) => {
    setApiStatus("started");
    getData(endPoint, filters)
      .then((result: any) => {
        if (result.data !== "" && result.status === 200) {
          for (const key in result.data.items) {
            if (
              typeof result.data.items[key] === "object" &&
              !Array.isArray(result.data.items[key])
            ) {
              result.data.items[key].instituteId = currentInstitute;
            }
          }
          setProgramData(result.data);
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
      getProgramData(`/${currentInstitute}/programs`, filterUpdate);
  }, [refreshData, filterUpdate, currentInstitute]);

  useEffect(() => {
    if (refreshOnDelete === true && currentInstitute > 0)
      getProgramData(`/${currentInstitute}/programs`, filterUpdate);
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
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle pageTitle={`Program Management`} gobacklink="/siteadmin" />
          <div className="site-button-group mb-3">
            {!programAuthorities.department.canView &&
              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigate("/department")}
              >
                Department
              </Button>            
            }
            {!programAuthorities.programtype.canView &&
              <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate("/programtype")}
              >
                Program Type
              </Button>
            }
            {!programAuthorities.discipline.canView && 
              <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate("/discipline")}
              >
                Discipline
              </Button>
            }
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate("/tags")}
            >
              Tags
            </Button>
          </div>
          <ManageFilter
            updatedepartment={updateDepartmentFilter}
            updateinputfilters={updateInputFilters}
            currentInstitute={currentInstitute}
            programPermissions={programAuthorities.program}
          />
          {!programAuthorities.program.canView ? (
            <Errordiv
              msg="You don't have permission to view programs."
              cstate
              className="mt-3"
            />
          ) : (
            <React.Fragment>
              <ManageTable
                programData={programData.items}
                refreshDepartmentData={refreshToggle}
                refreshOnDelete={refreshOnDeleteToggle}
                apiStatus={apiStatus}
                currentInstitute={currentInstitute}
                programPermissions={programAuthorities.program}
              />
              <BuildPagination
                totalpages={programData.pager.totalPages}
                activepage={filterUpdate.pageNumber}
                getrequestedpage={newPageRequest}
              />
            </React.Fragment>
          )}
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default ManageProgram;
