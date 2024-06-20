import React from 'react';
import Header from "../../newHeader";
import HeaderTabs from "../../headerTabs";
import BreadcrumbComponent from "../../../widgets/breadcrumb";
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import PageTitle from '../../../widgets/pageTitle';
import Footer from '../../newFooter';
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import './style.scss';
import "./mobileStyle.scss";
import InstituteBarchart from './instanceAnalytics/InstituteBarchart';
import NumberOfStudent from './instanceAnalytics/numberOfStudent';
import GradesOfProgram from './programPerfomanceAnalytics/gradesOfProgram';
import ActiveInactiveUser from './activityAnalytics/activeInactiveUser';
import MostVisitedActivity from './activityAnalytics/mostVisitedActivity';
import PopularProgram from './programPerfomanceAnalytics/popularProgram';
import ActivityUnderProgram from './activityAnalytics/activityUnderProgram';
import ProgramCompletion from './programPerfomanceAnalytics/programCompletion';
import InstanceStats from './instanceAnalytics/instanceStats';

const PerformanceCard = ({ title, subtitle, children }) => {
  return (
    <Card className='performance-card overflow-hidden'>
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
      <div className='mt-3 mb-1'>
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
              <Col md={4} sm={12}>
                <InstanceStats />
              </Col>
            </Row>
          </Container>
        </div>
        <div style={{ backgroundColor: "#F3F7FA" }} className='py-4'>
          <Container fluid >
            <div className='mb-4 d-flex justify-content-between align-items-center'>
              <h4>Program Performance Analytics</h4>
              <div>
                <select
                  className="form-select"
                  name="topicName"
                >
                  <option value="">Choose Institute</option>
                </select>
              </div>
            </div>
            <Row>
              <Col md={4} sm={12}>
                <PerformanceCard title="Top 5" subtitle="Popular Program">
                  <PopularProgram />
                </PerformanceCard>
              </Col>
              <Col md={4} sm={12}>
                <PerformanceCard title="Average" subtitle="Grades of Program ">
                  <GradesOfProgram />
                </PerformanceCard>
              </Col>
              <Col md={4} sm={12}>
                <PerformanceCard title="Average" subtitle="Program Completion">
                  <ProgramCompletion />
                </PerformanceCard>
              </Col>
            </Row>
            <div className="d-flex justify-content-end mt-4">
              <Button variant="primary">View Details</Button>
            </div>
          </Container>
        </div>
      </div>
      <div className='py-4'>
        <Container fluid >
          <div className='mb-4 d-flex justify-content-between align-items-center'>
            <h4>Activity Analytics</h4>
            <div>
              <select
                className="form-select"
                name="topicName"
              >
                <option value="">Choose Program</option>
              </select>
            </div>
          </div>
          <Row>
            <Col md={4} sm={12}>
              <PerformanceCard title="Top 5" subtitle="Most Visited Activity">
                <MostVisitedActivity />
              </PerformanceCard>
            </Col>
            <Col md={4} sm={12}>
              <PerformanceCard title="Number of" subtitle="Active/Inactive user">
                <ActiveInactiveUser />
              </PerformanceCard>
            </Col>
            <Col md={4} sm={12}>
              <PerformanceCard title="Number of" subtitle="Activity under program">
                <ActivityUnderProgram />
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
