import React from 'react';
import Header from "../../newHeader";
import HeaderTabs from "../../headerTabs";
import BreadcrumbComponent from "../../../widgets/breadcrumb";
import { Card, Col, Container, Row } from 'react-bootstrap';
import PageTitle from '../../../widgets/pageTitle';
import Footer from '../../newFooter';
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import './style.scss';
import InstituteBarchart from './instanceAnalytics/InstituteBarchart';
import NumberOfStudent from './instanceAnalytics/numberOfStudent';
import GradesOfProgram from './programPerfomanceAnalytics/gradesOfProgram';
import MiniCommonCard from './miniCommonCard';
import ActiveInactiveUser from './activityAnalytics/activeInactiveUser';
import MostVisitedActivity from './activityAnalytics/mostVisitedActivity';
import PopularProgram from './programPerfomanceAnalytics/popularProgram';

const PerformanceCard = ({ title, subtitle, children }) => {
  return (
    <Card className='performance-card'>
      <div className="cardtitle d-flex justify-content-between align-items-center">
        <div>
          <h6>{title}</h6>
          <h5>{subtitle}</h5>
        </div>
        <div className="chartnextprev-btn">
          <button><GrFormPrevious /></button>
          <button><GrFormNext /></button>
        </div>
      </div>
      <div className='my-4'>
        {children}
      </div>
    </Card>
  );
};

const Index = () => {
  return (
    <React.Fragment>
      <Header />
      <HeaderTabs activeTab="performance" />
      <BreadcrumbComponent
        routes={[
          { name: "Dashboard", path: "/dashboard" },
          { name: "Performance", path: "" },
        ]}
      />
      <div className='mt-3'>
        <Container fluid>
          <PageTitle pageTitle="Performance" gobacklink="/dashboard" />
        </Container>
        <div className='mt-3 mb-4'>
          <Container fluid>
            <div className='mb-4 '><h4>Instance Analytics</h4></div>
            <Row>
              <Col md={4} sm={12}>
                <PerformanceCard title="Number of programs" subtitle="Created by Institute">
                  < InstituteBarchart />
                </PerformanceCard>
              </Col>
              <Col md={4} sm={12}>
                <PerformanceCard title="Enrolled by Institute" subtitle="Number of Student">
                  <NumberOfStudent />
                </PerformanceCard>
              </Col>
              <Col>
              <MiniCommonCard />
              </Col>
            </Row>
          </Container>
        </div>
        <div style={{ backgroundColor: "#F4F7FF", padding: "3rem 0" }}>

          <Container fluid >
            <div className='mb-4'><h4>Program Performance Analytics</h4></div>
            <Row>

            <Col md={4} sm={12}>
                <PerformanceCard title="Average" subtitle="Popular Program">
                  <PopularProgram />
                </PerformanceCard>
              </Col>

            <Col md={4} sm={12}>
                <PerformanceCard title="Average" subtitle="Grades Of Program ">
                  <GradesOfProgram />
                </PerformanceCard>
              </Col>

              <Col md={4} sm={12}>
                <PerformanceCard title= "Average" subtitle="Program Completion">
                  <InstituteBarchart />
                </PerformanceCard>
              </Col>

              
            </Row>
          </Container>
        </div>
        </div>

        <div style={{ backgroundColor: "#F4F7FF", padding: "3rem 0" }}>

          <Container fluid >
            <div className='mb-4'><h4>Activity Analytics</h4></div>
            <Row>

            <Col md={4} sm={12}>
                <PerformanceCard title="Activity under program" subtitle="Number of">
                  <MostVisitedActivity />
                </PerformanceCard>
              
              </Col>

             <Col md={4} sm={12}>
                <PerformanceCard title="Active/Inactive user" subtitle="Number of">
                  <ActiveInactiveUser />
                </PerformanceCard>
              
              </Col>

             

            </Row>
          </Container>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default Index;
