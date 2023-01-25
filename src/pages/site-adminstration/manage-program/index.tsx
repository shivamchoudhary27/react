import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../../header';
import Sidebar from '../../sidebar';
import ManageFilter from './manageFilter';
import ManageTable from './manageTable';

const ManageProgram = () => {
  return (
    <>
      <Header pageHeading="" welcomeIcon={false} />
      <Sidebar /> 
        <Container fluid>
        <div className="contents" style={{paddingLeft: '290px', paddingRight: '2%'}}>
          <div className="container-wrapper">
            <div className="site-heading">
              <h3>Manage Programs</h3>
            </div>
          </div>
          <hr />
          <ManageFilter />  
          <ManageTable />
        </div>
      </Container>
    </>
  )
}

export default ManageProgram