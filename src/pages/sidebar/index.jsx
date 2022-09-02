import React, { useState, useContext} from "react";
import {
  Menu, MenuItem, ProSidebar, SidebarHeader,
} from 'react-pro-sidebar';
import './style.scss';
import { AiOutlineMenu } from 'react-icons/ai';
import 'react-pro-sidebar/dist/css/styles.css';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import dashboards from '../../assets/images/dashboards.png';
import mortarboard from '../../assets/images/mortarboard.png';
import page from '../../assets/images/page.png';
import settings from '../../assets/images/settings.png';
import signout from '../../assets/images/signout.png';
import UserContext from '../../features/context/user/user';
import config from '../../utils/config';
import logo from '../../assets/images/logo.png';

const Menuitem = styled(MenuItem)`
  :hover {
    background-color: transparent;
    padding: unset;
    border-radius: none;
  }
`;

function Sidebar() {

  const [collapsed, setCollapsed] = useState(false);
  const userctx = useContext(UserContext);
  const navigate = useNavigate();
  // const [headerslide, setHeaderslide] = useState(false);

  const styles = {
    // sideBarHeight: {
    //   height: "145vh",
    // },
    menuIcon: {
      float: 'right',
      margin: '10px',
    },
  };

  const onClickMenuIcon = () => {
    setCollapsed(!collapsed);
    const sample = document.getElementById('high');
    sample.classList.toggle('bl-text');
    const logo = document.getElementById('logowhite');
    logo.classList.toggle('d-none');
    // const addtodo = useCallback(() =>{
    //   setHeaderslide(current => !current);
    // },[headerslide]);
    const headerslide = document.getElementById('headerslide');
    headerslide.classList.toggle('header-slider');
    const coursestatusslide = document.getElementById('coursestatusslider');
    coursestatusslide.classList.toggle('course-status-slider');
    const coursecontentslide = document.getElementById('coursecontentslider');
    coursecontentslide.classList.toggle('course-content-slider');
    const recommendcourseslide = document.getElementById('recommendedcourseslider');
    recommendcourseslide.classList.toggle('recommended-course-slider');
    const cataloguecourseslide = document.getElementById('cataloguecourseslider');
    cataloguecourseslide.classList.toggle('catalogue-course-slider');
    // const mobilesidebar = document.getElementById("mobile-toggle");
    // mobilesidebar.classList.toggle("mobile-sidebar");
  };

  const logout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      userctx.setUserOff({ userAuth: {}, userInfo: {} });
      config.WSTOKEN = null;
      localStorage.removeItem('token');
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('fullname');
      localStorage.removeItem('userid');
      localStorage.removeItem('name');
      localStorage.removeItem('profile');
      navigate('/');
    }
  };
  return (
    <>
      <SidebarHeader>
        <div
          role="presentation"
          style={styles.menuIcon}
          onClick={onClickMenuIcon}
          className="hamburger-icon"
          // className="hamburger-icon  ${headerslide ? 'header-slider' : ''}"
          // className={headerslide ? 'hamburger-icon header-slider addtodo' : 'hamburger-icon'}
        >
          <AiOutlineMenu />
        </div>
      </SidebarHeader>
      <ProSidebar style={styles.sideBarHeight} collapsed={collapsed} id="mobile-toggle" className="mobile-sidebar">
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
            <Link to="/dashboard">
              <img
                className="dashboard-icon"
                src={dashboards}
                alt="dashboard.png"
              />
              Dashboard
            </Link>
          </Menuitem>
          <Menuitem>
            <Link to="/catalogue">
              <img
                className="degree-icon"
                src={mortarboard}
                alt="mortarboard.png"
              />
              Catalogue
            </Link>
          </Menuitem>
          <Menuitem>
            <Link to="">
              <img className="degree-icon" src={page} alt="page.png" />
              Gradebook
            </Link>
          </Menuitem>
          <Menuitem>
            <Link to="">
              <img className="degree-icon" src={settings} alt="settings.png" />
              Gradebook
            </Link>
          </Menuitem>
          <Menuitem
            className="catalogue-icon"
            href="/employees"
            onClick={logout}
          >
            <img className="degree-icon" src={signout} alt="signout.png" />
            logout
          </Menuitem>
        </Menu>
      </ProSidebar>
    </>
  );
}

export default Sidebar;
