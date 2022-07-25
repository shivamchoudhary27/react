import React from "react";
import { Link, useLocation } from "react-router-dom";
import NavLinkItem from "../../widgets/navitem";
import Logout from "../../features/auth/logout/logout";
// import classes from "classnames"; 
import style from "./style.module.scss";

const Sidebar = (props) => {
  const location = useLocation().pathname;

  return (
    <>
      <aside className={` ${style.sidebar} ${props.currentState ? "show_sidebar" : null} `}>
        <nav className={style.nav}>
          <div className={` ${style.sidebar}  ${props.currentState ? "show_sidebar" : null} `}>
            <Link to="" className={style.navLogo}>
              <NavLinkItem itemName="Homepage" iconClass={`bi bi-house-fill ${style.navLogoIcon}`} itemNameClass={style.navLogoName} />
            </Link>
            
            {/* <Link to="/dashboard" className={classes(style.navLink, 'active')}>*/}
            <Link to="/dashboard" className={`${style.navLink} ${location === '/dashboard' && style.active}`}>
              <NavLinkItem itemName="Dashboard" iconClass="bi bi-speedometer2 nav-link-icon" itemNameClass="nav-link-name" />
            </Link>
            <Link to="/mycourse" className={`${style.navLink} ${location === '/mycourse' && style.active}`}>
              <NavLinkItem itemName="MyCourse" iconClass="bi bi-book nav-link-icon" itemNameClass="nav-link-name" />
            </Link>
            <Link to="" className={style.navLink}>
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
