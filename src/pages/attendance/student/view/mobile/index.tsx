import React from 'react'
import { Container } from 'react-bootstrap'
import StudentAttendanceTable from '../../table'
import PageTitle from '../../../../../widgets/pageTitle'
import MobileHeader from '../../../../newHeader/mobileHeader'
import MobileFooter from '../../../../newFooter/mobileFooter'
import BreadcrumbComponent from '../../../../../widgets/breadcrumb'

type Props = {
  commonProps: {
    dummyData: any[]
  }
}

const Mobile = (props: Props) => {
  return (
    <React.Fragment>
      <MobileHeader />
      <BreadcrumbComponent
        routes={[
          { name: "Dashboard", path: "/dashboard" },
          { name: "Attendance", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mb-wraper">
        <div className="contentarea-wrapper mt-3 mb-5">
          <Container fluid>
            <PageTitle pageTitle="Attendance" gobacklink="/dashboard" />
            <StudentAttendanceTable dummyData={props.commonProps.dummyData} />
            {/* <BuildPagination
              totalpages={props.commonProps.timeslotListPage}
              activepage={props.commonProps.filterUpdate}
              getrequestedpage={props.commonProps.newPageRequest}
            /> */}
          </Container>
        </div>
      </div>
      <MobileFooter />
    </React.Fragment>
  )
}

export default Mobile