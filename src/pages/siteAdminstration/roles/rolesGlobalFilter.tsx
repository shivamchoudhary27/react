import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";

type Props = {};

const RolesGlobalFilter = (props: Props) => {
  const currentRolesList = useSelector((state: any) => state.userInfo);
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    if (currentRolesList.userInfo.roles["1"].length > 0) {
      if (currentRolesList.userInfo.roles["1"] === 0) {
        setSelectedValue(currentRolesList.userInfo.roles["1"][0].id);
        // dispatch(globalFilterActions.currentInstitute(institutes.items[0].id))
        // localStorage.setItem("institute", institutes.items[0].id);
      } else {
        setSelectedValue(currentRolesList.userInfo.roles["1"]);
        localStorage.setItem("institute", currentRolesList.userInfo.roles["1"]);
      }
    }
  }, [currentRolesList.userInfo.roles["1"]]);

  const getCurrentValue = (e: any) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    setSelectedValue(e.target.value);
    // dispatch(globalFilterActions.currentInstitute(e.target.value))
    // localStorage.setItem("institute", e.target.value);
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
