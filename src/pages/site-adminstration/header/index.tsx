import React from "react";
import "./style.scss";
import Logo from "../../../assets/images/logo.png";
import { Container } from "react-bootstrap";
import Menu from "./menu";

const SiteHeader = () => {
  return (
    <>
      <Container>
        <div className="header-wrapper">
          <div className="brand-logo">
            <img src={Logo} alt="logo" />
          </div>
          <div className="search-bar">
            <input
              type="search"
              className="form-control"
              placeholder="Search"
            />
          </div>
          <div className="header-links">
            <div style={{}}>
              <i className="fa-solid fa-bell"></i>
            </div>
            <div>
              <i className="fa-solid fa-circle-user"></i>
              Alkama Azim
            </div>
          </div>
        </div>
      </Container>
      <Menu />
    </>
  );
};

export default SiteHeader;
