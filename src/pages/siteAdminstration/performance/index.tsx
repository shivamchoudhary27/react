import React from 'react'
import Header from "../../newHeader";
import HeaderTabs from "../../headerTabs";
import BreadcrumbComponent from "../../../widgets/breadcrumb";
import { Card, CardBody, Col, Container, Row } from 'react-bootstrap';
import PageTitle from '../../../widgets/pageTitle';
import Footer from '../../newFooter';
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import './style.scss';
import InstituteBarchart from './InstituteBarchart';

const index = () => {
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
<PageTitle pageTitle="Instance Analytics" gobacklink="/dashboard" />

<Row>
<Col md={4} sm={12}>
<Card className='performance-card'>
<div className="cardtitle d-flex justify-content-between align-items-center">
<div>
<h6>Number of programs</h6>
<h5>Created by Institute</h5></div>
<div className="chartnextprev-btn">
<button><GrFormPrevious /></button>
<button><GrFormNext /></button>
</div>
</div>
<div className='my-4'>
<InstituteBarchart/>
</div>

</Card>
</Col>
<Col md={4} sm={12}>
card2
</Col>
<Col md={4} sm={12}>
card3
</Col>
</Row>
</Container>
</div>

<Footer/>
    </React.Fragment>
  )
}

export default index