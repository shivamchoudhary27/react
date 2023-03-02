import React, { useState, useContext } from "react";
import { Menu, MenuItem, ProSidebar, SidebarHeader } from "react-pro-sidebar";
import "./style.scss";
import "react-pro-sidebar/dist/css/styles.css";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import UserContext from "../../features/context/user/user";
import logo from "../../assets/images/logo.png";

const Menuitem = styled(MenuItem)`
  :hover {
    background-color: transparent;
    padding: unset;
    border-radius: none;
  }
`;
function Sidebar() {
  const navigate = useNavigate();
  const userctx = useContext(UserContext);
  const userSiteAdmin = userctx.userInfo.userissiteadmin ?? 'false';
  const [sidebararrow, setSidebarArrow] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const styles = {
    menuIcon: {
      float: "right",
      margin: "10px",
      marginLeft: "38px",
    },
  };
  const onClickMenuIcon = () => {
    setCollapsed(!collapsed);
    const sample = document.getElementById("high");
    sample.classList.toggle("bl-text");
    const logo = document.getElementById("logowhite");
    logo.classList.toggle("d-none");
    const headerslide = document.getElementById("headerslide");
    headerslide.classList.toggle("header-slider");
    const coursestatusslide = document.getElementById("coursestatusslider");
    coursestatusslide.classList.toggle("course-status-slider");
    const coursecontentslide = document.getElementById("coursecontentslider");
    coursecontentslide.classList.toggle("course-content-slider");
    const recommendcourseslide = document.getElementById(
      "recommendedcourseslider"
    );
    recommendcourseslide.classList.toggle("recommended-course-slider");
    const cataloguecourseslide = document.getElementById(
      "cataloguecourseslider"
    );
    cataloguecourseslide.classList.toggle("catalogue-course-slider");
    const sidebaricon = document.getElementById("sidebaricon");
    sidebaricon.classList.toggle("burger-icon");
    setSidebarArrow(!sidebararrow);
  };
  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      userctx.logout();
      navigate("/");
    }
  };

  return (
    <>
      <ProSidebar
        style={styles.sideBarHeight}
        collapsed={collapsed}
        id="mobile-toggle"
        className="mobile-sidebar"
      >
        <SidebarHeader>
          <div
            role="presentation"
            style={styles.menuIcon}
            onClick={onClickMenuIcon}
            className="hamburger-icon burger-icon"
            id="sidebaricon"
          >
            {sidebararrow === true ? (
              <i className="fas fa-long-arrow-alt-right" />
            ) : (
              <i className="fas fa-long-arrow-alt-left" />
            )}
          </div>
        </SidebarHeader>
        <Menu iconShape="square">
          <Menuitem>
            <div className="logo-bg" id="logowhite">
              <Link to="/dashboard">
                <img className="bl-logo" src={logo} alt="logo.png" />
              </Link>
            </div>
            <div className="bl-text" id="high">
              <div className="bl-logo-text">
                <p className="bl-logo-text-content">BL</p>
              </div>
            </div>
          </Menuitem>
          <Menuitem>
            <Link className="active-link" id="dashboard" to="/dashboard">
              <i className="fa fa-dashboard dashboard-icon" />
              Dashboard
            </Link>
          </Menuitem>
          <Menuitem>
            <Link id="catalogue" to="/catalogue">
              <i className="fa-solid fa-list degree-icon"></i>
              Catalogue
            </Link>
          </Menuitem>
          <Menuitem>
            <Link to="/mod/video/report" id="gradebook">
              <i className="fa fa-file degree-icon" aria-hidden="true" />
              Video Report
            </Link>
          </Menuitem>
          {
          userSiteAdmin ===  'true' &&
          <Menuitem>
            <Link id="" to="/siteadmin">
              <i className="fa-solid fa-user degree-icon"></i>
              Site Admin
            </Link>
          </Menuitem>
          }
          <Menuitem>
            <Link id="" to="/teacherdashboard">
              <i className="fa-solid fa-chalkboard-user degree-icon"></i>
              Teacher Dashboard
            </Link>
          </Menuitem>
          <Menuitem>
            <Link id="" to="/studentdashboard">
              <i className="fas fa-graduation-cap degree-icon" />
              Student Dashboard
            </Link>
          </Menuitem>
          <Menuitem>
            <Link id="" to="/calender">
              <i className="fa-solid fa-calendar-days degree-icon" />
              Calendar
            </Link>
          </Menuitem>
          <Menuitem
            className="catalogue-icon"
            href="/employees"
            onClick={logout}
          >
            <i className="fa fa-sign-out degree-icon" />
            logout
          </Menuitem>
        </Menu>
      </ProSidebar>
    </>
  );
}
export default Sidebar;
