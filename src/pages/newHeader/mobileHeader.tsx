import React, { useState, useContext } from "react";
import Logo from "../../assets/images/logo-circle.png";
import SearchIcon from "../../assets/images/icons/search-icon.svg";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import "./mobileStyle.scss";
import NotificationOverlay from "../../widgets/notifications";
import config from "../../utils/config";
import UserContext from "../../features/context/user/user";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileDefaultImage from "../../assets/images/profile.png";
import RolesGlobalFilter from "../siteAdminstration/roles/rolesGlobalFilter";
import InstituteFilter from "../siteAdminstration/institute/instituteGlobalFilter";

if (config.WSTOKEN === "") {
  config.WSTOKEN = localStorage.getItem("token");
}

type Props = {};

const MobileHeader = (props: Props) => {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  const userid = userCtx.userInfo.userid ?? 0;
  const fullname = userCtx.userInfo.fullname.toString() ?? "";
  const userpictureurl = userCtx.userInfo.userpictureurl.toString() ?? "";
  const currentUserInfo = useSelector((state: any) => state.userInfo.userInfo);

  const logout = () => {
    userCtx.logout();
    // navigate("/");
  };

  const [searchBoxVisible, setSearchBoxVisible] = useState(false);

  const toggleSearchBox = () => {
    setSearchBoxVisible((prevVisible) => !prevVisible);
  };

  const profileNavigate = () => {
    navigate('/profile');
  }

  return (
    <header className="mb-header py-3">
      <div className="d-flex align-items-center justify-content-between">
        <Link to="/dashboard" className="mb-site-logo">
          <img src={Logo} alt="Ballistic Learning Pvt Ltd" />
        </Link>
        <Nav as="ul" className="mb-navWrapper">
        <InstituteFilter />
        <RolesGlobalFilter />
          {/* <Nav.Item as="li">
            <img src={SearchIcon} alt="Search-icon" onClick={toggleSearchBox} />
          </Nav.Item> */}
          <Nav.Item as="li" className="mb-notification">
            <NotificationOverlay userid={userid} />
          </Nav.Item>

          <Dropdown>
            <Dropdown.Toggle
              variant="link"
              id="dropdown-user-menu"
              className="p-0"
            >
              <span className="rounded-circle mb-user-profile-pix">
                <img
                  className="img-fluid"
                  src={currentUserInfo.files !== undefined && currentUserInfo.files.length > 0 ? currentUserInfo.files[0].url : ProfileDefaultImage}
                  alt={currentUserInfo.first_name}
                />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={profileNavigate}>Profile</Dropdown.Item>
              <Dropdown.Item href="#/action-2" onClick={logout}>
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </div>
      <div
        className={`input-group mt-3 mb-searchbox ${
          searchBoxVisible ? "visible" : "hidden"
        }`}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          aria-label="search"
          aria-describedby="search"
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
        >
          <img src={SearchIcon} alt="Search-icon" />
        </button>
      </div>
    </header>
  );
};
export default MobileHeader;
