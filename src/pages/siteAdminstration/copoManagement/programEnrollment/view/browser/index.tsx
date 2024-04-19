import React from "react";
import { Container } from "react-bootstrap";
import PageTitle from "../../../../../../widgets/pageTitle";
import BuildPagination from "../../../../../../widgets/pagination";
import BreadcrumbComponent from "../../../../../../widgets/breadcrumb";
import ProgramEnrollFilter from "../../programEnrollFilter";
import ProgramEnrollTable from "../../programEnrollTable";
import Footer from "../../../../../newFooter";
import Header from "../../../../../newHeader";
import HeaderTabs from "../../../../../headerTabs";

type Props = {
  commonProps: {
    apiStatus: any;
    totalpages: any;
    filterUpdate: any;
    setFilterUpdate:any;
    enrollmentData: any;
    newPageRequest: any;
    updateDepartment: any;
    currentInstitute: any;
    updateinputfilters: any;
  };
};

const Browser = (props: Props) => {
  return (
    <React.Fragment>
      <Header />
      <HeaderTabs activeTab="siteadmin" />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "CO/PO Management", path: "/copoManagement" },
        ]}
      />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
        <PageTitle pageTitle="CO/PO Management" gobacklink="/siteadmin" />
          <ProgramEnrollFilter
            apiStatus={props.commonProps.apiStatus}
            updateDepartment={props.commonProps.updateDepartment}
            updateinputfilters={props.commonProps.updateinputfilters}
            currentInstitute={props.commonProps.currentInstitute}
          />
          <ProgramEnrollTable
            apiStatus={props.commonProps.apiStatus}
            enrollmentData={props.commonProps.enrollmentData}
            setFilterUpdate={props.commonProps.setFilterUpdate}
            filterUpdate={props.commonProps.filterUpdate}
          />

          <BuildPagination
            totalpages={props.commonProps.totalpages}
            getrequestedpage={props.commonProps.newPageRequest}
            activepage={props.commonProps.filterUpdate.pageNumber}
          />
        </Container>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Browser;
