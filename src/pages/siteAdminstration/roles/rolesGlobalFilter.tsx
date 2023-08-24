import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { globalFilterActions } from "../../../store/slices/globalFilters";

type Props = {};

const RolesGlobalFilter = (props: Props) => {
  const dispatch = useDispatch();
  const currentUserRole = useSelector(state => state.globalFilters.currentUserRole);
  const currentRolesList = useSelector((state: any) => state.userInfo);
  const [selectedValue, setSelectedValue] = useState("");

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
        currentRolesList.userInfo.roles["1"].length > 1
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
                  {currentRolesList.userInfo.roles["1"].map((el: any, index: number) => (
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
