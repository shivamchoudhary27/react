import Header from "../newHeader";
import Footer from "../newFooter";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import HeaderTabs from "../headerTabs";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import PageTitle from "../../widgets/pageTitle";
import BreadcrumbComponent from "../../widgets/breadcrumb";
import CustomButton from "../../widgets/formInputFields/buttons";

type Props = {};

const AdminSiteConfiguration = (props: Props) => {
  const [key, setKey] = useState("home");
  return (
    <React.Fragment>
      <Header />
      <HeaderTabs activeTab="" />
      <BreadcrumbComponent
        routes={[
          { name: "Dashboard", path: "/dashboard" },
          { name: "Configuration", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mb-wraper">
        <div className="contentarea-wrapper mt-3 mb-5">
          <Container fluid>
            <PageTitle pageTitle="Configuration" gobacklink="/dashboard" />
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row>
                {[...Array(5)].map((_, index: number) => (
                  <>
                    <Col sm={3}>
                      <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                          <Nav.Link eventKey={index}>
                            Label {index + 1}
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </Col>
                    <Col sm={9}>
                      <Tab.Content>
                        <Tab.Pane eventKey={index}>
                          <input
                            type="text"
                            placeholder={`label ${index + 1}`}
                          />
                          <input
                            type="text"
                            placeholder={`description ${index + 1}`}
                          />{" "}
                          <CustomButton
                            type="submit"
                            variant="primary"
                            btnText="Submit"
                          />{" "}
                          <CustomButton
                            type="reset"
                            btnText="Reset"
                            variant="outline-secondary"
                          />
                        </Tab.Pane>
                      </Tab.Content>
                    </Col>
                  </>
                ))}
              </Row>
            </Tab.Container>
          </Container>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default AdminSiteConfiguration;
