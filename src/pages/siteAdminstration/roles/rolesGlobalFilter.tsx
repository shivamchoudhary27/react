import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { globalFilterActions } from "../../../store/slices/globalFilters";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import switchrole from "../../../assets/images/icons/switch-role-icon.svg";
import { Button } from "react-bootstrap";

type Props = {};

const RolesGlobalFilter = (props: Props) => {
  const dispatch = useDispatch();
  const currentUserRole = useSelector(state => state.globalFilters.currentUserRole);
  const currentRolesList = useSelector((state: any) => state.userInfo);
  const [selectedValue, setSelectedValue] = useState("");
  const [dashboardRoles, setDashboardRoles] = useState([]);
  
  useEffect(() => {
    if (currentRolesList.userInfo.roles["1"] !== undefined && currentRolesList.userInfo.roles["1"].length > 0) {
      const dashboardRoles = currentRolesList.userInfo.roles["1"].filter((el: any) => el.shortName === 'student' || el.shortName === 'teacher' || el.shortName === 'editingteacher')
      setDashboardRoles(dashboardRoles);

      if (currentUserRole.id === 0 && dashboardRoles.length > 0) {
        const priorityOrder = ["editingteacher", "teacher", "student"];
        let highestPriorityRole = null;

        for (const roleName of priorityOrder) {
          highestPriorityRole = dashboardRoles.find(role => role.shortName === roleName);
          if (highestPriorityRole) {
            break;
          }
        }
        setSelectedValue(highestPriorityRole.id);
        dispatch(globalFilterActions.currentUserRole({ id: highestPriorityRole.id, shortName: highestPriorityRole.shortName }))
        localStorage.setItem("currentUserRole", JSON.stringify({ id: highestPriorityRole.id, shortName: highestPriorityRole.shortName }));
      }
      if (currentUserRole.id != 0) {
        setSelectedValue(currentUserRole.id);
        localStorage.setItem("currentUserRole", JSON.stringify({ id: currentUserRole.id, shortName: currentUserRole.shortName }));
      }

    }
  }, [currentRolesList]);

  // useEffect(() => {
  //   if (currentRolesList.userInfo.roles["1"].length > 0) {
  //     if (currentUserRole.id != 0) {
  //       setSelectedValue(currentUserRole.id);
  //       localStorage.setItem("currentUserRole", JSON.stringify({ id: currentUserRole.id, shortName: currentUserRole.shortName }));
  //     }
  //   }
  // }, [currentRolesList]);

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
        dashboardRoles.length > 1   
          ?
          (
            <div className="switch-role">
              <OverlayTrigger
                trigger={['click']}
                placement="bottom"
                overlay={
                  <Popover id="popover-basic">
                    <Popover.Header as="h3">Switch Role</Popover.Header>
                    <Popover.Body>
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
                    </Popover.Body>
                  </Popover>
                }
                rootClose
              >                
                <Button variant="link" className="head-icon" title="Switch Role">
                <img src={switchrole} alt="Switch Role" />
                </Button>
              </OverlayTrigger>
            </div>
          ) 
          : 
          ("")
        }
    </>
  );
};

export default RolesGlobalFilter;
