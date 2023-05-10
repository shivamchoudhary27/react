import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import NotificationOverlay from "../../widgets/notifications";
import config from "../../utils/config";
import UserContext from "../../features/context/user/user";
import "./style.scss";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import searchIcon from "../../assets/images/icons/search-icon.svg";

if (config.WSTOKEN === '') {
  config.WSTOKEN = localStorage.getItem('token');
}

const Header = () => {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  const userid = userCtx.userInfo.userid ?? 0;
  const fullname = userCtx.userInfo.fullname.toString() ?? '';
  const userpictureurl = userCtx.userInfo.userpictureurl.toString() ?? '';

  const logout = () => {
    userCtx.logout();
    navigate("/");
  };

  return (
    <header className="d-flex flex-wrap align-items-center justify-content-center site-header">
      <Link to="/dashboard" className="me-auto site-logo">
        <img className="bl-logo" src={logo} alt="Ballistic Learning Pvt Ltd" />
      </Link>

      <Nav as="ul" className="sh-toolbar">
        <Nav.Item as="li">
          <img src={searchIcon} alt="Search" />
        </Nav.Item>
        <Nav.Item as="li" className="sh-notification">
          <NotificationOverlay userid={userid} />
        </Nav.Item>
      </Nav>

      <Dropdown>
        <Dropdown.Toggle variant="link" id="dropdown-user-menu" className="p-0">
          <span className="rounded-circle user-profile-pix">
            <img className="img-fluid" src={userpictureurl} alt={fullname} />
          </span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#/action-2" onClick={logout}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </header>
  );
}

export default Header;