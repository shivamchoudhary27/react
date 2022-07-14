import React from "react";
import { Link, useLocation } from "react-router-dom";
import NavLinkItem from "../components/navitem";
import Logout from "./auth/logout/logout";

const Sidebar = (props) => {
  const location = useLocation().pathname;

  return (
    <>
      <aside className={` sidebar ${props.currentState ? "show" : null} `}>
        <nav className="nav">
          <div className={` sidebar ${props.currentState ? "show" : null} `}>
            <Link to="" className="nav-logo">
              <NavLinkItem itemName="Homepage" iconClass="bi bi-house-fill nav-logo-icon" itemNameClass="nav-logo-name" />
            </Link>
            <Link to="/dashboard" className={`nav-link ${location === '/dashboard' && 'active'}`}>
              <NavLinkItem itemName="Dashboard" iconClass="bi bi-speedometer2 nav-link-icon" itemNameClass="nav-link-name" />
            </Link>
            <Link to="/mycourse" className={`nav-link ${location === '/mycourse' && 'active'}`}>
              <NavLinkItem itemName="MyCourse" iconClass="bi bi-book nav-link-icon" itemNameClass="nav-link-name" />
            </Link>
            <Link to="" className="nav-link">
              <NavLinkItem itemName="Setting" iconClass="bi bi-gear-fill nav-link-icon" itemNameClass="nav-link-name" />
            </Link>
            <Logout />
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
