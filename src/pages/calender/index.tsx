import "./style.scss";
import moment from "moment";
import events from "./events.js";
import Header from "../newHeader";
import Footer from "../newFooter";
import HeaderTabs from "../headerTabs";
import { useSelector } from "react-redux";
import CalendarFilters from "./calendar_filter";
import PageTitle from "../../widgets/pageTitle";
import React, { useState, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import BreadcrumbComponent from "../../widgets/breadcrumb";
import { getCalendarEvents, getData } from "../../adapters";
import eventsTime from "../../assets/images/icons/clock.svg";
import { Calendar, momentLocalizer } from "react-big-calendar";
import multiUser from "../../assets/images/icons/multi-user.svg";
import singleUser from "../../assets/images/icons/single-user.svg";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { getData as getCourses } from "../../adapters/microservices";
import { getEventColor, initialColors, hexToRGB } from "./local/utils";
import eventsDate from "../../assets/images/icons/calendar-black.svg";
import HeirarchyFilter from "./filters";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function ReactBigCalendar() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [eventsData, setEventsData] = useState(events);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const enroled_courses = JSON.parse(localStorage.getItem("enroled_courses"));
  const colorConfig =
    localStorage.getItem("event-colors") !== null
      ? JSON.parse(localStorage.getItem("event-colors"))
      : JSON.parse(initialColors);
  const [coursesList, setCoursesList] = useState<any>([]);
  const currentUserRole = useSelector(
    (state) => state.globalFilters.currentUserRole
  );

  useEffect(() => {
    let endPoint = `/${currentUserRole.id}/dashboard`;
    getCourses(endPoint, {})
      .then((result) => {
        if (result.data !== "" && result.status === 200) {
          setCoursesList(result.data.courses);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentUserRole.id]);

  useEffect(() => {
    setFilteredEvents(eventsData);
  }, [eventsData]);

  useEffect(() => {
    let dataParam = "";
    coursesList.map((item, index) => {
      dataParam += `events[courseids][${index}]=${item.idNumber !== null ? item.idNumber : 0}&`;
    });

    // Object.keys(enroled_courses).map((item, index) => {
    //   console.log(item, enroled_courses[index].id)
    //   dataParam += `events[courseids][${item}]=${enroled_courses[index].id}&`;
    // });

    const query = {
      wsfunction: "core_calendar_get_calendar_events",
      dataParam,
    };
    getCalendarEvents(query)
      .then((res) => {
        if (res.status === 200 && res.data) {
          if (res.data.errorcode) {
            console.log("Something went wrong");
          } else {
            let calEvents = res.data.events;

            calEvents.map((i, index) => {
              calEvents[index].title = calEvents[index].name;
              calEvents[index].url = "";
              let timeStart = calEvents[index].timestart * 1000;
              let timeEnd =
                (calEvents[index].timestart + calEvents[index].timeduration) *
                1000;
              calEvents[index].start = new Date(timeStart);
              calEvents[index].end = new Date(timeEnd);

              const hours = calEvents[index].start
                .getHours()
                .toString()
                .padStart(2, "0");
              const minutes = calEvents[index].start
                .getMinutes()
                .toString()
                .padStart(2, "0");
              calEvents[index].startingTime = `${hours}:${minutes}`;
              if (calEvents[index].modulename !== null) {
                calEvents[index].colorEvento = getEventColor(
                  calEvents[index].modulename,
                  colorConfig
                );
              } else {
                calEvents[index].colorEvento = getEventColor(
                  calEvents[index].eventtype,
                  colorConfig
                );
              }
            });
            setEventsData(calEvents);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [coursesList]);

  const handleSelectEvent = (event) => {
    if (event.url === "") {
      const query = {
        wsfunction: "core_calendar_get_calendar_event_by_id",
        eventid: event.id,
      };
      getData(query)
        .then((res) => {
          if (res.status === 200 && res.data.event.url !== undefined) {
            for (let i = 0; i < eventsData.length; i++) {
              if (eventsData[i].id === event.id) {
                eventsData[i].url = res.data.event.url;
                break;
              }
            }
            setEventsData([...eventsData]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setSelectedEvent(event);
    setShowModal(true);
  };

  const filterEvents = (eventChecked) => {
    let newEvents = [];
    newEvents = eventsData.filter((el) => {
      if (
        eventChecked.includes(el.modulename) ||
        eventChecked.includes(el.eventtype)
      ) {
        return true;
      }
    });
    setFilteredEvents(newEvents);
  };

  const showAllNone = (value) => {
    if (value === true) setFilteredEvents(eventsData);
    else setFilteredEvents([]);
  };

  const CustomEventTitle = ({ event }) => (
    <React.Fragment>
      <span style={{ backgroundColor: event.colorEvento }}>
        {event.startingTime}
      </span>
      {event.title}
    </React.Fragment>
  );

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
          <Row>
            <Col md={2}>
              <CalendarFilters
                events={colorConfig}
                filters={filterEvents}
                showAllNone={showAllNone}
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

              {selectedEvent && <Modal />}
              <Calendar
                views={["day", "work_week", "month"]}
                // selectable
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="month"
                events={filteredEvents}
                components={{
                  event: CustomEventTitle, // Use the custom Event component
                }}
                style={{ height: "100vh" }}
                // onSelectSlot={(e) => handleSelect(e)}
                onSelectEvent={handleSelectEvent}
                eventPropGetter={(myEventsList) => {
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
                show={showModal}
                onHide={() => setShowModal(false)}
              >
                <Modal.Header closeButton>
                  <Modal.Title>{selectedEvent?.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {selectedEvent?.description && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: selectedEvent.description,
                      }}
                    />
                  )}
                  <Row className="mt-3 mb-4 gx-4">
                    <Col sm={6}>
                      <div className="start-date">
                        <strong>Start Date</strong>
                        <div className="small mt-2 mb-1">
                          <img src={eventsDate} alt="Date" />
                          {moment(selectedEvent?.start).format("dddd, MMMM DD")}
                        </div>
                        <div className="small">
                          <img src={eventsTime} alt="Time" />
                          {moment(selectedEvent?.start).format("h:mm A")}
                        </div>
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="end-date">
                        <strong>End Date</strong>
                        <div className="small mt-2 mb-1">
                          <img src={eventsDate} alt="Date" />
                          {moment(selectedEvent?.end).format("dddd, MMMM DD")}
                        </div>
                        <div className="small">
                          <img src={eventsTime} alt="Time" />
                          {moment(selectedEvent?.end).format("h:mm A")}
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <div className="text-center mb-3">
                    <a href={selectedEvent?.url ? selectedEvent.url : ""}>
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
}
