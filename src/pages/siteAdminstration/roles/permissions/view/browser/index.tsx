import React from "react";
import { Container } from "react-bootstrap";
import RolePermissionTable from "../../table";
import Header from "../../../../../newHeader";
import Footer from "../../../../../newFooter";
import HeaderTabs from "../../../../../headerTabs";
import PageTitle from "../../../../../../widgets/pageTitle";
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

const Browser = (props: Props) => {
  return (
    <React.Fragment>
      <Header />
      <HeaderTabs />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "User Management", path: "/usermanagement" },
          { name: "Manage Roles", path: "/manageroles" },
          { name: "Role Permissions", path: "" },
        ]}
      />
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
      <Footer />
    </React.Fragment>
  );
};

export default Browser;
