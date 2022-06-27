import React from "react";
import { getUserProfile } from '../features/auth/login/index';

const Header = (props) => {

  return (
    <>
      <header className={`header ${props.currentState ?? null}`}>
        <div className="header-toggle" onClick={props.toggleFun}>
          <i className="bi bi-list"></i>
        </div>

        <div className="header-avatar">
          <i className="bi bi-bell-fill">
            <sup>2</sup>
          </i>
          <i className="bi bi-chat-fill"></i>
          <i className="bi bi-person-circle"></i>
          <span>{localStorage.getItem("name")}</span>
          <i className="bi bi-caret-down-fill"></i>
        </div>
      </header>
    </>
  );
};

export default Header;
