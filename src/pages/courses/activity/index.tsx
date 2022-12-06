import React from 'react';
import { Container } from 'react-bootstrap';
import Sidebar from '../../sidebar';
import Header from '../../header';
function ActivityPage() {
  return (
    <>
      <Sidebar />
      <Header />
      <Container>
        <div className="container-fluid page-box">
          <h2>Welcome to activity page (in progress) !</h2>
        </div>
      </Container>
    </>
  );
}
export default ActivityPage;
