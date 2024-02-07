import React from "react";
import Header from "../../../../newHeader";
import Footer from "../../../../newFooter";
import { Container } from "react-bootstrap";
import HeaderTabs from "../../../../headerTabs";
import PageTitle from "../../../../../widgets/pageTitle";
import ProgramEnrollTable from "../../programEnrollTable";
import ProgramEnrollFilter from "../../programEnrollFilter";
import BuildPagination from "../../../../../widgets/pagination";
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";
import BottomLeftWave from "../../../../../assets/images/background/bg-bottomleft.svg";

type Props = {
  commonProps: {
    apiStatus: any;
    totalpages: any;
    filterUpdate: any;
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
          { name: "Program Enrollment", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle pageTitle="Program Enrollment" gobacklink="/siteadmin" />
          <ProgramEnrollFilter
            apiStatus={props.commonProps.apiStatus}
            updateDepartment={props.commonProps.updateDepartment}
            updateinputfilters={props.commonProps.updateinputfilters}
            currentInstitute={props.commonProps.currentInstitute}
          />
          <ProgramEnrollTable
            apiStatus={props.commonProps.apiStatus}
            enrollmentData={props.commonProps.enrollmentData}
          />

          <BuildPagination
            totalpages={props.commonProps.totalpages}
            getrequestedpage={props.commonProps.newPageRequest}
            activepage={props.commonProps.filterUpdate.pageNumber}
          />
        </Container>
      </div>
      <Footer />
      <div className="bottomLeftWave">
        <img src={BottomLeftWave} alt="bottom wave" />
      </div>
    </React.Fragment>
  );
};

export default Browser;
