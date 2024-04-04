import React from "react";
import ManageTable from "../../table";
import ManageFilter from "../../filter";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import PageTitle from "../../../../../widgets/pageTitle";
import Errordiv from "../../../../../widgets/alert/errordiv";
import MobileHeader from "../../../../newHeader/mobileHeader";
import MobileFooter from "../../../../newFooter/mobileFooter";
import BuildPagination from "../../../../../widgets/pagination";
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";

type Props = {
  commonProps: {
    apiStatus: any;
    totalPages: any;
    programData: any;
    filterUpdate: any;
    setFilterUpdate:any;
    refreshToggle: any;
    newPageRequest: any;
    currentInstitute: any;
    programAuthorities: any;
    updateInputFilters: any;
    refreshOnDeleteToggle: any;
    updateDepartmentFilter: any;
  };
};

const Mobile = (props: Props) => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <MobileHeader />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "Manage Program", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mb-wraper">
        <div className="contentarea-wrapper mt-3 mb-5">
          <Container fluid>
            <PageTitle
              pageTitle={`Program Management`}
              gobacklink="/siteadmin"
            />
            <div className="site-button-group mb-3">
              {props.commonProps.programAuthorities.department.canView && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => navigate("/department")}
                >
                  Department
                </Button>
              )}
              {props.commonProps.programAuthorities.programtype.canView && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => navigate("/programtype")}
                >
                  Program Type
                </Button>
              )}
              {props.commonProps.programAuthorities.discipline.canView && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => navigate("/discipline")}
                >
                  Discipline
                </Button>
              )}
              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigate("/tags")}
              >
                Tags
              </Button>
            </div>
            <ManageFilter
              apiStatus={props.commonProps.apiStatus}
              currentInstitute={props.commonProps.currentInstitute}
              updateinputfilters={props.commonProps.updateInputFilters}
              updatedepartment={props.commonProps.updateDepartmentFilter}
              programPermissions={props.commonProps.programAuthorities.program}
            />
            {!props.commonProps.programAuthorities.program.canView ? (
              <Errordiv
                msg="You don't have permission to view programs."
                cstate
                className="mt-3"
              />
            ) : (
              <React.Fragment>
                <ManageTable
                  apiStatus={props.commonProps.apiStatus}
                  programData={props.commonProps.programData}
                  currentInstitute={props.commonProps.currentInstitute}
                  refreshDepartmentData={props.commonProps.refreshToggle}
                  refreshOnDelete={props.commonProps.refreshOnDeleteToggle}
                  programPermissions={props.commonProps.programAuthorities.program}
                  setFilterUpdate={props.commonProps.setFilterUpdate}
                  filterUpdate={props.commonProps.filterUpdate}
                
                />
                <BuildPagination
                  totalpages={props.commonProps.totalPages}
                  getrequestedpage={props.commonProps.newPageRequest}
                  activepage={props.commonProps.filterUpdate.pageNumber}
                />
              </React.Fragment>
            )}
          </Container>
        </div>
      </div>
      <MobileFooter />
    </React.Fragment>
  );
};

export default Mobile;
