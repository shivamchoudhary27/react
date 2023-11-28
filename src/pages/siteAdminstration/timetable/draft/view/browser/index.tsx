import React from "react";
import Filters from "../../../filters";
import { Container } from "react-bootstrap";
import DraftVersionTable from "../../table";
import Header from "../../../../../newHeader";
import Footer from "../../../../../newFooter";
import HeaderTabs from "../../../../../headerTabs";
import PageTitle from "../../../../../../widgets/pageTitle";
import BreadcrumbComponent from "../../../../../../widgets/breadcrumb";
import CustomButton from "../../../../../../widgets/formInputFields/buttons";
import endDateIcon from "../../../../../../assets/images/icons/calender-enddate.svg";
import startDateIcon from "../../../../../../assets/images/icons/calender-startdate.svg";

type Props = {
  commonProps: {
    urlArg: any;
    apiStatus: any;
    timeslots: any;
    courseDates: any;
    sortedCategories: any;
    updateCourseDates: any;
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
          { name: "Timetable Management", path: "/timetable" },
          { name: "Draft Version", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle
            pageTitle={`${props.commonProps.urlArg.prg} : Draft Version`}
            gobacklink="/timetable"
          />
          <Filters
            workloadCourses={props.commonProps.sortedCategories}
            ids={props.commonProps.urlArg}
            updateCourseDates={props.commonProps.updateCourseDates}
          />
          <div className="d-flex justify-content-between align-items-center mt-4">
            <div className="d-flex gap-4 dates-wrapper">
              <div>
                <img src={startDateIcon} alt="start Date" />
                <b>Start Date:</b> {props.commonProps.courseDates.startDate}
                {/* {format(weekDates[0], 'dd/MM/yyyy')} */}
              </div>
              <div>
                <img src={endDateIcon} alt="End Date" />
                <b>End Date: </b> {props.commonProps.courseDates.endDate}
                {/* {format(weekDates[6], 'dd/MM/yyyy')} */}
              </div>
            </div>
            <div className="slot-indicator">
              <div className="me-1 available">Available Slots</div>
              <div className="me-1 booked">Not Available Slots</div>
              <div className="me-1 weekend">Break/Weekend/Holiday</div>
            </div>
          </div>
          {props.commonProps.apiStatus === "finished" &&
            props.commonProps.timeslots.length > 0 && (
              <>
                <DraftVersionTable
                  SlotData={props.commonProps.timeslots}
                  apiStatus={props.commonProps.apiStatus}
                  courseDates={props.commonProps.courseDates}
                />
                {/* <WeeklyTimetable SlotData={timeslots} apiStatus={apiStatus} /> */}
              </>
            )}
          {props.commonProps.apiStatus === "finished" &&
            props.commonProps.timeslots.length === 0 && (
              <div>
                <i>No timeslots are available</i>
              </div>
            )}
          <div style={{ textAlign: "right" }}>
            <CustomButton
              type="submit"
              btnText="Publish for change request"
              variant="primary"
              // disabled={isSubmitting}
            />
          </div>
        </Container>
        <div className="modal-buttons">
          <CustomButton
            type="submit"
            btnText="Submit Changes"
            variant="primary"
            // disabled={isSubmitting}
          />
          <CustomButton
            type="reset"
            btnText="Reset"
            variant="outline-secondary"
          />
        </div>

        {/* <LoadingButton
            variant="primary"
            btnText={"Updating..."}
            className="modal-buttons"
          /> */}
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Browser;
