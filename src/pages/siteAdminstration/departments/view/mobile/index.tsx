import React from "react";
import Filters from "../../filters";
import DepartmentModal from "../../form";
import DepartmentTable from "../../table";
import { Container } from "react-bootstrap";
import PageTitle from "../../../../../widgets/pageTitle";
import Errordiv from "../../../../../widgets/alert/errordiv";
import MobileHeader from "../../../../newHeader/mobileHeader";
import MobileFooter from "../../../../newFooter/mobileFooter";
import BuildPagination from "../../../../../widgets/pagination";
import {
  Type_ApiResponse,
  Type_DepartmentObj,
  Type_FilterUpdate,
} from "../../types/type";

type Props = {
  commonProps: {
    apiStatus: string;
    modalShow: boolean;
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

const Mobile = ({ commonProps }: Props) => {
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
      <MobileHeader />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle pageTitle={`Department`} gobacklink="/manageprogram" />
          <Filters
            // setDepartmentData={setDepartmentData}
            // updateDepartment={updateDepartmentFilter}
            // updateinputfilters={updateInputFilters}
            // updateCurrentInstitute={updateCurrentInstitute}
            permissions={commonProps.departmentPermission}
            toggleModalShow={commonProps.toggleModalShow}
            refreshDepartmentData={commonProps.refreshToggle}
            updateInputFilters={commonProps.updateInputFilters}
            resetDepartmentForm={commonProps.resetDepartmentForm}
          />
          {!commonProps.departmentPermission.canView ? (
            <Errordiv
              cstate
              className="mt-3"
              msg="You don't have permission to view deparments."
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
      <MobileFooter />
    </React.Fragment>
  );
};

export default Mobile;
