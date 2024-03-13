import React, { useContext } from "react";
import {Dropdown,Tooltip, OverlayTrigger} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import NotificationOverlay from "../../widgets/notifications";
import config from "../../utils/config";
import UserContext from "../../features/context/user/user";
import "./style.scss";
import { useNavigate, Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import searchIcon from "../../assets/images/icons/search-icon.svg";
import catalogueIcon from "../../assets/images/icons/catalogue.svg";
import InstituteFilter from "../siteAdminstration/institute/instituteGlobalFilter";
import RolesGlobalFilter from "../siteAdminstration/roles/rolesGlobalFilter";
import { useSelector } from "react-redux";
import ProfileDefaultImage from "../../assets/images/profile.png"

if (config.WSTOKEN === "") {
  config.WSTOKEN = localStorage.getItem("token");
}

const Header = ({ showRightNavs = true }: any) => {
  // const history = useHistory();
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  const userid = userCtx.userInfo.userid ?? 0;
  const currentUserInfo = useSelector((state: any) => state.userInfo.userInfo);

  const logout = () => {
    userCtx.logout();
  };

  const profileNavigate = () => {
    navigate('/profile');
  }

  const configNavigate = () => {
    navigate('/siteconfiguration');
  }

  return (
    <header className="d-flex flex-wrap align-items-center justify-content-center site-header">
      <Link to="/dashboard" className="me-auto site-logo">
        <img className="bl-logo" src={logo} alt="Ballistic Learning Pvt Ltd" />
      </Link>
      {showRightNavs !== false && (
        <React.Fragment>
          
          <Nav as="ul" className="sh-toolbar">
              {/* <OverlayTrigger
                placement="bottom" 
                overlay={<Tooltip id="tooltip-program" style={{ backgroundColor: 'white', color: 'black' }}>Program</Tooltip>}
              > */}
            <Nav.Item as="li">
                <NavLink to="/programlist" className="programlist">
                  <img src={catalogueIcon} alt="Catalog" />
                </NavLink>
            </Nav.Item>
              {/* </OverlayTrigger> */}
          <InstituteFilter />
          <RolesGlobalFilter />
            {/* <Nav.Item as="li">
              <img src={searchIcon} alt="Search" />
            </Nav.Item> */}
            <Nav.Item as="li" className="sh-notification">
              <NotificationOverlay userid={userid} />
            </Nav.Item>
          </Nav>

          <Dropdown>
            <Dropdown.Toggle
              variant="link"
              id="dropdown-user-menu"
              className="p-0"
            >
              <span className="rounded-circle user-profile-pix">
                <img
                  className="img-fluid"
                  src={currentUserInfo.files !== undefined && currentUserInfo.files.length > 0 ? currentUserInfo.files[0].url : ProfileDefaultImage}
                  alt={currentUserInfo.first_name}
                />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {/* <Dropdown.Item href="#/action-2">{fullname}</Dropdown.Item> */}
              <Dropdown.Item onClick={profileNavigate}>Profile</Dropdown.Item>
              <Dropdown.Item onClick={configNavigate}>Site Config</Dropdown.Item>
              <Dropdown.Item href={`${config.OAUTH2_URL}/logout`}>
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </React.Fragment>
      )}
    </header>
  );
};

export default Header;
