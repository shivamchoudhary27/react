import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
// this icon will be used later for inactive state
// import DashboardIcon from "../../assets/images/icons/mb-dashboard-icon.svg";
import DashboardIcon from "../../assets/images/icons/mb-dashboard-icon-active.svg";
import CalenderIcon from "../../assets/images/icons/mb-calender-icon.svg";
import GradebookIcon from "../../assets/images/icons/mb-gradebook-icon.svg";
import PerformanceIcon from "../../assets/images/icons/mb-performance-icon.svg";
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
            <Link to={list.link}>
              <li
                className={`text-center list-unstyled md-footer-list ${
                  location.pathname === list.link ? "active" : ""
                }`}
                onClick={list.title === "Menu" ? toggleSidebar : undefined}
              >
                <img src={list.icon} alt={list.title} />
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
    icon: DashboardIcon,
    title: "Dashboard",
    link: "/studentdashboard",
  },
  {
    icon: CalenderIcon,
    title: "Calander",
    link: "#",
  },
  {
    icon: GradebookIcon,
    title: "Gradebook",
    link: "#",
  },
  {
    icon: PerformanceIcon,
    title: "Performance",
    link: "#",
  },
  {
    icon: MenuIcon,
    title: "Menu",
    link: "#",
  },
];
