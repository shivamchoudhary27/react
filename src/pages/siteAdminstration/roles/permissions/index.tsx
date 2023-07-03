import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../../newHeader";
import Footer from "../../../newFooter";
import HeaderTabs from "../../../headerTabs";
import BreadcrumbComponent from "../../../../widgets/breadcrumb";
import PageTitle from "../../../../widgets/pageTitle";
import { Container } from "react-bootstrap";
import Filter from "./filter";
import UserManagement from "./userManagement";
import ProgramManagement from "./programManagement";
import ProgramEnrolment from "./programEnrolment";
import RolePermissionTable from "./table";
import { makeGetDataRequest } from "../../../../features/api_calls/getdata";
import { pagination } from "../../../../utils/pagination";

const Permission = () => {
  const { roleId, roleName } = useParams();
  const dummyData = { items: [], pager: { totalElements: 0, totalPages: 0 } };
  const [authorityList, setAuthorityList] = useState<any>(dummyData);
  const [roleAuthorities, setRoleAuthorities] = useState<any>([]);
  const [permissionData, setPermissionData] = useState<any>([]);
  const [apiStatus, setApiStatus] = useState("");
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE * 10,
  });
  
  useEffect(() => {
    makeGetDataRequest(`/authorities`, filterUpdate, setAuthorityList, setApiStatus, "core-service");
    makeGetDataRequest(`/${roleId}/authorities`, filterUpdate, setRoleAuthorities, setApiStatus, "core-service");
  }, []);

  useEffect(() => {
    if (authorityList.items.length > 0) {
        const packetSet = new Set(roleAuthorities.map((rolePacket : any) => rolePacket.id));

        const updatedArray = authorityList.items.map((authority : any) => {
          const isPresent = packetSet.has(authority.id);
          return { ...authority, permitted: isPresent };
        });

        setPermissionData(updatedArray);
    }
  }, [authorityList, roleAuthorities]);

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
            pageTitle={`Role Permissions : ${roleName}`}
            gobacklink="/manageroles"
          />
          {/* <Filter /> */}
          <RolePermissionTable 
            permissionData={permissionData}
            roleId={roleId}
            apiStatus={apiStatus}
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

export default Permission;
