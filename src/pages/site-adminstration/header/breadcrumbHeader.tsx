import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const BreadcrumbHeader = () => {
  return (
    <>
      <div className="breadcrumb-wrapper">
        <Container>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/siteadmin" className="breadcrumb-link">Site Administration</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Library
              </li>
            </ol>
          </nav>
        </Container>
      </div>
    </>
  );
};

export default BreadcrumbHeader;
