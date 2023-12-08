import React from "react";
import Header from "../../../../newHeader";
import Footer from "../../../../newFooter";
import { Container } from "react-bootstrap";
import HeaderTabs from "../../../../headerTabs";
import StudentAttendanceTable from "../../table";
import PageTitle from "../../../../../widgets/pageTitle";
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";

type Props = {
  commonProps: {
    dummyData: any[];
  };
};

const Browser = (props: Props) => {
  return (
    <React.Fragment>
      <Header />
      <HeaderTabs activeTab="attendance" />
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
      <Footer />
    </React.Fragment>
  );
};

export default Browser;
