import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./style.scss";
import { AdminRawData } from "./rawData";
import { Link } from "react-router-dom";
import Header from "../../newHeader";
import Footer from "../../newFooter";
import HeaderTabs from "../../headerTabs";

const SiteAdminHome = () => {
  return (
    <>
      <Header />
      <HeaderTabs />
      <h3>Site Administration</h3>
      <Container fluid className="administration-wrapper">          
        <Row>
          {AdminRawData.map((item, index) => (
            <Col md={4} sm={6} xs={12} key={index} className="mb-4">
              <Link to={item.link} style={{ textDecoration: "none" }}>
                <div className="card-wrapper">
                  <i className={item.icon}></i>
                  <h4 className="card-title">{item.title}</h4>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default SiteAdminHome;
