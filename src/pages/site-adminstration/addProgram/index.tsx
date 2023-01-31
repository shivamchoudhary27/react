import React from 'react'
import Header from '../../header'
import Sidebar from '../../sidebar'
import { Container } from 'react-bootstrap'
import AddProgramForm from './form'

const AddProgram = () => {
  return (
    <>
        <Header pageHeading="" welcomeIcon={false} />
        <Sidebar />
        <Container fluid>
        <div className="contents" style={{paddingLeft: '270px', marginTop: '70px'}}>
          <div className="container-wrapper">
            <div className="site-heading">
              <h3>Add Program</h3>
            </div>
          </div>
          <hr />
          <AddProgramForm />
        </div>
      </Container>
    </>
  )
}

export default AddProgram