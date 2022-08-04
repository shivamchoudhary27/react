import { Menu, MenuItem, ProSidebar, SidebarHeader } from "react-pro-sidebar";
import "./style.scss";
import logo from "../../assets/images/logo.png";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import "react-pro-sidebar/dist/css/styles.css";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import dashboards from "../../assets/images/dashboards.png";
import mortarboard from "../../assets/images/mortarboard.png";
import page from "../../assets/images/page.png";
import settings from "../../assets/images/settings.png";
import signout from "../../assets/images/signout.png";

const Menuitem = styled(MenuItem)`
  :hover {
    background-color: transparent;
    padding: unset;
    border-radius: none;
  }
`;

const Sidebar2 = () => {
  const [collapsed, setCollapsed] = useState(false);
  const styles = {
    sideBarHeight: {
      height: "145vh",
    },
    menuIcon: {
      float: "right",
      margin: "10px",
    },
  };

  const onClickMenuIcon = () => {
    setCollapsed(!collapsed);
    const sample = document.getElementById("high");
    const logo = document.getElementById("logowhite");
    sample.classList.toggle("bl-text");
    logo.classList.toggle("d-none");
  };

  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      <SidebarHeader>
        <div
          style={styles.menuIcon}
          onClick={onClickMenuIcon}
          className="hamburger-icon"
        >
          <AiOutlineMenu />
        </div>
      </SidebarHeader>
      <ProSidebar style={styles.sideBarHeight} collapsed={collapsed}>
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
          <Menuitem className="catalogue-icon" href="/employees">
            <Link to="">
              <img
                className="degree-icon"
                src={mortarboard}
                alt="mortarboard.png"
              />
              Catalogue
            </Link>
          </Menuitem>
          <Menuitem className="catalogue-icon" href="/employees">
            <Link to="">
              <img className="degree-icon" src={page} alt="page.png" />
              Gradebook
            </Link>
          </Menuitem>
          <Menuitem className="catalogue-icon" href="/employees">
            <Link to="">
              <img className="degree-icon" src={settings} alt="settings.png" />
              Gradebook
            </Link>
          </Menuitem>
          <Menuitem
            className="catalogue-icon"
            href="/employees"
            onClickCapture={logout}
          >
            <img className="degree-icon" src={signout} alt="signout.png" />
            logout
          </Menuitem>
        </Menu>
      </ProSidebar>
    </>
  );
};

export default Sidebar2;
