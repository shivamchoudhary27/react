import React, { useContext } from "react";
import { Row } from "react-bootstrap";
import goodbye from "../../assets/images/goodbye.png";
import NotificationOverlay from "../../widgets/notifications";
import config from "../../utils/config";
// import Cart from "../cartlist/Cart";
import UserContext from "../../features/context/user/user";
// import useUserinfo from "../../features/hooks/userinfo";
import Dropdown from 'react-bootstrap/Dropdown';
import "./style.scss";
import { useNavigate } from "react-router-dom";

if (config.WSTOKEN === '') {
  config.WSTOKEN = localStorage.getItem('token');
}

function Header(props: { pageHeading: string; welcomeIcon: boolean; }){
  // const res = useUserinfo();
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  const userid = userCtx.userInfo.userid ?? 0;
  const fullname = userCtx.userInfo.fullname ?? '';
  const userpictureurl = userCtx.userInfo.userpictureurl ?? '';

  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      userCtx.logout();
      navigate("/");
    }
  };

  return (
    <header className="dashboard-header header-slider" id="headerslide">
      <Row>
        <div className="col-sm-6">
            <h2 className="dashboard-header-heading">
              {props.pageHeading}
              {props.welcomeIcon === true && (
                <img className="goodbye-icon" src={goodbye} alt="goodbye.png" />
              )}
            </h2>
        </div>
        <div className="col-sm-6">
            <ul className="dashboard-items text-right">
              <li>
                <i className="fa fa-search search-icon" />
              </li>
              <NotificationOverlay userid={userid} />
              {/* <Cart /> */}
              <li>
                <b>{fullname}</b>
              </li>
              <li>
                <img
                  className="user-image-logo"
                  src={userpictureurl}
                  alt="userimage"
                />
              </li>
              <li>
                  <Dropdown>
                    <Dropdown.Toggle variant="link" id="dropdown-basic"></Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-2" onClick={logout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
            </ul>
        </div>
      </Row>
    </header>
  );
}

export default Header;
