import React from "react";
import { Container } from "react-bootstrap";
import RolePermissionTable from "../../table";
import PageTitle from "../../../../../../widgets/pageTitle";
import MobileHeader from "../../../../../newHeader/mobileHeader";
import MobileFooter from "../../../../../newFooter/mobileFooter";
import BreadcrumbComponent from "../../../../../../widgets/breadcrumb";

type Props = {
  commonProps: {
    roleId: any;
    roleName: any;
    apiStatus: any;
    permissionData: any;
    rolePermissions: any;
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
          { name: "Manage Roles", path: "/manageroles" },
          { name: "Role Permissions", path: "" },
        ]}
      />

      <div className="contentarea-wrapper mb-wraper">
        <div className="contentarea-wrapper mt-3 mb-5">
          <Container fluid>
            <PageTitle
              pageTitle={`Role Permissions : ${props.commonProps.roleName}`}
              gobacklink="/manageroles"
            />
            {/* <Filter /> */}
            <RolePermissionTable
              roleId={props.commonProps.roleId}
              apiStatus={props.commonProps.apiStatus}
              permissionData={props.commonProps.permissionData}
              rolePermissions={props.commonProps.rolePermissions}
            />
            {/* <UserManagement />
          <ProgramManagement />
          <ProgramEnrolment /> */}
          </Container>
        </div>
      </div>
      <MobileFooter />
    </React.Fragment>
  );
};

export default Mobile;
