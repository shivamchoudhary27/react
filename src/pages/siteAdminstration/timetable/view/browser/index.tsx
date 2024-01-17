import React from "react";
import Filters from "../../filters";
import TimetableTable from "../../table";
import Header from "../../../../newHeader";
import Footer from "../../../../newFooter";
import { Container } from "react-bootstrap";
import HeaderTabs from "../../../../headerTabs";
import PageTitle from "../../../../../widgets/pageTitle";
import BuildPagination from "../../../../../widgets/pagination";
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";

type Props = {
  commonProps: {
    apiStatus: any;
    filterUpdate: any;
    timeTableData: any;
    newPageRequest: any;
    editHandlerById: any;
    currentInstitute: any;
    updateInputFilters: any;
    refreshOnDeleteToggle: any;
  };
};

const Browser = (props: Props) => {
  // <<< ===== JSX CUSTOM COMPONENTS ===== >>>
  const TIMETABLE_FILTER_COMPONENT = (
    <Filters
      apiStatus={props.commonProps.apiStatus}
      updateInputFilters={props.commonProps.updateInputFilters}
    />
  );

  const TIMETABLE_TABLE_COMPONENT = (
    <TimetableTable
      apiStatus={props.commonProps.apiStatus}
      timeTableData={props.commonProps.timeTableData}
      editHandlerById={props.commonProps.editHandlerById}
      currentInstitute={props.commonProps.currentInstitute}
      refreshOnDelete={props.commonProps.refreshOnDeleteToggle}
    />
  );
  // <<< ==== END COMPONENTS ==== >>>

  return (
    <React.Fragment>
      <Header />
      <HeaderTabs activeTab="siteadmin" />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "Timetable Management", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle pageTitle="Timetable Management" gobacklink="/siteadmin" />
          {TIMETABLE_FILTER_COMPONENT}
          {TIMETABLE_TABLE_COMPONENT}
          {/* <Errordiv msg="Work in progress..." cstate className="mt-3" /> */}
          <BuildPagination
            totalpages={props.commonProps.timeTableData}
            activepage={props.commonProps.filterUpdate}
            getrequestedpage={props.commonProps.newPageRequest}
          />
        </Container>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Browser;
