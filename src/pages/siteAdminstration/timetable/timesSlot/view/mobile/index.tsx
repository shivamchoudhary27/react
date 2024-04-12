import React, { useState } from "react";
import TimesSlotTable from "../../table";
import WeekendSlot from "../../weekendSlot";
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
    setFilterUpdate: any;
    departmentListPages: any;
  };
};

const Browser = (props: Props) => {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [weekendSlotObj, setWeekendSlotObj] = useState({
    id: 0,
  });

  // handle modal hide & show functionality === >>>
  const toggleModalShow = (status: boolean) => {
    setModalShow(status);
  };

  const TIMESLOT_TABLE_COMPONENT = (
    <TimesSlotTable
      apiStatus={props.commonProps.apiStatus}
      departmentList={props.commonProps.departmentList}
      toggleModalShow={toggleModalShow}
      setWeekendSlotObj={setWeekendSlotObj}
      filterUpdate={props.commonProps.filterUpdate}
      setFilterUpdate={props.commonProps.setFilterUpdate}
    />
  );
  // <<< ==== END COMPONENTS ==== >>>

  const openWeekendModal = () => {
    toggleModalShow(true);
    setWeekendSlotObj({ id: 0 });
  };

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
              <Button variant="primary" onClick={openWeekendModal}>
                Set Institute Weekend
              </Button>
            </div>
          </div>
          {TIMESLOT_TABLE_COMPONENT}
          <BuildPagination
            activepage={props.commonProps.filterUpdate}
            totalpages={props.commonProps.departmentListPages}
            getrequestedpage={props.commonProps.newPageRequest}
          />
        </Container>
      </div>
      <WeekendSlot
        modalShow={modalShow}
        weekendSlotObj={weekendSlotObj}
        toggleModalShow={toggleModalShow}
        onHide={() => toggleModalShow(false)}
      />
      <MobileFooter />
    </React.Fragment>
  );
};

export default Browser;
