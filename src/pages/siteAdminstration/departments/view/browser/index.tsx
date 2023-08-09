import React from "react";
import Header from "../../../../newHeader";
import Footer from "../../../../newFooter";
import HeaderTabs from "../../../../headerTabs";
import { Container } from "react-bootstrap";
import PageTitle from "../../../../../widgets/pageTitle";
import Errordiv from "../../../../../widgets/alert/errordiv";
import Filters from "../../filters";
import BuildPagination from "../../../../../widgets/pagination";
import DepartmentTable from "../../table";
import DepartmentModal from "../../form";
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";
import {
  TypeDummyData,
  TypeModalShow,
  TypeRefreshOnDelete,
  TypeRefreshData,
  TypeApiStatus,
  CurrentInstitute,
  TypeCurrentInstitute,
  TypeDepartmentObj,
  TypeFilterUpdate,
} from "../../types/type";

type Props = {
  commonProps: {
    departmentData: TypeDummyData;
    editHandlerById: TypeDepartmentObj;
    toggleModalShow: TypeModalShow;
    departmentObj: TypeDepartmentObj;
    refreshToggle: TypeRefreshData;
    resetDepartmentForm: any;
    refreshOnDeleteToggle: TypeRefreshOnDelete;
    apiStatus: TypeApiStatus;
    currentInstitute: CurrentInstitute;
    modalShow: any;
    departmentPermission: any;
    updateInputFilters: any;
    filterUpdate: TypeFilterUpdate;
    newPageRequest: any;
  };
};

const Browser = ({ commonProps }: Props) => {
  const DEPARTMENT_TABLE_COMPONENT = (
    <DepartmentTable
      departmentData={commonProps.departmentData.items}
      editHandlerById={commonProps.editHandlerById}
      toggleModalShow={commonProps.toggleModalShow}
      refreshDepartmentData={commonProps.refreshToggle}
      refreshOnDelete={commonProps.refreshOnDeleteToggle}
      apiStatus={commonProps.apiStatus}
      currentInstitute={commonProps.currentInstitute}
      permissions={commonProps.departmentPermission}
    />
  );

  const DEPARTMENT_MODAL_COMPONENT = (
    <DepartmentModal
      show={commonProps.modalShow}
      onHide={() => commonProps.toggleModalShow(false)}
      departmentobj={commonProps.departmentObj}
      togglemodalshow={commonProps.toggleModalShow}
      refreshdepartmentdata={commonProps.refreshToggle}
      currentInstitute={commonProps.currentInstitute}
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
            toggleModalShow={commonProps.toggleModalShow}
            refreshDepartmentData={commonProps.refreshToggle}
            // setDepartmentData={setDepartmentData}
            updateInputFilters={commonProps.updateInputFilters}
            resetDepartmentForm={commonProps.resetDepartmentForm}
            permissions={commonProps.departmentPermission}
            // updateDepartment={updateDepartmentFilter}
            // updateinputfilters={updateInputFilters}
            // updateCurrentInstitute={updateCurrentInstitute}
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
                totalpages={commonProps.departmentData.pager.totalPages}
                activepage={commonProps.filterUpdate.pageNumber}
                getrequestedpage={commonProps.newPageRequest}
              />
            </>
          )}
          {DEPARTMENT_MODAL_COMPONENT}
        </Container>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Browser;
