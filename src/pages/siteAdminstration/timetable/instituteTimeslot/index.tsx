import Header from "../../../newHeader";
import Footer from "../../../newFooter";
import { useSelector } from "react-redux";
import HeaderTabs from "../../../headerTabs";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ManageInstituteTimesSlotTable from "./table";
import { Button, Container } from "react-bootstrap";
import PageTitle from "../../../../widgets/pageTitle";
import { pagination } from "../../../../utils/pagination";
import BreadcrumbComponent from "../../../../widgets/breadcrumb";
import { makeGetDataRequest } from "../../../../features/apiCalls/getdata";

type Props = {};

const InstituteTimeSlot = (props: Props) => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Header />
      <HeaderTabs />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "Timetable Management", path: "/timetable" },
          { name: "Manage Times Slot", path: "/timeslot" },
          { name: "Institute Times Slot", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle pageTitle="Institute Times Slot" gobacklink="/timeslot" />
          <div className="filter-wrapper mt-2">
            <div className="site-button-group">
              <Button
                variant="primary"
                onClick={() => navigate("/institutetimeslot")}
              >
                Add Slot
              </Button>{" "}
            </div>
          </div>
          {/* <ManageInstituteTimesSlotTable /> */}
        </Container>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default InstituteTimeSlot;
