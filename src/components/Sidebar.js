import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";

const Sidebar = (props) => {
  return (
    <>
      <aside className={` sidebar ${props.currentState ? "show" : null} `}>
        <nav className="nav">
          <div className={` sidebar ${props.currentState ? "show" : null} `}>
            <Link to="/" className="nav-logo">
              <i className="bi bi-house-fill nav-logo-icon"></i>
              <span className="nav-logo-name">Homepage</span>
            </Link>
            <Link to="/dashboard" className="nav-link active">
              <i className="bi bi-speedometer2 nav-link-icon"></i>
              <span className="nav-link-name">Dashboard</span>
            </Link>
            <Link to="/mycourse" className="nav-link">
              <i className="bi bi-book nav-link-icon"></i>
              <span className="nav-link-name">MyCourse</span>
            </Link>
            <Link to="" className="nav-link">
              <i className="bi bi-pen-fill nav-link-icon"></i>
              <span className="nav-link-name">Assignment</span>
            </Link>
            <Link to="" className="nav-link">
              <i className="bi bi-award-fill nav-link-icon"></i>
              <span className="nav-link-name">Quiz</span>
            </Link>
            <Link to="" className="nav-link">
              <i className="bi bi-gear-fill nav-link-icon"></i>
              <span className="nav-link-name">Setting</span>
            </Link>
            <Logout />
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
