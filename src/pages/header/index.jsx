import React, { useContext } from "react";
import { Row } from "react-bootstrap";
import goodbye from "../../assets/images/goodbye.png";
import NotificationOverlay from "../../widgets/notifications";
// import Cart from "../cartlist/Cart";
import UserContext from "../../features/context/user/user";
import Dropdown from 'react-bootstrap/Dropdown';
import "./style.scss";

function Header(props) {
  const userCtx = useContext(UserContext);
  const userid = userCtx.userInfo.userid ?? 0;
  const fullname = userCtx.userInfo.fullname ?? '';
  const userpictureurl = userCtx.userInfo.userpictureurl ?? '';

  return (
    <header className="dashboard-header header-slider" id="headerslide">
      <Row className="dashboard-header-row">
        <div className="col-sm-6 welcome-content">
          <div>
            <h2 className="dashboard-header-heading">
              {props.pageHeading !== undefined && props.pageHeading}
              {props.quizHeading !== undefined && props.quizHeading}
              {props.welcomeIcon === true && (
                <img className="goodbye-icon" src={goodbye} alt="goodbye.png" />
              )}
            </h2>
          </div>
        </div>
        <div className="col-sm-6 username-content">
          <div className="text-right">
            <ul className="dashboard-items">
              <li>
                <i className="fa fa-search search-icon" />
              </li>
              <NotificationOverlay userid={userid} />
              {/* <Cart /> */}
              <li className="username-details">
                <ul className="user-name">
                  <li className="user-name-content">{fullname}</li>
                </ul>
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
                    {/* <i class="fa fa-angle-down"></i> */}
                    <Dropdown.Toggle variant="success" id="dropdown-basic"></Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Logout</Dropdown.Item>
                      {/* <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
            </ul>
          </div>
        </div>
      </Row>
    </header>
  );
}

export default Header;
