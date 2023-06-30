import React from 'react'
import Header from '../../../newHeader'
import Footer from '../../../newFooter'
import HeaderTabs from '../../../headerTabs'
import BreadcrumbComponent from '../../../../widgets/breadcrumb'
import PageTitle from '../../../../widgets/pageTitle'
import { Container } from 'react-bootstrap'
import Filter from './filter'

const AssignRoles = () => {
  return (
    <React.Fragment>
        <Header />
        <HeaderTabs />
        <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "User Management", path: "/usermanagement" },
          { name: "Assign Roles", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3">
        <Container fluid>
          <PageTitle
            pageTitle="Assign Roles (In progress)"
            gobacklink="/usermanagement"
          />
          <Filter />
        </Container>
      </div>
        <Footer />
    </React.Fragment>
  )
}

export default AssignRoles