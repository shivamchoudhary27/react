import React from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import ProgressBar from 'react-bootstrap/ProgressBar';
import avGreadeIcon from "../../../../assets/images/icons/grade.svg" 
import badgesIcon from "../../../../assets/images/icons/badges.svg" 
import certificateIcon from "../../../../assets/images/icons/certificates.svg" 
import creditsIcon from "../../../../assets/images/icons/credits.svg"
import "./style.scss";

const PerformanceOverview = () => {
  return (
    <>
      <div className="mitblock performanceOverview-block">
        <h3 className="mitblock-title">Performance Overview</h3>
        <div className="mitblock-body">
          <Container fluid>
            <Row>
              {data.map((item, index) => (
                <Col md={6} key={index}>
                  <div className="d-flex align-items-center mt-4 pob-row">
                    <img className="po-icon" src={item.icon} alt="Av. Grade" />
                    <div className="d-flex flex-column flex-fill">
                      <div className="d-flex justify-content-between pob-info">
                        <span>{item.title}</span>
                        <span>{item.value}</span>
                      </div>
                      <ProgressBar now={item.progressValue} />
                    </div>
                  </div>                  
                </Col>
              ))}
            </Row>
          </Container>
        </div>        
      </div>
    </>
  );
};

export default PerformanceOverview;

const data = [
  {
    icon: avGreadeIcon,
    title: "Av. Grade",
    value: "65%",
    progressValue: 35,
  },
  {
    icon: badgesIcon,
    title: "Badges",
    value: "5/14",
    progressValue: 35,
  },
  {
    icon: certificateIcon,
    title: "Certificates",
    value: "4",
    progressValue: 35,
  },
  {
    icon: creditsIcon,
    title: "Credits",
    value: "85",
    progressValue: 35,
  },
];
