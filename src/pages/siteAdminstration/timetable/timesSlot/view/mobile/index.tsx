import React from "react";
import TimesSlotTable from "../../table";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import PageTitle from "../../../../../../widgets/pageTitle";
import MobileHeader from "../../../../../newHeader/mobileHeader";
import MobileFooter from "../../../../../newFooter/mobileFooter";
import BuildPagination from "../../../../../../widgets/pagination";
import BreadcrumbComponent from "../../../../../../widgets/breadcrumb";

type Props = {
  commonProps: {
    apiStatus: any;
    filterUpdate: any;
    departmentList: any;
    newPageRequest: any;
    departmentListPages: any;
  };
};

const Mobile = (props: Props) => {
  const navigate = useNavigate();

  const TIMESLOT_TABLE_COMPONENT = (
    <TimesSlotTable
      apiStatus={props.commonProps.apiStatus}
      departmentList={props.commonProps.departmentList}
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
          { name: "Manage Times Slot", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mb-wraper">
        <div className="contentarea-wrapper mt-3 mb-5">
          <Container fluid>
            <PageTitle pageTitle="Manage Times Slot" gobacklink="/timetable" />
            <div className="filter-wrapper mt-2">
              <div className="site-button-group">
                <Button
                  variant="primary"
                  onClick={() => navigate("/institutetimeslot")}
                >
                  Manage Institute Timeslot
                </Button>{" "}
              </div>
            </div>
            {TIMESLOT_TABLE_COMPONENT}
            <BuildPagination
              totalpages={props.commonProps.departmentListPages}
              activepage={props.commonProps.filterUpdate}
              getrequestedpage={props.commonProps.newPageRequest}
            />
          </Container>
        </div>
      </div>
      <MobileFooter />
    </React.Fragment>
  );
};

export default Mobile;
