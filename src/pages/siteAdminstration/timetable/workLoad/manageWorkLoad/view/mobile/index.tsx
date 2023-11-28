import React from "react";
import { Container } from "react-bootstrap";
import WorkLoadComp from "../../workLoadComp";
import PageTitle from "../../../../../../../widgets/pageTitle";
import MobileHeader from "../../../../../../newHeader/mobileHeader";
import MobileFooter from "../../../../../../newFooter/mobileFooter";
import BreadcrumbComponent from "../../../../../../../widgets/breadcrumb";

type Props = {
  commonProps: {
    apiStatus: any;
    timeSlotList: any;
    workloadData: any;
    currentInstitute: any;
  };
};

const Mobile = (props: Props) => {
  return (
    <React.Fragment>
      <MobileHeader />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "Timetable Management", path: "/timetable" },
          { name: "Faculty Work Load", path: "/workload" },
          { name: "Manage Faculty Work Load", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mb-wraper">
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
      </div>
      <MobileFooter />
    </React.Fragment>
  );
};

export default Mobile;
