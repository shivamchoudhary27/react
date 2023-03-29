import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { getCalendarEvents } from "../../adapters";
import moment from "moment";
import events from "./events.js";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Header from "../header/";
import Sidebar from "../sidebar/";
import { Container, Row, Col } from "react-bootstrap";
import { getEventColor, initialColors} from "./utils";
import CalendarFilters from "./calendar_filter";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function ReactBigCalendar() {
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
    <>      
      <Header pageHeading="Calendar" welcomeIcon={false} />
      <div className='main-content-container'>
        <Sidebar />
        <div className="content-area content-area-slider" id="contentareaslider">
          <Container fluid>
            <Row>
              <Col md={10}>
                <Calendar
                views={["day", "agenda", "work_week", "month"]}
                selectable
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="month"
                events={filteredEvents}
                style={{ height: "100vh" }}
                BackgroundWrapper = "red"
                onSelectEvent={(event) => console.log(event)}
                // onSelectSlot={handleSelect}
                eventPropGetter={(myEventsList) => {
                  const backgroundColor = myEventsList.colorEvento ? myEventsList.colorEvento : 'blue';
                  const color = myEventsList.color ? myEventsList.color : 'white';
                  return { style: { backgroundColor, color}}
                }}
                />
              </Col>
              <Col md={2}>
                <CalendarFilters events={colorConfig} filters={filterEvents} showAllNone={showAllNone}/>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}