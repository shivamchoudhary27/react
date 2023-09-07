import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { globalFilterActions } from "../../../store/slices/globalFilters";

type Props = {};

const RolesGlobalFilter = (props: Props) => {
  const dispatch = useDispatch();
  const currentUserRole = useSelector(state => state.globalFilters.currentUserRole);
  const currentRolesList = useSelector((state: any) => state.userInfo);
  const [selectedValue, setSelectedValue] = useState("");
  const [dashboardRoles, setDashboardRoles] = useState([]);
  
  useEffect(() => {
    if (currentRolesList.userInfo.roles["1"].length > 1) {
      const dashboardRoles = currentRolesList.userInfo.roles["1"].filter((el: any) => el.shortName === 'student' || el.shortName === 'teacher' || el.shortName === 'editingteacher')
      setDashboardRoles(dashboardRoles)
    }
    
  }, [currentRolesList]);

  useEffect(() => {
    if (currentRolesList.userInfo.roles["1"].length > 0) {
      if (currentUserRole.id === 0) {
        //  if more than one roles found, then check for higher priority roles here
        //  ....
        //  ....
        setSelectedValue(currentRolesList.userInfo.roles["1"][0].id);
        dispatch(globalFilterActions.currentUserRole({ id: currentRolesList.userInfo.roles["1"][0].id, shortName: currentRolesList.userInfo.roles["1"][0].shortName }))
        localStorage.setItem("currentUserRole", JSON.stringify({ id: currentRolesList.userInfo.roles["1"][0].id, shortName: currentRolesList.userInfo.roles["1"][0].shortName }));
      } else {
        setSelectedValue(currentUserRole.id);
        localStorage.setItem("currentUserRole", JSON.stringify({ id: currentUserRole.id, shortName: currentUserRole.shortName }));
      }
    }
  }, [currentRolesList]);

  const getCurrentValue = (e: any) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const roleShortName = selectedOption.dataset.name;
    setSelectedValue(e.target.value);
    dispatch(globalFilterActions.currentUserRole({ id: e.target.value, shortName: roleShortName }))
    localStorage.setItem("currentUserRole", JSON.stringify({ id: e.target.value, shortName: roleShortName }));
  };

  return (
    <>
      {
        dashboardRoles.length > 0   
          ?
          (
            <div className="row gx-2 me-2">
              <div className="col-auto">
                <label className="col-form-label">Role: </label>
              </div>
              <div className="col-auto">
                <select
                  className="form-select"
                  value={selectedValue}
                  onChange={getCurrentValue}
                  >
                  {dashboardRoles.map((el: any, index: number) => (
                    <option key={index} value={el.id} data-name={el.shortName}>
                      {el.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ) 
          : 
          ("")
        }
    </>
  );
};

export default RolesGlobalFilter;
