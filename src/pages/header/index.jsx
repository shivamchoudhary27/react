import React from "react";
import { Row } from "react-bootstrap";
import goodbye from "../../assets/images/goodbye.png";
import "../header/style.scss";
import NotificationOverlay from "../../widgets/notifications";
import Dropdown from 'react-bootstrap/Dropdown';

function Header(props) {
  // const headerContent = props;

  return (
    <>
      <header className="dashboard-header header-slider" id="headerslide">
        <Row className="dashboard-header-row">
          <div className="col-sm-6 welcome-heading">
            <div>
              <h2 className="dashboard-header-heading">
                {props.pageHeading !== undefined && props.pageHeading}
                {props.quizHeading !== undefined &&  props.quizHeading}
                {props.welcomeIcon === true && <img className="goodbye-icon" src={goodbye} alt="goodbye.png" />}
              </h2>
              {/* <div>
                <ul className="course-status">
                  <li className="course-progress">Inprogress</li>
                  <li className="course-progress">Completed</li>
                  <li>Not Started</li>
                </ul>
              </div> */}
            </div>
          </div>
          <div className="col-sm-6">
            <div className="text-right">
              <ul className="dashboard-items">
                <li className="d-none d-md-block">
                  <i className="fa fa-search search-icon"></i>
                </li>
                  <NotificationOverlay />
                <li>
                  <ul className="user-name">
                    <li className="user-name-content">{localStorage.getItem("fullname")}</li>
                    {/* <li className="username-id">exampleid@mail.com</li> */}
                  </ul>
                </li>
                <li>
                  <img
                    className="user-image-logo"
                    src={localStorage.getItem("profile")}
                    alt="userimage"
                  />
                </li>
                <li>
                  <Dropdown>
                    {/* <i class="fa fa-angle-down"></i> */}
                    <Dropdown.Toggle variant="success" id="dropdown-basic"></Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              </ul>
            </div>
          </div>
        </Row>
      </header>
    </>
  );
}

export default Header;
