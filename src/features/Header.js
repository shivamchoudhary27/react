import React from "react";

const Header = (props) => {
  const imgStyle = {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
  };

  const list = () => {
    alert("hello");
  };

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
          <img src={localStorage.getItem("profile")} style={imgStyle} />
          <span>{localStorage.getItem("name")}</span>
          <i className="bi bi-caret-down-fill" onClick={list}></i>
        </div>
      </header>
    </>
  );
};

export default Header;
