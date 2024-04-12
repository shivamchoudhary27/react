import React from "react";
import Filters from "../../filters";
import HolidaysModal from "../../form";
import HolidaysTable from "../../table";
import { Container } from "react-bootstrap";
import PageTitle from "../../../../../../widgets/pageTitle";
import MobileHeader from "../../../../../newHeader/mobileHeader";
import MobileFooter from "../../../../../newFooter/mobileFooter";
import BuildPagination from "../../../../../../widgets/pagination";
import BreadcrumbComponent from "../../../../../../widgets/breadcrumb";

type Props = {
  commonProps: {
    modalShow: any;
    apiStatus: any;
    holidaysObj: any;
    yearOptions: any;
    filterUpdate: any;
    holidaysData: any;
    refreshToggle: any;
    newPageRequest: any;
    toggleModalShow: any;
    editHandlerById: any;
    currentInstitute: any;
    setFilterUpdate: any;
    resetHolidaysForm: any;
    updateInputFilters: any;
    getCurrentBatchYear: any;
    refreshOnDeleteToggle: any;
    holidaysApiResponseData: any;
    filterHandlerByDepartment: any;
    updateHolidaysFilterByYear: any;
  };
};

const Mobile = (props: Props) => {
  // <<< ==== COMPONENTS ==== >>>
  const CLASSROOM_TABLE_COMPONENT = (
    <HolidaysTable
      apiStatus={props.commonProps.apiStatus}
      holidaysData={props.commonProps.holidaysData}
      editHandlerById={props.commonProps.editHandlerById}
      toggleModalShow={props.commonProps.toggleModalShow}
      refreshHolidaysData={props.commonProps.refreshToggle}
      currentInstitute={props.commonProps.currentInstitute}
      refreshOnDelete={props.commonProps.refreshOnDeleteToggle}
      setFilterUpdate={props.commonProps.setFilterUpdate}
      filterUpdate={props.commonProps.filterUpdate}
    />
  );

  const CLASSROOM_MODAL_COMPONENT = (
    <HolidaysModal
      show={props.commonProps.modalShow}
      holidaysObj={props.commonProps.holidaysObj}
      yearOptions={props.commonProps.yearOptions}
      togglemodalshow={props.commonProps.toggleModalShow}
      currentInstitute={props.commonProps.currentInstitute}
      refreshHolidaysData={props.commonProps.refreshToggle}
      onHide={() => props.commonProps.toggleModalShow(false)}
      getCurrentBatchYear={props.commonProps.getCurrentBatchYear}
    />
  );
  // <<< ==== END COMPONENTS ==== >>>
  return (
    <React.Fragment>
      <MobileHeader />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "Timetable Management", path: "/timetable" },
          { name: "Manage Holidays", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mb-wraper">
        <div className="contentarea-wrapper mt-3 mb-5">
          <Container fluid>
            <PageTitle pageTitle="Manage Holidays" gobacklink="/timetable" />
            <Filters
              apiStatus={props.commonProps.apiStatus}
              yearOptions={props.commonProps.yearOptions}
              toggleModalShow={props.commonProps.toggleModalShow}
              refreshHolidaysData={props.commonProps.refreshToggle}
              resetHolidaysForm={props.commonProps.resetHolidaysForm}
              updateInputFilters={props.commonProps.updateInputFilters}
              updateHolidaysFilter={
                props.commonProps.updateHolidaysFilterByYear
              }
              filterHandlerByDepartment={
                props.commonProps.filterHandlerByDepartment
              }
            />
            {CLASSROOM_TABLE_COMPONENT}
            <BuildPagination
              totalpages={props.commonProps.holidaysApiResponseData}
              activepage={props.commonProps.filterUpdate.pageNumber}
              getrequestedpage={props.commonProps.newPageRequest}
            />
            {CLASSROOM_MODAL_COMPONENT}
          </Container>
        </div>
      </div>
      <MobileFooter />
    </React.Fragment>
  );
};

export default Mobile;
