import React from "react";
import "./style.scss";
import { Container } from "react-bootstrap";
import BreadcrumbHeader from "./breadcrumbHeader";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <>
      <div className="menu-wrapper">
        <Container>
          <nav className="menu-nav">
            <ul className="menu-list">
              <li>
                <span>
                  <i className="fa-solid fa-dice"></i>
                </span>{" "}
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <span>
                  <i className="fa-solid fa-calendar-days"></i>
                </span>{" "}
                Calendar
              </li>
              <li>
                <span>
                  <i className="fa-solid fa-chart-pie"></i>
                </span>{" "}
                Reports
              </li>
              <li>
                <span>
                  <i className="fa-solid fa-table-cells"></i>
                </span>{" "}
                Gradebook
              </li>
              <li>
                <span>
                  <i className="fa-solid fa-circle-question"></i>
                </span>{" "}
                Help Desk
              </li>
              <li>
                <span>
                  <i className="fa-solid fa-gear"></i>
                </span>{" "}
                Site administration
              </li>
            </ul>
          </nav>
        </Container>
      </div>
      <BreadcrumbHeader />
    </>
  );
};

export default Menu;
