import React from "react";
import { Container } from "react-bootstrap";
import WorkLoadComp from "../../workLoadComp";
import Header from "../../../../../../newHeader";
import Footer from "../../../../../../newFooter";
import HeaderTabs from "../../../../../../headerTabs";
import PageTitle from "../../../../../../../widgets/pageTitle";
import BreadcrumbComponent from "../../../../../../../widgets/breadcrumb";
import { BackgroundWaveBottomLeft, BackgroundWaveRight } from "../../../../../../../widgets/backgroundElements";

type Props = {
  commonProps: {
    apiStatus: any;
    timeSlotList: any;
    workloadData: any;
    currentInstitute: any;
  };
};

const Browser = (props: Props) => {
  return (
    <React.Fragment>
      <Header />
      <HeaderTabs />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "Timetable Management", path: "/timetable" },
          { name: "Faculty Work Load", path: "/workload" },
          { name: "Manage Faculty Work Load", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle
            pageTitle="Manage Faculty Work Load"
            gobacklink="/workload"
          />
          <WorkLoadComp
            apiStatus={props.commonProps.apiStatus}
            timeSlotList={props.commonProps.timeSlotList}
            workloadData={props.commonProps.workloadData}
            currentInstitute={props.commonProps.currentInstitute}
          />
        </Container>
      </div>
      <Footer />
      <BackgroundWaveRight/>
      <BackgroundWaveBottomLeft/>
    </React.Fragment>
  );
};

export default Browser;
