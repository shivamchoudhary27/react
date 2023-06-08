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
      <HeaderTabs activeTab="siteadmin"/>
      <div className="contentarea-wrapper mt-4">
      {AdminRawData.map((item, index) => (
        <Container key={index} className={`administration-box row${index + 1}`}>
            {item.map((item, index) => (
              <div key={index} className={`box ${item.boxclassname}`}>
                <Link to={item.link} className={`default-item ${item.classname}`}>
                    <h4 className="card-title" dangerouslySetInnerHTML={{ __html: item.title }} />
                    <img src={item.image} alt={item.title} className="img-fluid" />                    
                </Link>
              </div>
            ))}
        </Container>
        ))}
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default SiteAdminHome;
