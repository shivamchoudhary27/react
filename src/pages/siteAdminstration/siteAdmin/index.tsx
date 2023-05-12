import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./style.scss";
import { AdminRawData } from "./rawData";
import { Link } from "react-router-dom";
import Header from "../../newHeader";
import Footer from "../../newFooter";
import HeaderTabs from "../../headerTabs";
import BreadcrumbComponent from "../../../widgets/breadcrumb";

const SiteAdminHome = () => {
  return (
    <React.Fragment>
      <Header />
      <HeaderTabs />
      <div className="contentarea-wrapper mt-5">
        <Container className="administration-box">
          <Row>
            {AdminRawData.map((item, index) => (
              <div key={index} className="col-4 mb-4">
                <Link to={item.link} className={`default-item ${item.classname}`}>
                    <h4 className="card-title" dangerouslySetInnerHTML={{ __html: item.title }} />
                    <img src={item.image} alt={item.title} className="img-fluid" />                    
                </Link>
              </div>
            ))}
          </Row>
        </Container>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default SiteAdminHome;
