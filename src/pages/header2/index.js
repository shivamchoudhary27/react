import React from "react";
import { Row } from "react-bootstrap";
import goodbye from "../../assets/images/goodbye.png";
import "../header2/style.scss";

const Header2 = () => {
  return (
    <>
      <header className="dashboard-header">
        <Row className="dashboard-header-row">
          <div className="col-sm-6">
            <div>
              <h1 className="dashboard-header-heading">
                Welcome Back!
                <img className="goodbye-icon" src={goodbye} alt="goodbye.png" />
              </h1>
              <div>
                <ul className="course-status">
                  <li className="course-progress">Inprogress</li>
                  <li>Completed</li>
                  <li>Not Started</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="text-right">
              <ul className="dashboard-items">
                <li>
                  <i class="fa fa-search search-icon"></i>
                </li>
                <li>
                  <i class="fa fa-bell search-icon"></i>
                </li>
                <li>
                  <ul className="user-name">
                    <li className="user-name-content">{localStorage.getItem("fullname")}</li>
                    <li className="username-id">alok@gmail.com</li>
                  </ul>
                </li>
                <li>
                  <img
                    className="user-image-logo"
                    src={localStorage.getItem("profile")}
                    alt="userimage.png"
                  />
                </li>
              </ul>
            </div>
          </div>
        </Row>
      </header>
    </>
  );
};

export default Header2;
