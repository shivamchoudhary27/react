import { useState, useContext } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";
import "./style.scss";
import "react-pro-sidebar/dist/css/styles.css";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import UserContext from "../../features/context/user/user";
import logo from "../../assets/images/logo.png";
import "./style.scss";

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
  const [collapsed, setCollapsed] = useState(false);

  const logout = () => {
      userctx.logout();
      navigate("/");
  };

  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    collapsed ? setCollapsed(false) : setCollapsed(true);
    const headerslide = document.getElementById("headerslide");
    headerslide.classList.toggle("header-slider");
    const coursecontentslide = document.getElementById("contentareaslider");
    coursecontentslide.classList.toggle("content-area-slider");
  };

  return (
    <>
      <ProSidebar
        collapsed={collapsed}
        id="mobile-toggle"
        className="mobile-sidebar"
      >
        <SidebarHeader>
            <div onClick={menuIconClick}>
              {/* changing menu collapse icon on click */}
              {collapsed ? <i className="fas fa-long-arrow-alt-right" /> : <i className="fas fa-long-arrow-alt-left" />}
            </div>
        </SidebarHeader>
        <SidebarContent>
        <Menu iconShape="square">
          <Menuitem>
          {collapsed ? <div className="bl-text" id="high">
              BL
            </div> :
            <div className="logo-bg" id="logowhite">
              <Link to="/dashboard">
                <img className="bl-logo" src={logo} alt="logo.png" />
              </Link>
            </div>
            }
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
              Site Administration
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
        </SidebarContent>
        
      </ProSidebar>
    </>
  );
}
export default Sidebar;
