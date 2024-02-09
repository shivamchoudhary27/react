import React from "react";
import { Container } from "react-bootstrap";
import PageTitle from "../../../../../widgets/pageTitle";
import BuildPagination from "../../../../../widgets/pagination";
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";
import ProgramEnrollFilter from "../../programEnrollFilter";
import ProgramEnrollTable from "../../programEnrollTable";
import BottomLeftWave from "../../../../../assets/images/background/bg-bottomleft.svg";
import MobileHeader from "../../../../newHeader/mobileHeader";
import MobileFooter from "../../../../newFooter/mobileFooter";

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

const Mobile = (props: Props) => {
  return (
    <React.Fragment>
      <MobileHeader />
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
      <MobileFooter />
    </React.Fragment>
  );
};

export default Mobile;
