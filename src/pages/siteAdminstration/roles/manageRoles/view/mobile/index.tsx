import React from "react";
import Filter from "../../filter";
import RolesTable from "../../table";
import AddRole from "../../addRole";
import { Container } from "react-bootstrap";
import AssignInstituteModal from "../../form";
import PageTitle from "../../../../../../widgets/pageTitle";
import MobileHeader from "../../../../../newHeader/mobileHeader";
import MobileFooter from "../../../../../newFooter/mobileFooter";
import BreadcrumbComponent from "../../../../../../widgets/breadcrumb";

type Props = {
  commonProps: {
    userObj: any;
    userData: any;
    apiStatus: any;
    modalShow: any;
    refreshToggle: any;
    rolePermissions: any;
    editHandlerById: any;
    toggleModalShow: any;
    openAddRoleModal: any;
    currentInstitute: any;
    filterUpdate: any;
    setFilterUpdate:any;
    addRoleModalShow: any;
    updateSearchFilters: any;
    setAddRoleModalShow: any;
    refreshOnDeleteToggle: any;
  };
};

const Mobile = (props: Props) => {
  return (
    <React.Fragment>
      <MobileHeader />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "User Management", path: "/usermanagement" },
          { name: "Manage Roles", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mb-wraper">
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
                setFilterUpdate={props.commonProps.setFilterUpdate}
                filterUpdate={props.commonProps.filterUpdate}
                setAddRoleModalShow={props.commonProps.setAddRoleModalShow}
                refreshOnDeleteToggle={props.commonProps.refreshOnDeleteToggle}
              />
            )}
          </Container>
        </div>
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
      <MobileFooter />
    </React.Fragment>
  );
};

export default Mobile;
