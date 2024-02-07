import React from "react";
import "./mobileStyle.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CloseIcon from "../../assets/images/icons/close-icon.svg";
import AdminIcon from "../../assets/images/icons/admin-color-icon.svg";
import HelpdeskIcon from "../../assets/images/icons/help-desk-color-icon.svg";
import AttendanceIcon from "../../assets/images/icons/mb-attendance.svg";

const Sidebar = ({ onClose }) => {
  const menuPermission = useSelector(
    (state: any) => state.userAuthorities.permissions.menu
  );

  const sidebarIcons = [
    {
      icon: AdminIcon,
      title: "Administration",
      link: "/siteadmin",
    },
    {
      icon: AttendanceIcon,
      title: "Attendance",
      link: "/attendance",
    },
    {
      icon: HelpdeskIcon,
      title: "Help Desk",
      link: "/helpdesk",
    },
  ];

  return (
    <div className="sidebar-overlay">
      <div className="sidebar-content">
        <button className="close-button" onClick={onClose}>
          <img src={CloseIcon} alt="Close" />
        </button>
        <ul className="sidebar-menu">
          {sidebarIcons.map((item, index) => (
            <>
              {item.title === "Administration" &&
              menuPermission.admin.canView ? (
                <li key={index}>
                  <img src={item.icon} alt={item.title} />
                  <Link to={item.link}>{item.title}</Link>
                </li>
              ) : (
                <>
                  {item.title != "Administration" && (
                    <li>
                      <img src={item.icon} alt={item.title} />
                      <Link to={item.link}>{item.title}</Link>
                    </li>
                  )}
                </>
              )}
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
