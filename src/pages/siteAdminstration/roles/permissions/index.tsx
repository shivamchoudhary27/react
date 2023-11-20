import View from "./view";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { pagination } from "../../../../utils/pagination";
import { makeGetDataRequest } from "../../../../features/apiCalls/getdata";

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
  const rolePermissions = useSelector(
    (state: any) => state.userAuthorities.permissions.role
  );

  useEffect(() => {
    makeGetDataRequest(
      `/authorities`,
      filterUpdate,
      setAuthorityList,
      setApiStatus,
      "core-service"
    );
    makeGetDataRequest(
      `/${roleId}/authorities`,
      filterUpdate,
      setRoleAuthorities,
      setApiStatus,
      "core-service"
    );
  }, []);

  useEffect(() => {
    if (authorityList.items.length > 0) {
      const packetSet = new Set(
        roleAuthorities.map((rolePacket: any) => rolePacket.id)
      );

      const updatedArray = authorityList.items.map((authority: any) => {
        const isPresent = packetSet.has(authority.id);
        return { ...authority, permitted: isPresent };
      });

      setPermissionData(updatedArray);
    }
  }, [authorityList, roleAuthorities]);

  return (
    <React.Fragment>
      <View
        roleId={roleId}
        roleName={roleName}
        apiStatus={apiStatus}
        permissionData={permissionData}
        rolePermissions={rolePermissions}
      />
    </React.Fragment>
  );
};

export default Permission;
