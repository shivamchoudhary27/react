import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getData, postData } from "../../../../adapters/coreservices";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import { LoadingButton } from "../../../../widgets/formInputFields/buttons";
import Errordiv from "../../../../widgets/alert/errordiv";
import TableSkeleton from "../../../../widgets/skeleton/table";
import { userAuthoritiesActions } from "../../../../store/slices/userRoles";
import "bootstrap/dist/css/bootstrap.min.css";

// const moduleList = [
//   { id: "user", name: "User" },
//   { id: "institute", name: "Institute" },
//   { id: "department", name: "Department" },
//   { id: "program", name: "Program" },
//   { id: "category", name: "Category" },
//   { id: "course", name: "Course" },
//   { id: "role", name: "Role" },
//   { id: "enrolment", name: "Enrolment" },
//   { id: "group", name: "Group" },
//   { id: "tag", name: "Tag" },
//   { id: "menu", name: "menu" },
// ];

const RolePermissionTable = ({
  permissionData,
  roleId,
  apiStatus,
  rolePermissions,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState(permissionData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [moduleList, setModuleList] = useState([]);

  useEffect(() => {
    setData(permissionData);
  }, [permissionData]);

  // dynamic module listing === >>>
  useEffect(() => {
    let arr = [];
    let moduleListArr = [];
    permissionData.map((module) => {
      arr.push(module.module);
    });
    let set = new Set(arr);
    for (const value of set) {
      const id = value.toLowerCase();
      const name = value.charAt(0).toUpperCase() + value.slice(1);
      moduleListArr.push({ id, name });
    }
    setModuleList(moduleListArr);
  }, [permissionData]);

  const togglePermitted = (id) => {
    const updatedData = data.map((item) => {
      if (item.id === id) {
        return { ...item, permitted: !item.permitted };
      }
      return item;
    });
    setData(updatedData);
  };

  const toggleAll = (module) => {
    const categoryData = data.filter((item) => item.module === module);
    const allPermitted = categoryData.every((item) => item.permitted);
    const updatedData = data.map((item) => {
      if (item.module === module) {
        return { ...item, permitted: !allPermitted };
      }
      return item;
    });
    setData(updatedData);
  };

  const isAllSelected = (module) => {
    const categoryData = data.filter((item) => item.module === module);
    return categoryData.every((item) => item.permitted);
  };

  const savePermissions = () => {
    setIsSubmitting(true);
    const permittedAuthorities = data.filter(
      (packet) => packet.permitted === true
    );
    postData(`/${roleId}/authorities`, permittedAuthorities)
      .then((res) => {
        if (res.status === 200) {
          getData("/user-info", {}).then((res) => {
            if (res.data !== "" && res.status === 200) {
              res.data.authorities[1] !== undefined &&
                dispatch(
                  userAuthoritiesActions.updateUserAuthorities(
                    res.data.authorities[1]
                  )
                );
              res.data.authorities[1] !== undefined &&
                localStorage.setItem(
                  "userAuthorities",
                  JSON.stringify(res.data.authorities[1])
                );
            }
          });
          navigate("/manageroles");
          //handle various respponses
        }
        setIsSubmitting(false);
      })
      .catch((err) => {
        console.log(err);
        //handle error reponses
        setIsSubmitting(false);
      });
  };

  return (
    <React.Fragment>
      {moduleList.map(
        (module) =>
          data.some((packetItem) => packetItem.module === module.id) && (
            <React.Fragment>
              <div className="table-responsive admin-table-wrapper">
                <table className="table mb-4">
                  <thead>
                    <tr>
                      <th>{module.name}</th>
                      <th>
                        <input
                          type="checkbox"
                          checked={isAllSelected(module.id)}
                          onChange={() => toggleAll(module.id)}
                        />
                        Check All
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data
                      .filter((item) => item.module === module.id)
                      .map((item) => (
                        <tr key={item.id}>
                          <td>
                            {" " +
                              item.name.charAt(0).toUpperCase() +
                              item.name.slice(1)}
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              checked={item.permitted}
                              onChange={() => togglePermitted(item.id)}
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </React.Fragment>
          )
      )}
      {apiStatus === "started" && permissionData.length === 0 && (
        <TableSkeleton numberOfRows={5} numberOfColumns={4} />
      )}
      {apiStatus === "finished" && permissionData.length === 0 && (
        <Errordiv msg="No permission record found!" cstate className="mt-3" />
      )}
      {rolePermissions.canUpdateAuthority &&
        apiStatus === "finished" &&
        permissionData.length > 0 && (
          <div style={{ textAlign: "center" }}>
            {isSubmitting === false ? (
              <CustomButton
                btnText="Save Permissions"
                type="submit"
                variant="primary"
                disabled=""
                onClick={savePermissions}
              />
            ) : (
              <LoadingButton
                variant="primary"
                btnText="Saving Permissions..."
                className="modal-buttons"
              />
            )}
          </div>
        )}
    </React.Fragment>
  );
};

export default RolePermissionTable;
