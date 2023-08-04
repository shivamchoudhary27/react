import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import "./style.scss";
import { AdminRawData } from "./rawData";
import { Link } from "react-router-dom";
import Header from "../../newHeader";
import Footer from "../../newFooter";
import HeaderTabs from "../../headerTabs";
import BreadcrumbComponent from "../../../widgets/breadcrumb";

const SiteAdminHome = () => {

  const permissions = useSelector(
    (state: any) => state.userAuthorities.permissions
  );

  const renderComponent = (item: any, index: number) => {
    if (item.component === 'user' && !permissions.user.canView) return '';
    if (item.component === 'program' && !permissions.program.canView) return '';
    if (item.component === 'enrolment' && !permissions.enrolment.program.canView) return '';
    if (item.component === 'institute' && !permissions.institute.canView) return '';

    return (              
      <div key={index} className={`box ${item.boxclassname}`}>
        <Link to={item.link} className={`default-item ${item.classname}`}>
            <h4 className="card-title" dangerouslySetInnerHTML={{ __html: item.title }} />
            <img src={item.image} alt={item.title} className="img-fluid" />                    
        </Link>
      </div>
    )
  }

  return (
    <React.Fragment>
      <Header />
      <HeaderTabs activeTab="siteadmin"/>
      <div className="contentarea-wrapper mt-4 mb-5">
      {AdminRawData.map((item, index) => (
        <Container key={index} className={`administration-box row${index + 1}`}>
            {item.map((item, index) => (
              renderComponent(item, index)
            ))}
        </Container>
        ))}
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default SiteAdminHome;
