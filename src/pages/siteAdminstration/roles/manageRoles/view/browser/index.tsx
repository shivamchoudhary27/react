import React from "react";
import Filter from "../../filter";
import RolesTable from "../../table";
import AddRole from "../../addRole";
import { Container } from "react-bootstrap";
import Header from "../../../../../newHeader";
import Footer from "../../../../../newFooter";
import AssignInstituteModal from "../../form";
import HeaderTabs from "../../../../../headerTabs";
import PageTitle from "../../../../../../widgets/pageTitle";
import BreadcrumbComponent from "../../../../../../widgets/breadcrumb";
import { BackgroundWaveBottomRight } from "../../../../../../widgets/backgroundElements";

type Props = {
  commonProps: {
    userObj: any;
    userData: any;
    apiStatus: any;
    modalShow: any;
    filterUpdate: any;
    refreshToggle: any;
    setFilterUpdate:any;
    rolePermissions: any;
    editHandlerById: any;
    toggleModalShow: any;
    openAddRoleModal: any;
    currentInstitute: any;
    addRoleModalShow: any;
    updateSearchFilters: any;
    setAddRoleModalShow: any;
    refreshOnDeleteToggle: any;
  };
};

const Browser = (props: Props) => {
  return (
    <React.Fragment>
      <Header />
      <HeaderTabs />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "User Management", path: "/usermanagement" },
          { name: "Manage Roles", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle pageTitle="Manage Roles" gobacklink="/usermanagement" />
          <Filter
            apiStatus={props.commonProps.apiStatus}
            toggleModalShow={props.commonProps.toggleModalShow}
            rolePermissions={props.commonProps.rolePermissions}
            openAddRoleModal={props.commonProps.openAddRoleModal}
            updateSearchFilters={props.commonProps.updateSearchFilters}
          />
          {props.commonProps.rolePermissions.canView && (
            <RolesTable
              userData={props.commonProps.userData}
              apiStatus={props.commonProps.apiStatus}
              editHandlerById={props.commonProps.editHandlerById}
              rolePermissions={props.commonProps.rolePermissions}
              currentInstitute={props.commonProps.currentInstitute}
              setAddRoleModalShow={props.commonProps.setAddRoleModalShow}
              refreshOnDeleteToggle={props.commonProps.refreshOnDeleteToggle}
              setFilterUpdate={props.commonProps.setFilterUpdate}
              filterUpdate={props.commonProps.filterUpdate}
            />
          )}
        </Container>
      </div>
      <AssignInstituteModal
        show={props.commonProps.modalShow}
        userobj={props.commonProps.userObj}
        updateAddRefresh={props.commonProps.refreshToggle}
        togglemodalshow={props.commonProps.toggleModalShow}
        currentInstitute={props.commonProps.currentInstitute}
        onHide={() => props.commonProps.toggleModalShow(false)}
      />
      <AddRole
        userobj={props.commonProps.userObj}
        show={props.commonProps.addRoleModalShow}
        updateAddRefresh={props.commonProps.refreshToggle}
        currentInstitute={props.commonProps.currentInstitute}
        setaddrolemodalshow={props.commonProps.setAddRoleModalShow}
        onHide={() => props.commonProps.setAddRoleModalShow(false)}
      />
      <Footer />
      <BackgroundWaveBottomRight/>
    </React.Fragment>
  );
};

export default Browser;
