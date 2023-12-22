import React from "react";
import moment from "moment";
import Header from "../../../newHeader";
import Footer from "../../../newFooter";
import HeaderTabs from "../../../headerTabs";
import { hexToRGB } from "../../local/utils";
import { useNavigate } from "react-router-dom";
import CalendarFilters from "../../calendar_filter";
import PageTitle from "../../../../widgets/pageTitle";
import { Calendar, momentLocalizer } from "react-big-calendar";
import BreadcrumbComponent from "../../../../widgets/breadcrumb";
import eventsTime from "../../../../assets/images/icons/clock.svg";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import multiUser from "../../../../assets/images/icons/multi-user.svg";
import singleUser from "../../../../assets/images/icons/single-user.svg";
import eventsDate from "../../../../assets/images/icons/calendar-black.svg";

type Props = {
  commonProps: {
    showModal: any;
    colorConfig: any;
    showAllNone: any;
    filterEvents: any;
    setShowModal: any;
    selectedEvent: any;
    filteredEvents: any;
    CustomEventTitle: any;
    handleSelectEvent: any;
  };
};

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

const Browser = (props: Props) => {
  const navigate = useNavigate()
  return (
    <React.Fragment>
      <Header />
      <HeaderTabs activeTab="calender" />
      <BreadcrumbComponent
        routes={[
          { name: "Dashboard", path: "/dashboard" },
          { name: "Calendar", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle pageTitle="Calendar" gobacklink="/dashboard" />
          {/* {currentUserRole !== undefined &&
              <HeirarchyFilter 
                coursesList={apiData} 
                setUserCoursesData={() => {}} 
                getCourseStatus={() => {}} 
                updateCourses={() => {}}
                getCourseId={getCourseId}
              />
            } */}
          <div className="d-flex align-items-center justify-content-end flex-wrap mitcomponet-heading">
            <div className="row program-filter">
              <Button
                variant="primary"
                onClick={() => navigate("/mytimetable")}
              >
                My Timetable
              </Button>
            </div>
          </div>
          <Row>
            <Col md={2}>
              <CalendarFilters
                events={props.commonProps.colorConfig}
                filters={props.commonProps.filterEvents}
                showAllNone={props.commonProps.showAllNone}
              />

              <div className="mitblock meet-with mt-3">
                <h3 className="mitblock-title">Meet With</h3>
                <div className="mitblock-body">
                  <div className="input-group flex-nowrap">
                    <span className="input-group-text">
                      <img src={multiUser} alt="Meet With" />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search for people"
                      aria-label="Search for people"
                    />
                  </div>
                  <div className="meet-people">
                    <img src={singleUser} alt="User Icon" />
                    Renu Deswal
                    <i className="fas fa-times ms-auto"></i>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={10}>
              <Row className="mt-sm-0 mb-3 d-none">
                <Col className="col-auto">
                  {/* <label>Semester</label> */}
                  <select className="form-select" defaultValue="Semester 3">
                    <option value="1">Semester 3</option>
                    <option value="2">Semester 2</option>
                    <option value="3">Semester 1</option>
                  </select>
                </Col>
                <Col className="col-auto">
                  {/* <label>Courses</label> */}
                  <select className="form-select" defaultValue="All">
                    <option value="1">All</option>
                    <option value="2">Course 1</option>
                    <option value="3">Course 2</option>
                  </select>
                </Col>
              </Row>

              {props.commonProps.selectedEvent && <Modal />}
              <Calendar
                views={["day", "work_week", "month"]}
                // selectable
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="month"
                events={props.commonProps.filteredEvents}
                components={{
                  event: props.commonProps.CustomEventTitle, // Use the custom Event component
                }}
                style={{ height: "100vh" }}
                // onSelectSlot={(e) => handleSelect(e)}
                onSelectEvent={props.commonProps.handleSelectEvent}
                eventPropGetter={(myEventsList: { colorEvento: any }) => {
                  const currentEventColor = myEventsList.colorEvento
                    ? myEventsList.colorEvento
                    : "#3174ad";
                  const backgroundColor = hexToRGB(currentEventColor, 0.08);
                  return {
                    style: { backgroundColor, borderColor: currentEventColor },
                  };
                }}
              />
              <Modal
                className="cal-events-modal"
                show={props.commonProps.showModal}
                onHide={() => props.commonProps.setShowModal(false)}
              >
                <Modal.Header closeButton>
                  <Modal.Title>
                    {props.commonProps.selectedEvent?.title}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {props.commonProps.selectedEvent?.description && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: props.commonProps.selectedEvent.description,
                      }}
                    />
                  )}
                  <Row className="mt-3 mb-4 gx-4">
                    <Col sm={6}>
                      <div className="start-date">
                        <strong>Start Date</strong>
                        <div className="small mt-2 mb-1">
                          <img src={eventsDate} alt="Date" />
                          {moment(
                            props.commonProps.selectedEvent?.start
                          ).format("dddd, MMMM DD")}
                        </div>
                        <div className="small">
                          <img src={eventsTime} alt="Time" />
                          {moment(
                            props.commonProps.selectedEvent?.start
                          ).format("h:mm A")}
                        </div>
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="end-date">
                        <strong>End Date</strong>
                        <div className="small mt-2 mb-1">
                          <img src={eventsDate} alt="Date" />
                          {moment(props.commonProps.selectedEvent?.end).format(
                            "dddd, MMMM DD"
                          )}
                        </div>
                        <div className="small">
                          <img src={eventsTime} alt="Time" />
                          {moment(props.commonProps.selectedEvent?.end).format(
                            "h:mm A"
                          )}
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <div className="text-center mb-3">
                    <a
                      href={
                        props.commonProps.selectedEvent?.url
                          ? props.commonProps.selectedEvent.url
                          : ""
                      }
                    >
                      <Button size="sm">See Details</Button>
                    </a>
                  </div>
                </Modal.Body>
              </Modal>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Browser;
