import React from "react";
import Filters from "../../filters";
import DepartmentModal from "../../form";
import DepartmentTable from "../../table";
import Header from "../../../../newHeader";
import Footer from "../../../../newFooter";
import { Container } from "react-bootstrap";
import HeaderTabs from "../../../../headerTabs";
import PageTitle from "../../../../../widgets/pageTitle";
import Errordiv from "../../../../../widgets/alert/errordiv";
import BuildPagination from "../../../../../widgets/pagination";
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";
import {
  Type_ApiResponse,
  Type_DepartmentObj,
  Type_FilterUpdate,
} from "../../type/type";
import { BackgroundWaveBottomRight, BackgroundWaveTopLeft } from "../../../../../widgets/backgroundElements";

type Props = {
  commonProps: {
    apiStatus: string;
    modalShow: boolean;
    setFilterUpdate:any;
    currentInstitute: number;
    departmentPermission: any;
    filterUpdate: Type_FilterUpdate;
    departmentData: Type_ApiResponse;
    departmentObj: Type_DepartmentObj;
    refreshToggle: () => void;
    resetDepartmentForm: () => void;
    newPageRequest: (params: number) => void;
    updateInputFilters: (params: any) => void;
    toggleModalShow: (params: boolean) => void;
    refreshOnDeleteToggle: (params: boolean) => void;
    editHandlerById: (params: Type_DepartmentObj) => void;
  };
};

const Browser = ({ commonProps }: Props) => {
  const DEPARTMENT_TABLE_COMPONENT = (
    <DepartmentTable
      apiStatus={commonProps.apiStatus}
      permissions={commonProps.departmentPermission}
      currentInstitute={commonProps.currentInstitute}
      departmentData={commonProps.departmentData.items}
      editHandlerById={commonProps.editHandlerById}
      toggleModalShow={commonProps.toggleModalShow}
      refreshDepartmentData={commonProps.refreshToggle}
      refreshOnDelete={commonProps.refreshOnDeleteToggle}
      setFilterUpdate={commonProps.setFilterUpdate}
      filterUpdate={commonProps.filterUpdate}
    />
  );

  const DEPARTMENT_MODAL_COMPONENT = (
    <DepartmentModal
      show={commonProps.modalShow}
      departmentobj={commonProps.departmentObj}
      currentInstitute={commonProps.currentInstitute}
      togglemodalshow={commonProps.toggleModalShow}
      refreshdepartmentdata={commonProps.refreshToggle}
      onHide={() => commonProps.toggleModalShow(false)}
    />
  );

  return (
    <React.Fragment>
      <Header />
      <HeaderTabs activeTab="siteadmin" />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "Manage Program", path: "/manageprogram" },
          { name: "Department", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle pageTitle={`Department`} gobacklink="/manageprogram" />
          <Filters
            // setDepartmentData={setDepartmentData}
            // updateDepartment={updateDepartmentFilter}
            // updateinputfilters={updateInputFilters}
            // updateCurrentInstitute={updateCurrentInstitute}
            apiStatus={commonProps.apiStatus}
            permissions={commonProps.departmentPermission}
            toggleModalShow={commonProps.toggleModalShow}
            refreshDepartmentData={commonProps.refreshToggle}
            updateInputFilters={commonProps.updateInputFilters}
            resetDepartmentForm={commonProps.resetDepartmentForm}
          />
          {!commonProps.departmentPermission.canView ? (
            <Errordiv
              msg="You don't have permission to view deparments."
              cstate
              className="mt-3"
            />
          ) : (
            <>
              {DEPARTMENT_TABLE_COMPONENT}
              <BuildPagination
                activepage={commonProps.filterUpdate.pageNumber}
                totalpages={commonProps.departmentData.pager.totalPages}
                getrequestedpage={commonProps.newPageRequest}
              />
            </>
          )}
          {DEPARTMENT_MODAL_COMPONENT}
        </Container>
      </div>
      <Footer />
    <BackgroundWaveBottomRight/>
    </React.Fragment>
  );
};

export default Browser;
