import React from "react";
import { Link } from "react-router-dom";
import CloseIcon from "../../assets/images/icons/close-icon.svg";
import AdminIcon from "../../assets/images/icons/admin-color-icon.svg";
import HelpdeskIcon from "../../assets/images/icons/help-desk-color-icon.svg";
import LibraryIcon from "../../assets/images/icons/library-color-icon.svg";

import "./mobileStyle.scss";

const Sidebar = ({ onClose }) => {
  const sidebarIcons = [
    {
      icon: AdminIcon,
      title: "Administration",
      link: "#",
    },
    {
      icon: LibraryIcon,
      title: "Library",
      link: "#",
    },
    {
      icon: HelpdeskIcon,
      title: "Help Desk",
      link: "#",
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
            <li key={index}>
              <img src={item.icon} alt={item.title} />
              <Link to={item.link}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
