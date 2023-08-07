import React from "react";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import "./style.scss";
import { AdminRawData } from "./rawData";
import { Link } from "react-router-dom";
import Header from "../../newHeader";
import Footer from "../../newFooter";
import HeaderTabs from "../../headerTabs";

const SiteAdminHome = () => {

  const permissions = useSelector(
    (state: any) => state.userAuthorities.permissions
  );

  const renderComponent = (item: any, index: number) => {
    let componentEnabled = true;
    if (item.component === 'user' && !permissions.user.canView)  {
      componentEnabled = false;
    } else if (item.component === 'program' && !permissions.program.canView) {
      componentEnabled = false;
    } else if (item.component === 'enrolment' && !permissions.enrolment.program.canView) {
      componentEnabled = false;
    } else if (item.component === 'institute' && !permissions.institute.canView) {
      componentEnabled = false;
    }

    item.enabled = !componentEnabled
    item.link = !componentEnabled ? '#' : item.link

    return (              
      <div key={index} className={`box ${item.boxclassname}`}>
        <Link to={item.link} className={`default-item ${item.classname}`}
          style={item.enabled ? { opacity: 0.4, boxShadow: "none",cursor:"not-allowed" } 
            : { opacity: 'none' }}
        >
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
