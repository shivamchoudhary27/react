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
      if (currentRolesList.userInfo.roles["1"] === 0) {
        setSelectedValue(currentRolesList.userInfo.roles["1"][0].id);
        dispatch(globalFilterActions.currentUserRole(currentRolesList.userInfo.roles["1"][0]))
        localStorage.setItem("currentUserRole", currentRolesList.userInfo.roles["1"][0].id);
      } else {
        setSelectedValue(currentUserRole);
        localStorage.setItem("currentUserRole", currentUserRole);
      }
    }
  }, [currentRolesList]);

  const getCurrentValue = (e: any) => {
    // console.log(e.target.value);
    // const selectedOption = e.target.options[e.target.selectedIndex];
    setSelectedValue(e.target.value);
    dispatch(globalFilterActions.currentUserRole(e.target.value))
    localStorage.setItem("currentUserRole", e.target.value);
  };

  return (
    <React.Fragment>
      <select
        className="form-select"
        value={selectedValue}
        onChange={getCurrentValue}
      >
        {currentRolesList.userInfo.roles["1"].map((el: any, index: number) => (
          <option key={index} value={el.id} data-name={el.name}>
            {el.name}
          </option>
        ))}
      </select>
    </React.Fragment>
  );
};

export default RolesGlobalFilter;
