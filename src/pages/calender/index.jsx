import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { getCalendarEvents } from "../../adapters";
import moment from "moment";
import events from "./events.js";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Header from "../newHeader";
import Footer from "../newFooter";
import HeaderTabs from "../headerTabs";
// import Sidebar from "../sidebar/";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { getEventColor, initialColors} from "./local/utils";
import CalendarFilters from "./calendar_filter";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function ReactBigCalendar() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [eventsData, setEventsData] = useState(events);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const enroled_courses = JSON.parse(localStorage.getItem("enroled_courses"));
  const colorConfig =
  (localStorage.getItem("event-colors") !== null)
    ? JSON.parse(localStorage.getItem("event-colors"))
    : JSON.parse(initialColors);

  useEffect(()=> {
    setFilteredEvents(eventsData);
  }, [eventsData]);

  useEffect(() => {
    let dataParam = '';
    Object.keys(enroled_courses).map((item, index) => {
      dataParam += `events[courseids][${item}]=${enroled_courses[index].id}&`;
    });

    const query = {
      wsfunction: 'core_calendar_get_calendar_events',
      dataParam
    };
    getCalendarEvents(query)
      .then(res => {
        if (res.status === 200 && res.data) {
          if (res.data.errorcode) {
            console.log('Something went wrong');
          } else {
            let calEvents = res.data.events;

            calEvents.map((i, index) => {
              calEvents[index].title = calEvents[index].name;
              let timeStart = calEvents[index].timestart * 1000;
              let timeEnd = (calEvents[index].timestart + calEvents[index].timeduration) * 1000;
              calEvents[index].start = new Date(timeStart);
              calEvents[index].end = new Date(timeEnd);

              if (calEvents[index].modulename !== null) {
                calEvents[index].colorEvento = getEventColor(calEvents[index].modulename, colorConfig);
              } else {
                calEvents[index].colorEvento = getEventColor(calEvents[index].eventtype, colorConfig);
              }
            });
            setEventsData(calEvents);
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const filterEvents = (eventChecked) => {
    let newEvents = [];
    newEvents = eventsData.filter((el) => {
      if (eventChecked.includes(el.modulename) || eventChecked.includes(el.eventtype)) {
        return true;
      }
    });
    setFilteredEvents(newEvents);
  }

  const showAllNone = (value) => {
    if (value === true) setFilteredEvents(eventsData);
    else setFilteredEvents([]);
  }

  return (
    <React.Fragment>      
      <Header />
      <HeaderTabs />
        <div className="contentarea-wrapper">
          <Container fluid className="administration-box">
            <Row>
              <Col md={10}>
                {selectedEvent && <Modal />}
                <Calendar
                  views={["day", "agenda", "work_week", "month"]}
                  selectable
                  localizer={localizer}
                  defaultDate={new Date()}
                  defaultView="month"
                  events={filteredEvents}
                  style={{ height: "100vh" }}
                  BackgroundWrapper = "red"
                  // onSelectSlot={(e) => handleSelect(e)}
                  onSelectEvent={handleSelectEvent}
                  eventPropGetter={(myEventsList) => {
                    const backgroundColor = myEventsList.colorEvento ? myEventsList.colorEvento : 'blue';
                    const color = myEventsList.color ? myEventsList.color : 'white';
                    return { style: { backgroundColor, color}}
                  }}
                />
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title>{selectedEvent?.title}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {selectedEvent?.description && <p>{selectedEvent.description}</p>}
                    <p>{moment(selectedEvent?.start).format('LLL')}</p>
                    <p>{moment(selectedEvent?.end).format('LLL')}</p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Col>
              <Col md={2}>
                <CalendarFilters events={colorConfig} filters={filterEvents} showAllNone={showAllNone}/>
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
    </React.Fragment>
  );
}