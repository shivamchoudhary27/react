import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import DashboardIcon from "../../assets/images/icons/mb-dashboard-icon.svg";
import DashboardIconActive from "../../assets/images/icons/mb-dashboard-icon-active.svg";
import CalenderIcon from "../../assets/images/icons/mb-calender-icon.svg";
import CalenderIconActive from "../../assets/images/icons/mb-calender-icon-active.svg";
import GradebookIcon from "../../assets/images/icons/mb-gradebook-icon.svg";
import GradebookIconActive from "../../assets/images/icons/mb-gradebook-icon-active.svg";
import PerformanceIcon from "../../assets/images/icons/mb-performance-icon.svg";
import PerformanceIconActive from "../../assets/images/icons/mb-performance-icon-active.svg";
import MenuIcon from "../../assets/images/icons/mb-menu-icon.svg";
import "./mobileStyle.scss";
import Sidebar from "./sidebar";
type Props = {};

const MobileFooter = (props: Props) => {
  const location = useLocation();

  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const closeSidebar = () => {
    setSidebarVisible(false);
  };

  return (
    <footer className="md-stickyFooter">
      <div>
        <ul className="d-flex justify-content-between align-items-center p-0 m-0">
          {footerList.map((list, index) => (
            <Link to={list.link} key={index}>
              <li
                className={`text-center list-unstyled md-footer-list ${
                  location.pathname === list.link ? "active" : ""
                }`}
                onClick={list.title === "Menu" ? toggleSidebar : undefined}
              >
                <img src={
                    location.pathname === list.link
                      ? list.activeIcon
                      : list.inactiveIcon
                  } alt={list.title} />
                <h2 
                  className={`footerTitle ${
                    location.pathname === list.link ? "active" : ""
                  }`}
                >
                  {list.title}
                </h2>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      {isSidebarVisible && <Sidebar onClose={closeSidebar} />}
    </footer>
  );
};

export default MobileFooter;

const footerList = [
  {
    activeIcon: DashboardIconActive,
    inactiveIcon: DashboardIcon,
    title: "Dashboard",
    link: "/dashboard",
  },
  {
    activeIcon: CalenderIconActive,
    inactiveIcon: CalenderIcon, //change this
    title: "Calendar",
    link: "/calender", 
  },
  {
    activeIcon: GradebookIconActive,
    inactiveIcon: GradebookIcon, //change this
    title: "Gradebook",
    link: "/gradebook",
  },
  {
    activeIcon: PerformanceIconActive,
    inactiveIcon:PerformanceIcon, //change this
    title: "Performance",
    link: "#",
  },
  {
    activeIcon: MenuIcon,
    inactiveIcon: MenuIcon,
    title: "Menu",
    link: "#",
  },
];