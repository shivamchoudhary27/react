import React from "react";
import { Container } from "react-bootstrap";
import PageTitle from "../../../../../widgets/pageTitle";
import MobileHeader from "../../../../newHeader/mobileHeader";
import MobileFooter from "../../../../newFooter/mobileFooter";
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";
import HelpdeskManagementTable from "../../table";

type Props = {
  commonProps: {
    apiStatus: any;
    toggleRepliesModalShow:any;
    helpdeskManagementData: any[];
  }
};

const Mobile = (props: Props) => {
  return (
    <React.Fragment>
      <MobileHeader />
      <BreadcrumbComponent
        routes={[
          { name: "Dashboard", path: "/dashboard" },
          { name: "Helpdesk Management", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mb-wraper">
        <div className="contentarea-wrapper mt-3 mb-5">
          <Container fluid>
            <PageTitle pageTitle="Helpdesk Management" gobacklink="/helpdesk" />

            <HelpdeskManagementTable
              apiStatus={props.commonProps.apiStatus}
              toggleRepliesModalShow= {props.commonProps.toggleRepliesModalShow}
              helpdeskManagementData={props.commonProps.helpdeskManagementData}
            />
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
  );
};

export default Mobile;
